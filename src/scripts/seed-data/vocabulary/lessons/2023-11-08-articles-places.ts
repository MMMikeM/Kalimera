import type { NounSeed, Phrase } from "../../../../types/seed";

export const LESSON_2023_11_08 = {
	meta: {
		date: "2023-11-08",
		topic: "Articles and places vocabulary",
		source: "Weekly lesson - ο/η/το, ένας/μία/ένα",
	},

	verbs: [],

	nouns: [
		{ lemma: "σχολείο", gender: "neuter", english: "school" },
		{ lemma: "φαρμακείο", gender: "neuter", english: "pharmacy" },
		{ lemma: "όνομα", gender: "neuter", english: "name" },
		{ lemma: "μουσείο", gender: "neuter", english: "museum" },
		{ lemma: "περίπτερο", gender: "neuter", english: "kiosk" },
		{ lemma: "νοσοκομείο", gender: "neuter", english: "hospital" },
		{ lemma: "φούρνος", gender: "masculine", english: "bakery/oven" },
		{ lemma: "μαγαζί", gender: "neuter", english: "shop/store" },
		{ lemma: "θέατρο", gender: "neuter", english: "theater" },
	] satisfies NounSeed[],

	adverbs: [
		{ lemma: "κοντά", english: "close/near" },
	],

	phrases: [] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Definite articles",
			examples: ["ο (masculine)", "η (feminine)", "το (neuter)"],
			explanation: "The - specific item",
		},
		{
			pattern: "Indefinite articles",
			examples: ["ένας (masculine)", "μία/μια (feminine)", "ένα (neuter)"],
			explanation: "A/an - non-specific item",
		},
	],
} as const;
