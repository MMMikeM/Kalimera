import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_12_16 = {
	meta: {
		date: "2024-12-16",
		topic: "Comparatives and housing vocabulary",
		source: "Weekly lesson - πιο + adjective, rooms, housing types",
	},

	verbs: [
		{ lemma: "διαβάζω", english: "I read", conjugationFamily: "-ω" },
		{ lemma: "οδηγώ", english: "I drive", conjugationFamily: "-άω/-ώ" },
	] satisfies VerbSeed[],

	nouns: [
		// Food
		{ lemma: "κρέας", gender: "neuter", english: "meat" },
		{
			lemma: "μοσχάρι",
			gender: "neuter",
			english: "beef/veal",
			metadata: { note: "μοσχαρίσιο κρέας = beef meat" },
		},
		// Rooms
		{ lemma: "μπάνιο", gender: "neuter", english: "bathroom" },
		{ lemma: "κρεβατοκάμαρα", gender: "feminine", english: "bedroom" },
		{ lemma: "κρεβάτι", gender: "neuter", english: "bed" },
		{ lemma: "κουζίνα", gender: "feminine", english: "kitchen" },
		{ lemma: "σαλόνι", gender: "neuter", english: "living room" },
		// Housing types
		{
			lemma: "πολυκατοικία",
			gender: "feminine",
			english: "apartment building",
			metadata: { note: "πολύ + κατοικία = many + dwelling" },
		},
		{
			lemma: "μονοκατοικία",
			gender: "feminine",
			english: "single-family house",
			metadata: { note: "μόνο + κατοικία = single + dwelling" },
		},
		// Other
		{ lemma: "έναρξη", gender: "feminine", english: "start/beginning" },
		{ lemma: "οδηγός", gender: "masculine", english: "driver" },
		{ lemma: "ύπνος", gender: "masculine", english: "sleep" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "στενός", english: "tight/narrow" },
		{ lemma: "ήσυχος", english: "quiet" },
		{ lemma: "ψηλός", english: "tall/high" },
		{ lemma: "κοντός", english: "short" },
		{ lemma: "κακός", english: "bad" },
		{ lemma: "δύσκολος", english: "difficult" },
		{ lemma: "φιλικός", english: "friendly" },
		{ lemma: "μοσχαρίσιος", english: "beef (adj)" },
	] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "πριν", english: "before" },
		{ lemma: "μεταξύ", english: "between" },
	] satisfies AdverbSeed[],

	phrases: [
		// Comparison pattern
		{
			text: "πιο ψηλός",
			english: "taller",
			metadata: { pattern: "πιο + adjective", usage: "comparatives" },
		},
		{
			text: "πιο δύσκολο",
			english: "more difficult",
			metadata: { pattern: "πιο + adjective (neuter)" },
		},
		{
			text: "πιο ήσυχος από",
			english: "quieter than",
			metadata: { pattern: "πιο + adjective + από", usage: "comparison" },
		},
		// Similarity
		{
			text: "είναι σαν...",
			english: "it's like...",
			metadata: { usage: "making comparisons/similarities" },
		},
		// Daily routine
		{
			text: "διαβάζω πριν πάω για ύπνο",
			english: "I read before I go to sleep",
			metadata: { pattern: "verb + πριν + subjunctive" },
		},
		{
			text: "πάω για ύπνο",
			english: "I go to sleep",
			metadata: { pattern: "πάω για + noun", usage: "going to do something" },
		},
		// Housing
		{
			text: "μένω σε πολυκατοικία",
			english: "I live in an apartment building",
			metadata: { pattern: "μένω σε + housing type" },
		},
		{
			text: "μένω σε μονοκατοικία",
			english: "I live in a house",
			metadata: { pattern: "μένω σε + housing type" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Comparatives with πιο",
			examples: [
				"ψηλός → πιο ψηλός (taller)",
				"δύσκολος → πιο δύσκολος (more difficult)",
				"ήσυχος → πιο ήσυχος (quieter)",
			],
			explanation:
				"Greek comparatives are formed with πιο + adjective. The adjective still agrees in gender/number with the noun.",
		},
		{
			pattern: "Comparison with από",
			examples: [
				"Είναι πιο ψηλός από εμένα (He is taller than me)",
				"Η κουζίνα είναι πιο μεγάλη από το μπάνιο",
			],
			explanation: "Use από (than) after the comparative to introduce what you're comparing to.",
		},
		{
			pattern: "Adjective agreement reminder",
			examples: [
				"στενός/στενή/στενό",
				"ήσυχος/ήσυχη/ήσυχο",
				"ψηλός/ψηλή/ψηλό",
			],
			explanation:
				"These adjectives follow the standard -ος/-η/-ο pattern. Remember to match gender with the noun.",
		},
		{
			pattern: "πριν + subjunctive",
			examples: [
				"πριν πάω (before I go)",
				"πριν φάω (before I eat)",
				"πριν κοιμηθώ (before I sleep)",
			],
			explanation: "πριν (before) is followed by the subjunctive mood (no να needed).",
		},
	],
} as const;
