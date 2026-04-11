import { endOfTomorrow } from "date-fns";
import { and, count, eq, gt, lte, sql } from "drizzle-orm";

import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { vocabularySkillStateAfterAttempt } from "@/lib/srs";

import { db } from "../index";
import { type SkillType, vocabulary, vocabularySkills } from "../schema";
import { getCompletedPracticeAtDatesForStreak } from "./practice-sessions";
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

export const getPracticeStats = async (userId: number, skillType: SkillType = "recognition") => {
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

	const streak = streakLengthFromCompletedSessionDates(
		await getCompletedPracticeAtDatesForStreak(userId),
	);

	const totalLearned = skillStats?.learned || 0;
	const totalVocab = skillStats?.total || 0;

	return {
		streak,
		itemsMastered: skillStats?.mastered || 0,
		dueCount: skillStats?.due || 0,
		totalLearned,
		newAvailable: totalVocab - totalLearned,
	};
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

export const getVocabularyProgress = async (userId: number) => {
	const [total, learned] = await Promise.all([
		db.$count(vocabulary),
		db.$count(vocabularySkills, eq(vocabularySkills.userId, userId)),
	]);

	return { total, learned };
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
