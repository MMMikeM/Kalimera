import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_05_29 = createLesson({
	meta: {
		date: "2026-05-29",
		topic: "Daily routine, meals, and frequency adverbs",
		source: "Weekly lesson - time of day → meal names, frequency scale",
		homework: "Write down and tell me how life is in your country (see picture on chat)",
	},

	nouns: [
		// Time of day → meal pairs
		{
			lemma: "πρωί",
			gender: "neuter",
			english: "morning",
			cefrLevel: "A1",
			metadata: { note: "pair: πρωινό = breakfast" },
		},
		{ lemma: "πρωινό", gender: "neuter", english: "breakfast", cefrLevel: "A1" },
		{
			lemma: "μεσημέρι",
			gender: "neuter",
			english: "noon/midday",
			cefrLevel: "A1",
			metadata: { note: "pair: μεσημεριανό = lunch" },
		},
		{ lemma: "μεσημεριανό", gender: "neuter", english: "lunch", cefrLevel: "A1" },
		{
			lemma: "βράδυ",
			gender: "neuter",
			english: "evening",
			cefrLevel: "A1",
			metadata: { note: "pair: βραδινό = dinner" },
		},
		{ lemma: "βραδινό", gender: "neuter", english: "dinner", cefrLevel: "A1" },
		{
			lemma: "μεσάνυχτα",
			gender: "neuter",
			english: "midnight",
			cefrLevel: "A2",
			metadata: { note: "plural-only: τα μεσάνυχτα" },
		},
		{ lemma: "υπνάκος", gender: "masculine", english: "nap", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "ποτέ", english: "never", cefrLevel: "A1" },
		{ lemma: "σπάνια", english: "rarely", cefrLevel: "A2" },
		{ lemma: "μερικές φορές", english: "sometimes", cefrLevel: "A2" },
		{ lemma: "συνήθως", english: "usually", cefrLevel: "A1" },
		{ lemma: "πάντα", english: "always", cefrLevel: "A1" },
	],

	phrases: [
		{
			text: "το πρωί συνήθως πάω στο Lidl για ψώνια",
			english: "in the morning I usually go to Lidl for shopping",
			metadata: { pattern: "time expression + frequency adverb + verb", usage: "daily routine" },
		},
		{
			text: "συνήθως κοιμάμαι τα μεσάνυχτα και ξυπνάω στις 8 η ώρα",
			english: "I usually sleep at midnight and wake up at 8 o'clock",
			metadata: { pattern: "κοιμάμαι + time, ξυπνάω στις + hour", usage: "sleep routine" },
		},
		{
			text: "είμαι κουρασμένος",
			english: "I am tired (m)",
			metadata: { usage: "describing state" },
		},
		{
			text: "παίρνω έναν υπνάκο",
			english: "I take a nap",
			metadata: { pattern: "παίρνω + accusative", usage: "daily routine" },
		},
	],

	grammarNotes: [
		{
			pattern: "Time of day → meal name",
			examples: [
				"το πρωί → το πρωινό (morning → breakfast)",
				"το μεσημέρι → το μεσημεριανό (noon → lunch)",
				"το βράδυ → το βραδινό (evening → dinner)",
			],
			explanation:
				"Each time of day has a matching meal name formed with -ινό/-ιανό. All are neuter.",
		},
		{
			pattern: "Frequency scale",
			examples: ["ποτέ → σπάνια → μερικές φορές → συνήθως → πάντα"],
			explanation:
				"Frequency adverbs from never to always. They usually sit before the verb: συνήθως πάω, ποτέ δεν πάω (ποτέ needs δεν with the verb).",
		},
	],
});
