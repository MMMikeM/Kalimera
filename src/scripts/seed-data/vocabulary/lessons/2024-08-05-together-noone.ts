import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_08_05 = createLesson({
	meta: {
		date: "2024-08-05",
		topic: "Together, all, no one",
		source: "Weekly lesson",
	},

	adverbs: [{ lemma: "μαζί", english: "together" }],

	phrases: [
		{
			text: "όλοι",
			english: "all/everyone",
			metadata: { grammar: "masculine plural" },
		},
		{
			text: "όλοι μαζί",
			english: "all together",
			metadata: { usage: "very common expression" },
		},
		{
			text: "κανένας",
			english: "no one (masculine)",
			metadata: { grammar: "also κανείς", note: "negative pronoun" },
		},
		{
			text: "καμία",
			english: "no one (feminine)",
			metadata: { grammar: "feminine form" },
		},
		{
			text: "κανένα",
			english: "none (neuter)",
			metadata: { grammar: "neuter form" },
		},
	],

	grammarNotes: [
		{
			pattern: "κανένας/καμία/κανένα",
			examples: ["κανένας δεν ξέρει", "καμία δεν ήρθε"],
			explanation: "Negative pronoun - changes for gender like adjectives",
		},
	],
});
