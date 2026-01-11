import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_06_17 = {
	meta: {
		date: "2024-06-17",
		topic: "Giving, kissing, frequency adverbs",
		source: "Weekly lesson - δίνω construction, -άω verbs",
	},

	verbs: [
		{ lemma: "δίνω", english: "I give", conjugationFamily: "-ω" },
		{ lemma: "φιλάω", english: "I kiss", conjugationFamily: "-άω/-ώ" },
		{ lemma: "γελάω", english: "I laugh", conjugationFamily: "-άω/-ώ" },
		{ lemma: "φωνάζω", english: "I yell/shout", conjugationFamily: "-ω" },
		{ lemma: "αργώ", english: "I am late", conjugationFamily: "-άω/-ώ" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "φιλί", gender: "neuter", english: "kiss" },
		{ lemma: "γιορτή", gender: "feminine", english: "holiday/celebration" },
		{ lemma: "νούμερο", gender: "neuter", english: "number" },
	] satisfies NounSeed[],

	adjectives: [{ lemma: "πρώτος", english: "first" }] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "χτες", english: "yesterday" },
		{ lemma: "ίσως", english: "maybe/perhaps" },
		{ lemma: "πάντα", english: "always" },
		{ lemma: "συνήθως", english: "usually" },
	] satisfies AdverbSeed[],

	phrases: [
		// Giving construction
		{
			text: "δίνω ένα φιλί",
			english: "I give a kiss",
			metadata: { pattern: "δίνω + object" },
		},
		{
			text: "δώσε μου",
			english: "give me",
			metadata: { grammar: "imperative + weak pronoun" },
		},
		{
			text: "δεν σου δίνω",
			english: "I don't give you",
			metadata: { pattern: "δεν + pronoun + verb" },
		},
		// Yelling
		{
			text: "μην φωνάζεις!",
			english: "don't yell!",
			metadata: { grammar: "μην + present for negative commands" },
		},
		{
			text: "γιατί φωνάζεις;",
			english: "why are you yelling?",
			metadata: { usage: "common question" },
		},
		// Time/frequency
		{
			text: "πώς περνάς τη μέρα σου;",
			english: "how do you spend your day?",
			metadata: { note: "περνάω = pass/spend time" },
		},
		{
			text: "τα πάντα",
			english: "everything",
			metadata: { note: "neuter plural of πάς" },
		},
		{
			text: "και τα δύο",
			english: "both of them",
			metadata: { grammar: "neuter plural" },
		},
		{
			text: "το νούμερο ένα",
			english: "number one!",
			metadata: { usage: "exclamation of being the best" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "φιλάω conjugation (-άω)",
			examples: ["φιλάω, φιλάς, φιλάει", "φιλάμε, φιλάτε, φιλάνε"],
			explanation: "Regular -άω/-ώ family verb",
		},
		{
			pattern: "δίνω + σε construction",
			examples: ["δίνω σε εμένα", "δίνω στη Μαρία", "δώσ' μου"],
			explanation: "Give TO someone - σε contracts with article or pronoun",
		},
	],
} as const;
