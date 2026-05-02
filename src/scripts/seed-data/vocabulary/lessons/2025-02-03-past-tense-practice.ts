import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_02_03 = createLesson({
	meta: {
		date: "2025-02-03",
		topic: "Past tense practice — deponent past (-θηκα), κοιμήθηκα, ξύπνησα, food vocabulary",
		source: "Weekly lesson - error correction, κοιμήθηκα/ξύπνησα conjugations, daily past tense",
	},

	verbs: [
		{ lemma: "κοιμάμαι", english: "I sleep", conjugationFamily: "-άμαι", cefrLevel: "A1" },
		{ lemma: "ξυπνώ", english: "I wake up", conjugationFamily: "-άω/-ώ", cefrLevel: "A1" },
		{ lemma: "μαγειρεύω", english: "I cook", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "φτάνω", english: "I arrive", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "μένω", english: "I stay/live", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "έρχομαι", english: "I come", conjugationFamily: "-ομαι", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "κουλούρι", gender: "neuter", english: "sesame bread ring", cefrLevel: "A2" },
		{ lemma: "τυρί", gender: "neuter", english: "cheese", cefrLevel: "A1" },
		{ lemma: "κοτόπουλο", gender: "neuter", english: "chicken", cefrLevel: "A1" },
		{ lemma: "ρύζι", gender: "neuter", english: "rice", cefrLevel: "A1" },
		{ lemma: "πορτοκάλι", gender: "neuter", english: "orange", cefrLevel: "A1" },
		{ lemma: "τηλεόραση", gender: "feminine", english: "television", cefrLevel: "A1" },
		{ lemma: "Σαββατοκύριακο", gender: "neuter", english: "weekend", cefrLevel: "A1" },
	],

	adverbs: [
		{ lemma: "καθόλου", english: "at all / any (in negative/question)", cefrLevel: "A2" },
		{ lemma: "μόνο", english: "only", cefrLevel: "A1" },
	],

	phrases: [
		// Deponent past forms
		{
			text: "κοιμήθηκα",
			english: "I slept (past of κοιμάμαι)",
			metadata: { pattern: "deponent past -θηκα of κοιμάμαι", usage: "simple past" },
		},
		{
			text: "ξύπνησα",
			english: "I woke up (past of ξυπνώ)",
			metadata: { pattern: "regular past -σα of ξυπνώ", usage: "simple past" },
		},
		{
			text: "μαγείρεψα",
			english: "I cooked (past of μαγειρεύω)",
			metadata: { pattern: "past of μαγειρεύω", usage: "simple past" },
		},
		{
			text: "φτάσαμε",
			english: "we arrived (past of φτάνω)",
			metadata: { pattern: "past of φτάνω", usage: "simple past" },
		},
		{
			text: "έμεινα",
			english: "I stayed/lived (past of μένω)",
			metadata: { pattern: "irregular past of μένω", usage: "simple past" },
		},
		{
			text: "ήρθα",
			english: "I came (past of έρχομαι)",
			metadata: { pattern: "irregular past of έρχομαι", usage: "simple past" },
		},
		// Error-corrected practice sentences
		{
			text: "τι έκανες το Σαββατοκύριακο;",
			english: "What did you do at the weekend?",
			metadata: { usage: "asking about past weekend activities" },
		},
		{
			text: "τι έφαγες χθες το βράδυ;",
			english: "What did you eat last night?",
			metadata: { usage: "asking about past meals" },
		},
		{
			text: "είδες καθόλου τηλεόραση χθες;",
			english: "Did you watch any television yesterday?",
			metadata: { pattern: "verb + καθόλου in question", usage: "asking about past activities" },
		},
		{
			text: "χθες είδα μόνο youtube",
			english: "Yesterday I only watched YouTube",
			metadata: { usage: "describing past activity with μόνο" },
		},
		{
			text: "μαγείρεψα κοτόπουλο και ρύζι",
			english: "I cooked chicken and rice",
			metadata: { usage: "describing past cooking" },
		},
		{
			text: "ήμουν στην Ολλανδία πρόπερσι",
			english: "I was in Holland two years ago",
			metadata: { pattern: "ήμουν + location + time adverb", usage: "past location + time" },
		},
		{
			text: "κουλούρι με γκούντα",
			english: "sesame ring with Gouda (cheese)",
			metadata: { usage: "food combination — real example from lesson" },
		},
	],

	grammarNotes: [
		{
			pattern: "Deponent past with -θηκα (κοιμάμαι → κοιμήθηκα)",
			examples: [
				"κοιμήθηκα (I slept)",
				"κοιμήθηκες (you slept)",
				"κοιμήθηκε (he/she slept)",
				"κοιμηθήκαμε (we slept)",
				"κοιμηθήκατε (you pl. slept)",
				"κοιμήθηκαν (they slept)",
			],
			explanation:
				"Deponent verbs (those ending in -μαι in the present) form the past with the -θηκα ending. The stem changes: κοιμ-άμαι → κοιμ-ήθηκα.",
		},
		{
			pattern: "Regular past — ξύπνησα (ξυπνώ)",
			examples: [
				"ξύπνησα (I woke up)",
				"ξύπνησες (you woke up)",
				"ξύπνησε (he/she woke up)",
				"ξυπνήσαμε (we woke up)",
				"ξυπνήσατε (you pl. woke up)",
				"ξύπνησαν (they woke up)",
			],
			explanation:
				"ξυπνώ forms a regular past with -σα. Stress shifts: ξύπν-ησα (stress on penultimate in sg/3rd pl), ξυπν-ήσ-αμε (stress on -ήσ- in 1st/2nd pl).",
		},
		{
			pattern: "Past tense pairs — present → simple past",
			examples: [
				"φτάνω → φτάσαμε (arrive → arrived)",
				"μαγειρεύω → μαγείρεψα (cook → cooked)",
				"μένω → έμεινα (stay → stayed)",
				"έρχομαι → ήρθα (come → came)",
				"πηγαίνω / πάω → πήγα (go → went)",
				"πίνω → ήπια (drink → drank)",
			],
			explanation:
				"A set of very common verbs with irregular past stems. These appear constantly in everyday speech and are worth drilling individually.",
		},
		{
			pattern: "καθόλου in questions and negatives",
			examples: [
				"είδες καθόλου τηλεόραση; (Did you watch any TV at all?)",
				"δεν είδα καθόλου τηλεόραση (I didn't watch any TV at all)",
			],
			explanation:
				"καθόλου means 'at all' and intensifies a question or negation. In questions it implies mild surprise or genuine curiosity; with δεν it means 'not at all'.",
		},
	],
});
