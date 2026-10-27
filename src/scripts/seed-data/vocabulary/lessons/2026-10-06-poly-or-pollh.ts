import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_06 = createLesson({
	meta: {
		date: "2026-10-06",
		topic: "πολύ or πολλή",
		source:
			"Weekly lesson - πολύς before a noun, which agrees (πολλή δουλειά, πολλά πράγματα, πολύς κόσμος, πολύ νερό), against πολύ before an adjective or adverb, which never changes (πολύ όμορφος, πολύ καλά); από + Target form in a find-the-mistake sentence; αυτό το Σαββατοκύριακο keeps the article; παραπολύ for too much; reviewed the plural homework describing a picture of parents",
		homework: "Make sentences with πολύ and πολλή, and look into the other forms of πολύς",
	},

	verbs: [{ lemma: "μαθαίνω", english: "I learn", conjugationFamily: "-ω", cefrLevel: "A1" }],

	nouns: [
		{ lemma: "δουλειά", gender: "feminine", english: "work/job", cefrLevel: "A1" },
		{ lemma: "πράγμα", gender: "neuter", english: "thing", cefrLevel: "A1" },
		{ lemma: "κόσμος", gender: "masculine", english: "world/people", cefrLevel: "A2" },
		{ lemma: "νερό", gender: "neuter", english: "water", cefrLevel: "A1" },
		{ lemma: "σκύλος", gender: "masculine", english: "dog", cefrLevel: "A2" },
		{ lemma: "γονέας", gender: "masculine", english: "parent (γονείς = parents)", cefrLevel: "A1" },
		{
			lemma: "συμμαθητής",
			gender: "masculine",
			english: "classmate",
			cefrLevel: "A2",
			metadata: { note: "η συμμαθήτρια = female classmate" },
		},
		{ lemma: "Σαββατοκύριακο", gender: "neuter", english: "weekend", cefrLevel: "A1" },
	],

	adjectives: [
		{ lemma: "πολύς", english: "much/many", cefrLevel: "A1" },
		{ lemma: "όμορφος", english: "beautiful", cefrLevel: "A1" },
		{ lemma: "μεγάλος", english: "big/large", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "πολύ", english: "very; a lot", cefrLevel: "A1" },
		{ lemma: "παραπολύ", english: "too much, too", cefrLevel: "A2" },
		{ lemma: "καλά", english: "well", cefrLevel: "A1" },
	],

	phrases: [
		{
			text: "Είναι παραπολύ μεγάλο.",
			english: "It's too big.",
			metadata: { pattern: "παραπολύ + adjective", note: "πάρα πολύ, two words, is very much" },
		},
		{
			text: "αυτό το Σαββατοκύριακο",
			english: "this weekend",
			metadata: { pattern: "αυτό + article + noun", note: "not αυτό Σαββατοκύριακο" },
		},
		{ text: "Τι θα κάνεις αυτό το Σαββατοκύριακο;", english: "What are you doing this weekend?" },
		{ text: "Είναι οι γονείς μου.", english: "They're my parents." },
		{
			text: "Έχω πολλή δουλειά.",
			english: "I have a lot of work.",
			metadata: { pattern: "πολλή + feminine noun", note: "πολλή and πολύ sound the same; only the spelling shows the feminine" },
		},
		{
			text: "Έχω πολλά πράγματα να κάνω.",
			english: "I have a lot of things to do.",
			metadata: { pattern: "πολλά + neuter plural noun", note: "things to do takes να, not θα" },
		},
		{ text: "Θα κάνω πολλά πράγματα.", english: "I'll do a lot of things." },
		{
			text: "Έμαθα πολλά πράγματα από τους συμμαθητές μου.",
			english: "I learned a lot of things from my classmates.",
			metadata: { pattern: "από + Target form: τους συμμαθητές" },
		},
		{
			text: "πολύς κόσμος",
			english: "a lot of people",
			metadata: { pattern: "πολύς + masculine noun", note: "κόσμος is singular in Greek" },
		},
		{ text: "πολύ νερό", english: "a lot of water", metadata: { pattern: "πολύ + neuter noun" } },
		{
			text: "πολύ όμορφος σκύλος",
			english: "a very beautiful dog",
			metadata: { pattern: "πολύ before an adjective never changes" },
		},
		{
			text: "πολύ καλά",
			english: "very well",
			metadata: { pattern: "πολύ before an adverb never changes" },
		},
	],

	grammarNotes: [
		{
			pattern: "πολλή or πολύ before a noun",
			examples: [
				"Έχω πολλή δουλειά. (feminine)",
				"πολύς κόσμος (masculine)",
				"πολύ νερό (neuter)",
				"Έχω πολλά πράγματα να κάνω. (neuter plural)",
			],
			explanation:
				"Before a noun, πολύς copies its gender and number. πολλή and πολύ sound the same, so only the spelling shows the feminine. You will see πολύ with a feminine noun too, but πολλή is the standard form.",
			section: "scales/poly-polla",
		},
		{
			pattern: "πολύ before an adjective or adverb never changes",
			examples: ["πολύ όμορφος σκύλος", "πολύ καλά"],
			explanation:
				"Here πολύ means very and stays πολύ whatever follows. In πολύ όμορφος σκύλος it is όμορφος that agrees with σκύλος.",
			section: "agreement/adverbs",
		},
		{
			pattern: "από + Target form",
			examples: ["Έμαθα πολλά πράγματα από τους συμμαθητές μου.", "οι συμμαθητές → από τους συμμαθητές"],
			explanation:
				"After a preposition such as από, the noun takes the Target form. συμμαθητές is masculine plural, so the article is τους.",
			section: "roles/target",
		},
		{
			pattern: "αυτό το Σαββατοκύριακο: this keeps the article",
			examples: ["αυτό το Σαββατοκύριακο", "αυτή την εβδομάδα"],
			explanation:
				"With αυτός, αυτή, αυτό for this, the noun keeps its article. As a time it takes the Target form, which for a neuter looks the same.",
			section: "little-words/long-forms",
		},
		{
			pattern: "παραπολύ: too much",
			examples: ["Είναι παραπολύ μεγάλο."],
			explanation: "Written as one word, παραπολύ means more than it should be. πάρα πολύ, two words, means very much.",
			section: "word",
		},
	],
});
