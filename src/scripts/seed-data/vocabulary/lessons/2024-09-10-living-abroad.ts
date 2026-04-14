import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_09_10 = createLesson({
	meta: {
		date: "2024-09-10",
		topic: "Living abroad vocabulary",
		source: "Weekly lesson - conversation about life in different countries",
	},

	verbs: [
		{ lemma: "υποφέρω", english: "I suffer", conjugationFamily: "-ω", cefrLevel: "B2" },
		{ lemma: "παιδεύομαι", english: "I struggle", conjugationFamily: "-ομαι", cefrLevel: "B1" },
		{ lemma: "προσπαθώ", english: "I try", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
	],

	nouns: [
		{ lemma: "υγρασία", gender: "feminine", english: "humidity" },
		{ lemma: "σκουπίδια", gender: "neuter", english: "garbage/trash" },
		{ lemma: "μάστορας", gender: "masculine", english: "handyman" },
		{ lemma: "μετανάστης", gender: "masculine", english: "immigrant" },
		{ lemma: "καριέρα", gender: "feminine", english: "career" },
		{ lemma: "εμβόλιο", gender: "neuter", english: "vaccine" },
		{ lemma: "ορχήστρα", gender: "feminine", english: "orchestra" },
	],

	adjectives: [
		{ lemma: "επικίνδυνος", english: "dangerous", cefrLevel: "A2" },
		{ lemma: "θορυβώδης", english: "noisy/loud", cefrLevel: "B1" },
		{ lemma: "φοβισμένος", english: "scared", cefrLevel: "A2" },
		{ lemma: "άνετος", english: "comfortable", cefrLevel: "A2" },
	],

	phrases: [
		{ text: "με τα χρόνια", english: "over the years", metadata: {} },
		{
			text: "βγάζεις πιο πολλά λεφτά",
			english: "you make more money",
			metadata: {},
		},
		{ text: "παράδοση στο σπίτι", english: "home delivery", metadata: {} },
		{
			text: "προσέχουν ο ένας τον άλλον",
			english: "they look after each other",
			metadata: {},
		},
		{
			text: "κρίμα",
			english: "pity/what a shame",
			metadata: { usage: "common exclamation" },
		},
	],
});
