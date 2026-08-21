import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_12_09 = createLesson({
	meta: {
		date: "2024-12-09",
		topic: "Countries, nationalities, and languages",
		source: "Weekly lesson - demonyms, adjective agreement, είμαι practice",
	},

	verbs: [
		{ lemma: "μιλάω", english: "I speak", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "συμφωνώ", english: "I agree", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
		{ lemma: "αγαπώ", english: "I love", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "λένε", english: "they call/say", conjugationFamily: "irregular", cefrLevel: "A1" },
	],

	nouns: [
		// Core concept
		{ lemma: "γλώσσα", gender: "feminine", english: "language", cefrLevel: "A1" },
		{ lemma: "χώρα", gender: "feminine", english: "country", cefrLevel: "A1" },
		{ lemma: "χορός", gender: "masculine", english: "dance", cefrLevel: "A2" },
		{ lemma: "γίγαντας", gender: "masculine", english: "giant", cefrLevel: "B1" },
		{ lemma: "μουσική", gender: "feminine", english: "music", cefrLevel: "A1" },
		{ lemma: "φαγητό", gender: "neuter", english: "food", cefrLevel: "A1" },
		{ lemma: "ρύζι", gender: "neuter", english: "rice", cefrLevel: "A1" },
		{ lemma: "κάρυ", gender: "neuter", english: "curry", cefrLevel: "B1" },
		{ lemma: "σούπα", gender: "feminine", english: "soup", cefrLevel: "A1" },
		{ lemma: "άθλημα", gender: "neuter", english: "sport", cefrLevel: "A2" },
		// Countries (feminine)
		{ lemma: "Ελλάδα", gender: "feminine", english: "Greece", cefrLevel: "A1" },
		{ lemma: "Κύπρος", gender: "feminine", english: "Cyprus", cefrLevel: "A1" },
		{ lemma: "Αγγλία", gender: "feminine", english: "England", cefrLevel: "A1" },
		{ lemma: "Ιταλία", gender: "feminine", english: "Italy", cefrLevel: "A1" },
		{ lemma: "Ισπανία", gender: "feminine", english: "Spain", cefrLevel: "A1" },
		{ lemma: "Γερμανία", gender: "feminine", english: "Germany", cefrLevel: "A1" },
		{ lemma: "Γαλλία", gender: "feminine", english: "France", cefrLevel: "A1" },
		{ lemma: "Ρωσία", gender: "feminine", english: "Russia", cefrLevel: "A2" },
		{ lemma: "Τουρκία", gender: "feminine", english: "Turkey", cefrLevel: "A2" },
		{ lemma: "Αφρική", gender: "feminine", english: "Africa", cefrLevel: "A2" },
		{ lemma: "Νιγηρία", gender: "feminine", english: "Nigeria", cefrLevel: "B1" },
		{ lemma: "Ταϊλάνδη", gender: "feminine", english: "Thailand", cefrLevel: "B1" },
		// Demonyms - male
		{
			lemma: "Έλληνας",
			gender: "masculine",
			english: "Greek (man)",
			cefrLevel: "A1",
			metadata: { demonymOf: "Ελλάδα" },
		},
		{
			lemma: "Κύπριος",
			gender: "masculine",
			english: "Cypriot (man)",
			cefrLevel: "A2",
			metadata: { demonymOf: "Κύπρος", variant: "Κυπραίος" },
		},
		{
			lemma: "Άγγλος",
			gender: "masculine",
			english: "English (man)",
			cefrLevel: "A2",
			metadata: { demonymOf: "Αγγλία" },
		},
		{
			lemma: "Αφρικανός",
			gender: "masculine",
			english: "African (man)",
			cefrLevel: "B1",
			metadata: { demonymOf: "Αφρική" },
		},
		{
			lemma: "Νιγηριανός",
			gender: "masculine",
			english: "Nigerian (man)",
			cefrLevel: "B1",
			metadata: { demonymOf: "Νιγηρία" },
		},
		// Demonyms - female
		{
			lemma: "Ελληνίδα",
			gender: "feminine",
			english: "Greek (woman)",
			cefrLevel: "A1",
			metadata: { demonymOf: "Ελλάδα" },
		},
		{
			lemma: "Κύπρια",
			gender: "feminine",
			english: "Cypriot (woman)",
			cefrLevel: "A2",
			metadata: { demonymOf: "Κύπρος", variant: "Κυπραία" },
		},
		{
			lemma: "Αγγλίδα",
			gender: "feminine",
			english: "English (woman)",
			cefrLevel: "A2",
			metadata: { demonymOf: "Αγγλία" },
		},
		{
			lemma: "Αφρικανή",
			gender: "feminine",
			english: "African (woman)",
			cefrLevel: "B1",
			metadata: { demonymOf: "Αφρική" },
		},
	],

	adjectives: [
		// Nationality adjectives (with -ος/-η/-ο pattern)
		{ lemma: "ελληνικός", english: "Greek", cefrLevel: "A1" },
		{ lemma: "κυπριακός", english: "Cypriot", cefrLevel: "A2" },
		{ lemma: "αγγλικός", english: "English", cefrLevel: "A1" },
		{ lemma: "ιταλικός", english: "Italian", cefrLevel: "A2" },
		{ lemma: "ισπανικός", english: "Spanish", cefrLevel: "A2" },
		{ lemma: "γερμανικός", english: "German", cefrLevel: "A2" },
		{ lemma: "γαλλικός", english: "French", cefrLevel: "A2" },
		{ lemma: "ρωσικός", english: "Russian", cefrLevel: "B1" },
		{ lemma: "τουρκικός", english: "Turkish", cefrLevel: "B1" },
		{ lemma: "αφρικανικός", english: "African", cefrLevel: "B1" },
		{ lemma: "ταϊλανδέζικος", english: "Thai", cefrLevel: "B2" },
		{ lemma: "ιαπωνέζικος", english: "Japanese", cefrLevel: "B2" },
		{ lemma: "κινέζικος", english: "Chinese", cefrLevel: "B2" },
		// Other adjectives from lesson
		{ lemma: "καλός", english: "good", cefrLevel: "A1" },
		{ lemma: "περήφανος", english: "proud", cefrLevel: "A2" },
		{ lemma: "δημοφιλής", english: "popular", cefrLevel: "B1" },
		{ lemma: "φιλικός", english: "friendly", cefrLevel: "A2" },
		{ lemma: "εθνικός", english: "national", cefrLevel: "B1" },
		{ lemma: "εξωτικός", english: "exotic", cefrLevel: "B1" },
		{ lemma: "μεγάλος", english: "big/great", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "καλά", english: "well", cefrLevel: "A1" },
		{ lemma: "πολύ", english: "very/much", cefrLevel: "A1" },
		{ lemma: "μαζί", english: "together", cefrLevel: "A1" },
		{ lemma: "εδώ", english: "here", cefrLevel: "A1" },
		{ lemma: "ίσως", english: "maybe/perhaps", cefrLevel: "A2" },
	],

	phrases: [
		// Language expressions
		{
			text: "μιλάω ελληνικά",
			english: "I speak Greek",
			metadata: {
				pattern: "μιλάω + language (neuter plural)",
				usage: "languages",
			},
		},
		{
			text: "μιλάω αγγλικά",
			english: "I speak English",
			metadata: { pattern: "μιλάω + language" },
		},
		// Identity expressions
		{
			text: "είμαι Έλληνας",
			english: "I am Greek (male)",
			metadata: { grammar: "είμαι + demonym (no article)" },
		},
		{
			text: "είμαι Ελληνίδα",
			english: "I am Greek (female)",
			metadata: { grammar: "είμαι + demonym (no article)" },
		},
		{
			text: "είμαι από την Ελλάδα",
			english: "I am from Greece",
			metadata: { pattern: "είμαι από + accusative", usage: "origin" },
		},
		{
			text: "είμαι περήφανος που είμαι Νιγηριανός",
			english: "I am proud to be Nigerian",
			metadata: { pattern: "περήφανος που + clause" },
		},
		// Error correction
		{
			text: "όχι πολύ καλά",
			english: "not very well",
			metadata: {
				correction: "δεν πολύ καλό → όχι πολύ καλά",
				note: "Use όχι (not δεν) before adverbs",
			},
		},
		// Agreement/disagreement
		{
			text: "δεν συμφωνώ με εσένα",
			english: "I don't agree with you",
			metadata: { pattern: "δεν συμφωνώ με + accusative pronoun" },
		},
		{
			text: "δεν συμφωνώ μαζί σου",
			english: "I don't agree with you",
			metadata: {
				pattern: "δεν συμφωνώ μαζί + genitive pronoun",
				note: "Alternative to με εσένα",
			},
		},
		// Appointments (review from previous lesson)
		{
			text: "έχω ραντεβού με την Κωνσταντίνα την Τρίτη",
			english: "I have an appointment with Konstantina on Tuesday",
			metadata: { pattern: "έχω ραντεβού με + accusative" },
		},
		{
			text: "κάνουμε μαζί ελληνικά",
			english: "we do Greek together",
			metadata: { usage: "study together" },
		},
		// Possibility
		{
			text: "ίσως πάω",
			english: "maybe I'll go",
			metadata: { grammar: "ίσως + subjunctive" },
		},
		{
			text: "ίσως δεν πάω",
			english: "maybe I won't go",
			metadata: { grammar: "ίσως + δεν + subjunctive" },
		},
		// Cultural phrases from reading
		{
			text: "λένε ο γίγαντας της Αφρικής",
			english: "they call (it) the giant of Africa",
			metadata: { usage: "describing Nigeria" },
		},
		{
			text: "αγαπούν τη μουσική και το χορό",
			english: "they love music and dance",
			metadata: { grammar: "αγαπώ + accusative" },
		},
	],

	grammarNotes: [
		{
			pattern: "Adjective agreement: -ος/-η/-ο",
			examples: ["ελληνικός καφές (m)", "ελληνική λεμονάδα (f)", "ελληνικό φαγητό (n)"],
			explanation:
				"Nationality adjectives follow standard -ος/-η/-ο pattern for masculine/feminine/neuter",
		},
		{
			pattern: "Adjective plural forms",
			examples: ["ελληνικοί/ελληνικές/ελληνικά", "καλοί/καλές/καλά"],
			explanation: "Plural: -οι (m), -ές (f), -ά (n). Note the accent shift in feminine plural.",
		},
		{
			pattern: "Countries take feminine article η",
			examples: ["η Ελλάδα", "η Κύπρος", "η Αγγλία", "η Γερμανία"],
			explanation: "Most country names are feminine singular. Exception: ο Καναδάς (masculine)",
		},
		{
			pattern: "Languages are neuter plural adjectives",
			examples: ["τα ελληνικά", "τα αγγλικά", "τα γερμανικά"],
			explanation:
				"Languages use neuter plural of nationality adjective: μιλάω ελληνικά (no article needed with μιλάω)",
		},
		{
			pattern: "Demonym formation",
			examples: ["Ελλάδα → Έλληνας/Ελληνίδα → ελληνικά", "Κύπρος → Κύπριος/Κύπρια → κυπριακά"],
			explanation:
				"Country → Person (m/f) → Language/Adjective. Male demonyms often end in -ος or -ας, female in -α or -ίδα",
		},
		{
			pattern: "είμαι conjugation (present)",
			examples: [
				"είμαι (I am)",
				"είσαι (you are)",
				"είναι (he/she/it is)",
				"είμαστε (we are)",
				"είστε/είσαστε (you are pl.)",
				"είναι (they are)",
			],
			explanation: "είμαι is irregular. Note: 3rd person singular and plural are identical (είναι)",
		},
	],
});
