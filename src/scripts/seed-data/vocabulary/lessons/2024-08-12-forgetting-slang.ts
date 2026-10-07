import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_08_12 = createLesson({
	meta: {
		date: "2024-08-12",
		topic: "Forgetting, slang, vegetables",
		source: "Weekly lesson",
	},

	verbs: [{ lemma: "ξεχνάω", english: "I forget", conjugationFamily: "-άω", cefrLevel: "A2" }],

	nouns: [{ lemma: "λαχανικά", gender: "neuter", english: "vegetables", cefrLevel: "A1" }],

	phrases: [
		{
			text: "ξέχασα",
			english: "I forgot!",
			metadata: { grammar: "past tense of ξεχνάω", usage: "very common" },
		},
		{
			text: "είσαι ψώνιο",
			english: "you're a show-off, full of yourself (neuter)",
			metadata: { register: "slang/playful", usage: "teasing" },
		},
		{
			text: "είσαι ψωνάρα",
			english: "you're a total egomaniac, so full of yourself",
			metadata: { register: "slang/playful", note: "augmentative form" },
		},
	],
});
