import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_07_01 = createLesson({
	meta: {
		date: "2024-07-01",
		topic: "Daily action verbs",
		source: "Weekly lesson",
	},

	verbs: [
		{ lemma: "παίρνω", english: "I take", conjugationFamily: "-ω", cefrLevel: "A1" },
		{
			lemma: "περνάω",
			english: "I pass/cross/have fun",
			conjugationFamily: "-άω/-ώ",
			cefrLevel: "A1",
		},
		{
			lemma: "ζεσταίνομαι",
			english: "I feel warm/get hot",
			conjugationFamily: "-ομαι",
			cefrLevel: "A2",
		},
		{
			lemma: "κλείνω",
			english: "I close/turn off/book",
			conjugationFamily: "-ω",
			cefrLevel: "A1",
		},
		{ lemma: "φτάνω", english: "I arrive", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	adverbs: [{ lemma: "όμως", english: "though/however", cefrLevel: "A2" }],

	phrases: [
		{
			text: "παίρνω τηλέφωνο",
			english: "I make a phone call",
			metadata: { literal: "I take telephone", usage: "very common" },
		},
		{
			text: "περνάω καλά",
			english: "I'm having a good time",
			metadata: { literal: "I pass well", usage: "very common" },
		},
		{
			text: "μια χαρά",
			english: "fine/great",
			metadata: { usage: "response to 'how are you'" },
		},
		{
			text: "μου λείπεις",
			english: "I miss you",
			metadata: {
				literal: "you are missing to me",
				grammar: "dative-like construction",
			},
		},
	],

	grammarNotes: [
		{
			pattern: "κλείνω multiple meanings",
			examples: [
				"κλείνω την πόρτα (I close the door)",
				"κλείνω το τηλέφωνο (I hang up)",
				"κλείνω ραντεβού (I book an appointment)",
			],
			explanation: "Context determines meaning",
		},
	],
});
