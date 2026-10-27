import { mark } from "@/lib/guide-marks";
import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_20 = createLesson({
	meta: {
		date: "2026-10-20",
		topic: "Activities and how often: κάθε and φορές",
		source:
			"Weekly lesson - how often with κάθε and φορές (κάθε μέρα, κάθε Δευτέρα, δύο φορές την εβδομάδα, δύο φορές κάθε μήνα); a name takes the article (η Γιάννα); με + Target form (με τον παππού του, με τη βούρτσα του); brushing teeth is πλένω τα δόντια μου; ο ανιψιός / η ανιψιά from the homework; read through the family-news role cards for Friday",
		homework: "Prepare both role cards, A and B, for the family-news role-play on Friday",
	},

	verbs: [
		{ lemma: "παίζω", english: "I play", conjugationFamily: "-ω", cefrLevel: "A1" },
		{
			lemma: "πλένω",
			english: "I wash; πλένω τα δόντια μου = I brush my teeth",
			conjugationFamily: "-ω",
			cefrLevel: "A1",
		},
		{ lemma: "βουρτσίζω", english: "I brush", conjugationFamily: "-ω", cefrLevel: "A2" },
		{
			lemma: "κουρεύομαι",
			english: "I get a haircut",
			conjugationFamily: "-ομαι",
			cefrLevel: "A2",
		},
	],

	nouns: [
		{ lemma: "δραστηριότητα", gender: "feminine", english: "activity", cefrLevel: "A2" },
		{ lemma: "μήνας", gender: "masculine", english: "month", cefrLevel: "A1" },
		{ lemma: "φορά", gender: "feminine", english: "time (instance)", cefrLevel: "A2" },
		{ lemma: "παιχνίδι", gender: "neuter", english: "toy; game", cefrLevel: "A1" },
		{ lemma: "βιντεοπαιχνίδι", gender: "neuter", english: "video game", cefrLevel: "A2" },
		{ lemma: "βούρτσα", gender: "feminine", english: "brush", cefrLevel: "A2" },
		{ lemma: "δόντι", gender: "neuter", english: "tooth", cefrLevel: "A1" },
		{ lemma: "παππούς", gender: "masculine", english: "grandfather", cefrLevel: "A1" },
		{ lemma: "ανιψιός", gender: "masculine", english: "nephew", cefrLevel: "A2" },
		{ lemma: "ανιψιά", gender: "feminine", english: "niece", cefrLevel: "A2" },
	],

	phrases: [
		// The three sentences from the lesson notes
		{
			text: "Κάθε Δευτέρα, Τετάρτη και Παρασκευή η Γιάννα κάνει γιόγκα.",
			english: "Every Monday, Wednesday and Friday Yianna does yoga.",
			metadata: { pattern: "κάθε + day, no article", note: "a name takes the article: η Γιάννα" },
		},
		{
			text: "Ο Νέιθαν δύο φορές κάθε μήνα παίζει βιντεοπαιχνίδια με τον παππού του.",
			english: "Twice a month Nathan plays video games with his grandfather.",
			metadata: { pattern: "number + φορές + κάθε μήνα; με + Target form" },
		},
		{
			text: "Ο Ντέιβιντ κάθε μέρα πλένει με τη βούρτσα του τα δόντια του.",
			english: "Every day David brushes his teeth with his toothbrush.",
			metadata: {
				pattern: "με + Target form: τη βούρτσα",
				note: "Greek washes teeth: πλένω τα δόντια μου",
			},
		},
		// How often
		{ text: "κάθε μέρα", english: "every day", metadata: { pattern: "κάθε never changes" } },
		{ text: "κάθε φορά", english: "every time" },
		{ text: "κάθε Δευτέρα", english: "every Monday", metadata: { note: "no article after κάθε" } },
		{
			text: "δύο φορές την εβδομάδα",
			english: "twice a week",
			metadata: { pattern: "number + φορές + time in the Target form" },
		},
		{
			text: "δύο φορές τον μήνα",
			english: "twice a month",
			metadata: { pattern: "number + φορές + time in the Target form" },
		},
		{ text: "δύο φορές κάθε μήνα", english: "twice every month" },
		// Single sentences from the lesson
		{
			text: "Η Γιάννα κάνει γιόγκα.",
			english: "Yianna does yoga.",
			metadata: { note: "a name takes the article" },
		},
		{
			text: "Ο Νέιθαν παίζει βιντεοπαιχνίδια με τον παππού του.",
			english: "Nathan plays video games with his grandfather.",
			metadata: { pattern: "με + Target form" },
		},
		{
			text: "Πλένει τα δόντια του.",
			english: "He brushes his teeth.",
			metadata: { note: "literally washes" },
		},
		{ text: "Πλένω τα δόντια μου.", english: "I brush my teeth." },
		{ text: "με τον παππού του", english: "with his grandfather", metadata: { pattern: "με + τον" } },
		{ text: "με τη βούρτσα του", english: "with his brush", metadata: { pattern: "με + τη" } },
		{
			text: "Κουρεύτηκα.",
			english: "I've had my hair cut.",
			metadata: { note: "past of κουρεύομαι" },
		},
	],

	grammarNotes: [
		{
			pattern: "κάθε: every, with no article",
			examples: ["κάθε μέρα", "κάθε Δευτέρα, Τετάρτη και Παρασκευή", "κάθε μήνα", "κάθε φορά"],
			explanation:
				"κάθε never changes, whatever the noun's gender, and the noun after it takes no article: κάθε Δευτέρα, not κάθε τη Δευτέρα.",
			section: "scales/some-every",
		},
		{
			pattern: "How many times: number + φορές + a time",
			examples: [
				{ greek: "Ο Νέιθαν δύο φορές κάθε μήνα παίζει βιντεοπαιχνίδια.", english: "Nathan plays video games twice every month.", marks: [mark("κάθε μήνα", "accusative", "masculine")] },
				{ greek: "δύο φορές την εβδομάδα", english: "twice a week", marks: [mark("την εβδομάδα", "accusative", "feminine")] },
				{ greek: "δύο φορές τον μήνα", english: "twice a month", marks: [mark("τον μήνα", "accusative", "masculine")] },
			],
			explanation:
				"For times, Greek counts φορές (η φορά, a time) and puts the number in front. The period that follows is a time, so it takes the Target form: την εβδομάδα, τον μήνα. κάθε μήνα says the same thing. The how-often phrase usually comes before the verb.",
			section: "roles/target",
		},
		{
			pattern: "A name takes the article",
			examples: [{ greek: "Η Γιάννα κάνει γιόγκα.", english: "Gianna does yoga.", marks: [mark("Η Γιάννα", "nominative", "feminine")] }, { greek: "Ο Νέιθαν παίζει βιντεοπαιχνίδια.", english: "Nathan plays video games.", marks: [mark("Ο Νέιθαν", "nominative", "masculine")] }, { greek: "Ο Ντέιβιντ πλένει τα δόντια του.", english: "David brushes his teeth.", marks: [mark("Ο Ντέιβιντ", "nominative", "masculine")] }],
			explanation: "When you talk about someone by name, Greek puts the article before it: η Γιάννα, not just Γιάννα.",
			section: "roles/when-article",
		},
		{
			pattern: "με + Target form",
			examples: [{ greek: "με τον παππού του", english: "with his grandfather", marks: [mark("τον παππού", "accusative", "masculine")] }, { greek: "με τη βούρτσα του", english: "with his brush", marks: [mark("τη βούρτσα", "accusative", "feminine")] }],
			explanation:
				"με, with, takes the Target form, like από and σε: ο παππούς becomes τον παππού, η βούρτσα becomes τη βούρτσα. Nothing is done to the grandfather; the form comes from the preposition.",
			section: "roles/target",
		},
		{
			pattern: "Brushing teeth: πλένω τα δόντια μου",
			examples: ["Πλένω τα δόντια μου.", "Πλένει τα δόντια του."],
			explanation:
				"Greek washes its teeth: πλένω, I wash. βουρτσίζω, I brush, exists too, and gives η βούρτσα, the brush. τα δόντια is plural, and the short word after it says whose.",
			section: "word",
		},
		{
			pattern: "ο ανιψιός, η ανιψιά",
			examples: [{ greek: "ο ανιψιός", english: "nephew", marks: [mark("ο ανιψιός", "nominative", "masculine")] }, { greek: "η ανιψιά", english: "niece", marks: [mark("η ανιψιά", "nominative", "feminine")] }],
			explanation: "A masculine and feminine pair: -ός becomes -ά.",
			section: "gender/gender-pairs",
		},
		{
			pattern: "Κουρεύτηκα: I've had my hair cut",
			examples: ["Κουρεύτηκα."],
			explanation:
				"The past of κουρεύομαι, I get a haircut. The -ομαι form says it was done to you, so there is no word for hair.",
			section: "word",
		},
	],
});
