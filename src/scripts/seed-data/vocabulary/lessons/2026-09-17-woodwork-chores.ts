import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_09_17 = createLesson({
	meta: {
		date: "2026-09-17",
		topic: "Woodwork and a week's chores",
		source:
			"Weekly lesson - talking about a week of chores and buying wood to make a table; present, simple past and simple future of φτιάχνω, καθαρίζω and δουλεύω; όταν to join a when, πότε to ask one; για να for what something is for; δύσκολος and εύκολος",
	},

	verbs: [
		{ lemma: "φτιάχνω", english: "I make/fix", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "καθαρίζω", english: "I clean", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "κοιμάμαι", english: "I sleep", conjugationFamily: "-άμαι", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "λάδι", gender: "neuter", english: "oil", cefrLevel: "A1" },
		{
			lemma: "ξύλο",
			gender: "neuter",
			english: "wood; τα ξύλα, pieces of wood; (colloquial) a beating",
			cefrLevel: "A2",
		},
		{ lemma: "καρυδιά", gender: "feminine", english: "walnut (the tree and its wood)", cefrLevel: "B1" },
		{ lemma: "πράγμα", gender: "neuter", english: "thing", cefrLevel: "A1" },
		{ lemma: "φορά", gender: "feminine", english: "time (instance)", cefrLevel: "A2" },
	],

	adjectives: [
		{ lemma: "δύσκολος", english: "difficult, hard", cefrLevel: "A2" },
		{ lemma: "εύκολος", english: "easy", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "όταν", english: "when (conjunction)", cefrLevel: "A1" },
		{ lemma: "πότε", english: "when? (question)", cefrLevel: "A1" },
		{ lemma: "επίσης", english: "also/as well", cefrLevel: "A1" },
		{ lemma: "σίγουρα", english: "definitely, surely", cefrLevel: "A2" },
		{ lemma: "μέσα", english: "inside", cefrLevel: "A1" },
	],

	phrases: [
		{ text: "Τώρα δεν δουλεύεις, τι κάνεις όλη μέρα;", english: "You're not working now, so what do you do all day?" },
		{
			text: "Δεν κοιμήθηκα καλά.",
			english: "I didn't sleep well.",
			metadata: { pattern: "κοιμάμαι → κοιμήθηκα" },
		},
		{
			text: "Αυτή την εβδομάδα έκανα πολλές δουλειές.",
			english: "This week I did a lot of chores.",
			metadata: { note: "οι δουλειές, in the plural, are jobs that need doing: chores" },
		},
		{
			text: "Αγόρασα ξύλο για να φτιάξω ένα τραπέζι.",
			english: "I bought wood to make a table.",
			metadata: { pattern: "για να + short form" },
		},
		{
			text: "Αλλά το ξύλο έχει μέσα λάδι. Δεν είναι καλό.",
			english: "But the wood has oil in it. It's no good.",
			metadata: { note: "καλό, the adjective, matches το ξύλο; καλά would mean well" },
		},
		{
			text: "Τι έκανες γι' αυτό;",
			english: "What did you do about it?",
			metadata: { note: "για drops its α before αυτό: γι' αυτό" },
		},
		{ text: "Τι θέλεις να κάνεις με το ξύλο;", english: "What do you want to do with the wood?" },
		{ text: "Σίγουρα ένα τραπέζι για μέσα.", english: "A table for indoors, definitely." },
		{
			text: "Τα ξύλα που αγόρασα είναι καρυδιά.",
			english: "The wood I bought is walnut.",
			metadata: {
				pattern: "noun + που + verb",
				note: "English can drop that; Greek keeps που, so not τα ξύλα αγόρασα",
			},
		},
		{
			text: "Φτιάχνεις μόνος σου ένα τραπέζι;",
			english: "Are you making a table by yourself?",
			metadata: { pattern: "μόνος σου = by yourself" },
		},
		{
			text: "Δεν έχω φίλους για να με βοηθήσουν.",
			english: "I don't have any friends to help me.",
			metadata: { pattern: "για να + short form" },
		},
		{
			text: "Όταν ο μπαμπάς μου ήταν νέος, δούλεψε με ξύλα.",
			english: "When my dad was young, he worked with wood.",
			metadata: { pattern: "όταν joins two ideas" },
		},
		{
			text: "Πότε θα φτιάξεις το τραπέζι;",
			english: "When will you make the table?",
			metadata: { pattern: "πότε asks", note: "θα φτιάξεις: one action still to come" },
		},
		{ text: "Επίσης, καθάρισα το σπίτι.", english: "I also cleaned the house." },
		{ text: "Αύριο θα καθαρίσω το ξύλο.", english: "Tomorrow I'll clean the wood." },
		{ text: "Αύριο θα δουλέψω λίγο στο τραπέζι.", english: "Tomorrow I'll do a bit of work on the table." },
		{
			text: "Είναι η πρώτη φορά που φτιάχνω τραπέζι.",
			english: "It's my first time making a table.",
			metadata: { pattern: "η πρώτη φορά που = the first time that" },
		},
		{
			text: "Δεν είναι εύκολο να φτιάξεις ένα τραπέζι.",
			english: "It isn't easy to make a table.",
			metadata: { pattern: "είναι εύκολο να" },
		},
		{
			text: "Είναι μια δύσκολη δουλειά.",
			english: "It's a hard job.",
			metadata: { pattern: "δύσκολη matches η δουλειά" },
		},
	],

	grammarNotes: [
		{
			pattern: "Three forms: φτιάχνω, έφτιαξα, θα φτιάξω",
			examples: [
				"φτιάχνω · έφτιαξα · θα φτιάξω (make)",
				"καθαρίζω · καθάρισα · θα καθαρίσω (clean)",
				"δουλεύω · δούλεψα · θα δουλέψω (work)",
			],
			explanation:
				"Learn each verb as the present, the simple past and the simple future. The future is θα with the short form, which is built on the past's stem: έφτιαξα, θα φτιάξω.",
			section: "verbs/ladder",
		},
		{
			pattern: "How the past stem is made: χν → ξ, ζ → σ, ευ → ψ",
			examples: [
				"φτιάχνω → έφτιαξα (ν drops, χ + σ → ξ, like ψάχνω → έψαξα)",
				"καθαρίζω → καθάρισα (ζ → σ)",
				"δουλεύω → δούλεψα (the v sound + σ → ψ)",
			],
			explanation:
				"Each past adds σ to the stem, and the letter before it decides how it is spelt. The stress sits three syllables from the end, so φτιάχνω gains an έ- in front.",
			section: "past/past-shapes",
		},
		{
			pattern: "όταν joins, πότε asks",
			examples: [
				"Όταν ο μπαμπάς μου ήταν νέος, δούλεψε με ξύλα. (when, joining two ideas)",
				"Πότε θα φτιάξεις το τραπέζι; (when?, asking)",
			],
			explanation:
				"Both mean when. πότε asks the question; όταν joins a when to the rest of the sentence and never asks.",
			section: "joining/when-why",
		},
		{
			pattern: "για να + verb: to, in order to",
			examples: [
				"Αγόρασα ξύλο για να φτιάξω ένα τραπέζι.",
				"Δεν έχω φίλους για να με βοηθήσουν.",
			],
			explanation:
				"για να before a verb says what something is for. For one action, the verb takes the short form: φτιάξω, βοηθήσουν.",
			section: "joining/purpose",
		},
		{
			pattern: "Δεν είναι καλό, not καλά",
			examples: ["Το ξύλο δεν είναι καλό. (the wood is no good)", "Δεν είμαι καλά. (I'm not well)"],
			explanation:
				"The adjective describes a thing and matches it: καλό for το ξύλο. καλά is the adverb, for how someone is or how something is done.",
			section: "agreement/adverbs",
		},
		{
			pattern: "κοιμάμαι, κοιμήθηκα",
			examples: ["Δεν κοιμήθηκα καλά.", "κοιμάμαι · κοιμήθηκα · θα κοιμηθώ"],
			explanation: "κοιμάμαι is an -άμαι verb, so its simple past ends in -ήθηκα.",
			section: "verbs/amai-verbs",
		},
	],
});
