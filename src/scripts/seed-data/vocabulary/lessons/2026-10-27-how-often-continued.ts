import { mark } from "@/lib/guide-marks";
import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_27 = createLesson({
	meta: {
		date: "2026-10-27",
		topic: "How often, continued: φορές, από… μέχρι, ποτέ δεν",
		source:
			"Weekly lesson, from the transcript only (no tutor notes) - the 20 Oct picture exercise continued: δύο φορές τη Δευτέρα, από την Τρίτη μέχρι την Παρασκευή, μία φορά (η φορά is feminine), πίνει καφέ with no article, ποτέ δεν πίνει καφέ, πάει για σκι μία φορά τον χρόνο; then sentences about Mike's own week (συνήθως, με τον Λέο). Ended early in a power cut",
	},

	verbs: [{ lemma: "πίνω", english: "I drink", conjugationFamily: "-ω", cefrLevel: "A1" }],

	nouns: [
		{ lemma: "γυμναστήριο", gender: "neuter", english: "gym", cefrLevel: "A1" },
		{ lemma: "σκι", gender: "neuter", english: "skiing; ski", cefrLevel: "A2" },
		{ lemma: "χρόνος", gender: "masculine", english: "year; time", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "συνήθως", english: "usually", cefrLevel: "A1" },
		{ lemma: "ποτέ", english: "never; ever", cefrLevel: "A1" },
	],

	phrases: [
		{ text: "πάει στο γυμναστήριο", english: "she goes to the gym" },
		{
			text: "δύο φορές τη Δευτέρα",
			english: "twice on Monday",
			metadata: { pattern: "a day takes the Target form" },
		},
		{
			text: "από την Τρίτη μέχρι την Παρασκευή",
			english: "from Tuesday to Friday",
			metadata: { pattern: "από… μέχρι + Target form" },
		},
		{ text: "μία φορά", english: "once", metadata: { note: "μία, because η φορά is feminine" } },
		{ text: "Πίνει καφέ.", english: "She drinks coffee.", metadata: { note: "no article: coffee in general" } },
		{
			text: "Ποτέ δεν πίνει καφέ.",
			english: "She never drinks coffee.",
			metadata: { pattern: "ποτέ needs δεν" },
		},
		{ text: "Δεν πίνει ποτέ καφέ.", english: "She never drinks coffee.", metadata: { note: "the other order" } },
		{
			text: "Πάει για σκι μία φορά τον χρόνο.",
			english: "She goes skiing once a year.",
			metadata: { pattern: "πάω για + activity" },
		},
		{ text: "με τον Λέο", english: "with Leo", metadata: { note: "a name takes the article" } },
	],

	grammarNotes: [
		{
			pattern: "A day or a year after φορές takes the Target form",
			examples: [
				{ greek: "δύο φορές τη Δευτέρα", english: "twice on Monday", marks: [mark("τη Δευτέρα", "accusative", "feminine")] },
				{ greek: "μία φορά τον χρόνο", english: "once a year", marks: [mark("τον χρόνο", "accusative", "masculine")] },
			],
			explanation:
				"Days and months said as a time take the Target form, so η Δευτέρα becomes τη Δευτέρα and ο χρόνος becomes τον χρόνο. It is the pattern of δύο φορές την εβδομάδα from 20 Oct.",
			section: "roles/target",
		},
		{
			pattern: "From… until: από… μέχρι",
			examples: [
				{
					greek: "από την Τρίτη μέχρι την Παρασκευή",
					english: "from Tuesday to Friday",
					marks: [mark("την Τρίτη", "accusative", "feminine"), mark("την Παρασκευή", "accusative", "feminine")],
				},
			],
			explanation: "μέχρι, until, takes the Target form like από does, so both days keep την.",
			section: "place/without-until",
		},
		{
			pattern: "Once: μία φορά, not ένα",
			examples: [{ greek: "μία φορά", english: "once", marks: [mark("μία φορά", "accusative", "feminine")] }],
			explanation: "η φορά is feminine, so one time is μία φορά. The number agrees with the noun it counts.",
			section: "agreement/numbers",
		},
		{
			pattern: "Coffee in general: no article",
			examples: ["Πίνει καφέ. (She drinks coffee.)"],
			explanation:
				"Talking about coffee in general, as a habit, Greek drops the article: πίνει καφέ. τον καφέ would mean a particular coffee.",
			section: "roles/when-article",
		},
		{
			pattern: "Never: ποτέ δεν",
			examples: ["Ποτέ δεν πίνει καφέ. (She never drinks coffee.)", "Δεν πίνει ποτέ καφέ. (the same)"],
			explanation:
				"ποτέ still needs δεν with the verb. It can come before δεν or after the verb; both say the same thing.",
			section: "scales/negatives",
		},
		{
			pattern: "με + a name, with its article",
			examples: [{ greek: "με τον Λέο", english: "with Leo", marks: [mark("τον Λέο", "accusative", "masculine")] }],
			explanation:
				"A name takes the article, and after με the article is in the Target form: ο Λέο becomes τον Λέο. A foreign name like Λέο keeps its own shape; only the article changes. Leaving the article out was the slip in this lesson.",
			section: "roles/when-article",
		},
		{
			pattern: "πίνω, πίνεις, πίνει",
			examples: ["πίνω (I drink)", "πίνεις (you drink)", "πίνει (she drinks)"],
			explanation: "πίνω follows γράφω: -ω, -εις, -ει. The -εις form is you; the -ει form is he or she.",
			section: "verbs/present",
		},
	],
});
