import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_06_05 = createLesson({
	meta: {
		date: "2026-06-05",
		topic: "βοηθάω and the subjunctive",
		source: "Weekly lesson - βοηθάω / να βοηθήσω",
		nextLessonObjective: "Sing μικρό ελεφαντάκι",
	},

	verbs: [{ lemma: "βοηθάω", english: "I help", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" }],

	phrases: [
		{
			text: "να βοηθήσω",
			english: "to help",
			metadata: { pattern: "να + aorist subjunctive", usage: "e.g. μπορώ να βοηθήσω;" },
		},
	],

	grammarNotes: [
		{
			pattern: "Present vs subjunctive stem",
			examples: ["βοηθάω (I help) → να βοηθήσω (to help)"],
			explanation:
				"After να, -άω verbs switch to the aorist stem with -ήσ-: βοηθάω → βοηθήσω. Same pattern as μιλάω → να μιλήσω.",
		},
	],
});
