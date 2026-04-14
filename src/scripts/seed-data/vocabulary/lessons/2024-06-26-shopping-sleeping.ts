import { createLesson } from "@/types/lesson-builder";
export const LESSON_2024_06_26 = createLesson({
	meta: {
		date: "2024-06-26",
		topic: "Shopping, sleeping, and deponent verb conjugations",
		source: "Weekly lesson - γίνομαι, έρχομαι conjugations",
	},

	verbs: [
		{ lemma: "ψωνίζω", english: "I shop", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "κοιμάμαι", english: "I sleep", conjugationFamily: "-άμαι", cefrLevel: "A1" },
		{ lemma: "γίνομαι", english: "I become", conjugationFamily: "-ομαι", cefrLevel: "A1" },
		{ lemma: "λέω", english: "I say", conjugationFamily: "irregular", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "ύπνος", gender: "masculine", english: "sleep" },
		{ lemma: "χαρά", gender: "feminine", english: "joy" },
		{ lemma: "χαιρετίσματα", gender: "neuter", english: "greetings" },
	],

	adverbs: [
		{ lemma: "μέχρι", english: "until", cefrLevel: "A1" },
		{ lemma: "λοιπόν", english: "well/so", cefrLevel: "A1" },
	],

	phrases: [
		// Shopping expressions
		{
			text: "κάνω ψώνια",
			english: "I do shopping",
			metadata: { synonym: "ψωνίζω" },
		},
		{
			text: "πάω για ψώνια",
			english: "I go shopping",
			metadata: { pattern: "πάω για + noun" },
		},
		// Sleep expressions
		{
			text: "παίρνω έναν υπνάκο",
			english: "I take a nap",
			metadata: { note: "υπνάκος = diminutive of ύπνος" },
		},
		{
			text: "πάω για ύπνο",
			english: "I go to sleep",
			metadata: { pattern: "πάω για + noun" },
		},
		// Common greetings/responses
		{
			text: "μια χαρά",
			english: "just fine!",
			metadata: { usage: "response to τι κάνεις", literal: "one joy" },
		},
		{
			text: "τι γίνεται;",
			english: "what's up?",
			metadata: { usage: "informal greeting" },
		},
		{
			text: "τι γίνεται εδώ;",
			english: "what's happening here?",
			metadata: { usage: "asking about situation" },
		},
		{
			text: "περνάω καλά",
			english: "I'm having fun",
			metadata: { literal: "I pass well" },
		},
		{
			text: "τα λέμε",
			english: "see you / talk to you later",
			metadata: { literal: "we say them", usage: "informal goodbye" },
		},
	],

	grammarNotes: [
		{
			pattern: "γίνομαι conjugation (-ομαι)",
			examples: ["γίνομαι, γίνεσαι, γίνεται", "γινόμαστε, γίνεστε, γίνονται"],
			explanation: "Deponent verb - passive form, active meaning",
		},
		{
			pattern: "έρχομαι conjugation (-ομαι)",
			examples: ["έρχομαι, έρχεσαι, έρχεται", "ερχόμαστε, έρχεστε, έρχονται"],
			explanation: "Note: ερχόσαστε is alternative form for έρχεστε",
		},
	],
});
