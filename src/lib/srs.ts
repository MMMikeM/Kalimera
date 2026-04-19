interface SRSInput {
	quality: number; // 2 (hard/wrong), 4 (good), or 5 (easy)
	easeFactor: number; // Current ease factor (default 2.3 for new items)
	intervalDays: number; // Current interval in days
	reviewCount: number; // Number of reviews so far
}

interface SRSOutput {
	nextIntervalDays: number;
	nextEaseFactor: number;
	nextReviewAt: Date;
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
		// Failed: reset to 1 day
		newInterval = 1;
	} else if (reviewCount === 0) {
		// First successful review
		newInterval = 1;
	} else if (reviewCount === 1) {
		// Second successful review
		newInterval = 6;
	} else {
		// Subsequent reviews: interval * ease factor
		newInterval = Math.round(intervalDays * newEaseFactor);
	}

	const nextReviewAt = new Date();
	nextReviewAt.setDate(nextReviewAt.getDate() + newInterval);
	nextReviewAt.setHours(0, 0, 0, 0);

	return {
		nextIntervalDays: newInterval,
		nextEaseFactor: newEaseFactor,
		nextReviewAt,
	};
};

// Time-based quality rating from the plan:
// - <2s correct = 5 (easy, knew it immediately)
// - >=2s correct = 4 (good, had to think)
// - incorrect = 2 (hard, need more practice)
const FAST_RESPONSE_THRESHOLD_MS = 2000;

const qualityFromAttempt = (isCorrect: boolean, timeMs: number): number => {
	if (!isCorrect) {
		return 2;
	}
	return timeMs < FAST_RESPONSE_THRESHOLD_MS ? 5 : 4;
};

const getInitialSRSValues = () => ({
	easeFactor: INITIAL_EASE_FACTOR,
	intervalDays: 1,
	reviewCount: 0,
	nextReviewAt: new Date(),
});

/** Row shape needed to compute the next SRS state (no DB). */
type ExistingVocabularySkillForSRS = {
	easeFactor: number | null;
	intervalDays: number | null;
	reviewCount: number | null;
};

type VocabularySkillAfterAttempt =
	| {
			op: "update";
			set: {
				easeFactor: number;
				intervalDays: number;
				nextReviewAt: Date;
				reviewCount: number;
				lastReviewedAt: Date;
			};
	  }
	| {
			op: "insert";
			values: {
				easeFactor: number;
				intervalDays: number;
				nextReviewAt: Date;
				reviewCount: number;
				lastReviewedAt: Date;
			};
	  };

/**
 * SM-2 style next state for a vocabulary skill after one graded attempt.
 * DAL should only persist `set` / `values`; all scheduling maths stays here.
 */
export const vocabularySkillStateAfterAttempt = (
	existing: ExistingVocabularySkillForSRS | null | undefined,
	isCorrect: boolean,
	timeTakenMs: number,
	now: Date = new Date(),
): VocabularySkillAfterAttempt => {
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
