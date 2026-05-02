import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_01_27 = createLesson({
	meta: {
		date: "2025-01-27",
		topic: "Simple past — irregular verbs (είδα, δοκίμασα, μπόρεσα)",
		source: "Weekly lesson - past tense of βλέπω, δοκιμάζω, μπορώ",
	},

	verbs: [
		{ lemma: "βλέπω", english: "I see/watch", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "δοκιμάζω", english: "I try/taste", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "μπορώ", english: "I can/am able to", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "κάνω", english: "I do/make", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "τρώω", english: "I eat", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	phrases: [
		// Past tense forms as phrases (irregular)
		{
			text: "είδα",
			english: "I saw (past of βλέπω)",
			metadata: { pattern: "irregular past of βλέπω", usage: "simple past" },
		},
		{
			text: "ήπια",
			english: "I drank (past of πίνω)",
			metadata: { pattern: "irregular past of πίνω", usage: "simple past" },
		},
		{
			text: "έκανα",
			english: "I did/made (past of κάνω)",
			metadata: { pattern: "irregular past of κάνω", usage: "simple past" },
		},
		{
			text: "έφαγα",
			english: "I ate (past of τρώω)",
			metadata: { pattern: "irregular past of τρώω", usage: "simple past" },
		},
		// Regular past forms
		{
			text: "δοκίμασα",
			english: "I tried/tasted (past of δοκιμάζω)",
			metadata: { pattern: "regular past -σα of δοκιμάζω", usage: "simple past" },
		},
		{
			text: "μπόρεσα",
			english: "I was able to/could (past of μπορώ)",
			metadata: { pattern: "past of μπορώ", usage: "simple past" },
		},
		// Useful expressions from lesson
		{
			text: "γι' αυτό",
			english: "that's why / for that reason",
			metadata: { usage: "linking cause and result" },
		},
		{
			text: "μου αρέσουν τα παλιά τραγούδια",
			english: "I like old songs",
			metadata: { pattern: "μου αρέσουν + plural noun", usage: "expressing likes" },
		},
		{
			text: "ήταν πολύ ωραία",
			english: "it was very nice",
			metadata: { usage: "commenting on past experience" },
		},
	],

	grammarNotes: [
		{
			pattern: "Irregular simple past — είδα (βλέπω)",
			examples: [
				"είδα (I saw)",
				"είδες (you saw)",
				"είδε (he/she saw)",
				"είδαμε (we saw)",
				"είδατε (you pl. saw)",
				"είδαν (they saw)",
			],
			explanation:
				"βλέπω has a completely irregular past: είδα. The stem changes entirely (βλεπ- → ειδ-). This is one of the most common irregular past tenses.",
		},
		{
			pattern: "Regular simple past — δοκίμασα (δοκιμάζω)",
			examples: [
				"δοκίμασα (I tried)",
				"δοκίμασες (you tried)",
				"δοκίμασε (he/she tried)",
				"δοκιμάσαμε (we tried)",
				"δοκιμάσατε (you pl. tried)",
				"δοκίμασαν (they tried)",
			],
			explanation:
				"Verbs ending in -ζω typically form the past by replacing -ζω with -σα. The stem vowel may shift (δοκιμάζ- → δοκίμασ-).",
		},
		{
			pattern: "Simple past — μπόρεσα (μπορώ)",
			examples: [
				"μπόρεσα (I could)",
				"μπόρεσες (you could)",
				"μπόρεσε (he/she could)",
				"μπορέσαμε (we could)",
				"μπορέσατε (you pl. could)",
				"μπόρεσαν (they could)",
			],
			explanation:
				"μπορώ (can/to be able) forms its past with -εσ- infix: μπόρεσα. Stress shifts in the 1st/2nd person plural.",
		},
		{
			pattern: "Key irregular past forms summary",
			examples: [
				"βλέπω → είδα (see → saw)",
				"πίνω → ήπια (drink → drank)",
				"κάνω → έκανα (do → did)",
				"τρώω → έφαγα (eat → ate)",
			],
			explanation:
				"These four verbs have irregular past tense stems. They are extremely common and worth memorising as individual forms rather than by rule.",
		},
	],
});
