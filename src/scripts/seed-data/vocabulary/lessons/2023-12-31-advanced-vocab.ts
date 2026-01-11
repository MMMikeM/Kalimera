import type {
	AdjectiveSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2023_12_31 = {
	meta: {
		date: "2023-12-31",
		topic: "Advanced vocabulary - news, society",
		source: "Weekly lesson - reading comprehension",
	},

	verbs: [
		{ lemma: "απειλώ", english: "I threaten", conjugationFamily: "-άω/-ώ" },
		{ lemma: "εμφανίζομαι", english: "I appear", conjugationFamily: "-ομαι" },
		{
			lemma: "μεταφέρω",
			english: "I transfer/transport",
			conjugationFamily: "-ω",
		},
		{ lemma: "ταΐζω", english: "I feed", conjugationFamily: "-ω" },
		{ lemma: "εξουσιάζω", english: "I rule/dominate", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "θέρμανση", gender: "feminine", english: "heating" },
		{ lemma: "ομίχλη", gender: "feminine", english: "fog" },
		{ lemma: "εκπομπή", gender: "feminine", english: "broadcast/show" },
		{ lemma: "εγκληματικότητα", gender: "feminine", english: "criminality" },
		{ lemma: "ξεναγός", gender: "masculine", english: "tour guide" },
		{ lemma: "φανάρι", gender: "neuter", english: "traffic light" },
		{ lemma: "ασφάλεια", gender: "feminine", english: "safety/security" },
		{ lemma: "όπλο", gender: "neuter", english: "weapon/gun" },
		{ lemma: "φύλακας", gender: "masculine", english: "guard" },
		{ lemma: "αποτέλεσμα", gender: "neuter", english: "result" },
		{ lemma: "αιτία", gender: "feminine", english: "cause/reason" },
		{ lemma: "στόχος", gender: "masculine", english: "goal/target" },
		{ lemma: "ασθένεια", gender: "feminine", english: "illness" },
		{ lemma: "άποψη", gender: "feminine", english: "opinion/view" },
		{ lemma: "βυθός", gender: "masculine", english: "ocean floor/bottom" },
		{ lemma: "κυβέρνηση", gender: "feminine", english: "government" },
		{ lemma: "παράδοση", gender: "feminine", english: "tradition" },
		{ lemma: "έθιμο", gender: "neuter", english: "custom" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "ασφαλής", english: "safe" },
		{ lemma: "αποτελεσματικός", english: "effective" },
		{ lemma: "βαθύς", english: "deep" },
	] satisfies AdjectiveSeed[],

	adverbs: [
		{ lemma: "μείον", english: "minus" },
		{ lemma: "όπως ακριβώς", english: "exactly as" },
	],

	phrases: [
		{ text: "με τα χρόνια", english: "over the years", metadata: {} },
		{ text: "οποιαδήποτε", english: "any (feminine)", metadata: {} },
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Comparative with -τερος",
			examples: [
				"παλιός → παλιότερος",
				"βαθύς → βαθύτερος",
				"ψηλός → ψηλότερος",
			],
			explanation: "Alternative to πιο + adjective",
		},
	],
} as const;
