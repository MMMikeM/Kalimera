import type { NounSeed, Phrase, VerbSeed } from "../../../../types/seed";

export const LESSON_2024_05_06 = {
	meta: {
		date: "2024-05-06",
		topic: "Daily activities and hobbies",
		source: "Weekly lesson - ακούω conjugation, activity verbs",
	},

	verbs: [
		{ lemma: "ακούω", english: "I listen/hear", conjugationFamily: "-ω" },
		{ lemma: "διαβάζω", english: "I read", conjugationFamily: "-ω" },
		{ lemma: "παίζω", english: "I play", conjugationFamily: "-ω" },
		{ lemma: "χορεύω", english: "I dance", conjugationFamily: "-ω" },
		{ lemma: "μαγειρεύω", english: "I cook", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "τραγούδι", gender: "neuter", english: "song" },
		{ lemma: "μεσημεριανό", gender: "neuter", english: "lunch" },
		{ lemma: "μουσική", gender: "feminine", english: "music" },
		{ lemma: "εφημερίδα", gender: "feminine", english: "newspaper" },
		{ lemma: "τηλεόραση", gender: "feminine", english: "television" },
		{ lemma: "σινεμά", gender: "neuter", english: "cinema" },
		{ lemma: "σπορ", gender: "neuter", english: "sport" },
	] satisfies NounSeed[],

	adverbs: [],

	phrases: [
		{ text: "τρώω μεσημεριανό", english: "I eat lunch", metadata: {} },
		{ text: "ακούω μουσική", english: "I listen to music", metadata: {} },
		{ text: "πίνω καφέ", english: "I drink coffee", metadata: {} },
		{ text: "διαβάζω εφημερίδα", english: "I read the newspaper", metadata: {} },
		{ text: "βλέπω τηλεόραση", english: "I watch TV", metadata: {} },
		{ text: "πάω σινεμά", english: "I go to the cinema", metadata: { note: "no article needed" } },
		{ text: "κάνω σπορ", english: "I do sport", metadata: {} },
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "ακούω conjugation",
			examples: ["ακούω, ακούς, ακούει", "ακούμε, ακούτε, ακούν"],
			explanation: "Regular -ω verb",
		},
	],
} as const;
