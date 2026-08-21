import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_04_15 = createLesson({
	meta: {
		date: "2024-04-15",
		topic: "Pets, action verbs (open/close/start/finish)",
		source: "Weekly lesson - κλείνω/ανοίγω pairs",
	},

	verbs: [
		{ lemma: "ανοίγω", english: "I open/turn on", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "αρχίζω", english: "I start/begin", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "τελειώνω", english: "I finish", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "εκπαιδεύω", english: "I train", conjugationFamily: "-ω", cefrLevel: "B1" },
		{ lemma: "μαθαίνω", english: "I learn/teach", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μισώ", english: "I hate", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "εκπαίδευση", gender: "feminine", english: "training/education", cefrLevel: "A2" },
		{ lemma: "γάτα", gender: "feminine", english: "cat", cefrLevel: "A1" },
		{ lemma: "κουτάβι", gender: "neuter", english: "puppy", cefrLevel: "A2" },
		{ lemma: "κουνέλι", gender: "neuter", english: "rabbit", cefrLevel: "A2" },
		{ lemma: "πουλί", gender: "neuter", english: "bird", cefrLevel: "A2" },
		{ lemma: "παπαγάλος", gender: "masculine", english: "parrot", cefrLevel: "B1" },
		{ lemma: "φίδι", gender: "neuter", english: "snake", cefrLevel: "A2" },
		{ lemma: "ποντίκι", gender: "neuter", english: "mouse", cefrLevel: "A2" },
		{ lemma: "αρουραίος", gender: "masculine", english: "rat", cefrLevel: "B1" },
		{ lemma: "κατοικίδιο", gender: "neuter", english: "pet", cefrLevel: "A2" },
		{ lemma: "ζώο", gender: "neuter", english: "animal", cefrLevel: "A1" },
	],

	adjectives: [{ lemma: "καλύτερος", english: "better/best", cefrLevel: "A1" }],

	phrases: [
		{ text: "κατοικίδια ζώα", english: "domestic animals/pets", metadata: {} },
		{
			text: "εκπαίδευση σκύλου",
			english: "dog training",
			metadata: { grammar: "genitive" },
		},
		{
			text: "μαθαίνω στο σκύλο να κάθεται",
			english: "I teach the dog to sit",
			metadata: { pattern: "μαθαίνω + να + verb" },
		},
		{ text: "μισό", english: "half", metadata: { note: "also adjective" } },
	],

	grammarNotes: [
		{
			pattern: "Opposite verb pairs",
			examples: ["ανοίγω ↔ κλείνω", "αρχίζω ↔ τελειώνω", "φεύγω ↔ φτάνω"],
			explanation: "Learn verbs in pairs",
		},
	],
});
