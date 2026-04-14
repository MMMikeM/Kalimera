import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_04_04 = createLesson({
	meta: {
		date: "2024-04-04",
		topic: "Abstract vocabulary - emotions, concepts",
		source: "Weekly lesson - advanced vocabulary",
	},

	verbs: [
		{ lemma: "δημιουργώ", english: "I create", conjugationFamily: "-άω/-ώ", cefrLevel: "B1" },
		{
			lemma: "ενισχύω",
			english: "I boost/strengthen",
			conjugationFamily: "-ω",
			cefrLevel: "B2",
		},
		{ lemma: "απολαμβάνω", english: "I enjoy", conjugationFamily: "-ω", cefrLevel: "B1" },
		{
			lemma: "εξοικονομώ",
			english: "I save (money)",
			conjugationFamily: "-άω/-ώ",
			cefrLevel: "B1",
		},
		{ lemma: "ξοδεύω", english: "I spend", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "επισκέπτομαι", english: "I visit", conjugationFamily: "-ομαι", cefrLevel: "A2" },
		{
			lemma: "ταυτίζομαι",
			english: "I relate/identify with",
			conjugationFamily: "-ομαι",
			cefrLevel: "B2",
		},
	],

	nouns: [
		{ lemma: "διάθεση", gender: "feminine", english: "mood" },
		{ lemma: "κίνητρο", gender: "neuter", english: "motivation" },
		{ lemma: "απόλαυση", gender: "feminine", english: "pleasure" },
		{ lemma: "εθισμός", gender: "masculine", english: "addiction" },
		{ lemma: "ισορροπία", gender: "feminine", english: "balance" },
	],

	adjectives: [
		{ lemma: "διασκεδαστικός", english: "fun/entertaining", cefrLevel: "A2" },
		{ lemma: "εθιστικός", english: "addictive", cefrLevel: "B1" },
		{ lemma: "πολυσύχναστος", english: "crowded", cefrLevel: "B1" },
		{ lemma: "αρνητικός", english: "negative", cefrLevel: "A2" },
		{ lemma: "θετικός", english: "positive", cefrLevel: "A2" },
		{ lemma: "ενδιαφέρον", english: "interesting", cefrLevel: "A1" },
		{ lemma: "προσεκτικός", english: "careful", cefrLevel: "A2" },
	],
});
