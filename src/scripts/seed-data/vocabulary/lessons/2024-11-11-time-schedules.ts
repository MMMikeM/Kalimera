import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_11_11 = createLesson({
	meta: {
		date: "2024-11-11",
		topic: "Telling time and schedules",
		source: "Weekly lesson - time expressions, appointments",
	},

	verbs: [
		{ lemma: "σχεδιάζω", english: "I plan/sketch", conjugationFamily: "-ω", cefrLevel: "B1" },
		{ lemma: "συναντώ", english: "I meet", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
		{ lemma: "χρησιμοποιώ", english: "I use", conjugationFamily: "-άω/-ώ", cefrLevel: "B1" },
		{ lemma: "νομίζω", english: "I think (that)", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [
		// Time-related
		{ lemma: "εβδομάδα", gender: "feminine", english: "week", cefrLevel: "A1" },
		{ lemma: "ημερολόγιο", gender: "neuter", english: "calendar/diary", cefrLevel: "A2" },
		{ lemma: "πρόγραμμα", gender: "neuter", english: "schedule/planner", cefrLevel: "A2" },
		// Work/appointments
		{ lemma: "ραντεβού", gender: "neuter", english: "appointment/date", cefrLevel: "A2" },
		{ lemma: "συνάντηση", gender: "feminine", english: "meeting", cefrLevel: "B1" },
		{ lemma: "παρουσίαση", gender: "feminine", english: "presentation", cefrLevel: "B1" },
		{ lemma: "κλήση", gender: "feminine", english: "call", cefrLevel: "B1" },
		{ lemma: "μάθημα", gender: "neuter", english: "lesson", cefrLevel: "A1" },
		{ lemma: "αγώνας", gender: "masculine", english: "match/game", cefrLevel: "A2" },
		// People
		{ lemma: "οδοντίατρος", gender: "masculine", english: "dentist", cefrLevel: "A2" },
		{ lemma: "γιατρός", gender: "masculine", english: "doctor", cefrLevel: "A2" },
		{ lemma: "πελάτης", gender: "masculine", english: "client", cefrLevel: "A2" },
		{ lemma: "ομάδα", gender: "feminine", english: "team", cefrLevel: "A2" },
		// Other
		{ lemma: "σχέδιο", gender: "neuter", english: "plan/sketch", cefrLevel: "B1" },
	],

	adjectives: [
		{ lemma: "απασχολημένος", english: "busy", cefrLevel: "A2" },
		{ lemma: "ελεύθερος", english: "free/single", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "αύριο", english: "tomorrow", cefrLevel: "A1" },
		{ lemma: "νωρίς", english: "early", cefrLevel: "A1" },
		{ lemma: "αργά", english: "late", cefrLevel: "A1" },
		{ lemma: "χωρίς", english: "without", cefrLevel: "A2" },
	],

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
	],

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
});
