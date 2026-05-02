import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_04_17 = createLesson({
	meta: {
		date: "2025-04-17",
		topic: "επισκέπτομαι — deponent verb for visiting, present and past",
		source: "Weekly lesson - Ελληνικά A pp.45-47, επισκέπτομαι/επισκέφτηκα",
	},

	verbs: [
		{
			lemma: "επισκέπτομαι",
			english: "I visit",
			conjugationFamily: "-ομαι",
			cefrLevel: "A2",
		},
	],

	phrases: [
		{
			text: "επισκέφτηκα",
			english: "I visited (past of επισκέπτομαι)",
			metadata: { pattern: "deponent past -τηκα of επισκέπτομαι", usage: "simple past" },
		},
	],

	grammarNotes: [
		{
			pattern: "επισκέπτομαι — present tense",
			examples: [
				"επισκέπτομαι (I visit)",
				"επισκέπτεσαι (you visit)",
				"επισκέπτεται (he/she visits)",
				"επισκεπτόμαστε (we visit)",
				"επισκέπτεστε (you pl. visit)",
				"επισκέπτονται (they visit)",
			],
			explanation:
				"επισκέπτομαι is deponent — active meaning but passive-form ending (-ομαι). It means 'to visit someone' and cannot be used in the active voice.",
		},
		{
			pattern: "επισκέφτηκα — simple past",
			examples: [
				"επισκέφτηκα (I visited)",
				"επισκέφτηκες (you visited)",
				"επισκέφτηκε (he/she visited)",
				"επισκεφτήκαμε (we visited)",
				"επισκεφτήκατε (you pl. visited)",
				"επισκέφτηκαν (they visited)",
			],
			explanation:
				"Past tense uses the -τηκα suffix (the deponent past ending). The stem changes from επισκεπτ- to επισκεφτ- (π → φ before τ).",
		},
	],
});
