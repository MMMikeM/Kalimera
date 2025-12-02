import type { NounSeed, Phrase, VerbSeed } from "../../../../types/seed";

export const LESSON_2024_08_12 = {
	meta: {
		date: "2024-08-12",
		topic: "Forgetting, slang, vegetables",
		source: "Weekly lesson",
	},

	verbs: [
		{ lemma: "ξεχνάω", english: "I forget", conjugationFamily: "-άω/-ώ" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "λαχανικά", gender: "neuter", english: "vegetables" },
	] satisfies NounSeed[],

	adverbs: [],

	phrases: [
		{
			text: "ξέχασα",
			english: "I forgot!",
			metadata: { grammar: "past tense of ξεχνάω", usage: "very common" },
		},
		{
			text: "είσαι ψώνιο",
			english: "you're a weirdo/crazy (neuter)",
			metadata: { register: "slang/playful", usage: "teasing" },
		},
		{
			text: "είσαι ψωνάρα",
			english: "you're a total weirdo/crazy",
			metadata: { register: "slang/playful", note: "augmentative form" },
		},
	] satisfies Phrase[],

	grammarNotes: [],
} as const;
