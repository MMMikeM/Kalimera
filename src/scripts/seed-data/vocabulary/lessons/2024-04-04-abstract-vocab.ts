import type {
	AdjectiveSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_04_04 = {
	meta: {
		date: "2024-04-04",
		topic: "Abstract vocabulary - emotions, concepts",
		source: "Weekly lesson - advanced vocabulary",
	},

	verbs: [
		{ lemma: "δημιουργώ", english: "I create", conjugationFamily: "-άω/-ώ" },
		{
			lemma: "ενισχύω",
			english: "I boost/strengthen",
			conjugationFamily: "-ω",
		},
		{ lemma: "απολαμβάνω", english: "I enjoy", conjugationFamily: "-ω" },
		{
			lemma: "εξοικονομώ",
			english: "I save (money)",
			conjugationFamily: "-άω/-ώ",
		},
		{ lemma: "ξοδεύω", english: "I spend", conjugationFamily: "-ω" },
		{ lemma: "επισκέπτομαι", english: "I visit", conjugationFamily: "-ομαι" },
		{
			lemma: "ταυτίζομαι",
			english: "I relate/identify with",
			conjugationFamily: "-ομαι",
		},
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "διάθεση", gender: "feminine", english: "mood" },
		{ lemma: "κίνητρο", gender: "neuter", english: "motivation" },
		{ lemma: "απόλαυση", gender: "feminine", english: "pleasure" },
		{ lemma: "εθισμός", gender: "masculine", english: "addiction" },
		{ lemma: "ισορροπία", gender: "feminine", english: "balance" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "διασκεδαστικός", english: "fun/entertaining" },
		{ lemma: "εθιστικός", english: "addictive" },
		{ lemma: "πολυσύχναστος", english: "crowded" },
		{ lemma: "αρνητικός", english: "negative" },
		{ lemma: "θετικός", english: "positive" },
		{ lemma: "ενδιαφέρον", english: "interesting" },
		{ lemma: "προσεκτικός", english: "careful" },
	] satisfies AdjectiveSeed[],

	adverbs: [],
	phrases: [] satisfies Phrase[],
	grammarNotes: [],
} as const;
