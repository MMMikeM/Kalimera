import { and, count, eq, sql } from "drizzle-orm";

import { nowIso, toISOString } from "@/lib/time";
import { reviewStateAfterAttempt } from "@/server/srs";

import { db } from "../index";
import { vocabProgress } from "../schema";
import type { DbTransaction } from "./transaction-client";

export const getReviewStats = async (userId: number) => {
	const now = nowIso();
	const masteredThresholdDays = 21;

	const [stats] = await db.query.vocabProgress.findMany({
		where: {
			userId,
		},
		extras: {
			mastered: (t, { sql }) =>
				sql<number>`COUNT(CASE WHEN ${t.intervalDays} >= ${masteredThresholdDays} THEN 1 END)`,
			due: (t, { sql }) => sql<number>`COUNT(CASE WHEN ${t.nextReviewAt} <= ${now} THEN 1 END)`,
			learned: count(),
			total: sql<number>`(SELECT COUNT(*) FROM vocabulary)`,
		},
	});

	if (!stats) throw new Error("FUck");

	const totalLearned = stats.learned;
	const totalVocab = stats.total;

	return {
		itemsMastered: stats.mastered,
		dueCount: stats.due,
		totalLearned,
		newAvailable: totalVocab - totalLearned,
	};
};

type ReviewStateInput = {
	userId: number;
	vocabId: number;
	isCorrect: boolean;
	timeTaken: number;
};

/** Apply SM-2 review state inside an existing transaction (e.g. after recording an attempt). */
export const applyReviewStateAfterAttempt = async (tx: DbTransaction, input: ReviewStateInput) => {
	const { userId, vocabId, isCorrect, timeTaken } = input;

	const existing = await tx.query.vocabProgress.findFirst({
		where: { userId, vocabId },
		columns: { easeFactor: true, intervalDays: true, reviewCount: true },
	});

	const mutation = reviewStateAfterAttempt(existing, isCorrect, timeTaken);

	if (mutation.op === "update") {
		await tx
			.update(vocabProgress)
			.set({
				...mutation.set,
				nextReviewAt: toISOString(mutation.set.nextReviewAt),
				lastReviewedAt: toISOString(mutation.set.lastReviewedAt),
			})
			.where(and(eq(vocabProgress.userId, userId), eq(vocabProgress.vocabId, vocabId)));
	} else {
		await tx.insert(vocabProgress).values({
			userId,
			vocabId,
			...mutation.values,
			nextReviewAt: toISOString(mutation.values.nextReviewAt),
			lastReviewedAt: toISOString(mutation.values.lastReviewedAt),
		});
	}
};
