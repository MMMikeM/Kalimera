import type {
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_04_22 = {
	meta: {
		date: "2024-04-22",
		topic: "Question words and comparisons",
		source: "Weekly lesson - interrogatives, πιο comparatives",
	},

	verbs: [
		{ lemma: "ζηλεύω", english: "I am jealous", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "φως", gender: "neuter", english: "light" },
		{ lemma: "χιόνι", gender: "neuter", english: "snow" },
	] satisfies NounSeed[],

	adverbs: [
		{ lemma: "πριν", english: "before" },
		{ lemma: "τώρα", english: "now" },
	] satisfies AdverbSeed[],

	phrases: [
		// Time expressions
		{
			text: "την προηγούμενη εβδομάδα",
			english: "the previous week",
			metadata: { grammar: "accusative time" },
		},
		{
			text: "πριν από μια εβδομάδα",
			english: "a week ago",
			metadata: { pattern: "πριν από + accusative" },
		},
		// Question words
		{ text: "τι;", english: "what?", metadata: { type: "interrogative" } },
		{ text: "γιατί;", english: "why?", metadata: { type: "interrogative" } },
		{ text: "πού;", english: "where?", metadata: { type: "interrogative" } },
		{ text: "πώς;", english: "how?", metadata: { type: "interrogative" } },
		{
			text: "πόσο;",
			english: "how much?",
			metadata: { type: "interrogative" },
		},
		{ text: "ποιος;", english: "who?", metadata: { type: "interrogative" } },
		{ text: "πότε;", english: "when?", metadata: { type: "interrogative" } },
		// Common questions
		{ text: "τι ώρα είναι;", english: "what time is it?", metadata: {} },
		{
			text: "γιατί το λες αυτό;",
			english: "why do you say that?",
			metadata: {},
		},
		{
			text: "πώς σε λένε;",
			english: "what's your name?",
			metadata: { literal: "how do they call you" },
		},
		{ text: "πόσο κάνει;", english: "how much does it cost?", metadata: {} },
		{
			text: "πόσο χρονών είσαι;",
			english: "how old are you?",
			metadata: { literal: "how many years are you" },
		},
		// Comparison
		{
			text: "πιο μεγάλος",
			english: "bigger/older",
			metadata: { grammar: "πιο + adjective" },
		},
		{
			text: "πιο μικρός",
			english: "smaller/younger",
			metadata: { grammar: "πιο + adjective" },
		},
		// Other
		{
			text: "χιονίζει",
			english: "it snows",
			metadata: { grammar: "impersonal verb" },
		},
		{
			text: "είπε",
			english: "he/she said",
			metadata: { grammar: "past tense of λέω" },
		},
		{
			text: "λέει",
			english: "he/she says",
			metadata: { grammar: "present of λέω" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Comparatives with πιο",
			examples: ["πιο μεγάλος", "πιο όμορφος", "πιο ψηλός"],
			explanation: "πιο + adjective = more + adjective",
		},
	],
} as const;
