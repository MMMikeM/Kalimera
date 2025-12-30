import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_12_09 = {
	meta: {
		date: "2024-12-09",
		topic: "Countries, nationalities, and languages",
		source: "Weekly lesson - demonyms, adjective agreement, είμαι practice",
	},

	verbs: [
		{ lemma: "μιλάω", english: "I speak", conjugationFamily: "-άω/-ώ" },
		{ lemma: "συμφωνώ", english: "I agree", conjugationFamily: "-άω/-ώ" },
		{ lemma: "αγαπώ", english: "I love", conjugationFamily: "-άω/-ώ" },
		{ lemma: "λένε", english: "they call/say", conjugationFamily: "irregular" },
	] satisfies VerbSeed[],

	nouns: [
		// Core concept
		{ lemma: "γλώσσα", gender: "feminine", english: "language" },
		{ lemma: "χώρα", gender: "feminine", english: "country" },
		{ lemma: "χορός", gender: "masculine", english: "dance" },
		{ lemma: "γίγαντας", gender: "masculine", english: "giant" },
		{ lemma: "μουσική", gender: "feminine", english: "music" },
		{ lemma: "φαγητό", gender: "neuter", english: "food" },
		{ lemma: "ρύζι", gender: "neuter", english: "rice" },
		{ lemma: "κάρυ", gender: "neuter", english: "curry" },
		{ lemma: "σούπα", gender: "feminine", english: "soup" },
		{ lemma: "άθλημα", gender: "neuter", english: "sport" },
		// Countries (feminine)
		{ lemma: "Ελλάδα", gender: "feminine", english: "Greece" },
		{ lemma: "Κύπρος", gender: "feminine", english: "Cyprus" },
		{ lemma: "Αγγλία", gender: "feminine", english: "England" },
		{ lemma: "Ιταλία", gender: "feminine", english: "Italy" },
		{ lemma: "Ισπανία", gender: "feminine", english: "Spain" },
		{ lemma: "Γερμανία", gender: "feminine", english: "Germany" },
		{ lemma: "Γαλλία", gender: "feminine", english: "France" },
		{ lemma: "Ρωσία", gender: "feminine", english: "Russia" },
		{ lemma: "Τουρκία", gender: "feminine", english: "Turkey" },
		{ lemma: "Αφρική", gender: "feminine", english: "Africa" },
		{ lemma: "Νιγηρία", gender: "feminine", english: "Nigeria" },
		{ lemma: "Ταϊλάνδη", gender: "feminine", english: "Thailand" },
		// Demonyms - male
		{
			lemma: "Έλληνας",
			gender: "masculine",
			english: "Greek (man)",
			metadata: { demonymOf: "Ελλάδα" },
		},
		{
			lemma: "Κύπριος",
			gender: "masculine",
			english: "Cypriot (man)",
			metadata: { demonymOf: "Κύπρος", variant: "Κυπραίος" },
		},
		{
			lemma: "Άγγλος",
			gender: "masculine",
			english: "English (man)",
			metadata: { demonymOf: "Αγγλία" },
		},
		{
			lemma: "Αφρικανός",
			gender: "masculine",
			english: "African (man)",
			metadata: { demonymOf: "Αφρική" },
		},
		{
			lemma: "Νιγηριανός",
			gender: "masculine",
			english: "Nigerian (man)",
			metadata: { demonymOf: "Νιγηρία" },
		},
		// Demonyms - female
		{
			lemma: "Ελληνίδα",
			gender: "feminine",
			english: "Greek (woman)",
			metadata: { demonymOf: "Ελλάδα" },
		},
		{
			lemma: "Κύπρια",
			gender: "feminine",
			english: "Cypriot (woman)",
			metadata: { demonymOf: "Κύπρος", variant: "Κυπραία" },
		},
		{
			lemma: "Αγγλίδα",
			gender: "feminine",
			english: "English (woman)",
			metadata: { demonymOf: "Αγγλία" },
		},
		{
			lemma: "Αφρικανή",
			gender: "feminine",
			english: "African (woman)",
			metadata: { demonymOf: "Αφρική" },
		},
	] satisfies NounSeed[],

	adjectives: [
		// Nationality adjectives (with -ος/-η/-ο pattern)
		{ lemma: "ελληνικός", english: "Greek" },
		{ lemma: "κυπριακός", english: "Cypriot" },
		{ lemma: "αγγλικός", english: "English" },
		{ lemma: "ιταλικός", english: "Italian" },
		{ lemma: "ισπανικός", english: "Spanish" },
		{ lemma: "γερμανικός", english: "German" },
		{ lemma: "γαλλικός", english: "French" },
		{ lemma: "ρωσικός", english: "Russian" },
		{ lemma: "τουρκικός", english: "Turkish" },
		{ lemma: "αφρικανικός", english: "African" },
		{ lemma: "ταϊλανδέζικος", english: "Thai" },
		{ lemma: "ιαπωνέζικος", english: "Japanese" },
		{ lemma: "κινέζικος", english: "Chinese" },
		// Other adjectives from lesson
		{ lemma: "καλός", english: "good" },
		{ lemma: "περήφανος", english: "proud" },
		{ lemma: "δημοφιλής", english: "popular" },
		{ lemma: "φιλικός", english: "friendly" },
		{ lemma: "εθνικός", english: "national" },
		{ lemma: "εξωτικός", english: "exotic" },
		{ lemma: "μεγάλος", english: "big/great" },
	] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "καλά", english: "well" },
		{ lemma: "πολύ", english: "very/much" },
		{ lemma: "μαζί", english: "together" },
		{ lemma: "εδώ", english: "here" },
		{ lemma: "ίσως", english: "maybe/perhaps" },
	] satisfies AdverbSeed[],

	phrases: [
		// Language expressions
		{
			text: "μιλάω ελληνικά",
			english: "I speak Greek",
			metadata: { pattern: "μιλάω + language (neuter plural)", usage: "languages" },
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
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Adjective agreement: -ος/-η/-ο",
			examples: [
				"ελληνικός καφές (m)",
				"ελληνική λεμονάδα (f)",
				"ελληνικό φαγητό (n)",
			],
			explanation:
				"Nationality adjectives follow standard -ος/-η/-ο pattern for masculine/feminine/neuter",
		},
		{
			pattern: "Adjective plural forms",
			examples: [
				"ελληνικοί/ελληνικές/ελληνικά",
				"καλοί/καλές/καλά",
			],
			explanation:
				"Plural: -οι (m), -ές (f), -ά (n). Note the accent shift in feminine plural.",
		},
		{
			pattern: "Countries take feminine article η",
			examples: [
				"η Ελλάδα",
				"η Κύπρος",
				"η Αγγλία",
				"η Γερμανία",
			],
			explanation:
				"Most country names are feminine singular. Exception: ο Καναδάς (masculine)",
		},
		{
			pattern: "Languages are neuter plural adjectives",
			examples: [
				"τα ελληνικά",
				"τα αγγλικά",
				"τα γερμανικά",
			],
			explanation:
				"Languages use neuter plural of nationality adjective: μιλάω ελληνικά (no article needed with μιλάω)",
		},
		{
			pattern: "Demonym formation",
			examples: [
				"Ελλάδα → Έλληνας/Ελληνίδα → ελληνικά",
				"Κύπρος → Κύπριος/Κύπρια → κυπριακά",
			],
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
			explanation:
				"είμαι is irregular. Note: 3rd person singular and plural are identical (είναι)",
		},
	],
} as const;
