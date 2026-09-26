import { and, count, eq, gte, inArray, isNotNull, lt, lte } from "drizzle-orm";

import { nowIso, toISOString } from "@/lib/time";
import { reviewStateAfterAttempt } from "@/server/srs";

import { db } from "../index";
import { vocabProgress, vocabulary } from "../schema";
import type { DbTransaction } from "./transaction-client";

/** A word counts as mastered once its review interval reaches three weeks. */
const MASTERED_INTERVAL_DAYS = 21;

export const getReviewStats = async (userId: number) => {
	const now = nowIso();

	const stats = await db.query.users.findFirst({
		where: { id: userId },
		columns: {},
		extras: {
			itemsMastered: (user) =>
				db.$count(
					vocabProgress,
					and(
						eq(vocabProgress.userId, user.id),
						gte(vocabProgress.intervalDays, MASTERED_INTERVAL_DAYS),
					),
				),
			dueCount: (user) =>
				db.$count(
					vocabProgress,
					and(eq(vocabProgress.userId, user.id), lte(vocabProgress.nextReviewAt, now)),
				),
			totalLearned: (user) => db.$count(vocabProgress, eq(vocabProgress.userId, user.id)),
			totalVocab: () => db.$count(vocabulary),
		},
	});

	if (!stats) throw new Error(`No user ${userId}`);

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
