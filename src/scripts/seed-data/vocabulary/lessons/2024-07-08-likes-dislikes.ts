import type { AdjectiveSeed, AdverbSeed, NounSeed, Phrase, VerbSeed } from "../../../../types/seed";

export const LESSON_2024_07_08 = {
	meta: {
		date: "2024-07-08",
		topic: "Likes/dislikes, possessive pronouns, when clauses",
		source: "Weekly lesson - μου αρέσει construction",
	},

	verbs: [
		{ lemma: "νευριάζω", english: "I get nervous/annoyed", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "κύμα", gender: "neuter", english: "wave" },
		{ lemma: "γραφείο", gender: "neuter", english: "office" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "δυνατός", english: "strong/loud" },
		{ lemma: "ενθουσιασμένος", english: "enthusiastic/excited" },
	] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "όταν", english: "when (conjunction)" },
		{ lemma: "ποτέ", english: "never" },
	] satisfies AdverbSeed[],

	phrases: [
		// Location phrases
		{
			text: "στο γραφείο",
			english: "at/to the office",
			metadata: { pattern: "σε + το = στο" },
		},
		{
			text: "στη δουλειά",
			english: "at/to work",
			metadata: { pattern: "σε + τη = στη" },
		},
		// Likes construction with negation
		{
			text: "δεν μου αρέσει",
			english: "I don't like (it)",
			metadata: { pattern: "δεν + μου + αρέσει" },
		},
		{
			text: "δεν μου αρέσουν",
			english: "I don't like (them)",
			metadata: { pattern: "δεν + μου + αρέσουν (plural)" },
		},
		// When clauses
		{
			text: "όταν ήμουν παιδί",
			english: "when I was a child",
			metadata: { grammar: "όταν + past tense", usage: "reminiscing" },
		},
		{
			text: "όταν μιλάω με την πεθερά μου νευριάζω",
			english: "when I speak with my mother-in-law I get nervous",
			metadata: { grammar: "όταν + present tense", usage: "habitual" },
		},
		// Question word
		{
			text: "πότε;",
			english: "when?",
			metadata: { note: "question word, different from όταν" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "αρέσει construction with pronouns",
			examples: ["μου αρέσει", "σου αρέσει", "του/της αρέσει", "μας/σας/τους αρέσει"],
			explanation: "Dative-like construction: 'to me is pleasing'",
		},
		{
			pattern: "πότε vs όταν",
			examples: ["Πότε θα έρθεις; (when will you come?)", "Όταν έρθεις... (when you come...)"],
			explanation: "πότε = question word, όταν = conjunction",
		},
	],
} as const;
