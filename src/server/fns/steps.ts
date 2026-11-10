import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { NEW_STEP, applySession, isUnlocked } from "@/lib/step-progress";
import { nowInstant } from "@/lib/time";
import { requireAuth } from "@/server/auth/session";
import { findStep } from "@/routes/practice/drill-catalogue.data";
import { findVerbSet, scoredItems } from "@/routes/practice/verbs/sets.data";
import { listStepProgress, saveStepState } from "@/server/db/queries/step-progress";

export const listStepProgressFn = createServerFn({ method: "GET" }).handler(async () => {
	const { userId } = await requireAuth();
	return await listStepProgress(userId);
});

export const recordStepSessionFn = createServerFn({ method: "POST" })
	.validator(
		z.object({
			stepId: z.string().min(1),
			correct: z.number().int().min(0),
			total: z.number().int().min(0),
		}),
	)
	.handler(async ({ data: { stepId, correct, total } }) => {
		const { userId } = await requireAuth();
		const found = findStep(stepId);
		if (!found) throw new Error(`Unknown step: ${stepId}`);
		const { step } = found;
		const now = nowInstant();
		const rows = await listStepProgress(userId);
		const progress = new Map(rows.map(({ stepId: id, ...state }) => [id, state]));
		const previous = progress.get(stepId) ?? NEW_STEP;
		if (!previous.tickedAt && !isUnlocked(step, progress, now)) {
			throw new Error(`Step is locked: ${stepId}`);
		}
		const set = step.set && findVerbSet(step.set.id);
		if (set && total !== scoredItems(set, step.set!.stage)) {
			throw new Error(`Expected ${scoredItems(set, step.set!.stage)} items for ${stepId}, got ${total}`);
		}
		const { state, outcome } = applySession(previous, { correct, total }, now, step);
		if (state === previous) return { outcome, progress: rows };
		await saveStepState(userId, stepId, state);
		return { outcome, progress: [...rows.filter((row) => row.stepId !== stepId), { stepId, ...state }] };
	});
