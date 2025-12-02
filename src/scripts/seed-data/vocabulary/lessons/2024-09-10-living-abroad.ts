import type { AdjectiveSeed, NounSeed, Phrase, VerbSeed } from "../../../../types/seed";

export const LESSON_2024_09_10 = {
	meta: {
		date: "2024-09-10",
		topic: "Living abroad vocabulary",
		source: "Weekly lesson - conversation about life in different countries",
	},

	verbs: [
		{ lemma: "υποφέρω", english: "I suffer", conjugationFamily: "-ω" },
		{ lemma: "παιδεύομαι", english: "I struggle", conjugationFamily: "-ομαι" },
		{ lemma: "προσπαθώ", english: "I try", conjugationFamily: "-άω/-ώ" },
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "υγρασία", gender: "feminine", english: "humidity" },
		{ lemma: "σκουπίδια", gender: "neuter", english: "garbage/trash" },
		{ lemma: "μάστορας", gender: "masculine", english: "handyman" },
		{ lemma: "μετανάστης", gender: "masculine", english: "immigrant" },
		{ lemma: "καριέρα", gender: "feminine", english: "career" },
		{ lemma: "εμβόλιο", gender: "neuter", english: "vaccine" },
		{ lemma: "ορχήστρα", gender: "feminine", english: "orchestra" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "επικίνδυνος", english: "dangerous" },
		{ lemma: "θορυβώδης", english: "noisy/loud" },
		{ lemma: "φοβισμένος", english: "scared" },
		{ lemma: "άνετος", english: "comfortable" },
	] satisfies AdjectiveSeed[],

	adverbs: [],

	phrases: [
		{ text: "με τα χρόνια", english: "over the years", metadata: {} },
		{ text: "βγάζεις πιο πολλά λεφτά", english: "you make more money", metadata: {} },
		{ text: "παράδοση στο σπίτι", english: "home delivery", metadata: {} },
		{ text: "προσέχουν ο ένας τον άλλον", english: "they look after each other", metadata: {} },
		{ text: "κρίμα", english: "pity/what a shame", metadata: { usage: "common exclamation" } },
	] satisfies Phrase[],

	grammarNotes: [],
} as const;
