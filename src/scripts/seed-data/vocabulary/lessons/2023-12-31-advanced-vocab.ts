import { createLesson } from "@/types/lesson-builder";
export const LESSON_2023_12_31 = createLesson({
	meta: {
		date: "2023-12-31",
		topic: "Advanced vocabulary - news, society",
		source: "Weekly lesson - reading comprehension",
	},

	verbs: [
		{ lemma: "απειλώ", english: "I threaten", conjugationFamily: "-άω/-ώ", cefrLevel: "B2" },
		{ lemma: "εμφανίζομαι", english: "I appear", conjugationFamily: "-ομαι", cefrLevel: "B1" },
		{
			lemma: "μεταφέρω",
			english: "I transfer/transport",
			conjugationFamily: "-ω",
			cefrLevel: "B1",
		},
		{ lemma: "ταΐζω", english: "I feed", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "εξουσιάζω", english: "I rule/dominate", conjugationFamily: "-ω", cefrLevel: "B2" },
	],

	nouns: [
		{ lemma: "θέρμανση", gender: "feminine", english: "heating", cefrLevel: "B1" },
		{ lemma: "ομίχλη", gender: "feminine", english: "fog", cefrLevel: "B1" },
		{ lemma: "εκπομπή", gender: "feminine", english: "broadcast/show", cefrLevel: "B1" },
		{ lemma: "εγκληματικότητα", gender: "feminine", english: "criminality", cefrLevel: "B2" },
		{ lemma: "ξεναγός", gender: "masculine", english: "tour guide", cefrLevel: "B1" },
		{ lemma: "φανάρι", gender: "neuter", english: "traffic light", cefrLevel: "A2" },
		{ lemma: "ασφάλεια", gender: "feminine", english: "safety/security", cefrLevel: "B1" },
		{ lemma: "όπλο", gender: "neuter", english: "weapon/gun", cefrLevel: "B1" },
		{ lemma: "φύλακας", gender: "masculine", english: "guard", cefrLevel: "B1" },
		{ lemma: "αποτέλεσμα", gender: "neuter", english: "result", cefrLevel: "B1" },
		{ lemma: "αιτία", gender: "feminine", english: "cause/reason", cefrLevel: "B1" },
		{ lemma: "στόχος", gender: "masculine", english: "goal/target", cefrLevel: "B1" },
		{ lemma: "ασθένεια", gender: "feminine", english: "illness", cefrLevel: "B1" },
		{ lemma: "άποψη", gender: "feminine", english: "opinion/view", cefrLevel: "B1" },
		{ lemma: "βυθός", gender: "masculine", english: "ocean floor/bottom", cefrLevel: "B2" },
		{ lemma: "κυβέρνηση", gender: "feminine", english: "government", cefrLevel: "B1" },
		{ lemma: "παράδοση", gender: "feminine", english: "tradition", cefrLevel: "B1" },
		{ lemma: "έθιμο", gender: "neuter", english: "custom", cefrLevel: "B1" },
	],

	adjectives: [
		{ lemma: "ασφαλής", english: "safe", cefrLevel: "A2" },
		{ lemma: "αποτελεσματικός", english: "effective", cefrLevel: "B1" },
		{ lemma: "βαθύς", english: "deep", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "μείον", english: "minus", cefrLevel: "A1" },
		{ lemma: "όπως ακριβώς", english: "exactly as", cefrLevel: "B1" },
	],

	phrases: [
		{ text: "με τα χρόνια", english: "over the years", metadata: {} },
		{ text: "οποιαδήποτε", english: "any (feminine)", metadata: {} },
	],

	grammarNotes: [
		{
			pattern: "Comparative with -τερος",
			examples: ["παλιός → παλιότερος", "βαθύς → βαθύτερος", "ψηλός → ψηλότερος"],
			explanation: "Alternative to πιο + adjective",
		},
	],
});
