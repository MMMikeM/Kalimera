import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_11_28 = createLesson({
	meta: {
		date: "2024-11-28",
		topic: "Masculine nouns ending in -ος",
		source: "Weekly lesson - masculine article declension",
	},

	// All -ος masculine nouns (regular pattern)
	nouns: [
		{ lemma: "λαγός", gender: "masculine", english: "rabbit", cefrLevel: "B1" },
		{ lemma: "ποταμός", gender: "masculine", english: "river", cefrLevel: "A2" },
		{ lemma: "βάτραχος", gender: "masculine", english: "frog", cefrLevel: "B1" },
		{ lemma: "σκύλος", gender: "masculine", english: "dog", cefrLevel: "A2" },
		{ lemma: "κηπουρός", gender: "masculine", english: "gardener", cefrLevel: "B1" },
		{ lemma: "δρόμος", gender: "masculine", english: "road/street", cefrLevel: "A2" },
		{ lemma: "ουρανός", gender: "masculine", english: "sky", cefrLevel: "A1" },
		{ lemma: "γιατρός", gender: "masculine", english: "doctor", cefrLevel: "A2" },
		{ lemma: "κήπος", gender: "masculine", english: "garden", cefrLevel: "A2" },
		{ lemma: "αρχηγός", gender: "masculine", english: "leader", cefrLevel: "B1" },
		{ lemma: "τοίχος", gender: "masculine", english: "wall", cefrLevel: "B1" },
		{ lemma: "λύκος", gender: "masculine", english: "wolf", cefrLevel: "B1" },
		{ lemma: "βράχος", gender: "masculine", english: "rock", cefrLevel: "B1" },
		{ lemma: "άνθρωπος", gender: "masculine", english: "human/person", cefrLevel: "A1" },
	],

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
	],

	// Grammar focus for this lesson
	grammarNotes: [
		{
			pattern: "Masculine -ος declension",
			examples: [
				"ο γιατρός → του γιατρού → τον γιατρό",
				"οι γιατροί → των γιατρών → τους γιατρούς",
			],
			explanation: "Regular masculine nouns ending in -ος follow predictable case endings",
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
});
