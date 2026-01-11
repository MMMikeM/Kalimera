import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_04_29 = {
	meta: {
		date: "2024-04-29",
		topic: "Frequency adverbs and daily routines",
		source: "Weekly lesson - complete frequency adverb list",
	},

	verbs: [
		{ lemma: "μπορώ", english: "I can", conjugationFamily: "-άω/-ώ" },
		{ lemma: "οδηγώ", english: "I drive", conjugationFamily: "-άω/-ώ" },
		{ lemma: "τηλεφωνώ", english: "I phone/call", conjugationFamily: "-άω/-ώ" },
		{
			lemma: "λυπάμαι",
			english: "I feel sorry/am sad",
			conjugationFamily: "-άμαι",
		},
		{ lemma: "ξυπνάω", english: "I wake up", conjugationFamily: "-άω/-ώ" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "πράγμα", gender: "neuter", english: "thing" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "ζωηρός", english: "lively/full of life" },
		{ lemma: "άτακτος", english: "naughty" },
		{ lemma: "μικρός", english: "small/young" },
		{ lemma: "μεγάλος", english: "big/old" },
	] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "σχεδόν ποτέ", english: "almost never" },
		{ lemma: "καμιά φορά", english: "sometimes" },
		{ lemma: "κάπου κάπου", english: "from time to time" },
		{ lemma: "πότε πότε", english: "every now and then" },
		{ lemma: "σχεδόν πάντα", english: "almost always" },
		{ lemma: "πάρα πολύ", english: "very much" },
		{ lemma: "επίσης", english: "also" },
		{ lemma: "κάτι", english: "something" },
	] satisfies AdverbSeed[],

	phrases: [
		{
			text: "ποτέ δεν πίνω καφέ",
			english: "I never drink coffee",
			metadata: { grammar: "ποτέ δεν + verb" },
		},
		{
			text: "πότε πότε φεύγω από το σπίτι",
			english: "every now and then I leave the house",
			metadata: {},
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Frequency adverb scale",
			examples: [
				"ποτέ → σχεδόν ποτέ → σπάνια → καμιά φορά",
				"συχνά → πολλές φορές → συνήθως → σχεδόν πάντα → πάντα",
			],
			explanation: "From never to always",
		},
		{
			pattern: "ξυπνάω conjugation (-άω)",
			examples: ["ξυπνάω, ξυπνάς, ξυπνάει", "ξυπνάμε, ξυπνάτε, ξυπνάνε"],
			explanation: "Regular -άω/-ώ family",
		},
	],
} as const;
