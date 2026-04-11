import { createLesson } from "@/types/lesson-builder";
export const LESSON_2023_10_30 = createLesson({
	meta: {
		date: "2023-10-30",
		topic: "Basic nouns and articles introduction",
		source: "Weekly lesson - Ellinika A book lesson 2",
	},

	nouns: [
		// Places - many overlap with 2023-11-08 but that's ok, additive seeding handles it
		{ lemma: "Ελλάδα", gender: "feminine", english: "Greece" },
		{ lemma: "Ασία", gender: "feminine", english: "Asia" },
		{ lemma: "Αμερική", gender: "feminine", english: "America" },
		{ lemma: "Αίγυπτος", gender: "feminine", english: "Egypt" },
		{ lemma: "Αφρική", gender: "feminine", english: "Africa" },
		{ lemma: "Ευρώπη", gender: "feminine", english: "Europe" },
		{ lemma: "Αθήνα", gender: "feminine", english: "Athens" },
		{ lemma: "Θεσσαλονίκη", gender: "feminine", english: "Thessaloniki" },
		{ lemma: "Πεκίνο", gender: "neuter", english: "Beijing" },
	],
});
