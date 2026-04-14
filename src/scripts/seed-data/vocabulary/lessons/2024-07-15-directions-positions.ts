import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_07_15 = createLesson({
	meta: {
		date: "2024-07-15",
		topic: "Directions, positions, and locations",
		source: "Weekly lesson - kahoot recap",
	},

	verbs: [{ lemma: "υπάρχω", english: "I exist / there is", conjugationFamily: "-ω", cefrLevel: "A1" }],

	nouns: [
		{ lemma: "λουλούδι", gender: "neuter", english: "flower" },
		{ lemma: "ανθοπωλείο", gender: "neuter", english: "flower shop" },
		{ lemma: "ταβέρνα", gender: "feminine", english: "tavern" },
	],

	adverbs: [
		{ lemma: "μέσα", english: "inside", cefrLevel: "A1" },
		{ lemma: "έξω", english: "outside", cefrLevel: "A1" },
		{ lemma: "κοντά", english: "close/near", cefrLevel: "A1" },
		{ lemma: "μακριά", english: "far away", cefrLevel: "A2" },
		{ lemma: "αριστερά", english: "left", cefrLevel: "A1" },
		{ lemma: "δεξιά", english: "right", cefrLevel: "A1" },
		{ lemma: "μπροστά", english: "in front", cefrLevel: "A2" },
		{ lemma: "πίσω", english: "behind/back", cefrLevel: "A2" },
		{ lemma: "δίπλα", english: "next to", cefrLevel: "A2" },
		{ lemma: "απέναντι", english: "across/opposite", cefrLevel: "B1" },
		{ lemma: "μήπως", english: "maybe/perhaps", cefrLevel: "A2" },
	],

	adjectives: [{ lemma: "καινούριος", english: "new", cefrLevel: "A2" }],

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
	],

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
});
