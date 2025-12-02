import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_11_11 = {
	meta: {
		date: "2024-11-11",
		topic: "Telling time and schedules",
		source: "Weekly lesson - time expressions, appointments",
	},

	verbs: [
		{ lemma: "σχεδιάζω", english: "I plan/sketch", conjugationFamily: "-ω" },
		{ lemma: "συναντώ", english: "I meet", conjugationFamily: "-άω/-ώ" },
		{ lemma: "χρησιμοποιώ", english: "I use", conjugationFamily: "-άω/-ώ" },
		{ lemma: "νομίζω", english: "I think (that)", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		// Time-related
		{ lemma: "εβδομάδα", gender: "feminine", english: "week" },
		{ lemma: "ημερολόγιο", gender: "neuter", english: "calendar/diary" },
		{ lemma: "πρόγραμμα", gender: "neuter", english: "schedule/planner" },
		// Work/appointments
		{ lemma: "ραντεβού", gender: "neuter", english: "appointment/date" },
		{ lemma: "συνάντηση", gender: "feminine", english: "meeting" },
		{ lemma: "παρουσίαση", gender: "feminine", english: "presentation" },
		{ lemma: "κλήση", gender: "feminine", english: "call" },
		{ lemma: "μάθημα", gender: "neuter", english: "lesson" },
		{ lemma: "αγώνας", gender: "masculine", english: "match/game" },
		// People
		{ lemma: "οδοντίατρος", gender: "masculine", english: "dentist" },
		{ lemma: "ιατρός", gender: "masculine", english: "doctor (formal)" },
		{ lemma: "πελάτης", gender: "masculine", english: "client" },
		{ lemma: "ομάδα", gender: "feminine", english: "team" },
		// Other
		{ lemma: "σχέδιο", gender: "neuter", english: "plan/sketch" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "απασχολημένος", english: "busy" },
		{ lemma: "ελεύθερος", english: "free/single" },
	] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "αύριο", english: "tomorrow" },
		{ lemma: "νωρίς", english: "early" },
		{ lemma: "αργά", english: "late" },
		{ lemma: "χωρίς", english: "without" },
	] satisfies AdverbSeed[],

	phrases: [
		// Time telling patterns
		{
			text: "στις τρεις",
			english: "at three o'clock",
			metadata: { pattern: "στις + hour", usage: "telling time" },
		},
		{
			text: "στις τρεις και τέταρτο",
			english: "at quarter past three",
			metadata: { pattern: "στις X και τέταρτο", note: "και = past" },
		},
		{
			text: "στις τρεις και μισή",
			english: "at half past three",
			metadata: { pattern: "στις X και μισή", note: "μισή = half" },
		},
		{
			text: "στις τέσσερις παρά τέταρτο",
			english: "at quarter to four",
			metadata: { pattern: "στις X παρά τέταρτο", note: "παρά = to/before" },
		},
		// Time ranges
		{
			text: "από τις δύο μέχρι τις πέντε",
			english: "from two until five",
			metadata: { pattern: "από τις X μέχρι τις Y", usage: "time ranges" },
		},
		// Punctuality
		{
			text: "στην ώρα μου",
			english: "on time (my time)",
			metadata: { pattern: "στην ώρα + possessive", usage: "punctuality" },
		},
		{
			text: "στην ώρα του",
			english: "on time (his time)",
			metadata: { pattern: "στην ώρα + possessive" },
		},
		// Useful scheduling phrases
		{
			text: "έχω ραντεβού",
			english: "I have an appointment",
			metadata: { usage: "scheduling" },
		},
		{
			text: "είμαι απασχολημένος",
			english: "I am busy (male)",
			metadata: { grammar: "masculine singular" },
		},
		{
			text: "είμαι ελεύθερος",
			english: "I am free (male)",
			metadata: { grammar: "masculine singular" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Telling time with στις",
			examples: ["στις μία", "στις δύο", "στις τρεις"],
			explanation:
				"στις + accusative feminine plural (hours are feminine). Exception: στη μία (singular)",
		},
		{
			pattern: "και (past) vs παρά (to)",
			examples: ["τρεις και δέκα = 3:10", "τέσσερις παρά δέκα = 3:50"],
			explanation: "και adds minutes, παρά subtracts from next hour",
		},
		{
			pattern: "Numbers 1, 3, 4 forms",
			examples: ["μία/ένα/ένας", "τρεις/τρία", "τέσσερις/τέσσερα"],
			explanation: "These numbers change form based on gender",
		},
	],
} as const;
