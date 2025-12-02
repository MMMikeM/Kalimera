import type { AdverbSeed, Phrase } from "../../../../types/seed";

export const LESSON_2023_12_09 = {
	meta: {
		date: "2023-12-09",
		topic: "Past tense introduction, biography questions",
		source: "Weekly lesson - γεννήθηκα, σπούδασα",
	},

	verbs: [],
	nouns: [],

	adverbs: [
		{ lemma: "σήμερα", english: "today" },
		{ lemma: "εχθές", english: "yesterday" },
	] satisfies AdverbSeed[],

	phrases: [
		// Past tense questions
		{ text: "πού γεννήθηκες;", english: "where were you born?", metadata: { grammar: "past passive" } },
		{ text: "γεννήθηκα στο...", english: "I was born in...", metadata: { grammar: "past passive" } },
		{ text: "τι σπούδασες;", english: "what did you study?", metadata: { grammar: "past tense" } },
		{ text: "σπούδασα...", english: "I studied...", metadata: { grammar: "past tense" } },
		// Likes with να
		{ text: "τι σου αρέσει να κάνεις;", english: "what do you like to do?", metadata: { pattern: "αρέσει να + verb" } },
		{ text: "μου αρέσει να τρώω", english: "I like to eat", metadata: { pattern: "αρέσει να + verb" } },
		{ text: "μου αρέσει να μαγειρεύω", english: "I like to cook", metadata: {} },
		// By myself
		{ text: "μόνος μου", english: "by myself (male)", metadata: { grammar: "reflexive" } },
		{ text: "μόνη μου", english: "by myself (female)", metadata: { grammar: "reflexive" } },
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Past passive for birth",
			examples: ["γεννήθηκα", "γεννήθηκες", "γεννήθηκε"],
			explanation: "γεννιέμαι (I am born) → γεννήθηκα (I was born)",
		},
	],
} as const;
