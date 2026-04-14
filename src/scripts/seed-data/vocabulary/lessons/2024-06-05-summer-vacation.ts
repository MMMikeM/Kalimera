import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_06_05 = createLesson({
	meta: {
		date: "2024-06-05",
		topic: "Summer vacation vocabulary and verb conjugations",
		source: "Weekly lesson - Ο Νίκος στην Κρήτη text",
	},

	verbs: [
		{ lemma: "πηγαίνω", english: "I go", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "κολυμπάω", english: "I swim", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "φωτογραφίζω", english: "I photograph", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "ταξιδεύω", english: "I travel", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "χαλαρώνω", english: "I relax", conjugationFamily: "-ω", cefrLevel: "B1" },
	],

	nouns: [
		// Summer/beach
		{ lemma: "ξενοδοχείο", gender: "neuter", english: "hotel" },
		{ lemma: "βαλίτσα", gender: "feminine", english: "suitcase/luggage" },
		// Food
		{ lemma: "ροδάκινο", gender: "neuter", english: "peach" },
		{ lemma: "πεπόνι", gender: "neuter", english: "melon" },
		{ lemma: "ψάρι", gender: "neuter", english: "fish" },
	],

	phrases: [
		{
			text: "είμαι διακοπές",
			english: "I am on vacation",
			metadata: { note: "no article needed" },
		},
		{
			text: "καλοκαιρινές διακοπές",
			english: "summer holidays",
			metadata: { grammar: "adjective + noun agreement" },
		},
		{
			text: "κάθε μέρα",
			english: "every day",
			metadata: { usage: "time expression" },
		},
	],

	grammarNotes: [
		{
			pattern: "-ω verb conjugation",
			examples: ["πηγαίνω, πηγαίνεις, πηγαίνει", "πηγαίνουμε, πηγαίνετε, πηγαίνουν"],
			explanation: "Regular -ω family pattern",
		},
		{
			pattern: "-άω verb conjugation",
			examples: ["κολυμπάω, κολυμπάς, κολυμπάει", "κολυμπάμε, κολυμπάτε, κολυμπάνε"],
			explanation: "Regular -άω/-ώ family pattern",
		},
		{
			pattern: "Irregular πάω",
			examples: ["πάω, πας, πάει", "πάμε, πάτε, πάνε"],
			explanation: "Short form of πηγαίνω - irregular",
		},
		{
			pattern: "Irregular τρώω",
			examples: ["τρώω, τρως, τρώει", "τρώμε, τρώτε, τρώνε"],
			explanation: "Irregular verb - note the ω throughout",
		},
	],
});
