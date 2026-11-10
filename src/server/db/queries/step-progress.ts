import type { StepState } from "@/lib/step-progress";

import { db } from "../index";
import { stepProgress } from "../schema";

const STATE_COLUMNS = {
	passedDays: true,
	lastPassedOn: true,
	tickedAt: true,
	brushUps: true,
	nextBrushUpAt: true,
} as const;

export const listStepProgress = async (userId: number) =>
	await db.query.stepProgress.findMany({
		where: { userId },
		columns: { stepId: true, ...STATE_COLUMNS },
	});

export type StepProgressRow = Awaited<ReturnType<typeof listStepProgress>>[number];

export const getStepState = async (userId: number, stepId: string) =>
	await db.query.stepProgress.findFirst({ where: { userId, stepId }, columns: STATE_COLUMNS });

export const saveStepState = async (userId: number, stepId: string, state: StepState) => {
	await db
		.insert(stepProgress)
		.values({ userId, stepId, ...state })
		.onConflictDoUpdate({ target: [stepProgress.userId, stepProgress.stepId], set: state });
};
