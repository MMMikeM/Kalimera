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
 * Buckets (high → low priority):
 *   tier1/2/3 — returned from Learnt (next_review_at expired), most fragile first
 *   inProgress — has practice history, not yet Tier 1; wrong-last-day sorted first
 *   new        — never practiced in this drill
 *
 * Excluded: words where next_review_at > now (still Learnt, awaiting review).
 *
 * Returns vocabulary IDs in priority order. Caller decides how many to use.
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
			vocabMastery: {
				where: { userId, drillId },
				columns: { nextReviewAt: true, tier: true },
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
		tier1: [], // returned from Tier 1 mastery (3-day interval) — most fragile
		tier2: [], // returned from Tier 2 mastery (6-day interval)
		tier3: [], // returned from Tier 3 mastery (9-day interval)
		inProgress: [], // has practice history, not yet Tier 1
		new: [], // never practiced in this drill
	};

	for (const c of candidates) {
		const mastery = c.vocabMastery[0];
		if (mastery?.nextReviewAt != null && mastery.nextReviewAt > now) continue; // still Learnt
		if (mastery?.nextReviewAt != null) {
			const key = `tier${Math.min(mastery.tier, 3)}` as "tier1" | "tier2" | "tier3";
			buckets[key].push(c);
		} else if (c.vocabDailyResults.length === 0) {
			buckets.new.push(c);
		} else {
			buckets.inProgress.push(c);
		}
	}

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
