import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_05_15 = createLesson({
	meta: {
		date: "2026-05-15",
		topic: "Hobbies and giving reasons",
		source: "Weekly lesson - γιατί/επειδή, hobbies, πρέπει, feelings",
	},

	verbs: [
		{ lemma: "μαγειρεύω", english: "I cook", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "νιώθω", english: "I feel", conjugationFamily: "-ω", cefrLevel: "A2" },
		{
			lemma: "πρέπει",
			english: "must/have to (impersonal)",
			conjugationFamily: "-ω",
			cefrLevel: "A2",
		},
	],

	nouns: [
		{ lemma: "μαγειρική", gender: "feminine", english: "cooking (the activity/art)" },
		{ lemma: "χόμπι", gender: "neuter", english: "hobby", metadata: { note: "indeclinable" } },
		{ lemma: "περιοχή", gender: "feminine", english: "area/neighbourhood" },
		{ lemma: "κήπος", gender: "masculine", english: "garden" },
		{ lemma: "ερώτηση", gender: "feminine", english: "question" },
	],

	adjectives: [{ lemma: "κουρασμένος", english: "tired", cefrLevel: "A1" }],

	adverbs: [
		{ lemma: "γιατί", english: "why?", cefrLevel: "A1" },
		{ lemma: "επειδή", english: "because", cefrLevel: "A1" },
	],

	phrases: [
		{
			text: "τι χόμπι έχεις;",
			english: "what hobbies do you have?",
			metadata: { usage: "asking about hobbies" },
		},
		{
			text: "Το χόμπι μου είναι να μαγειρεύω.",
			english: "My hobby is to cook.",
			metadata: { pattern: "Το χόμπι μου είναι να + verb", usage: "describing hobby with verb" },
		},
		{
			text: "Το χόμπι μου είναι η μαγειρική.",
			english: "My hobby is cooking.",
			metadata: { pattern: "Το χόμπι μου είναι + noun", usage: "describing hobby with noun" },
		},
		{
			text: "σε ποια περιοχή μένεις;",
			english: "in which area do you live?",
			metadata: { usage: "asking where someone lives" },
		},
		{
			text: "Μένω στη Γυροσκήπου.",
			english: "I live in Geroskipou.",
			metadata: { usage: "stating neighbourhood" },
		},
		{
			text: "Είμαι κουρασμένος επειδή έχω πολύ δουλειά αυτή την εβδομάδα.",
			english: "I am tired because I have a lot of work this week.",
			metadata: {
				pattern: "adjective + επειδή + reason",
				usage: "giving reasons for how you feel",
			},
		},
		{
			text: "Νιώθω χάλια.",
			english: "I feel awful.",
			metadata: { usage: "expressing feeling bad" },
		},
		{
			text: "πρέπει να + verb",
			english: "must / have to",
			metadata: { pattern: "πρέπει να + subjunctive", usage: "expressing obligation" },
		},
		{
			text: "έπρεπε να + verb",
			english: "had to / should have",
			metadata: { pattern: "έπρεπε να + subjunctive", usage: "past obligation" },
		},
		{
			text: "γιατί; — επειδή...",
			english: "why? — because...",
			metadata: { pattern: "question/answer pair", usage: "asking and giving reasons" },
		},
	],

	grammarNotes: [
		{
			pattern: "γιατί vs επειδή",
			examples: [
				"Γιατί είσαι κουρασμένος; (Why are you tired?)",
				"Επειδή έχω πολύ δουλειά. (Because I have a lot of work.)",
				"Είμαι κουρασμένος επειδή δουλεύω πολλές ώρες. (I'm tired because I work many hours.)",
			],
			explanation:
				"γιατί is used for questions (why?). επειδή introduces a reason clause (because). Both words look similar — γιατί can also mean 'because' in informal speech, but επειδή is the formal connector.",
		},
		{
			pattern: "πρέπει να (must / have to)",
			examples: [
				"Πρέπει να πάω. (I must go.)",
				"Πρέπει να δουλέψω. (I have to work.)",
				"Έπρεπε να φύγω νωρίς. (I had to leave early.)",
			],
			explanation:
				"πρέπει is impersonal (no subject pronoun needed). It is followed by να + verb in the subjunctive. Past form is έπρεπε.",
		},
		{
			pattern: "hobby: να + verb vs noun",
			examples: [
				"Το χόμπι μου είναι να μαγειρεύω. (verb form)",
				"Το χόμπι μου είναι η μαγειρική. (noun form)",
			],
			explanation:
				"In Greek you can express a hobby with να + verb (infinitive-like) or with the activity noun. Both are natural; the noun form is slightly more formal.",
		},
	],
});
