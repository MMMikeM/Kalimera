import type { AdverbSeed, Phrase } from "../../../../types/seed";

export const LESSON_2024_08_05 = {
	meta: {
		date: "2024-08-05",
		topic: "Together, all, no one",
		source: "Weekly lesson",
	},

	verbs: [],
	nouns: [],

	adverbs: [{ lemma: "μαζί", english: "together" }] satisfies AdverbSeed[],

	phrases: [
		{
			text: "όλοι",
			english: "all/everyone",
			metadata: { grammar: "masculine plural" },
		},
		{
			text: "όλοι μαζί",
			english: "all together",
			metadata: { usage: "very common expression" },
		},
		{
			text: "κανένας",
			english: "no one (masculine)",
			metadata: { grammar: "also κανείς", note: "negative pronoun" },
		},
		{
			text: "καμία",
			english: "no one (feminine)",
			metadata: { grammar: "feminine form" },
		},
		{
			text: "κανένα",
			english: "none (neuter)",
			metadata: { grammar: "neuter form" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "κανένας/καμία/κανένα",
			examples: ["κανένας δεν ξέρει", "καμία δεν ήρθε"],
			explanation: "Negative pronoun - changes for gender like adjectives",
		},
	],
} as const;
