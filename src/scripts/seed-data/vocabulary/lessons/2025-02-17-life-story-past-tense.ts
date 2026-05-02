import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_02_17 = createLesson({
	meta: {
		date: "2025-02-17",
		topic: "Life story questions — past tense dialogue, extended irregular verb pairs",
		source: "Weekly lesson - γεννήθηκες/μεγάλωσες, imperfect vs simple past, irregular pairs",
	},

	verbs: [
		{ lemma: "γεννιέμαι", english: "I am born", conjugationFamily: "-ομαι", cefrLevel: "A2" },
		{ lemma: "μεγαλώνω", english: "I grow up/grow", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "παίζω", english: "I play", conjugationFamily: "-ω", cefrLevel: "A1" },
		{
			lemma: "σπουδάζω",
			english: "I study (at university)",
			conjugationFamily: "-ω",
			cefrLevel: "A2",
		},
		{ lemma: "αποτυγχάνω", english: "I fail", conjugationFamily: "-ω", cefrLevel: "B1" },
		{ lemma: "αλλάζω", english: "I change", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "αρχίζω", english: "I begin/start", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "ψάχνω", english: "I search/look for", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "βρίσκω", english: "I find", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "νομίζω", english: "I think/believe", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "έχω", english: "I have", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "λέω", english: "I say/tell", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "καταλαβαίνω", english: "I understand", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "φέρνω", english: "I bring", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μαθαίνω", english: "I learn", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "πόλη", gender: "feminine", english: "city/town", cefrLevel: "A1" },
		{ lemma: "σχολείο", gender: "neuter", english: "school", cefrLevel: "A1" },
		{ lemma: "πανεπιστήμιο", gender: "neuter", english: "university", cefrLevel: "A1" },
		{ lemma: "αρχιτεκτονική", gender: "feminine", english: "architecture", cefrLevel: "B1" },
		{ lemma: "δουλειά", gender: "feminine", english: "work/job", cefrLevel: "A1" },
	],

	adjectives: [{ lemma: "λευκός", english: "white/Caucasian", cefrLevel: "A1" }],

	adverbs: [
		{ lemma: "εκεί", english: "there", cefrLevel: "A1" },
		{ lemma: "κάτι", english: "something", cefrLevel: "A1" },
		{ lemma: "αν", english: "if", cefrLevel: "A1" },
	],

	phrases: [
		// Life story questions
		{
			text: "Πότε και πού γεννήθηκες;",
			english: "When and where were you born?",
			metadata: { usage: "life story question" },
		},
		{
			text: "Γεννήθηκα στην Νότια Αφρική στις 19/2/1990",
			english: "I was born in South Africa on 19/2/1990",
			metadata: { pattern: "γεννήθηκα + location + date", usage: "stating birth details" },
		},
		{
			text: "Πού μεγάλωσες;",
			english: "Where did you grow up?",
			metadata: { usage: "life story question" },
		},
		{
			text: "Μεγάλωσα σε μια μικρή πόλη",
			english: "I grew up in a small town",
			metadata: { pattern: "μεγάλωσα + location", usage: "stating where you grew up" },
		},
		{
			text: "τι έκανες μετά το σχολείο;",
			english: "What did you do after school?",
			metadata: { usage: "life story question" },
		},
		{
			text: "έπαιζα με τους φίλους μου",
			english: "I used to play with my friends",
			metadata: {
				pattern: "imperfect tense — habitual/ongoing past",
				usage: "describing habitual past action",
			},
		},
		{
			text: "Μετά το σχολείο δεν δούλεψα, αλλά πήγα στο πανεπιστήμιο",
			english: "After school I didn't work, but I went to university",
			metadata: { usage: "life story sentence — completed past actions" },
		},
		{
			text: "Τι σπούδασες;",
			english: "What did you study?",
			metadata: { usage: "life story question" },
		},
		{
			text: "Σπούδαζα αρχιτεκτονική αλλά απέτυχα και άλλαξα σε κατασκευαστική",
			english: "I was studying architecture but I failed and changed to construction",
			metadata: {
				pattern: "σπούδαζα (imperfect) + απέτυχα/άλλαξα (simple past)",
				usage: "mixing imperfect and simple past",
			},
		},
		{
			text: "Πότε άρχισες να δουλεύεις;",
			english: "When did you start working?",
			metadata: { pattern: "άρχισες να + verb", usage: "asking when something began" },
		},
		{
			text: "έψαξα για δουλειά για δύο χρόνια",
			english: "I searched for work for two years",
			metadata: {
				pattern: "έψαξα για + object + για + duration",
				usage: "duration of past activity",
			},
		},
		{
			text: "βρήκα μετά από δύο χρόνια",
			english: "I found it after two years",
			metadata: { pattern: "βρήκα μετά από + duration", usage: "stating when something was found" },
		},
		{
			text: "αν είσαι λευκός, είναι δύσκολο να βρίσκεις δουλειά",
			english: "if you are white, it is difficult to find work",
			metadata: {
				pattern: "αν + present, είναι δύσκολο να + present",
				usage: "conditional statement",
			},
		},
		{
			text: "δε θέλω να λέω",
			english: "I don't want to say",
			metadata: { usage: "politely declining to answer" },
		},
	],

	grammarNotes: [
		{
			pattern: "Irregular past tense pairs — extended list",
			examples: [
				"έχω → είχα (have → had)",
				"λέω → είπα (say → said)",
				"καταλαβαίνω → κατάλαβα (understand → understood)",
				"βρίσκω → βρήκα (find → found)",
				"μένω → έμεινα (stay → stayed)",
				"φέρνω → έφερα (bring → brought)",
				"μαθαίνω → έμαθα (learn → learned)",
				"έρχομαι → ήρθα (come → came)",
				"παντρεύομαι → παντρεύτηκα (get married → got married)",
				"γεννιέμαι → γεννήθηκα (be born → was born)",
				"ψάχνω → έψαξα (search → searched)",
				"βλέπω → είδα (see → saw)",
			],
			explanation:
				"These common verbs all have irregular or unpredictable past tense stems. Memorise as pairs — there is no single rule covering all of them.",
		},
		{
			pattern: "Imperfect vs simple past",
			examples: [
				"Σπούδαζα αρχιτεκτονική (I was studying / I used to study architecture) — ongoing",
				"απέτυχα (I failed) — completed event",
				"έπαιζα με τους φίλους μου (I used to play with my friends) — habitual",
				"πήγα στο πανεπιστήμιο (I went to university) — completed action",
			],
			explanation:
				"The imperfect (same form as present) describes ongoing or habitual past actions. The simple past (aorist) describes completed events. Both can appear in the same sentence.",
		},
		{
			pattern: "γεννιέμαι → γεννήθηκα (deponent past with -θηκ-)",
			examples: [
				"γεννήθηκα (I was born)",
				"γεννήθηκες (you were born)",
				"γεννήθηκε (he/she was born)",
				"γεννηθήκαμε (we were born)",
				"γεννηθήκατε (you pl. were born)",
				"γεννήθηκαν (they were born)",
			],
			explanation:
				"γεννιέμαι is deponent — active meaning, passive form. Past uses the -θηκα suffix on the stem γεννη-.",
		},
		{
			pattern: "Large numbers recap",
			examples: [
				"χίλια = 1,000",
				"δύο χιλιάδες = 2,000",
				"τρεις χιλιάδες = 3,000",
				"χίλια εννιακόσια ενενήντα = 1990",
			],
			explanation:
				"χίλια is neuter (used with a following noun or standalone). For 2,000+ use χιλιάδες (feminine plural). Years are read as full numbers.",
		},
	],
});
