import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_03_27 = createLesson({
	meta: {
		date: "2025-03-27",
		topic: "παίρνω/πήρα, πουθενά, ταινία — taking, calling, nowhere, film",
		source: "Weekly lesson - παίρνω irregular past, πήρα τηλέφωνο idiom",
	},

	verbs: [
		{ lemma: "παίρνω", english: "I take/get/receive", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [{ lemma: "ταινία", gender: "feminine", english: "film/movie", cefrLevel: "A1" }],

	adjectives: [{ lemma: "κουρασμένος", english: "tired", cefrLevel: "A1" }],

	adverbs: [{ lemma: "πουθενά", english: "nowhere / anywhere (in negative)", cefrLevel: "A2" }],

	phrases: [
		{
			text: "πήρα",
			english: "I took/got (past of παίρνω)",
			metadata: { pattern: "irregular past of παίρνω", usage: "simple past" },
		},
		{
			text: "πήρα τηλέφωνο",
			english: "I called (on the phone)",
			metadata: {
				pattern: "πήρα τηλέφωνο — idiomatic",
				usage: "making a phone call — literally 'I took phone'",
			},
		},
		{
			text: "δεν πήγα πουθενά",
			english: "I didn't go anywhere",
			metadata: { pattern: "δεν + verb + πουθενά", usage: "nowhere — double negative in Greek" },
		},
	],

	grammarNotes: [
		{
			pattern: "παίρνω → πήρα (irregular past)",
			examples: [
				"πήρα (I took)",
				"πήρες (you took)",
				"πήρε (he/she took)",
				"πήραμε (we took)",
				"πήρατε (you pl. took)",
				"πήραν (they took)",
			],
			explanation:
				"παίρνω has an irregular past stem πήρ-. Very common verb — used for taking, getting, receiving, and idiomatically for making phone calls (πήρα τηλέφωνο).",
		},
		{
			pattern: "πουθενά — double negative",
			examples: [
				"δεν πήγα πουθενά (I didn't go anywhere / I went nowhere)",
				"δεν είδα κανέναν πουθενά (I didn't see anyone anywhere)",
			],
			explanation:
				"Greek uses double negation: δεν + πουθενά is standard and correct — equivalent to English 'not anywhere'. Saying just 'πήγα πουθενά' without δεν is ungrammatical.",
		},
	],
});
