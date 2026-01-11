export interface SRSInput {
	quality: number; // 2 (hard/wrong), 4 (good), or 5 (easy)
	easeFactor: number; // Current ease factor (default 2.3 for new items)
	intervalDays: number; // Current interval in days
	reviewCount: number; // Number of reviews so far
}

export interface SRSOutput {
	nextIntervalDays: number;
	nextEaseFactor: number;
	nextReviewAt: Date;
}

const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.3;

export const calculateSRS = (input: SRSInput): SRSOutput => {
	const { quality, easeFactor, intervalDays, reviewCount } = input;

	// SM-2 ease factor adjustment: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
	let newEaseFactor =
		easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
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

export const qualityFromAttempt = (
	isCorrect: boolean,
	timeMs: number,
): number => {
	if (!isCorrect) {
		return 2;
	}
	return timeMs < FAST_RESPONSE_THRESHOLD_MS ? 5 : 4;
};

export const getInitialSRSValues = () => ({
	easeFactor: INITIAL_EASE_FACTOR,
	intervalDays: 1,
	reviewCount: 0,
	nextReviewAt: new Date(),
});
