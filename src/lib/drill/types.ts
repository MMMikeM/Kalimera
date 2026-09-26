export type DrillBucket = "tier1" | "tier2" | "tier3" | "inProgress" | "new";

export interface DrillQuestion {
	id: string;
	prompt: string;
	correctGreek: string;
	timeLimit?: number;
	hint?: string;
	targetMs?: number;
	vocabId?: number;
	bucket?: DrillBucket;
	/** Reverse-mode answer key for select-based drills (e.g. tense of the shown form). */
	dimension?: string;
}
