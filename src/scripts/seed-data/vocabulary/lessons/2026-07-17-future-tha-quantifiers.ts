import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_07_17 = createLesson({
	meta: {
		date: "2026-07-17",
		topic: "Future with θα and the υπάρχει quantifier ladder",
		source:
			"Weekly lesson - θα υπάρχει/θα υπάρχουν, ένας/κανένας/καθόλου/μερικοί/πολλοί recap, neighbourhood sentence practice",
		homework: "Describe your future city or area using θα υπάρχει/θα υπάρχουν",
	},

	nouns: [{ lemma: "φύση", gender: "feminine", english: "nature", cefrLevel: "A2" }],

	adjectives: [{ lemma: "άρρωστος", english: "sick/ill", cefrLevel: "A2" }],

	phrases: [
		{
			text: "μέσα μαζικής μεταφοράς",
			english: "public transport",
			metadata: { note: "literally 'means of mass transport'; plural: τα μέσα" },
		},
		{
			text: "στο μικρό μου χωριό δεν υπάρχουν καθόλου τράπεζες, αλλά έχουμε μερικά ΑΤΜ",
			english: "in my small village there aren't any banks, but we have some ATMs",
			metadata: { pattern: "δεν υπάρχουν + καθόλου (plural negative)" },
		},
		{
			text: "θα υπάρχουν πολλά πάρκα στην πόλη μου",
			english: "there will be many parks in my city",
			metadata: { pattern: "θα + υπάρχουν (future)", usage: "describing the future" },
		},
		{
			text: "δεν θα υπάρχει κανένα αυτοκίνητο",
			english: "there won't be any car",
			metadata: { pattern: "δεν θα υπάρχει + κανένα" },
		},
	],

	grammarNotes: [
		{
			pattern: "Future with θα",
			examples: [
				"υπάρχει → θα υπάρχει (there will be)",
				"υπάρχουν → θα υπάρχουν",
				"θα είμαι, θα είσαι, θα είναι... (I will be, you will be...)",
				"δεν θα υπάρχει (there won't be)",
			],
			explanation:
				"θα before the verb puts it in the future. For είμαι and υπάρχει the verb form doesn't change — θα does all the work. Negative: δεν θα + verb.",
		},
		{
			pattern: "Quantifier ladder with υπάρχει/υπάρχουν",
			examples: [
				"ένας/μία/ένα — υπάρχει ένα παντοπωλείο (a/one)",
				"κανένας/καμία/κανένα — δεν υπάρχει κανένα παγωτατζίδικο (not any, singular)",
				"καθόλου — δεν υπάρχουν καθόλου τράπεζες (not any, plural)",
				"μερικοί/μερικές/μερικά — υπάρχουν μερικά ωραία καταστήματα (some)",
				"πολλοί/πολλές/πολλά — υπάρχουν πολλά εστιατόρια (many)",
			],
			explanation:
				"Singular pairs: ένα (a) with υπάρχει, κανένα (not any) with δεν υπάρχει. Plural pairs: μερικά (some) and πολλά (many) with υπάρχουν, καθόλου with δεν υπάρχουν. All except καθόλου agree in gender.",
		},
	],
});
