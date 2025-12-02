import type { AdjectiveSeed, NounSeed, Phrase, VerbSeed } from "../../../../types/seed";

export const LESSON_2024_04_15 = {
	meta: {
		date: "2024-04-15",
		topic: "Pets, action verbs (open/close/start/finish)",
		source: "Weekly lesson - κλείνω/ανοίγω pairs",
	},

	verbs: [
		{ lemma: "ανοίγω", english: "I open/turn on", conjugationFamily: "-ω" },
		{ lemma: "αρχίζω", english: "I start/begin", conjugationFamily: "-ω" },
		{ lemma: "τελειώνω", english: "I finish", conjugationFamily: "-ω" },
		{ lemma: "εκπαιδεύω", english: "I train", conjugationFamily: "-ω" },
		{ lemma: "μαθαίνω", english: "I learn/teach", conjugationFamily: "-ω" },
		{ lemma: "μισώ", english: "I hate", conjugationFamily: "-άω/-ώ" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "εκπαίδευση", gender: "feminine", english: "training/education" },
		{ lemma: "γάτα", gender: "feminine", english: "cat" },
		{ lemma: "κουτάβι", gender: "neuter", english: "puppy" },
		{ lemma: "κουνέλι", gender: "neuter", english: "rabbit" },
		{ lemma: "πουλί", gender: "neuter", english: "bird" },
		{ lemma: "παπαγάλος", gender: "masculine", english: "parrot" },
		{ lemma: "φίδι", gender: "neuter", english: "snake" },
		{ lemma: "ποντίκι", gender: "neuter", english: "mouse" },
		{ lemma: "αρουραίος", gender: "masculine", english: "rat" },
		{ lemma: "κατοικίδιο", gender: "neuter", english: "pet" },
		{ lemma: "ζώο", gender: "neuter", english: "animal" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "καλύτερος", english: "better/best" },
	] satisfies AdjectiveSeed[],

	adverbs: [],

	phrases: [
		{ text: "κατοικίδια ζώα", english: "domestic animals/pets", metadata: {} },
		{ text: "εκπαίδευση σκύλου", english: "dog training", metadata: { grammar: "genitive" } },
		{ text: "μαθαίνω στο σκύλο να κάθεται", english: "I teach the dog to sit", metadata: { pattern: "μαθαίνω + να + verb" } },
		{ text: "μισό", english: "half", metadata: { note: "also adjective" } },
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Opposite verb pairs",
			examples: ["ανοίγω ↔ κλείνω", "αρχίζω ↔ τελειώνω", "φεύγω ↔ φτάνω"],
			explanation: "Learn verbs in pairs",
		},
	],
} as const;
