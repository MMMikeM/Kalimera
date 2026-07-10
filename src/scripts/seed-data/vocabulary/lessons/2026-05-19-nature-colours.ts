import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_05_19 = createLesson({
	meta: {
		date: "2026-05-19",
		topic: "Nature, colours, and υπάρχει/υπάρχουν",
		source: "Weekly lesson - nature scene description, colours, favourite colour",
		homework: "Check chat picture; learn to sing the song",
	},

	verbs: [
		{ lemma: "μυρίζω", english: "I smell", conjugationFamily: "-ω", cefrLevel: "A2" },
		{
			lemma: "υπάρχω",
			english: "I exist / there is",
			conjugationFamily: "-ω",
			cefrLevel: "A1",
		},
	],

	nouns: [
		// Nature
		{
			lemma: "δέντρο",
			gender: "neuter",
			english: "tree",
			cefrLevel: "A1",
			metadata: { note: "plural: τα δέντρα" },
		},
		{
			lemma: "λουλούδι",
			gender: "neuter",
			english: "flower",
			cefrLevel: "A1",
			metadata: { note: "plural: τα λουλούδια" },
		},
		{
			lemma: "σύννεφο",
			gender: "neuter",
			english: "cloud",
			cefrLevel: "A2",
			metadata: { note: "plural: τα σύννεφα" },
		},
		{
			lemma: "ουράνιο τόξο",
			gender: "neuter",
			english: "rainbow",
			cefrLevel: "A2",
			metadata: { note: "literally: sky arc" },
		},
		{ lemma: "ποταμός", gender: "masculine", english: "river", cefrLevel: "A2" },
		{ lemma: "φωτιά", gender: "feminine", english: "fire", cefrLevel: "A2" },
		// Colours topic
		{
			lemma: "πορτοκάλι",
			gender: "neuter",
			english: "orange (fruit)",
			cefrLevel: "A2",
			metadata: { note: "contrast πορτοκαλί (colour) — accent position changes meaning" },
		},
		{
			lemma: "τριαντάφυλλο",
			gender: "neuter",
			english: "rose",
			cefrLevel: "A2",
			metadata: { note: "plural: τα τριαντάφυλλα" },
		},
		{ lemma: "χρώμα", gender: "neuter", english: "colour", cefrLevel: "A1" },
		// People and things
		{
			lemma: "άνδρας",
			gender: "masculine",
			english: "man",
			cefrLevel: "A1",
			metadata: { note: "also spelled άντρας; plural: οι άνδρες" },
		},
		{
			lemma: "άνθρωπος",
			gender: "masculine",
			english: "person/human",
			cefrLevel: "A1",
			metadata: { note: "plural: οι άνθρωποι" },
		},
		{ lemma: "κιθάρα", gender: "feminine", english: "guitar", cefrLevel: "A2" },
	],

	adjectives: [
		{
			lemma: "πορτοκαλί",
			english: "orange (colour)",
			cefrLevel: "A2",
		},
		{ lemma: "αγαπημένος", english: "favourite", cefrLevel: "A2" },
	],

	adverbs: [{ lemma: "τότε", english: "then", cefrLevel: "A1" }],

	phrases: [
		{
			text: "ο ουρανός είναι μαύρος",
			english: "the sky is black",
			metadata: { usage: "describing a scene" },
		},
		{
			text: "υπάρχει φαγητό πάνω στη φωτιά",
			english: "there is food on the fire",
			metadata: { pattern: "υπάρχει + noun", usage: "saying something exists" },
		},
		{
			text: "ακούω το νερό του ποταμού",
			english: "I hear the water of the river",
			metadata: { pattern: "noun + genitive", note: "also: ακούω το νερό από τον ποταμό" },
		},
		{
			text: "ακούω μουσική από την κιθάρα του φίλου μου",
			english: "I hear music from my friend's guitar",
			metadata: { pattern: "από + accusative, genitive possession" },
		},
		{
			text: "ακούω τον σκύλο να τραγουδάει σαν τον λύκο",
			english: "I hear the dog singing like the wolf",
			metadata: { pattern: "ακούω + object + να + verb", usage: "perceiving an action" },
		},
		{
			text: "ποιο είναι το αγαπημένο σου χρώμα;",
			english: "what is your favourite colour?",
			metadata: { usage: "asking about favourites" },
		},
		{
			text: "Το αγαπημένο μου χρώμα είναι...",
			english: "My favourite colour is...",
			metadata: { pattern: "Το αγαπημένο μου + noun + είναι", usage: "stating favourites" },
		},
	],

	grammarNotes: [
		{
			pattern: "πολύ vs πολλά",
			examples: ["πολύ δέντρα ✗ → πολλά δέντρα ✓ (many trees)"],
			explanation:
				"πολύ is the invariable adverb (very/much). Before a plural noun you need the adjective πολλοί/πολλές/πολλά agreeing in gender: πολλά δέντρα (neuter plural).",
		},
		{
			pattern: "υπάρχει / υπάρχουν (there is / there are)",
			examples: [
				"Υπάρχει φαγητό πάνω στη φωτιά. (There is food on the fire.)",
				"Υπάρχουν πολλά δέντρα. (There are many trees.)",
			],
			explanation:
				"υπάρχει with singular nouns, υπάρχουν with plural — the verb agrees with what exists.",
		},
		{
			pattern: "πορτοκαλί vs πορτοκάλι",
			examples: [
				"πορτοκαλί = orange (colour, indeclinable adjective)",
				"πορτοκάλι = orange (fruit, neuter noun)",
			],
			explanation:
				"Accent position changes the meaning. The colour πορτοκαλί never changes form (indeclinable), like μπλε and ροζ.",
		},
	],
});
