import { sql } from "drizzle-orm";

import type { CefrLevel, WordType } from "../enums";
import { db } from "../index";

interface DrillPoolOptions {
	userId: number;
	drillId: string;
	wordType: WordType | WordType[];
	cefrPool: CefrLevel[];
}

/**
 * Priority-ordered vocab pool for SRS-lite drills.
 *
 * Ordering:
 *   1. Learning words with last-day ✗ (struggled recently)
 *   2. Learning words with last-day ✓
 *   3. New words (never practiced in this drill)
 *   Within each bucket: primary CEFR first, then frequency rank
 *
 * Excluded: words in vocab_mastery with next_review_at > now (Learnt, awaiting review).
 *
 * Returns vocabulary IDs in priority order. Caller decides how many to use.
 */
export const getDrillVocabPool = async (opts: DrillPoolOptions): Promise<number[]> => {
	const wordTypes = Array.isArray(opts.wordType) ? opts.wordType : [opts.wordType];
	const now = Math.floor(Date.now() / 1000);
	const primaryCefr = opts.cefrPool[0];

	// 1. All candidates ordered by CEFR + frequency
	const candidates = await db.query.vocabulary.findMany({
		where: { wordType: { in: wordTypes }, cefrLevel: { in: opts.cefrPool } },
		columns: { id: true, cefrLevel: true, frequencyRank: true },
		orderBy: (t) =>
			sql`${t.cefrLevel} asc, CASE WHEN ${t.frequencyRank} IS NULL THEN 999999 ELSE ${t.frequencyRank} END asc`,
	});
	if (candidates.length === 0) return [];
	const ids = candidates.map((c) => c.id);

	// 2. Mastery rows — find which are currently Learnt (next_review_at > now)
	const masteryRows = await db.query.vocabMastery.findMany({
		where: { userId: opts.userId, drillId: opts.drillId, vocabId: { in: ids } },
		columns: { vocabId: true, nextReviewAt: true },
	});
	const masteryMap = new Map(masteryRows.map((m) => [m.vocabId, m.nextReviewAt]));

	// 3. Latest daily result per vocab (for wrong-skew ordering)
	const dailyRows = await db.query.vocabDailyResults.findMany({
		where: { userId: opts.userId, drillId: opts.drillId, vocabId: { in: ids } },
		columns: { vocabId: true, practicedDate: true, correctFirstTry: true },
		orderBy: { practicedDate: "desc" },
	});
	const latestDay = new Map<number, { practicedDate: string; correctFirstTry: boolean }>();
	for (const row of dailyRows) {
		if (!latestDay.has(row.vocabId)) latestDay.set(row.vocabId, row);
	}

	// 4. Exclude Learnt (next_review_at in future), sort remaining by priority
	const active = candidates.filter((c) => {
		const nextReview = masteryMap.get(c.id);
		return nextReview == null || nextReview <= now;
	});

	active.sort((a, b) => {
		const aDay = latestDay.get(a.id);
		const bDay = latestDay.get(b.id);

		// Bucket 0: wrong last day  Bucket 1: correct last day  Bucket 2: never practiced
		const aBucket = !aDay ? 2 : aDay.correctFirstTry ? 1 : 0;
		const bBucket = !bDay ? 2 : bDay.correctFirstTry ? 1 : 0;
		if (aBucket !== bBucket) return aBucket - bBucket;

		// Within bucket: primary CEFR first
		const aPrimary = a.cefrLevel === primaryCefr ? 0 : 1;
		const bPrimary = b.cefrLevel === primaryCefr ? 0 : 1;
		if (aPrimary !== bPrimary) return aPrimary - bPrimary;

		// Then frequency rank
		return (a.frequencyRank ?? 999999) - (b.frequencyRank ?? 999999);
	});

	return active.map((c) => c.id);
};
