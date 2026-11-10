import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { NEW_STEP, applySession } from "@/lib/step-progress";
import { nowInstant } from "@/lib/time";
import { requireAuth } from "@/server/auth/session";
import { getStepState, listStepProgress, saveStepState } from "@/server/db/queries/step-progress";

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
		const previous = (await getStepState(userId, stepId)) ?? NEW_STEP;
		const { state, outcome } = applySession(previous, { correct, total }, nowInstant());
		if (state !== previous) await saveStepState(userId, stepId, state);
		return { outcome, progress: await listStepProgress(userId) };
	});
