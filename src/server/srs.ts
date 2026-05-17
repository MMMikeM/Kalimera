import { Temporal } from "@js-temporal/polyfill";

import { nowInstant, toInstant, today } from "@/lib/time";

interface SRSInput {
	quality: number; // 2 (hard/wrong), 4 (good), or 5 (easy)
	easeFactor: number;
	intervalDays: number;
	reviewCount: number;
}

interface SRSOutput {
	nextIntervalDays: number;
	nextEaseFactor: number;
	nextReviewAt: Temporal.Instant;
}

const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.3;

const calculateSRS = (input: SRSInput): SRSOutput => {
	const { quality, easeFactor, intervalDays, reviewCount } = input;

	// SM-2 ease factor adjustment: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
	let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
	newEaseFactor = Math.max(MIN_EASE_FACTOR, newEaseFactor);

	let newInterval: number;

	if (quality < 3) {
		newInterval = 1;
	} else if (reviewCount === 0) {
		newInterval = 1;
	} else if (reviewCount === 1) {
		newInterval = 6;
	} else {
		newInterval = Math.round(intervalDays * newEaseFactor);
	}

	return {
		nextIntervalDays: newInterval,
		nextEaseFactor: newEaseFactor,
		nextReviewAt: toInstant(today().add({ days: newInterval })),
	};
};

// - <2s correct = 5 (easy)
// - >=2s correct = 4 (good)
// - incorrect = 2 (hard)
const FAST_RESPONSE_THRESHOLD_MS = 2000;

const qualityFromAttempt = (isCorrect: boolean, timeMs: number): number => {
	if (!isCorrect) return 2;
	return timeMs < FAST_RESPONSE_THRESHOLD_MS ? 5 : 4;
};

const getInitialSRSValues = () => ({
	easeFactor: INITIAL_EASE_FACTOR,
	intervalDays: 1,
	reviewCount: 0,
	nextReviewAt: toInstant(today()),
});

type ExistingReviewForSRS = {
	easeFactor: number | null;
	intervalDays: number | null;
	reviewCount: number | null;
};

type ReviewStateAfterAttempt =
	| {
			op: "update";
			set: {
				easeFactor: number;
				intervalDays: number;
				nextReviewAt: Temporal.Instant;
				reviewCount: number;
				lastReviewedAt: Temporal.Instant;
			};
	  }
	| {
			op: "insert";
			values: {
				easeFactor: number;
				intervalDays: number;
				nextReviewAt: Temporal.Instant;
				reviewCount: number;
				lastReviewedAt: Temporal.Instant;
			};
	  };

/**
 * SM-2 next state for a vocabulary review row after one graded attempt.
 * DAL should only persist `set` / `values`; all scheduling maths stays here.
 */
export const reviewStateAfterAttempt = (
	existing: ExistingReviewForSRS | null | undefined,
	isCorrect: boolean,
	timeTakenMs: number,
	now: Temporal.Instant = nowInstant(),
): ReviewStateAfterAttempt => {
	const quality = qualityFromAttempt(isCorrect, timeTakenMs);

	if (existing) {
		const srsResult = calculateSRS({
			quality,
			easeFactor: existing.easeFactor ?? INITIAL_EASE_FACTOR,
			intervalDays: existing.intervalDays ?? 1,
			reviewCount: existing.reviewCount ?? 0,
		});

		return {
			op: "update",
			set: {
				easeFactor: srsResult.nextEaseFactor,
				intervalDays: srsResult.nextIntervalDays,
				nextReviewAt: srsResult.nextReviewAt,
				reviewCount: (existing.reviewCount ?? 0) + 1,
				lastReviewedAt: now,
			},
		};
	}

	const initial = getInitialSRSValues();
	const srsResult = calculateSRS({
		quality,
		easeFactor: initial.easeFactor,
		intervalDays: initial.intervalDays,
		reviewCount: initial.reviewCount,
	});

	return {
		op: "insert",
		values: {
			easeFactor: srsResult.nextEaseFactor,
			intervalDays: srsResult.nextIntervalDays,
			nextReviewAt: srsResult.nextReviewAt,
			reviewCount: 1,
			lastReviewedAt: now,
		},
	};
};
