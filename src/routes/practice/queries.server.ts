import { and, eq, gte, sql, desc, count } from "drizzle-orm";
import {
	vocabulary,
	vocabularySkills,
	weakAreas,
	practiceSessions,
	type SkillType,
} from "../../db/schema";

// biome-ignore lint/suspicious/noExplicitAny: DB type varies between libsql (local) and D1 (production)
type DB = any;

export interface VocabItemWithSkill {
	id: number;
	greekText: string;
	englishTranslation: string;
	pronunciation: string | null;
	wordType: string | null;
	category: string | null;
	skill: {
		nextReviewAt: Date | null;
		intervalDays: number | null;
		easeFactor: number | null;
		reviewCount: number | null;
	} | null;
}

export const getItemsDueForReview = async (
	db: DB,
	userId: number,
	skillType: SkillType = "recognition",
	limit = 20
): Promise<VocabItemWithSkill[]> => {
	const now = new Date();

	const results = await db
		.select({
			id: vocabulary.id,
			greekText: vocabulary.greekText,
			englishTranslation: vocabulary.englishTranslation,
			pronunciation: vocabulary.pronunciation,
			wordType: vocabulary.wordType,
			category: vocabulary.category,
			nextReviewAt: vocabularySkills.nextReviewAt,
			intervalDays: vocabularySkills.intervalDays,
			easeFactor: vocabularySkills.easeFactor,
			reviewCount: vocabularySkills.reviewCount,
		})
		.from(vocabulary)
		.innerJoin(
			vocabularySkills,
			and(
				eq(vocabularySkills.vocabularyId, vocabulary.id),
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType)
			)
		)
		.where(sql`${vocabularySkills.nextReviewAt} <= ${now}`)
		.orderBy(vocabularySkills.nextReviewAt)
		.limit(limit);

	return results.map((r: {
		id: number;
		greekText: string;
		englishTranslation: string;
		pronunciation: string | null;
		wordType: string | null;
		category: string | null;
		nextReviewAt: Date | null;
		intervalDays: number | null;
		easeFactor: number | null;
		reviewCount: number | null;
	}) => ({
		id: r.id,
		greekText: r.greekText,
		englishTranslation: r.englishTranslation,
		pronunciation: r.pronunciation,
		wordType: r.wordType,
		category: r.category,
		skill: r.nextReviewAt
			? {
				nextReviewAt: r.nextReviewAt,
				intervalDays: r.intervalDays,
				easeFactor: r.easeFactor,
				reviewCount: r.reviewCount,
			}
			: null,
	}));
};

export const getNewVocabularyItems = async (
	db: DB,
	userId: number,
	limit = 20
): Promise<VocabItemWithSkill[]> => {
	const results = await db
		.select({
			id: vocabulary.id,
			greekText: vocabulary.greekText,
			englishTranslation: vocabulary.englishTranslation,
			pronunciation: vocabulary.pronunciation,
			wordType: vocabulary.wordType,
			category: vocabulary.category,
		})
		.from(vocabulary)
		.leftJoin(
			vocabularySkills,
			and(
				eq(vocabularySkills.vocabularyId, vocabulary.id),
				eq(vocabularySkills.userId, userId)
			)
		)
		.where(sql`${vocabularySkills.userId} IS NULL`)
		.orderBy(vocabulary.difficultyLevel)
		.limit(limit);

	return results.map((r: {
		id: number;
		greekText: string;
		englishTranslation: string;
		pronunciation: string | null;
		wordType: string | null;
		category: string | null;
	}) => ({
		id: r.id,
		greekText: r.greekText,
		englishTranslation: r.englishTranslation,
		pronunciation: r.pronunciation,
		wordType: r.wordType,
		category: r.category,
		skill: null,
	}));
};

export interface WeakAreaInfo {
	id: number;
	areaType: string;
	areaIdentifier: string;
	mistakeCount: number;
	needsFocus: boolean;
	lastMistakeAt: Date;
}

export const getWeakAreas = async (db: DB, userId: number): Promise<WeakAreaInfo[]> => {
	const results = await db
		.select()
		.from(weakAreas)
		.where(and(eq(weakAreas.userId, userId), eq(weakAreas.needsFocus, true)))
		.orderBy(desc(weakAreas.mistakeCount));

	return results.map((r: {
		id: number;
		areaType: string;
		areaIdentifier: string;
		mistakeCount: number;
		needsFocus: boolean;
		lastMistakeAt: Date;
	}) => ({
		id: r.id,
		areaType: r.areaType,
		areaIdentifier: r.areaIdentifier,
		mistakeCount: r.mistakeCount,
		needsFocus: r.needsFocus,
		lastMistakeAt: r.lastMistakeAt,
	}));
};

export interface PracticeStats {
	streak: number; // Consecutive days practiced
	itemsMastered: number; // Items with interval > 21 days
	dueCount: number; // Items due for review
	totalLearned: number; // Total items with skill records
	newAvailable: number; // Items without skill records (not learned yet)
}

export const getPracticeStats = async (
	db: DB,
	userId: number,
	skillType: SkillType = "recognition"
): Promise<PracticeStats> => {
	const now = new Date();
	const masteredThresholdDays = 21;

	// Get items mastered (interval > 21 days)
	const [masteredResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType),
				gte(vocabularySkills.intervalDays, masteredThresholdDays)
			)
		);

	// Get items due for review (only items user has seen before that are now due)
	const [dueResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType),
				sql`${vocabularySkills.nextReviewAt} <= ${now}`
			)
		);

	// Get total learned (items with skill records)
	const [learnedResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(
			and(eq(vocabularySkills.userId, userId), eq(vocabularySkills.skillType, skillType))
		);

	// Get total vocabulary count
	const [totalVocabResult] = await db.select({ count: count() }).from(vocabulary);

	// Calculate streak (consecutive days with at least one completed session)
	const streak = await calculateStreak(db, userId);

	const totalLearned = learnedResult?.count || 0;
	const totalVocab = totalVocabResult?.count || 0;

	return {
		streak,
		itemsMastered: masteredResult?.count || 0,
		dueCount: dueResult?.count || 0,
		totalLearned,
		newAvailable: totalVocab - totalLearned,
	};
};

const calculateStreak = async (db: DB, userId: number): Promise<number> => {
	// Get completed sessions ordered by date
	const sessions = await db
		.select({
			completedAt: practiceSessions.completedAt,
		})
		.from(practiceSessions)
		.where(
			and(
				eq(practiceSessions.userId, userId),
				sql`${practiceSessions.completedAt} IS NOT NULL`
			)
		)
		.orderBy(desc(practiceSessions.completedAt))
		.limit(365); // Max 1 year of history

	if (sessions.length === 0) return 0;

	// Get unique dates (ignoring time)
	const uniqueDates = new Set<string>();
	for (const session of sessions) {
		if (session.completedAt) {
			const dateStr = new Date(session.completedAt).toISOString().split("T")[0] ?? "";
			uniqueDates.add(dateStr);
		}
	}

	const sortedDates = Array.from(uniqueDates).sort().reverse();
	if (sortedDates.length === 0) return 0;

	// Check if practiced today or yesterday (to count ongoing streak)
	const today = new Date().toISOString().split("T")[0] ?? "";
	const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0] ?? "";
	const firstDate = sortedDates[0];

	if (!firstDate || (firstDate !== today && firstDate !== yesterday)) {
		return 0; // Streak broken
	}

	// Count consecutive days
	let streak = 1;
	for (let i = 1; i < sortedDates.length; i++) {
		const prevDateStr = sortedDates[i - 1];
		const currDateStr = sortedDates[i];
		if (!prevDateStr || !currDateStr) break;

		const prevDate = new Date(prevDateStr);
		const currDate = new Date(currDateStr);
		const diffDays = Math.round((prevDate.getTime() - currDate.getTime()) / 86400000);

		if (diffDays === 1) {
			streak++;
		} else {
			break;
		}
	}

	return streak;
};

// Get vocabulary count by status for progress display
export const getVocabularyProgress = async (db: DB, userId: number) => {
	const [totalResult] = await db.select({ count: count() }).from(vocabulary);

	const [learnedResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(eq(vocabularySkills.userId, userId));

	return {
		total: totalResult?.count || 0,
		learned: learnedResult?.count || 0,
	};
};
