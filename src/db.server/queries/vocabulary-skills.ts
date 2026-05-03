import { endOfTomorrow } from "date-fns";
import { and, count, eq, gt, inArray, isNotNull, lt, lte, sql } from "drizzle-orm";

import { vocabularySkillStateAfterAttempt } from "@/lib/srs";

import { db } from "../index";
import { type SkillType, vocabularySkills } from "../schema";
import type { DbTransaction } from "./transaction-client";

export const getItemsDueForReview = async (
	userId: number,
	skillType: SkillType = "recognition",
	limit = 20,
) => {
	const now = new Date();

	return await db.query.vocabularySkills.findMany({
		where: {
			userId,
			skillType,
			nextReviewAt: { lte: now },
		},
		orderBy: { nextReviewAt: "asc" },
		limit,
		with: { vocabulary: true },
	});
};

export const getSkillStats = async (userId: number, skillType: SkillType = "recognition") => {
	const now = new Date();
	const masteredThresholdDays = 21;

	const [skillStats] = await db
		.select({
			mastered: sql<number>`COUNT(CASE WHEN ${vocabularySkills.intervalDays} >= ${masteredThresholdDays} THEN 1 END)`,
			due: sql<number>`COUNT(CASE WHEN ${vocabularySkills.nextReviewAt} <= ${now} THEN 1 END)`,
			learned: count(),
			total: sql<number>`(SELECT COUNT(*) FROM vocabulary)`,
		})
		.from(vocabularySkills)
		.where(and(eq(vocabularySkills.userId, userId), eq(vocabularySkills.skillType, skillType)));

	const totalLearned = skillStats?.learned || 0;
	const totalVocab = skillStats?.total || 0;

	return {
		itemsMastered: skillStats?.mastered || 0,
		dueCount: skillStats?.due || 0,
		totalLearned,
		newAvailable: totalVocab - totalLearned,
	};
};

/**
 * Due `vocabulary_skills` rows aggregated per user. Uses the select builder because
 * `db.query.*.findMany` cannot express `GROUP BY user_id` + `COUNT(*)`.
 * Pass `userIds` to filter; empty array returns []. Omit to count all users.
 */
export const listDueVocabularyCountsByUser = async (now: Date, userIds?: number[]) => {
	if (userIds && userIds.length === 0) return [];
	const base = and(
		isNotNull(vocabularySkills.nextReviewAt),
		lt(vocabularySkills.nextReviewAt, now),
	);
	const where = userIds === undefined ? base : and(base, inArray(vocabularySkills.userId, userIds));

	return await db
		.select({
			userId: vocabularySkills.userId,
			dueCount: count().as("due_count"),
		})
		.from(vocabularySkills)
		.where(where)
		.groupBy(vocabularySkills.userId);
};

export const getItemsDueTomorrow = async (userId: number, skillType: SkillType = "recognition") => {
	const now = new Date();
	const tomorrowEnd = endOfTomorrow();

	return await db.$count(
		vocabularySkills,
		and(
			eq(vocabularySkills.userId, userId),
			eq(vocabularySkills.skillType, skillType),
			gt(vocabularySkills.nextReviewAt, now),
			lte(vocabularySkills.nextReviewAt, tomorrowEnd),
		),
	);
};

type VocabularySkillSideEffectInput = {
	userId: number;
	vocabularyId: number;
	skillType: SkillType;
	isCorrect: boolean;
	timeTaken: number;
};

/** Apply SRS state inside an existing transaction (e.g. after recording an attempt). */
export const applyVocabularySkillSideEffect = async (
	tx: DbTransaction,
	input: VocabularySkillSideEffectInput,
) => {
	const { userId, vocabularyId, skillType, isCorrect, timeTaken } = input;

	const existingSkill = await tx.query.vocabularySkills.findFirst({
		where: { userId, vocabularyId, skillType },
		columns: { easeFactor: true, intervalDays: true, reviewCount: true },
	});

	const now = new Date();
	const mutation = vocabularySkillStateAfterAttempt(existingSkill, isCorrect, timeTaken, now);

	if (mutation.op === "update") {
		await tx
			.update(vocabularySkills)
			.set(mutation.set)
			.where(
				and(
					eq(vocabularySkills.userId, userId),
					eq(vocabularySkills.vocabularyId, vocabularyId),
					eq(vocabularySkills.skillType, skillType),
				),
			);
	} else {
		await tx.insert(vocabularySkills).values({
			userId,
			vocabularyId,
			skillType,
			...mutation.values,
		});
	}
};
