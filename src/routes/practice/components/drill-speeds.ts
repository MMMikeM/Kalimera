import type { PathStep } from "@/constants/drills";
import { typedEntries } from "@/lib/object";

export const SPEEDMAP = {
	fast: { label: "Fast · 4s", timeLimit: 4000 },
	medium: { label: "Medium · 6s", timeLimit: 6000 },
	relaxed: { label: "Relaxed · 8s", timeLimit: 8000 },
	/** For learning a set: a card waits until it's answered. Paths choose it; the picker doesn't offer it. */
	untimed: { label: "Untimed", timeLimit: null },
} as const;

export type SpeedId = keyof typeof SPEEDMAP;

export const SPEEDS = typedEntries(SPEEDMAP)
	.filter(([id]) => id !== "untimed")
	.map(([id, speed]) => ({ id, ...speed }));

// Speed tiers are calibrated for typing a single form. Multi-word phrases get a
// per-extra-word surcharge so the pressure stays on retrieval, not typing speed.
const EXTRA_WORD_FACTOR = 0.35;

export const scaleTimeLimitForPhrase = (baseMs: number, greek: string): number => {
	const words = greek.trim().split(/\s+/).length;
	return Math.round(baseMs * (1 + EXTRA_WORD_FACTOR * (words - 1)));
};

/** A gate is for learning, so it waits for the answer; every other step runs at Relaxed. */
export const stepSpeed = (step: Pick<PathStep, "gate">): SpeedId => (step.gate ? "untimed" : "relaxed");
