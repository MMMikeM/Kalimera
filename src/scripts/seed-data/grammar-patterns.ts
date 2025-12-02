// Grammar patterns for teaching case usage in context
// These are full phrases showing how cases work in daily Greek

import type { Case } from "../../lib/greek-grammar";

export interface GrammarPattern {
	greek: string;
	english: string;
	explanation: string;
	whyThisCase: string;
}

// Organized by grammatical case, then by usage context
export const CASE_PATTERNS: Record<Case, Record<string, GrammarPattern[]>> = {
	accusative: {
		directObjects: [
			{
				greek: "τον καφέ",
				english: "the coffee (object)",
				explanation: "Ordering, buying",
				whyThisCase: "direct object → accusative",
			},
			{
				greek: "το τσάι",
				english: "the tea",
				explanation: "Common drink",
				whyThisCase: "neuter = same form",
			},
			{
				greek: "το ψωμί",
				english: "the bread",
				explanation: "Basic food",
				whyThisCase: "direct object → accusative",
			},
			{
				greek: "το νερό",
				english: "the water",
				explanation: "Essential daily",
				whyThisCase: "direct object → accusative",
			},
			{
				greek: "τη μπίρα",
				english: "the beer",
				explanation: "Common drink",
				whyThisCase: "direct object → accusative (no ν before μ)",
			},
		],
		direction: [
			{
				greek: "πηγαίνω στο σπίτι",
				english: "I go to the house",
				explanation: "direction/location with στο",
				whyThisCase: "σε + το = στο (direction)",
			},
			{
				greek: "στη δουλειά",
				english: "to/at work",
				explanation: "common destination",
				whyThisCase: "σε + τη = στη (location)",
			},
			{
				greek: "στο σχολείο",
				english: "to/at school",
				explanation: "education context",
				whyThisCase: "σε + το = στο (neuter)",
			},
			{
				greek: "στον κήπο",
				english: "in the garden",
				explanation: "home location",
				whyThisCase: "σε + τον = στον (masculine)",
			},
			{
				greek: "στη θάλασσα",
				english: "to/at the sea",
				explanation: "vacation/leisure",
				whyThisCase: "σε + τη = στη (no ν before θ)",
			},
		],
		timeExpressions: [
			{
				greek: "το πρωί",
				english: "in the morning",
				explanation: "Parts of the day",
				whyThisCase: "time expressions use accusative",
			},
			{
				greek: "τη νύχτα",
				english: "at night",
				explanation: "Night time",
				whyThisCase: "time period → accusative",
			},
			{
				greek: "το βράδυ",
				english: "in the evening",
				explanation: "Evening time",
				whyThisCase: "time expressions → accusative",
			},
			{
				greek: "τη Δευτέρα",
				english: "on Monday",
				explanation: "Days of the week",
				whyThisCase: "specific day → accusative",
			},
			{
				greek: "το καλοκαίρι",
				english: "in summer",
				explanation: "Seasons",
				whyThisCase: "season/time → accusative",
			},
		],
	},
	genitive: {
		possession: [
			{
				greek: "η μητέρα της Μαρίας",
				english: "Maria's mother",
				explanation: "family relationships",
				whyThisCase: "possession → genitive",
			},
			{
				greek: "ο αδελφός της Μαρίας",
				english: "Maria's brother",
				explanation: "family relationships - daily use",
				whyThisCase: "belonging to Maria → genitive",
			},
			{
				greek: "το σπίτι του πατέρα",
				english: "father's house",
				explanation: "family possession - very common",
				whyThisCase: "whose house? → genitive",
			},
			{
				greek: "η δουλειά του φίλου μου",
				english: "my friend's job",
				explanation: "social relationships",
				whyThisCase: "friend's something → genitive",
			},
			{
				greek: "το κλειδί της πόρτας",
				english: "the door key",
				explanation: "everyday objects",
				whyThisCase: "key of what? → genitive",
			},
		],
	},
	nominative: {},
	vocative: {},
};

// Flattened view for seeding by tag (maintains backward compatibility)
export const DAILY_PATTERNS = {
	coffee: CASE_PATTERNS.accusative.directObjects,
	house: CASE_PATTERNS.accusative.direction,
	time: CASE_PATTERNS.accusative.timeExpressions,
	family: CASE_PATTERNS.genitive.possession,
} as const;
