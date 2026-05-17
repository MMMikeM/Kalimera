import { and, count, eq, gt, inArray, isNotNull, lt, lte, sql } from "drizzle-orm";

import { endOfTomorrowUTC, nowInstant, toEpochSeconds } from "@/lib/time";
import { reviewStateAfterAttempt } from "@/server/srs";

import { db } from "../index";
import { vocabReviews } from "../schema";
import type { DbTransaction } from "./transaction-client";

export const getReviewStats = async (userId: number) => {
	const nowSec = toEpochSeconds(nowInstant());
	const masteredThresholdDays = 21;

	const [stats] = await db.query.vocabReviews.findMany({
		where: {
			userId,
		},
		extras: {
			mastered: (t, { sql }) =>
				sql<number>`COUNT(CASE WHEN ${t.intervalDays} >= ${masteredThresholdDays} THEN 1 END)`,
			due: (t, { sql }) => sql<number>`COUNT(CASE WHEN ${t.nextReviewAt} <= ${nowSec} THEN 1 END)`,
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

/**
 * Due `vocabulary_reviews` rows aggregated per user. Uses the select builder because
 * `db.query.*.findMany` cannot express `GROUP BY user_id` + `COUNT(*)`.
 * Pass `userIds` to filter; empty array returns []. Omit to count all users.
 */
/** Due review counts per user for push-notification targeting. */
export const listDueVocabularyCountsByUser = async (now: number, userIds?: number[]) => {
	if (userIds && userIds.length === 0) return [];
	const base = and(isNotNull(vocabReviews.nextReviewAt), lt(vocabReviews.nextReviewAt, now));
	const where = userIds === undefined ? base : and(base, inArray(vocabReviews.userId, userIds));

	return await db
		.select({
			userId: vocabReviews.userId,
			dueCount: count().as("due_count"),
		})
		.from(vocabReviews)
		.where(where)
		.groupBy(vocabReviews.userId);
};

export const getItemsDueTomorrow = async (userId: number) => {
	return await db.$count(
		vocabReviews,
		and(
			eq(vocabReviews.userId, userId),
			gt(vocabReviews.nextReviewAt, toEpochSeconds(nowInstant())),
			lte(vocabReviews.nextReviewAt, toEpochSeconds(endOfTomorrowUTC())),
		),
	);
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

	const existing = await tx.query.vocabReviews.findFirst({
		where: { userId, vocabId },
		columns: { easeFactor: true, intervalDays: true, reviewCount: true },
	});

	const mutation = reviewStateAfterAttempt(existing, isCorrect, timeTaken);

	if (mutation.op === "update") {
		await tx
			.update(vocabReviews)
			.set({
				...mutation.set,
				nextReviewAt: toEpochSeconds(mutation.set.nextReviewAt),
				lastReviewedAt: toEpochSeconds(mutation.set.lastReviewedAt),
			})
			.where(and(eq(vocabReviews.userId, userId), eq(vocabReviews.vocabId, vocabId)));
	} else {
		await tx.insert(vocabReviews).values({
			userId,
			vocabId,
			...mutation.values,
			nextReviewAt: toEpochSeconds(mutation.values.nextReviewAt),
			lastReviewedAt: toEpochSeconds(mutation.values.lastReviewedAt),
		});
	}
};
