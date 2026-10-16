import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_13 = createLesson({
	meta: {
		date: "2026-10-13",
		topic: "πολύς and adjective forms",
		source:
			"Weekly lesson with Konstantina - the six nominative forms of καλός, ακριβός and πολύς; adjective or adverb (καλός / καλά, ακριβός / ακριβώς); one sentence per form of πολύς; πρέπει and έπρεπε; Πώς πέρασες; plus the Kam and Amy plural homework set on 2 October. The lesson ended before sentences with πολλοί and πολλά",
	},

	verbs: [
		{ lemma: "πίνω", english: "I drink", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "ταξιδεύω", english: "I travel", conjugationFamily: "-ω", cefrLevel: "A1" },
		{
			lemma: "πρέπει",
			english: "must/have to (impersonal); past έπρεπε",
			conjugationFamily: "-ω",
			cefrLevel: "A2",
		},
	],

	nouns: [
		{ lemma: "χυμός", gender: "masculine", english: "juice", cefrLevel: "A1" },
		{ lemma: "καφές", gender: "masculine", english: "coffee", cefrLevel: "A1" },
		{ lemma: "ζέστη", gender: "feminine", english: "heat", cefrLevel: "A1" },
		{ lemma: "μέρα", gender: "feminine", english: "day", cefrLevel: "A1" },
		{ lemma: "νερό", gender: "neuter", english: "water", cefrLevel: "A1" },
		{ lemma: "γάλα", gender: "neuter", english: "milk", cefrLevel: "A1" },
		{ lemma: "ταξίδι", gender: "neuter", english: "trip, journey", cefrLevel: "A1" },
		{ lemma: "φρούτο", gender: "neuter", english: "fruit", cefrLevel: "A1" },
	],

	adjectives: [
		{ lemma: "πολύς", english: "much/many", cefrLevel: "A1" },
		{ lemma: "καλός", english: "good", cefrLevel: "A1" },
		{ lemma: "ακριβός", english: "expensive", cefrLevel: "A1" },
		{ lemma: "ζεστός", english: "warm, hot", cefrLevel: "A1" },
		{ lemma: "διασκεδαστικός", english: "fun, entertaining", cefrLevel: "B1" },
	],

	adverbs: [
		{ lemma: "πολύ", english: "very; a lot", cefrLevel: "A1" },
		{ lemma: "ακριβώς", english: "exactly", cefrLevel: "A2" },
		{ lemma: "ίσως", english: "maybe/perhaps", cefrLevel: "A2" },
	],

	phrases: [
		{
			text: "Πώς πέρασες;",
			english: "How was it? Did you have a good time?",
			metadata: { note: "περνάω on its own is to pass or cross" },
		},
		{ text: "Περνάω καλά.", english: "I'm having a good time." },
		{ text: "Είμαι καλός.", english: "I'm a good person.", metadata: { pattern: "είμαι + adjective" } },
		{ text: "Είμαι καλά.", english: "I'm well, I'm fine.", metadata: { pattern: "είμαι + adverb" } },
		// One sentence per form of πολύς
		{
			text: "Ο πολύς χυμός δεν κάνει καλό.",
			english: "Too much juice isn't good for you.",
			metadata: { pattern: "ο πολύς + uncountable noun", note: "not ο πολύς φίλος: friends are counted" },
		},
		{
			text: "Σήμερα κάνει πολλή ζέστη.",
			english: "It's very hot today.",
			metadata: { pattern: "πολλή + feminine noun" },
		},
		{
			text: "Αυτή την εβδομάδα είχαμε πολλές ζεστές μέρες.",
			english: "This week we had many warm days.",
			metadata: { pattern: "πολλές + adjective + feminine plural noun" },
		},
		{
			text: "Κάνει καλό να πίνεις πολύ νερό.",
			english: "Drinking a lot of water is good for you.",
			metadata: { pattern: "πολύ + neuter noun" },
		},
		{
			text: "Ο Λουκάς πίνει πολύ γάλα.",
			english: "Luke drinks a lot of milk.",
			metadata: { pattern: "πολύ + neuter noun" },
		},
		{
			text: "Μ' αρέσει πολύ να ταξιδεύω.",
			english: "I like travelling a lot.",
			metadata: { pattern: "πολύ beside a verb never changes" },
		},
		{
			text: "Έχω πολλή δουλειά.",
			english: "I have a lot of work.",
			metadata: { note: "πολλή and πολύ sound the same; only the spelling shows the feminine" },
		},
		// Homework: Kam and Amy, in the plural
		{ text: "Τους λένε Καμ και Έιμι.", english: "They're called Kam and Amy." },
		{ text: "Αυτοί είναι γονείς.", english: "They're parents." },
		{ text: "Έχουν ένα κορίτσι.", english: "They have a girl." },
		{ text: "Μένουν στη Γερμανία.", english: "They live in Germany." },
		{
			text: "Ο Καμ και η Έιμι είναι από τη Νότια Αφρική.",
			english: "Kam and Amy are from South Africa.",
		},
		{
			text: "Δουλεύουν πολύ, έχουν πολλή δουλειά.",
			english: "They work a lot; they have a lot of work.",
			metadata: { pattern: "πολύ after a verb; πολλή before a feminine noun" },
		},
		{ text: "Δεν κάνουν τίποτα διασκεδαστικό.", english: "They don't do anything fun." },
		{
			text: "Πίνουν πάντα πολύ καφέ.",
			english: "They always drink a lot of coffee.",
			metadata: { pattern: "πολύ: masculine Target form, matching καφέ" },
		},
		{
			text: "Έχουν πολλούς φίλους στη Γερμανία.",
			english: "They have many friends in Germany.",
			metadata: { pattern: "πολλούς φίλους: masculine plural Target form" },
		},
		{ text: "Τα λέμε την Τρίτη.", english: "See you on Tuesday." },
	],

	grammarNotes: [
		{
			pattern: "πολύς before a noun, πολύ beside a verb or adjective",
			examples: [
				"Ο πολύς χυμός δεν κάνει καλό. (masculine)",
				"Σήμερα κάνει πολλή ζέστη. (feminine)",
				"Ο Λουκάς πίνει πολύ γάλα. (neuter)",
				"Μ' αρέσει πολύ να ταξιδεύω. (beside a verb: never changes)",
			],
			explanation:
				"Before a noun, πολύς copies its gender and number: πολύς, πολλή, πολύ, πολλοί, πολλές, πολλά. One λ when -υ follows, λλ everywhere else. In the singular it goes with things you don't count, so not ο πολύς φίλος but πολλοί φίλοι. The section could take Ο πολύς χυμός δεν κάνει καλό as its masculine singular example, which it lacks.",
			section: "scales/poly-polla",
		},
		{
			pattern: "Six nominative forms of an -ος adjective",
			examples: [
				"καλός, καλή, καλό · καλοί, καλές, καλά",
				"ακριβός, ακριβή, ακριβό · ακριβοί, ακριβές, ακριβά",
			],
			explanation:
				"Three for one (-ος, -η, -ο) and three for more than one (-οι, -ες, -α). The plural articles οι, οι, τα tell you which ending to reach for.",
			section: "agreement/adjectives",
		},
		{
			pattern: "Adjective or adverb: καλός or καλά, ακριβός or ακριβώς",
			examples: [
				"Είμαι καλός. (I'm a good person)",
				"Είμαι καλά. (I'm well)",
				"ακριβός = expensive · ακριβώς = exactly",
			],
			explanation:
				"The adjective describes someone or something and changes for gender. The adverb describes how, and never changes; it usually looks like the neuter plural (καλά), and sometimes ends in -ως (ακριβώς). No guide teaches adverbs made from adjectives yet; an agreement section could.",
			section: "word",
		},
		{
			pattern: "πρέπει and έπρεπε",
			examples: ["πρέπει (must, present)", "έπρεπε (had to, past)"],
			explanation: "Neither changes for person.",
			section: "no-doer/must",
		},
		{
			pattern: "Heat with κάνει",
			examples: ["Σήμερα κάνει ζέστη.", "Σήμερα κάνει πολλή ζέστη."],
			explanation: "Weather takes κάνει with a noun, and ζέστη is feminine, so πολλή.",
			section: "no-doer/weather",
		},
		{
			pattern: "κάνει καλό: is good for you",
			examples: ["Ο πολύς χυμός δεν κάνει καλό.", "Κάνει καλό να πίνεις πολύ νερό."],
			explanation:
				"δεν είναι καλός is grammatical, but Greeks say δεν κάνει καλό, it doesn't do good, for things that are bad for you.",
			section: "word",
		},
	],
});
