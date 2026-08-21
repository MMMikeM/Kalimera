import { createLesson } from "@/types/lesson-builder";
export const LESSON_2023_11_08 = createLesson({
	meta: {
		date: "2023-11-08",
		topic: "Articles and places vocabulary",
		source: "Weekly lesson - ο/η/το, ένας/μία/ένα",
	},

	nouns: [
		{ lemma: "σχολείο", gender: "neuter", english: "school", cefrLevel: "A1" },
		{ lemma: "φαρμακείο", gender: "neuter", english: "pharmacy", cefrLevel: "A1" },
		{ lemma: "όνομα", gender: "neuter", english: "name", cefrLevel: "A1" },
		{ lemma: "μουσείο", gender: "neuter", english: "museum", cefrLevel: "A1" },
		{ lemma: "περίπτερο", gender: "neuter", english: "kiosk", cefrLevel: "A2" },
		{ lemma: "νοσοκομείο", gender: "neuter", english: "hospital", cefrLevel: "A1" },
		{ lemma: "φούρνος", gender: "masculine", english: "bakery/oven", cefrLevel: "A1" },
		{ lemma: "μαγαζί", gender: "neuter", english: "shop/store", cefrLevel: "A1" },
		{ lemma: "θέατρο", gender: "neuter", english: "theater", cefrLevel: "A2" },
	],

	adverbs: [{ lemma: "κοντά", english: "close/near", cefrLevel: "A1" }],

	grammarNotes: [
		{
			pattern: "Definite articles",
			examples: ["ο (masculine)", "η (feminine)", "το (neuter)"],
			explanation: "The - specific item",
		},
		{
			pattern: "Indefinite articles",
			examples: ["ένας (masculine)", "μία/μια (feminine)", "ένα (neuter)"],
			explanation: "A/an - non-specific item",
		},
	],
});
