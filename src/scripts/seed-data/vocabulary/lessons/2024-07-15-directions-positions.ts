import type {
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_07_15 = {
	meta: {
		date: "2024-07-15",
		topic: "Directions, positions, and locations",
		source: "Weekly lesson - kahoot recap",
	},

	verbs: [
		{ lemma: "υπάρχω", english: "I exist / there is", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "λουλούδι", gender: "neuter", english: "flower" },
		{ lemma: "ανθοπωλείο", gender: "neuter", english: "flower shop" },
		{ lemma: "ταβέρνα", gender: "feminine", english: "tavern" },
	] satisfies NounSeed[],

	adverbs: [
		{ lemma: "μέσα", english: "inside" },
		{ lemma: "έξω", english: "outside" },
		{ lemma: "κοντά", english: "close/near" },
		{ lemma: "μακριά", english: "far away" },
		{ lemma: "αριστερά", english: "left" },
		{ lemma: "δεξιά", english: "right" },
		{ lemma: "μπροστά", english: "in front" },
		{ lemma: "πίσω", english: "behind/back" },
		{ lemma: "δίπλα", english: "next to" },
		{ lemma: "απέναντι", english: "across/opposite" },
		{ lemma: "μήπως", english: "maybe/perhaps" },
	] satisfies AdverbSeed[],

	adjectives: [{ lemma: "καινούριος", english: "new" }],

	phrases: [
		// Position patterns with prepositions
		{
			text: "δίπλα στο σπίτι",
			english: "next to the house",
			metadata: { pattern: "δίπλα σε + accusative" },
		},
		{
			text: "κοντά στην πόλη",
			english: "close to the city",
			metadata: { pattern: "κοντά σε + accusative" },
		},
		{
			text: "πίσω από τον τοίχο",
			english: "behind the wall",
			metadata: { pattern: "πίσω από + accusative" },
		},
		{
			text: "μακριά από την πόλη",
			english: "far from the city",
			metadata: { pattern: "μακριά από + accusative" },
		},
		{
			text: "μπροστά από το σπίτι",
			english: "in front of the house",
			metadata: { pattern: "μπροστά από + accusative" },
		},
		{
			text: "απέναντι από την εκκλησία",
			english: "across from the church",
			metadata: { pattern: "απέναντι από + accusative" },
		},
		// Useful phrases
		{
			text: "δυο μέρες μόνο",
			english: "only two days",
			metadata: { usage: "time expression" },
		},
		{
			text: "ποια ταβέρνα είναι κοντά;",
			english: "which tavern is close?",
			metadata: { usage: "asking for directions" },
		},
		{
			text: "υπάρχει",
			english: "there is",
			metadata: { grammar: "3rd person singular of υπάρχω" },
		},
		{
			text: "υπάρχουν",
			english: "there are",
			metadata: { grammar: "3rd person plural of υπάρχω" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Position + σε (contracted)",
			examples: ["δίπλα στο", "κοντά στη", "μπροστά στον"],
			explanation: "Position word + σε contracts with article",
		},
		{
			pattern: "Position + από",
			examples: ["πίσω από", "μακριά από", "απέναντι από"],
			explanation: "Some positions use από instead of σε",
		},
	],
} as const;
