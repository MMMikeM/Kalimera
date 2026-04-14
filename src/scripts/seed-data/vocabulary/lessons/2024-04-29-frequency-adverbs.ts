import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_04_29 = createLesson({
	meta: {
		date: "2024-04-29",
		topic: "Frequency adverbs and daily routines",
		source: "Weekly lesson - complete frequency adverb list",
	},

	verbs: [
		{ lemma: "μπορώ", english: "I can", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "οδηγώ", english: "I drive", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "τηλεφωνώ", english: "I phone/call", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{
			lemma: "λυπάμαι",
			english: "I feel sorry/am sad",
			conjugationFamily: "-άμαι",
			cefrLevel: "A2",
		},
		{ lemma: "ξυπνάω", english: "I wake up", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
	],

	nouns: [{ lemma: "πράγμα", gender: "neuter", english: "thing" }],

	adjectives: [
		{ lemma: "ζωηρός", english: "lively/full of life", cefrLevel: "B1" },
		{ lemma: "άτακτος", english: "naughty", cefrLevel: "A2" },
		{ lemma: "μικρός", english: "small/young", cefrLevel: "A1" },
		{ lemma: "μεγάλος", english: "big/old", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "σχεδόν ποτέ", english: "almost never", cefrLevel: "A2" },
		{ lemma: "καμιά φορά", english: "sometimes", cefrLevel: "A2" },
		{ lemma: "κάπου κάπου", english: "from time to time", cefrLevel: "B1" },
		{ lemma: "πότε πότε", english: "occasionally", cefrLevel: "B1" },
		{ lemma: "σχεδόν πάντα", english: "almost always", cefrLevel: "A2" },
		{ lemma: "πάρα πολύ", english: "very much", cefrLevel: "A2" },
		{ lemma: "επίσης", english: "also", cefrLevel: "A1" },
		{ lemma: "κάτι", english: "something", cefrLevel: "A1" },
	],

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
	],

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
});
