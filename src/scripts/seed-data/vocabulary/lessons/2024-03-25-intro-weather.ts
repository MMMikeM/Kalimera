import type { AdjectiveSeed, NounSeed, Phrase } from "../../../../types/seed";

export const LESSON_2024_03_25 = {
	meta: {
		date: "2024-03-25",
		topic: "Self introduction and weather",
		source: "Weekly lesson - basic introduction questions",
	},

	verbs: [],

	nouns: [
		{ lemma: "δόντι", gender: "neuter", english: "tooth" },
	] satisfies NounSeed[],

	adjectives: [
		{ lemma: "κρύος", english: "cold" },
		{ lemma: "ζεστός", english: "warm/hot" },
		{ lemma: "κρυωμένος", english: "having a cold" },
	] satisfies AdjectiveSeed[],

	adverbs: [],

	phrases: [
		// Introduction questions and answers
		{ text: "πώς σε λένε;", english: "what's your name?", metadata: {} },
		{ text: "με λένε...", english: "my name is...", metadata: {} },
		{ text: "από πού είσαι;", english: "where are you from?", metadata: {} },
		{ text: "πού μένεις;", english: "where do you live?", metadata: {} },
		{
			text: "τι δουλειά κάνεις;",
			english: "what work do you do?",
			metadata: {},
		},
		{
			text: "είσαι παντρεμένος ή ελεύθερος;",
			english: "are you married or single?",
			metadata: {},
		},
		{ text: "έχεις παιδιά;", english: "do you have children?", metadata: {} },
		{ text: "μιλάς ελληνικά;", english: "do you speak Greek?", metadata: {} },
		{
			text: "σου αρέσει η Κύπρος;",
			english: "do you like Cyprus?",
			metadata: {},
		},
		// Weather
		{
			text: "κάνει κρύο",
			english: "it's cold",
			metadata: { grammar: "impersonal" },
		},
		{
			text: "κάνει ζέστη",
			english: "it's hot/warm",
			metadata: { grammar: "impersonal" },
		},
		{
			text: "είμαι κρυωμένος",
			english: "I have a cold",
			metadata: { grammar: "masculine" },
		},
		// Time expressions
		{
			text: "σε μια εβδομάδα",
			english: "in one week",
			metadata: { pattern: "σε + accusative" },
		},
		{ text: "σε δύο εβδομάδες", english: "in two weeks", metadata: {} },
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Weather expressions with κάνει",
			examples: ["κάνει κρύο", "κάνει ζέστη", "κάνει καλό καιρό"],
			explanation: "Impersonal - κάνει + adjective/noun",
		},
	],
} as const;
