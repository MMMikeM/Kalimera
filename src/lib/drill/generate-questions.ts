import type { DrillBucket } from "@/lib/drill/types";

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

type QuestionCategory = "pronouns" | "articles" | "verbs" | "nouns";

export const CATEGORY_CONFIG: Record<QuestionCategory, { label: string; description: string }> = {
	pronouns: {
		label: "Pronouns",
		description: "Object and possessive pronouns",
	},
	articles: { label: "Articles", description: "Definite articles with nouns" },
	verbs: { label: "Verbs", description: "Common verb conjugations" },
	nouns: {
		label: "Nouns",
		description: "Noun declensions (accusative/genitive)",
	},
};
