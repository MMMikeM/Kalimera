import { and, count, eq, inArray, isNotNull, lt, sql } from "drizzle-orm";

import { nowIso, toISOString } from "@/lib/time";
import { reviewStateAfterAttempt } from "@/server/srs";

import { db } from "../index";
import { vocabProgress, vocabulary } from "../schema";
import type { DbTransaction } from "./transaction-client";

/** A word counts as mastered once its review interval reaches three weeks. */
const MASTERED_INTERVAL_DAYS = 21;

export const getReviewStats = async (userId: number) => {
	const now = nowIso();

	const [stats] = await db
		.select({
			itemsMastered: count(
				sql`case when ${vocabProgress.intervalDays} >= ${MASTERED_INTERVAL_DAYS} then 1 end`,
			),
			dueCount: count(sql`case when ${vocabProgress.nextReviewAt} <= ${now} then 1 end`),
			totalLearned: count(),
			totalVocab: sql`(select count(*) from ${vocabulary})`.mapWith(Number),
		})
		.from(vocabProgress)
		.where(eq(vocabProgress.userId, userId));

	// An aggregate without GROUP BY always yields one row; this only narrows the type.
	if (!stats) throw new Error(`Review stats aggregate returned no row for user ${userId}`);

	const { totalVocab, ...counts } = stats;
	return { ...counts, newAvailable: totalVocab - counts.totalLearned };
};

/** Due review counts per user for push-notification targeting. */
export const listDueVocabularyCountsByUser = async (now: string, userIds?: number[]) => {
	if (userIds && userIds.length === 0) return [];
	const base = and(isNotNull(vocabProgress.nextReviewAt), lt(vocabProgress.nextReviewAt, now));
	const where = userIds === undefined ? base : and(base, inArray(vocabProgress.userId, userIds));

	return await db
		.select({
			userId: vocabProgress.userId,
			dueCount: count().as("due_count"),
		})
		.from(vocabProgress)
		.where(where)
		.groupBy(vocabProgress.userId);
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
