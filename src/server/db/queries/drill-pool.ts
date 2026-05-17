import { sql } from "drizzle-orm";

import type { DrillBucket } from "@/lib/drill/types";
import { shuffle } from "@/lib/shuffle";
import { nowInstant, toEpochSeconds } from "@/lib/time";

import type { CefrLevel, WordType } from "../enums";
import { db } from "../index";

interface DrillPoolOptions {
	userId: number;
	drillId: string;
	wordTypes: WordType[];
	cefrPool: CefrLevel[];
	limit: number;
}

export type DrillPool = Record<DrillBucket, number[]>;

/**
 * Priority-ordered vocab pool for SRS-lite drills.
 *
 * Buckets (high → low priority) — keyed on lexical SM-2 state (vocab_reviews):
 *   tier1  — SM-2 due, short interval (≤3 days)  → most fragile, just past due
 *   tier2  — SM-2 due, medium interval (≤7 days)
 *   tier3  — SM-2 due, long interval (>7 days)    → well-known, needs refresh
 *   inProgress — has vocab_reviews row but not yet due (actively learning)
 *   new        — never encountered in any drill
 *
 * Excluded: words where nextReviewAt > now AND intervalDays > 1 (still fresh).
 * inProgress words fill the deck as lower-priority material.
 */
export const getDrillVocabPool = async ({
	cefrPool,
	drillId,
	userId,
	wordTypes,
	limit,
}: DrillPoolOptions): Promise<DrillPool> => {
	const now = toEpochSeconds(nowInstant());
	const primaryCefr = cefrPool[0];

	const candidates = await db.query.vocabulary.findMany({
		where: { wordType: { in: wordTypes }, cefrLevel: { in: cefrPool } },
		columns: { id: true, cefrLevel: true, frequencyRank: true },
		with: {
			vocabReviews: {
				where: { userId },
				columns: { nextReviewAt: true, intervalDays: true, lastReviewedAt: true },
			},
			vocabDailyResults: {
				where: { userId, drillId },
				columns: { practicedDate: true, correctFirstTry: true },
				orderBy: { practicedDate: "desc" },
			},
		},
		orderBy: (t) =>
			sql`${t.cefrLevel} asc, CASE WHEN ${t.frequencyRank} IS NULL THEN 999999 ELSE ${t.frequencyRank} END asc`,
	});
	if (candidates.length === 0) throw new Error("No possible questions found");

	type Candidate = (typeof candidates)[number];
	const buckets: Record<DrillBucket, Candidate[]> = {
		tier1: [],
		tier2: [],
		tier3: [],
		inProgress: [],
		new: [],
	};

	const matchBucket = (review?: {
		nextReviewAt: number | null;
		intervalDays: number | null;
	}): DrillBucket => {
		if (!review) return "new";
		const { intervalDays, nextReviewAt } = review;
		if (!nextReviewAt || nextReviewAt <= now || !intervalDays) return "inProgress";
		if (intervalDays <= 3) return "tier1";
		if (intervalDays <= 7) return "tier2";
		return "tier3";
	};

	candidates.forEach((c) => buckets[matchBucket(c.vocabReviews[0])].push(c));

	const sortByLastWrongThenCefrThenFrequency = (a: Candidate, b: Candidate) => {
		const aWrong = a.vocabDailyResults[0]?.correctFirstTry === false ? 0 : 1;
		const bWrong = b.vocabDailyResults[0]?.correctFirstTry === false ? 0 : 1;
		if (aWrong !== bWrong) return aWrong - bWrong;
		const aPrimary = a.cefrLevel === primaryCefr ? 0 : 1;
		const bPrimary = b.cefrLevel === primaryCefr ? 0 : 1;
		if (aPrimary !== bPrimary) return aPrimary - bPrimary;
		return (a.frequencyRank ?? 999999) - (b.frequencyRank ?? 999999);
	};

	const processBucket = (bucket: Candidate[]) =>
		shuffle(bucket)
			.toSorted(sortByLastWrongThenCefrThenFrequency)
			.slice(0, limit)
			.map((c) => c.id);

	return {
		tier1: processBucket(buckets.tier1),
		tier2: processBucket(buckets.tier2),
		tier3: processBucket(buckets.tier3),
		inProgress: processBucket(buckets.inProgress),
		new: processBucket(buckets.new),
	};
};
