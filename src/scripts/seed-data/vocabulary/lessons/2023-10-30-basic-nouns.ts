import { createLesson } from "@/types/lesson-builder";
export const LESSON_2023_10_30 = createLesson({
	meta: {
		date: "2023-10-30",
		topic: "Basic nouns and articles introduction",
		source: "Weekly lesson - Ellinika A book lesson 2",
	},

	nouns: [
		// Places - many overlap with 2023-11-08 but that's ok, additive seeding handles it
		{ lemma: "Ελλάδα", gender: "feminine", english: "Greece", cefrLevel: "A1" },
		{ lemma: "Ασία", gender: "feminine", english: "Asia", cefrLevel: "A2" },
		{ lemma: "Αμερική", gender: "feminine", english: "America", cefrLevel: "A1" },
		{ lemma: "Αίγυπτος", gender: "feminine", english: "Egypt", cefrLevel: "B1" },
		{ lemma: "Αφρική", gender: "feminine", english: "Africa", cefrLevel: "A2" },
		{ lemma: "Ευρώπη", gender: "feminine", english: "Europe", cefrLevel: "A2" },
		{ lemma: "Αθήνα", gender: "feminine", english: "Athens", cefrLevel: "A1" },
		{ lemma: "Θεσσαλονίκη", gender: "feminine", english: "Thessaloniki", cefrLevel: "A1" },
		{ lemma: "Πεκίνο", gender: "neuter", english: "Beijing", cefrLevel: "B1" },
	],
});
