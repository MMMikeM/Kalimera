import type { NounSeed, Phrase, VerbSeed } from "../../../../types/seed";

export const LESSON_2024_07_29 = {
	meta: {
		date: "2024-07-29",
		topic: "Deponent verbs (-μαι family) and commands",
		source: "Weekly lesson - passive/deponent conjugation",
	},

	// -μαι and -άμαι family verbs (deponent - passive form, active meaning)
	verbs: [
		{ lemma: "έρχομαι", english: "I come", conjugationFamily: "-ομαι" },
		{
			lemma: "φοβάμαι",
			english: "I am scared/afraid",
			conjugationFamily: "-άμαι",
		},
		{ lemma: "κάθομαι", english: "I sit", conjugationFamily: "-ομαι" },
		{ lemma: "θυμάμαι", english: "I remember", conjugationFamily: "-άμαι" },
		{ lemma: "διασκεδάζω", english: "I have fun", conjugationFamily: "-ω" },
		{
			lemma: "καμπουριάζω",
			english: "I hunch/slouch",
			conjugationFamily: "-ω",
		},
	] satisfies VerbSeed[],

	nouns: [
		{ lemma: "καμπούρα", gender: "feminine", english: "hunch/hunchback" },
		{ lemma: "ξύλο", gender: "neuter", english: "wood/beating" },
	] satisfies NounSeed[],

	adverbs: [],

	phrases: [
		// Commands (imperative forms)
		{
			text: "έλα",
			english: "come! (singular)",
			metadata: { grammar: "imperative of έρχομαι", formality: "informal" },
		},
		{
			text: "ελάτε",
			english: "come! (plural/formal)",
			metadata: { grammar: "imperative of έρχομαι", formality: "formal" },
		},
		{
			text: "κάτσε",
			english: "sit! (singular)",
			metadata: { grammar: "imperative of κάθομαι", formality: "informal" },
		},
		{
			text: "καθίστε",
			english: "sit! (plural/formal)",
			metadata: { grammar: "imperative of κάθομαι", formality: "formal" },
		},
		{
			text: "σήκω πάνω",
			english: "stand up!",
			metadata: { usage: "command" },
		},
		{
			text: "κάτσε κάτω",
			english: "sit down!",
			metadata: { usage: "command" },
		},
		// Negative command
		{
			text: "μη καμπουριάζεις",
			english: "don't slouch!",
			metadata: { grammar: "μη + present for negative commands" },
		},
		// Colloquial threat (playful)
		{
			text: "θα φας ξύλο",
			english: "you'll get a beating",
			metadata: { register: "colloquial", literal: "you will eat wood" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "Deponent verb conjugation (-μαι)",
			examples: ["-μαι, -σαι, -ται", "-όμαστε, -στε, -ο(υ)νται"],
			explanation:
				"Passive form endings but active meaning (I come, I sit, etc.)",
		},
		{
			pattern: "Imperative of deponent verbs",
			examples: ["έρχομαι → έλα/ελάτε", "κάθομαι → κάτσε/καθίστε"],
			explanation: "Irregular imperative forms - must memorize",
		},
	],
} as const;
