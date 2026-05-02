import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_02_10 = createLesson({
	meta: {
		date: "2025-02-10",
		topic: "Trip dialogues, απασχολημένος, τελευταίος, παντρεύομαι",
		source: "Weekly lesson - dialogue practice, busy/last/getting married",
	},

	verbs: [
		{
			lemma: "παντρεύομαι",
			english: "I get married",
			conjugationFamily: "-ομαι",
			cefrLevel: "A2",
		},
	],

	adjectives: [
		{ lemma: "απασχολημένος", english: "busy/occupied", cefrLevel: "A2" },
		{ lemma: "τελευταίος", english: "last (in a sequence)", cefrLevel: "A2" },
	],

	phrases: [
		{
			text: "τελευταία φορά",
			english: "last time",
			metadata: { pattern: "τελευταίος + φορά", usage: "referring to the most recent occasion" },
		},
		{
			text: "παντρεύτηκα",
			english: "I got married (past of παντρεύομαι)",
			metadata: { pattern: "deponent past -τηκα of παντρεύομαι", usage: "simple past" },
		},
	],

	grammarNotes: [
		{
			pattern: "παντρεύομαι → παντρεύτηκα (deponent past)",
			examples: [
				"παντρεύτηκα (I got married)",
				"παντρεύτηκες (you got married)",
				"παντρεύτηκε (he/she got married)",
				"παντρευτήκαμε (we got married)",
				"παντρευτήκατε (you pl. got married)",
				"παντρεύτηκαν (they got married)",
			],
			explanation:
				"παντρεύομαι is a deponent verb — present ends in -ομαι, past uses the -τηκα ending. Note the stress shift in the 1st/2nd person plural.",
		},
	],
});
