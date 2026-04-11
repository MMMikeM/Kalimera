import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_10_15 = createLesson({
	meta: {
		date: "2024-10-15",
		topic: "Work and profession vocabulary",
		source: "Weekly lesson - job descriptions",
	},

	verbs: [{ lemma: "διδάσκω", english: "I teach", conjugationFamily: "-ω" }],

	nouns: [
		{ lemma: "λογισμικό", gender: "neuter", english: "software" },
		{ lemma: "μηχανικός", gender: "masculine", english: "engineer" },
		{ lemma: "δασκάλα", gender: "feminine", english: "teacher (female)" },
		{
			lemma: "υπολογιστής",
			gender: "masculine",
			english: "computer/calculator",
		},
		{ lemma: "πληκτρολόγιο", gender: "neuter", english: "keyboard" },
	],

	phrases: [
		{
			text: "τι δουλειά κάνεις;",
			english: "what work do you do?",
			metadata: {},
		},
		{ text: "πού δουλεύεις;", english: "where do you work?", metadata: {} },
		{
			text: "μηχανικός λογισμικού",
			english: "software engineer",
			metadata: { grammar: "genitive" },
		},
		{
			text: "με δουλεύεις",
			english: "you're kidding me / messing with me",
			metadata: { register: "colloquial" },
		},
	],
});
