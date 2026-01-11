import type { AdverbSeed, NounSeed, Phrase } from "../../../../types/seed";

export const LESSON_2024_06_10 = {
	meta: {
		date: "2024-06-10",
		topic: "Quantity words and pronouns",
		source: "Weekly lesson - πολύ/πολλοί distinction",
	},

	verbs: [],

	nouns: [
		{ lemma: "αφτί", gender: "neuter", english: "ear" },
	] satisfies NounSeed[],

	adverbs: [{ lemma: "πολύ", english: "very/a lot" }] satisfies AdverbSeed[],

	phrases: [
		{
			text: "πολλοί",
			english: "many (masculine plural)",
			metadata: { note: "adjective, changes for gender" },
		},
		{
			text: "πολλές",
			english: "many (feminine plural)",
			metadata: { grammar: "feminine form" },
		},
		{
			text: "πολλά",
			english: "many (neuter plural)",
			metadata: { grammar: "neuter form" },
		},
		// Pronouns
		{
			text: "αυτή",
			english: "she/this (feminine)",
			metadata: { grammar: "demonstrative/personal pronoun" },
		},
		{
			text: "αυτοί",
			english: "they/these (masculine)",
			metadata: { grammar: "demonstrative/personal pronoun" },
		},
		// Useful phrase
		{
			text: "τι σημαίνει;",
			english: "what does it mean?",
			metadata: { usage: "very useful for learners!" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "πολύ vs πολλοί",
			examples: [
				"πολύ καλός (very good) - adverb",
				"πολλοί άνθρωποι (many people) - adjective",
			],
			explanation: "πολύ modifies adjectives/verbs, πολλοί/ές/ά modifies nouns",
		},
		{
			pattern: "Similar sounds, different meanings",
			examples: ["πολύ (a lot)", "πολλοί (many)", "πόλη (city)"],
			explanation: "Watch the accent and doubled λ",
		},
	],
} as const;
