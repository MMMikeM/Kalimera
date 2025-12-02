import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_12_02 = {
	meta: {
		date: "2024-12-02",
		topic: "Family routines - daily schedules, weekend activities",
		source: "Weekly lesson - Η οικογένεια Σαρρηγιάννη text",
	},

	// Verbs for daily routines (first person forms as lemmas)
	verbs: [
		{ lemma: "ζω", english: "I live", conjugationFamily: "-ω" },
		{ lemma: "σπουδάζω", english: "I study", conjugationFamily: "-ω" },
		{ lemma: "ξεκουράζομαι", english: "I rest", conjugationFamily: "-ομαι" },
		{ lemma: "βγαίνω", english: "I go out", conjugationFamily: "-ω" },
		{ lemma: "υπάρχω", english: "I exist / there is", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	// Family and routine nouns
	nouns: [
		{ lemma: "γιαγιά", gender: "feminine", english: "grandmother" },
		{ lemma: "παππούς", gender: "masculine", english: "grandfather" },
		{ lemma: "θείος", gender: "masculine", english: "uncle" },
		{ lemma: "θεία", gender: "feminine", english: "aunt" },
		{ lemma: "εστιατόριο", gender: "neuter", english: "restaurant" },
		{ lemma: "χωριό", gender: "neuter", english: "village" },
		{ lemma: "λίμνη", gender: "feminine", english: "lake" },
		{ lemma: "πόλη", gender: "feminine", english: "city" },
		{ lemma: "ιατρική", gender: "feminine", english: "medicine (field)" },
		{ lemma: "πανεπιστήμιο", gender: "neuter", english: "university" },
		{ lemma: "φοιτητής", gender: "masculine", english: "student (male)" },
		{ lemma: "φοιτήτρια", gender: "feminine", english: "student (female)" },
		{ lemma: "μαθηματικός", gender: "masculine", english: "mathematician" },
		{ lemma: "ρολόι", gender: "neuter", english: "watch/clock" },
		{ lemma: "φορά", gender: "feminine", english: "time (instance)" },
	] satisfies NounSeed[],

	// Adjectives from the lesson
	adjectives: [
		{ lemma: "παντρεμένος", english: "married" },
		{ lemma: "εθνικός", english: "national" },
	] satisfies AdjectiveSeed[],

	// Frequency adverbs (critical for describing routines)
	adverbs: [
		{ lemma: "συχνά", english: "often" },
		{ lemma: "σπάνια", english: "rarely" },
		{ lemma: "πολλές φορές", english: "many times/often" },
		{ lemma: "μερικές φορές", english: "sometimes" },
	] satisfies AdverbSeed[],

	// Routine phrases - patterns for describing daily life
	phrases: [
		// Time range pattern: από...ως...
		{
			text: "από τη Δευτέρα ως την Παρασκευή",
			english: "from Monday to Friday",
			metadata: { pattern: "από + acc ως + acc", usage: "time ranges" },
		},
		{
			text: "από το πρωί ως αργά το μεσημέρι",
			english: "from morning until late afternoon",
			metadata: { pattern: "από + acc ως + acc", usage: "daily schedule" },
		},

		// Daily routine descriptions
		{
			text: "ξεκουράζονται λίγο το απόγευμα",
			english: "they rest a bit in the afternoon",
			metadata: { grammar: "3rd person plural + time expression" },
		},
		{
			text: "το βράδυ βγαίνουν έξω",
			english: "in the evening they go out",
			metadata: { grammar: "time expression + verb" },
		},

		// Weekend activities
		{
			text: "πηγαίνουν με το αυτοκίνητο",
			english: "they go by car",
			metadata: { grammar: "με + accusative (means of transport)" },
		},
		{
			text: "πάνε για φαγητό",
			english: "they go for food",
			metadata: { grammar: "για + accusative (purpose)" },
		},

		// Location patterns
		{
			text: "κοντά στην πόλη",
			english: "near the city",
			metadata: { pattern: "κοντά σε + acc", usage: "proximity" },
		},
		{
			text: "δίπλα σε μια λίμνη",
			english: "next to a lake",
			metadata: { pattern: "δίπλα σε + acc", usage: "adjacency" },
		},

		// Distance pattern
		{
			text: "πόσο απέχει από εδώ;",
			english: "how far is it from here?",
			metadata: { pattern: "απέχω από + acc", usage: "asking distance" },
		},

		// Family status (useful for small talk)
		{
			text: "είναι παντρεμένος",
			english: "he is married",
			metadata: { grammar: "masculine singular" },
		},
		{
			text: "είναι παντρεμένη",
			english: "she is married",
			metadata: { grammar: "feminine singular" },
		},
		{
			text: "είναι παντρεμένοι",
			english: "they are married",
			metadata: { grammar: "plural" },
		},
	] satisfies Phrase[],

	// Grammar patterns demonstrated in the text
	grammarNotes: [
		{
			pattern: "Accusative with names as direct objects",
			examples: ["Έχουν δύο παιδιά, τον Αλέξανδρο και τη Λίζα"],
			explanation: "Names take accusative when they're the object of a verb",
		},
		{
			pattern: "Age expressions",
			examples: ["είναι είκοσι οχτώ χρονών", "Πόσων χρονών είσαι;"],
			explanation: "χρονών is genitive plural - literally 'of X years'",
		},
		{
			pattern: "Time expressions take accusative",
			examples: ["τη Δευτέρα", "το πρωί", "το σαββατοκύριακο"],
			explanation: "Days, parts of day use accusative article",
		},
	],
} as const;
