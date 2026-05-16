import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_05_08 = createLesson({
	meta: {
		date: "2026-05-08",
		topic: "Occupations and work vocabulary",
		source: "Weekly lesson - jobs, work hours, dream job, πλήρης/μερικής απασχόλησης",
	},

	verbs: [
		{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μαθαίνω", english: "I learn/teach", conjugationFamily: "-ω", cefrLevel: "A1" },
		{
			lemma: "ασχολούμαι",
			english: "I occupy myself/deal with",
			conjugationFamily: "-ομαι",
			cefrLevel: "A2",
		},
	],

	nouns: [
		{
			lemma: "δάσκαλος",
			gender: "masculine",
			english: "teacher (m)",
			metadata: { note: "fem: δασκάλα" },
		},
		{ lemma: "δασκάλα", gender: "feminine", english: "teacher (f)" },
		{
			lemma: "μπαρίστα",
			gender: "masculine",
			english: "barista",
			metadata: { note: "indeclinable; ένας/μια μπαρίστα" },
		},
		{
			lemma: "νοσοκόμος",
			gender: "masculine",
			english: "nurse (m)",
			metadata: { note: "fem: νοσοκόμα" },
		},
		{ lemma: "νοσοκόμα", gender: "feminine", english: "nurse (f)" },
		{
			lemma: "φοιτητής",
			gender: "masculine",
			english: "student (m)",
			metadata: { note: "fem: φοιτήτρια" },
		},
		{ lemma: "φοιτήτρια", gender: "feminine", english: "student (f)" },
		{
			lemma: "υπεύθυνος",
			gender: "masculine",
			english: "manager/person in charge",
			metadata: { note: "fem same form: η υπεύθυνος" },
		},
		{ lemma: "αρχιτέκτονας", gender: "masculine", english: "architect" },
		{
			lemma: "προγραμματιστής",
			gender: "masculine",
			english: "programmer/developer",
			metadata: { note: "προγραμματιστής λογισμικού = software developer" },
		},
		{ lemma: "όνειρο", gender: "neuter", english: "dream", metadata: { note: "pl: τα όνειρα" } },
		{ lemma: "δουλειά", gender: "feminine", english: "work/job" },
		{ lemma: "εβδομάδα", gender: "feminine", english: "week" },
		{ lemma: "σχολείο", gender: "neuter", english: "school" },
		{ lemma: "λογισμικό", gender: "neuter", english: "software" },
	],

	adjectives: [
		{
			lemma: "κούκλος",
			english: "beautiful/gorgeous (colloquial; lit. 'doll' — κούκλος/κούκλα/κουκλί)",
			cefrLevel: "A2",
		},
	],

	adverbs: [
		{ lemma: "ίσως", english: "maybe/perhaps", cefrLevel: "A2" },
		{ lemma: "γενικά", english: "in general", cefrLevel: "A2" },
		{ lemma: "περίπου", english: "approximately/about", cefrLevel: "A1" },
		{ lemma: "κάποιες φορές", english: "sometimes", cefrLevel: "A2" },
	],

	phrases: [
		{
			text: "τι δουλειά κάνεις;",
			english: "what job do you do?",
			metadata: { usage: "asking about occupation" },
		},
		{
			text: "με τι ασχολείσαι;",
			english: "what do you do? / what do you occupy yourself with?",
			metadata: { usage: "alternative to τι δουλειά κάνεις;" },
		},
		{
			text: "η δουλειά των ονείρων σου",
			english: "your dream job",
			metadata: { pattern: "noun + των ονείρων + possessive" },
		},
		{
			text: "θα ήθελα να ήμουν αρχιτέκτονας",
			english: "I would like to be an architect",
			metadata: { pattern: "θα ήθελα να ήμουν + occupation", usage: "dream job / conditional" },
		},
		{
			text: "σου αρέσει η δουλειά σου;",
			english: "do you like your job?",
			metadata: { pattern: "σου αρέσει + noun", usage: "asking if someone likes something" },
		},
		{
			text: "Κάθε εβδομάδα δουλεύω σαράντα ώρες.",
			english: "Every week I work forty hours.",
			metadata: { usage: "talking about work hours" },
		},
		{
			text: "Κάποιες φορές είναι καλές και κάποιες κακές.",
			english: "Sometimes they are good and sometimes bad.",
			metadata: { usage: "expressing mixed feelings about work" },
		},
		{
			text: "μερικής απασχόλησης",
			english: "part-time",
			metadata: { usage: "employment type" },
		},
		{
			text: "πλήρης απασχόλησης",
			english: "full-time",
			metadata: { usage: "employment type" },
		},
		{
			text: "βοηθός οδοντιάτρου",
			english: "dental assistant",
			metadata: { usage: "occupation" },
		},
		{
			text: "Η δουλειά μου είναι IT, είμαι προγραμματιστής λογισμικού.",
			english: "My job is IT, I am a software developer.",
			metadata: { usage: "describing your occupation" },
		},
	],

	grammarNotes: [
		{
			pattern: "θα ήθελα να ήμουν + noun (dream job conditional)",
			examples: [
				"θα ήθελα να ήμουν αρχιτέκτονας (I would like to be an architect)",
				"θα ήθελα να ήμουν δάσκαλος (I would like to be a teacher)",
			],
			explanation:
				"θα ήθελα (I would like) + να ήμουν (to be — imperfect subjunctive) expresses a wish or dream. Used for hypothetical or dream scenarios.",
		},
		{
			pattern: "σου αρέσει (do you like)",
			examples: [
				"σου αρέσει η δουλειά σου; (do you like your job?)",
				"μου αρέσει πολύ (I like it a lot)",
			],
			explanation:
				"αρέσει is impersonal. The person who likes something is expressed with an indirect object pronoun (μου/σου/του/της). The thing liked is the grammatical subject.",
		},
		{
			pattern: "Masculine/feminine occupation pairs",
			examples: [
				"ένας δάσκαλος / μια δασκάλα (teacher)",
				"ένας νοσοκόμος / μια νοσοκόμα (nurse)",
				"ένας φοιτητής / μια φοιτήτρια (student)",
				"ένας/μια μπαρίστα (barista — same form)",
				"ένας/μια υπεύθυνος (manager — same form)",
			],
			explanation:
				"Most occupations have distinct masculine and feminine forms. Some (μπαρίστα, υπεύθυνος) use the same word for both genders — only the article changes.",
		},
	],
});
