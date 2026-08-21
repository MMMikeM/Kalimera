import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_05_06 = createLesson({
	meta: {
		date: "2024-05-06",
		topic: "Daily activities and hobbies",
		source: "Weekly lesson - ακούω conjugation, activity verbs",
	},

	verbs: [
		{ lemma: "ακούω", english: "I listen/hear", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "διαβάζω", english: "I read", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "παίζω", english: "I play", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "χορεύω", english: "I dance", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μαγειρεύω", english: "I cook", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "τραγούδι", gender: "neuter", english: "song", cefrLevel: "A2" },
		{ lemma: "μεσημεριανό", gender: "neuter", english: "lunch", cefrLevel: "A1" },
		{ lemma: "μουσική", gender: "feminine", english: "music", cefrLevel: "A1" },
		{ lemma: "εφημερίδα", gender: "feminine", english: "newspaper", cefrLevel: "A2" },
		{ lemma: "τηλεόραση", gender: "feminine", english: "television", cefrLevel: "A1" },
		{ lemma: "σινεμά", gender: "neuter", english: "cinema", cefrLevel: "A1" },
		{ lemma: "σπορ", gender: "neuter", english: "sport", cefrLevel: "A2" },
	],

	phrases: [
		{ text: "τρώω μεσημεριανό", english: "I eat lunch", metadata: {} },
		{ text: "ακούω μουσική", english: "I listen to music", metadata: {} },
		{ text: "πίνω καφέ", english: "I drink coffee", metadata: {} },
		{
			text: "διαβάζω εφημερίδα",
			english: "I read the newspaper",
			metadata: {},
		},
		{ text: "βλέπω τηλεόραση", english: "I watch TV", metadata: {} },
		{
			text: "πάω σινεμά",
			english: "I go to the cinema",
			metadata: { note: "no article needed" },
		},
		{ text: "κάνω σπορ", english: "I do sport", metadata: {} },
	],

	grammarNotes: [
		{
			pattern: "ακούω conjugation",
			examples: ["ακούω, ακούς, ακούει", "ακούμε, ακούτε, ακούν"],
			explanation: "Regular -ω verb",
		},
	],
});
