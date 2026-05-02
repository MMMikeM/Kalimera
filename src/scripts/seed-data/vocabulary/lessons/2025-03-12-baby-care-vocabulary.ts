import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_03_12 = createLesson({
	meta: {
		date: "2025-03-12",
		topic: "Baby care — adjectives for babies, verbs for daily care routines",
		source: "Weekly lesson - μωρό, πάνα, baby care verbs and adjectives",
	},

	verbs: [
		{ lemma: "ταΐζω", english: "I feed", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "αγκαλιάζω", english: "I hug", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "κοιτάζω", english: "I look at/watch", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "γελάω", english: "I laugh", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "χαμογελάω", english: "I smile", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
		{ lemma: "κλαίω", english: "I cry", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "ντύνω", english: "I dress (someone else)", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "χαλάω", english: "I break/spoil", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
		{ lemma: "ρωτάω", english: "I ask", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "απαντάω", english: "I answer/reply", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
		{ lemma: "καλώ", english: "I invite/call", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" },
		{ lemma: "φτιάχνω", english: "I make/fix", conjugationFamily: "-ω", cefrLevel: "A2" },
	],

	nouns: [
		{ lemma: "μωρό", gender: "neuter", english: "baby", cefrLevel: "A1" },
		{ lemma: "πάνα", gender: "feminine", english: "nappy/diaper", cefrLevel: "A2" },
		{ lemma: "μπιμπερό", gender: "neuter", english: "baby bottle", cefrLevel: "A2" },
		{ lemma: "κρεβατάκι", gender: "neuter", english: "small bed/cot", cefrLevel: "A2" },
		{ lemma: "κουβέρτα", gender: "feminine", english: "blanket", cefrLevel: "A1" },
		{ lemma: "ρούχο", gender: "neuter", english: "garment (ρούχα = clothes)", cefrLevel: "A1" },
		{ lemma: "αγκαλιά", gender: "feminine", english: "hug/embrace/arms", cefrLevel: "A2" },
		{ lemma: "παιχνίδι", gender: "neuter", english: "toy/game", cefrLevel: "A1" },
		{ lemma: "κλάμα", gender: "neuter", english: "crying", cefrLevel: "A2" },
		{ lemma: "γέλιο", gender: "neuter", english: "laughter", cefrLevel: "A2" },
		{ lemma: "χαμόγελο", gender: "neuter", english: "smile", cefrLevel: "A2" },
		{ lemma: "μεσάνυχτα", gender: "neuter", english: "midnight", cefrLevel: "A2" },
	],

	adjectives: [
		{ lemma: "κουρασμένος", english: "tired", cefrLevel: "A1" },
		{ lemma: "γλυκός", english: "sweet", cefrLevel: "A1" },
		{ lemma: "μικρός", english: "small/little", cefrLevel: "A1" },
		{ lemma: "καθαρός", english: "clean", cefrLevel: "A1" },
		{ lemma: "βρεγμένος", english: "wet", cefrLevel: "A2" },
		{ lemma: "ζεστός", english: "warm/hot", cefrLevel: "A1" },
		{ lemma: "γρήγορος", english: "fast/quick", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "σχεδόν", english: "almost/nearly", cefrLevel: "A2" },
		{ lemma: "πάντα", english: "always", cefrLevel: "A1" },
	],

	phrases: [
		{
			text: "κάθε μέρα ταΐζω το μωρό με το μπιμπερό ζεστό γάλα",
			english: "Every day I feed the baby warm milk with the bottle",
			metadata: { usage: "baby feeding routine" },
		},
		{
			text: "το μωρό κοιμάται σχεδόν πάντα",
			english: "The baby sleeps almost always",
			metadata: { usage: "describing baby's sleep pattern" },
		},
		{
			text: "Δεν του αρέσει να κάνει μπάνιο",
			english: "He doesn't like having a bath",
			metadata: { pattern: "δεν + indirect pronoun + αρέσει να + verb", usage: "expressing dislikes" },
		},
		{
			text: "τον ξυπνάω και τον ταΐζω",
			english: "I wake him up and feed him",
			metadata: { pattern: "τον + verb (direct object pronoun for masculine)", usage: "baby care routine" },
		},
		{
			text: "Στα μεσάνυχτα ξύπνησα το μωρό και το τάϊσα",
			english: "At midnight I woke the baby and fed it",
			metadata: { pattern: "past tense baby care", usage: "describing past routine" },
		},
		{
			text: "ώρα του φαγητού",
			english: "feeding/meal time",
			metadata: { usage: "baby care expression" },
		},
		{
			text: "έκανα κάτι",
			english: "I did something",
			metadata: { usage: "vague past action with κάτι" },
		},
	],

	grammarNotes: [
		{
			pattern: "Baby care verbs — present → past",
			examples: [
				"αγκαλιάζω → αγκάλιασα (hug → hugged)",
				"κοιτάζω → κοίταξα (look at → looked at)",
				"γελάω → γέλασα (laugh → laughed)",
				"χαμογελάω → χαμογέλασα (smile → smiled)",
				"κλαίω → έκλαψα (cry → cried)",
				"ντύνω → έντυσα (dress → dressed)",
				"χαλάω → χάλασα (break → broke)",
				"ρωτάω → ρώτησα (ask → asked)",
				"απαντάω → απάντησα (answer → answered)",
				"καλώ → κάλεσα (invite/call → invited/called)",
				"φτιάχνω → έφτιαξα (make → made)",
			],
			explanation:
				"Most of these follow regular patterns: -άζω → -αξα, -άω → -ασα, -ώ → -εσα. The key is identifying the stem — the -ω or -άω ending drops and the past suffix attaches.",
		},
		{
			pattern: "Direct object pronouns — τον/την/το",
			examples: [
				"τον ξυπνάω (I wake him up) — masculine",
				"τον ταΐζω (I feed him) — masculine",
				"το ταΐζω (I feed it) — neuter (for baby treated as neuter)",
			],
			explanation:
				"When the object is a person previously mentioned, use τον (masc), την (fem), το (neut). For μωρό (neuter) use το, but speakers sometimes use τον colloquially.",
		},
	],
});
