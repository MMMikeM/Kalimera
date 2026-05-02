import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_01_16 = createLesson({
	meta: {
		date: "2025-01-16",
		topic: "Simple future (θα + present), past time expressions, personal details vocabulary",
		source: "Weekly lesson - θα future, χτες/πέρυσι/πριν, form-filling vocab",
	},

	verbs: [
		{ lemma: "χαλαρώνω", english: "I relax", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "θυμάμαι", english: "I remember", conjugationFamily: "-άμαι", cefrLevel: "A2" },
		{ lemma: "κοιμάμαι", english: "I sleep", conjugationFamily: "-άμαι", cefrLevel: "A1" },
		{ lemma: "πίνω", english: "I drink", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "διαβάζω", english: "I read", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "πηγαίνω", english: "I go", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "όνομα", gender: "neuter", english: "name", cefrLevel: "A1" },
		{ lemma: "επώνυμο", gender: "neuter", english: "surname", cefrLevel: "A1" },
		{ lemma: "ονοματεπώνυμο", gender: "neuter", english: "full name", cefrLevel: "A2" },
		{ lemma: "επάγγελμα", gender: "neuter", english: "profession", cefrLevel: "A1" },
		{ lemma: "γραμματέας", gender: "masculine", english: "secretary", cefrLevel: "A2" },
		{ lemma: "ημερομηνία", gender: "feminine", english: "date", cefrLevel: "A2" },
		{ lemma: "τόπος", gender: "masculine", english: "place/location", cefrLevel: "A2" },
		{ lemma: "κατοικία", gender: "feminine", english: "residence/dwelling", cefrLevel: "A2" },
		{ lemma: "χρώμα", gender: "neuter", english: "colour", cefrLevel: "A1" },
		{ lemma: "μάτι", gender: "neuter", english: "eye", cefrLevel: "A1" },
		{ lemma: "μαλλί", gender: "neuter", english: "hair (μαλλιά = plural, more common)", cefrLevel: "A1" },
		{ lemma: "ύψος", gender: "neuter", english: "height", cefrLevel: "A2" },
		{ lemma: "ντύσιμο", gender: "neuter", english: "clothing/outfit", cefrLevel: "A2" },
		{ lemma: "κόσμημα", gender: "neuter", english: "piece of jewellery (κοσμήματα = jewellery)", cefrLevel: "B1" },
		{ lemma: "χιλιάδα", gender: "feminine", english: "thousand (χιλιάδες = thousands)", cefrLevel: "A2" },
	],

	adjectives: [
		{ lemma: "χαρούμενος", english: "happy", cefrLevel: "A1" },
		{ lemma: "περασμένος", english: "last/previous (time)", cefrLevel: "A2" },
		{ lemma: "προηγούμενος", english: "previous", cefrLevel: "B1" },
		{ lemma: "καστανός", english: "brown (hair/eyes)", cefrLevel: "A2" },
		{ lemma: "μακρύς", english: "long", cefrLevel: "A2" },
		{ lemma: "αγαπημένος", english: "favourite/beloved", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "χτες", english: "yesterday (also χθές/εχτές/εχθές)", cefrLevel: "A1" },
		{ lemma: "προχθές", english: "the day before yesterday (also προχτές)", cefrLevel: "A2" },
		{ lemma: "πέρυσι", english: "last year (also πέρσι)", cefrLevel: "A2" },
		{ lemma: "πρόπερσι", english: "two years ago", cefrLevel: "B1" },
		{ lemma: "πριν", english: "ago/before", cefrLevel: "A1" },
	],

	phrases: [
		// Future tense examples
		{
			text: "θα χαλαρώνω",
			english: "I will be relaxing",
			metadata: { pattern: "θα + present tense", usage: "simple future" },
		},
		{
			text: "θα πηγαίνω",
			english: "I will be going",
			metadata: { pattern: "θα + present tense", usage: "simple future" },
		},
		// Past time expressions
		{
			text: "πριν μια εβδομάδα",
			english: "a week ago",
			metadata: { pattern: "πριν + time period", usage: "past time expression" },
		},
		{
			text: "πριν ένα μήνα",
			english: "a month ago",
			metadata: { pattern: "πριν + time period", usage: "past time expression" },
		},
		{
			text: "πριν μια μέρα",
			english: "a day ago",
			metadata: { pattern: "πριν + time period", usage: "past time expression" },
		},
		{
			text: "πριν από έναν χρόνο",
			english: "a year ago",
			metadata: { pattern: "πριν από + time period", usage: "past time expression" },
		},
		// Adjective + noun time phrases
		{
			text: "την περασμένη εβδομάδα",
			english: "last week",
			metadata: { pattern: "περασμένος/η/ο + time noun", usage: "past time reference" },
		},
		{
			text: "τον προηγούμενο μήνα",
			english: "last month",
			metadata: { pattern: "προηγούμενος/η/ο + time noun", usage: "past time reference" },
		},
		{
			text: "τον περασμένο χρόνο",
			english: "last year",
			metadata: { pattern: "περασμένος/η/ο + time noun", usage: "past time reference" },
		},
		// Example sentences
		{
			text: "Αύριο θα είναι Σάββατο",
			english: "Tomorrow will be Saturday",
			metadata: { usage: "future with θα + είναι" },
		},
		{
			text: "Προχτές ήταν Τετάρτη",
			english: "The day before yesterday was Wednesday",
			metadata: { usage: "past with προχτές" },
		},
		{
			text: "είμαι χαρούμενος που είναι Παρασκευή",
			english: "I am happy that it is Friday",
			metadata: { pattern: "χαρούμενος που + clause", usage: "expressing happiness about something" },
		},
		// Form-filling phrases
		{
			text: "ημερομηνία γέννησης",
			english: "date of birth",
			metadata: { usage: "official form vocabulary" },
		},
		{
			text: "τόπος κατοικίας",
			english: "place of residence",
			metadata: { usage: "official form vocabulary" },
		},
		{
			text: "χρώμα ματιών",
			english: "eye colour",
			metadata: { usage: "official form vocabulary" },
		},
		{
			text: "χίλια",
			english: "one thousand (1000)",
			metadata: { usage: "large numbers" },
		},
		{
			text: "δύο χιλιάδες",
			english: "two thousand (2000)",
			metadata: { pattern: "number + χιλιάδες", usage: "large numbers" },
		},
		// Past of πηγαίνω
		{
			text: "πήγα",
			english: "I went",
			metadata: { pattern: "past tense of πηγαίνω", usage: "irregular past" },
		},
	],

	grammarNotes: [
		{
			pattern: "θα + present tense = simple future",
			examples: [
				"θα χαλαρώνω (I will be relaxing)",
				"θα θυμάμαι (I will remember)",
				"θα κοιμάμαι (I will be sleeping)",
				"θα πίνω (I will be drinking)",
				"θα διαβάζω (I will be reading)",
				"θα δουλεύω (I will be working)",
				"Αύριο θα είναι Σάββατο (Tomorrow will be Saturday)",
			],
			explanation:
				"The simple future in Greek is formed with θα + the present tense form. The verb does not change — only θα is added before it.",
		},
		{
			pattern: "Past time expressions",
			examples: [
				"χτες / χθές / εχτές — yesterday",
				"προχθές / προχτές — the day before yesterday",
				"πέρυσι / πέρσι — last year",
				"πρόπερσι — two years ago",
				"πριν μια εβδομάδα — a week ago",
				"πριν από έναν χρόνο — a year ago",
			],
			explanation:
				"Greek has several dedicated adverbs for past time. πριν + time period means 'ago'. Note the spelling variants (χτες/χθές etc.) — both are correct.",
		},
		{
			pattern: "περασμένος / προηγούμενος + time noun",
			examples: [
				"την περασμένη εβδομάδα (last week)",
				"τον περασμένο χρόνο (last year)",
				"τον προηγούμενο μήνα (last/previous month)",
			],
			explanation:
				"Both περασμένος and προηγούμενος mean 'previous/last' but attach to the noun they modify and must agree in gender and case.",
		},
		{
			pattern: "Past tense of πηγαίνω (irregular)",
			examples: ["πήγα, πήγες, πήγε, πήγαμε, πήγατε, πήγαν"],
			explanation:
				"The past tense of πηγαίνω (to go) is irregular — it uses πήγ- as the stem. Completely different from the present tense stem.",
		},
	],
});
