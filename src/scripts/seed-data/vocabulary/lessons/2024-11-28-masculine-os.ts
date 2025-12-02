import type { NounSeed, Phrase } from "../../../../types/seed";

export const LESSON_2024_11_28 = {
	meta: {
		date: "2024-11-28",
		topic: "Masculine nouns ending in -ος",
		source: "Weekly lesson - masculine article declension",
	},

	// All -ος masculine nouns (regular pattern)
	nouns: [
		{ lemma: "λαγός", gender: "masculine", english: "rabbit" },
		{ lemma: "ποταμός", gender: "masculine", english: "river" },
		{ lemma: "βάτραχος", gender: "masculine", english: "frog" },
		{ lemma: "σκύλος", gender: "masculine", english: "dog" },
		{ lemma: "κηπουρός", gender: "masculine", english: "gardener" },
		{ lemma: "δρόμος", gender: "masculine", english: "road/street" },
		{ lemma: "ουρανός", gender: "masculine", english: "sky" },
		{ lemma: "γιατρός", gender: "masculine", english: "doctor" },
		{ lemma: "κήπος", gender: "masculine", english: "garden" },
		{ lemma: "αρχηγός", gender: "masculine", english: "leader" },
		{ lemma: "τοίχος", gender: "masculine", english: "wall" },
		{ lemma: "λύκος", gender: "masculine", english: "wolf" },
		{ lemma: "βράχος", gender: "masculine", english: "rock" },
		{ lemma: "άνθρωπος", gender: "masculine", english: "human/person" },
	] satisfies NounSeed[],

	verbs: [],
	adverbs: [],

	// Example sentences showing genitive usage
	phrases: [
		{
			text: "το ποδήλατο του αδερφού μου είναι κόκκινο",
			english: "my brother's bicycle is red",
			metadata: {
				grammar: "genitive possession",
				pattern: "το X του Y μου",
				note: "αδερφός → αδερφού (genitive singular)",
			},
		},
		{
			text: "τα νερά των ποταμών τρέχουν με δύναμη",
			english: "the waters of the rivers run with force",
			metadata: {
				grammar: "genitive plural",
				pattern: "των + genitive plural",
				note: "ποταμός → ποταμών (genitive plural -ος → -ών)",
			},
		},
	] satisfies Phrase[],

	// Grammar focus for this lesson
	grammarNotes: [
		{
			pattern: "Masculine -ος declension",
			examples: [
				"ο γιατρός → του γιατρού → τον γιατρό",
				"οι γιατροί → των γιατρών → τους γιατρούς",
			],
			explanation:
				"Regular masculine nouns ending in -ος follow predictable case endings",
		},
		{
			pattern: "Genitive singular -ου",
			examples: ["του αδερφού μου", "του γιατρού", "του σκύλου"],
			explanation: "Shows possession: 'of the X' or 'X's'",
		},
		{
			pattern: "Genitive plural -ών",
			examples: ["των ποταμών", "των ανθρώπων", "των δρόμων"],
			explanation: "Plural genitive always has accent on -ών",
		},
	],
} as const;
