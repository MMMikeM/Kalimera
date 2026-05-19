import { sql } from "drizzle-orm";

import type { DrillBucket } from "@/lib/drill/types";
import { shuffle } from "@/lib/shuffle";
import { formatISO, nowIso, today } from "@/lib/time";

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

/** Length-normalised ms/char + offset. Comparable across short (πάω) and long (Καταλαβαίνουν) words. */
const slowness = (ms: number, answer: string) => 1 + ms / Math.max(answer.length, 3);

const median = (nums: number[]): number => {
	if (nums.length === 0) return 0;
	const sorted = [...nums].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!;
};

/**
 * Priority-ordered vocab pool for SRS drills with two-layer separation:
 *
 *   drillProgress  (user, vocab, drillId) — schema mastery: "can I produce this in THIS drill?"
 *   vocabProgress  (user, vocab)          — lexical mastery: "do I know this word?"
 *
 * Buckets (high → low priority):
 *   tier1      — mastery due, wrong last day           → actively failing, surface first
 *   tier2      — mastery due, drillProgress tier ≤ 1   → recent schema learning
 *   tier3      — mastery due, drillProgress tier ≥ 2   → established, scheduled refresh
 *   inProgress — no mastery for this drill, lexically known → bootstrap cross-drill transfer
 *   new        — no mastery, no lexical history        → truly new
 *
 * Excluded: drillProgress exists AND nextReviewAt > now.
 * tier2/tier3 sorted slowest-per-char first within bucket (automatisation signal).
 */
export const getDrillVocabPool = async ({
	cefrPool,
	drillId,
	userId,
	wordTypes,
	limit,
}: DrillPoolOptions): Promise<DrillPool> => {
	const now = nowIso();
	const todayStr = formatISO(today());
	const primaryCefr = cefrPool[0];

	const candidates = await db.query.vocabulary.findMany({
		where: { wordType: { in: wordTypes }, cefrLevel: { in: cefrPool } },
		columns: { id: true, cefrLevel: true, frequencyRank: true },
		with: {
			drillProgress: {
				where: { userId, drillId },
				columns: { nextReviewAt: true, tier: true },
			},
			vocabProgress: {
				where: { userId },
				columns: { vocabId: true },
			},
			drillDailyResults: {
				where: { userId, drillId },
				columns: { practicedDate: true, correctFirstTry: true },
				orderBy: { practicedDate: "desc" },
			},
			practiceAttempts: {
				where: { userId, drillId },
				columns: { timeTaken: true, correctAnswer: true, isCorrect: true, attemptedAt: true },
				orderBy: { attemptedAt: "desc" },
				limit: 30,
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

	const matchBucket = (c: Candidate): DrillBucket | null => {
		const wasCorrectToday = c.practiceAttempts.some(
			(a) => a.attemptedAt?.startsWith(todayStr) && a.isCorrect,
		);
		if (wasCorrectToday) return null;

		const mastery = c.drillProgress[0];
		if (mastery) {
			const isDue = !mastery.nextReviewAt || mastery.nextReviewAt <= now;
			if (!isDue) return null; // schema mastered for this drill, not due — exclude
			const wasWrongLastDay = c.drillDailyResults[0]?.correctFirstTry === false;
			if (wasWrongLastDay) return "tier1";
			return (mastery.tier ?? 0) <= 1 ? "tier2" : "tier3";
		}
		return c.vocabProgress.length > 0 ? "inProgress" : "new";
	};

	for (const c of candidates) {
		const bucket = matchBucket(c);
		if (bucket) buckets[bucket].push(c);
	}

	const medianSlowness = (c: Candidate): number =>
		median(
			c.practiceAttempts
				.filter((a) => !a.attemptedAt?.startsWith(todayStr))
				.slice(0, 5)
				.map((a) => slowness(a.timeTaken ?? 0, a.correctAnswer)),
		);

	// tier2/tier3: slowest-per-char first (surface automation gaps), then CEFR, then frequency
	const sortSlow = (a: Candidate, b: Candidate) => {
		const diff = medianSlowness(b) - medianSlowness(a);
		if (diff !== 0) return diff;
		const aPrimary = a.cefrLevel === primaryCefr ? 0 : 1;
		const bPrimary = b.cefrLevel === primaryCefr ? 0 : 1;
		if (aPrimary !== bPrimary) return aPrimary - bPrimary;
		return (a.frequencyRank ?? 999999) - (b.frequencyRank ?? 999999);
	};

	// inProgress/new/tier1: no per-drill RT signal yet — CEFR + frequency only
	const sortCefrFreq = (a: Candidate, b: Candidate) => {
		const aPrimary = a.cefrLevel === primaryCefr ? 0 : 1;
		const bPrimary = b.cefrLevel === primaryCefr ? 0 : 1;
		if (aPrimary !== bPrimary) return aPrimary - bPrimary;
		return (a.frequencyRank ?? 999999) - (b.frequencyRank ?? 999999);
	};

	const processBucket = (bucket: Candidate[], sortFn: typeof sortCefrFreq) =>
		shuffle(bucket)
			.toSorted(sortFn)
			.slice(0, limit)
			.map((c) => c.id);

	console.log(buckets);

	const filledBuckets = {
		tier1: processBucket(buckets.tier1, sortCefrFreq),
		tier2: processBucket(buckets.tier2, sortSlow),
		tier3: processBucket(buckets.tier3, sortSlow),
		inProgress: processBucket(buckets.inProgress, sortCefrFreq),
		new: processBucket(buckets.new, sortCefrFreq),
	};

	console.log(filledBuckets);

	return filledBuckets;
};
