import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_09_22 = createLesson({
	meta: {
		date: "2026-09-22",
		topic: "Afternoon and its meal; busy, hungry, doctor and dentist",
		source:
			"Weekly lesson - the meal word from each time of day (πρωί → πρωινό, μεσημέρι → μεσημεριανό, απόγευμα → απογευματινό, βράδυ → βραδινό); απασχολημένος, -η, -ο; πεινάω conjugated; συχνά; ο/η γιατρός and ο/η οδοντίατρος, one form for both genders; the plurals τα αβγά and τα δόντια",
	},

	verbs: [{ lemma: "πεινάω", english: "I am hungry", conjugationFamily: "-άω", cefrLevel: "A1" }],

	nouns: [
		{
			lemma: "απόγευμα",
			gender: "neuter",
			english: "afternoon",
			cefrLevel: "A1",
			metadata: { note: "pair: απογευματινό = afternoon snack" },
		},
		{ lemma: "απογευματινό", gender: "neuter", english: "afternoon snack", cefrLevel: "A2" },
		{
			lemma: "αβγό",
			gender: "neuter",
			english: "egg",
			cefrLevel: "A1",
			metadata: { note: "plural τα αβγά; also spelled αυγό" },
		},
		{
			lemma: "δόντι",
			gender: "neuter",
			english: "tooth",
			cefrLevel: "A1",
			metadata: { note: "plural τα δόντια" },
		},
		{
			lemma: "γιατρός",
			gender: "masculine",
			english: "doctor (ο/η γιατρός — common gender)",
			cefrLevel: "A2",
		},
		{
			lemma: "οδοντίατρος",
			gender: "masculine",
			english: "dentist (ο/η οδοντίατρος — common gender)",
			cefrLevel: "A2",
		},
	],

	adjectives: [{ lemma: "απασχολημένος", english: "busy/occupied", cefrLevel: "A2" }],

	adverbs: [{ lemma: "συχνά", english: "often", cefrLevel: "A2" }],

	phrases: [
		{
			text: "Είμαι απασχολημένος.",
			english: "I'm busy. (a man speaking)",
			metadata: { pattern: "είμαι + -μένος, matching the speaker" },
		},
		{ text: "Είμαι απασχολημένη.", english: "I'm busy. (a woman speaking)" },
		{ text: "Είσαι απασχολημένος σήμερα;", english: "Are you busy today?" },
		{
			text: "Πεινάς;",
			english: "Are you hungry?",
			metadata: { pattern: "πεινάω: a verb, not είμαι + adjective" },
		},
		{ text: "Πεινάω πολύ.", english: "I'm very hungry." },
		{ text: "Πεινάτε; Πάμε για μεσημεριανό;", english: "Are you hungry? Shall we go for lunch?" },
		{ text: "Για πρωινό τρώω δύο αβγά.", english: "For breakfast I eat two eggs." },
		{ text: "Το απόγευμα πίνω καφέ.", english: "In the afternoon I have a coffee." },
		{
			text: "Πας συχνά στον γιατρό;",
			english: "Do you often go to the doctor?",
			metadata: { note: "συχνά often follows the verb in a question" },
		},
		{
			text: "Η γιατρός είναι απασχολημένη.",
			english: "The doctor is busy. (a woman)",
			metadata: { note: "only η and απασχολημένη show the doctor is a woman" },
		},
		{ text: "Πρέπει να πάω στον οδοντίατρο.", english: "I have to go to the dentist." },
		{ text: "Ο οδοντίατρος κοιτάζει τα δόντια μου.", english: "The dentist looks at my teeth." },
	],

	grammarNotes: [
		{
			pattern: "απόγευμα → απογευματινό, like πρωί → πρωινό",
			examples: [
				"το απόγευμα → το απογευματινό (afternoon → afternoon snack)",
				"το πρωί → το πρωινό · το μεσημέρι → το μεσημεριανό · το βράδυ → το βραδινό",
			],
			explanation:
				"The afternoon joins the set: each time of day gives a neuter meal word in -ινό or -ιανό. The meal words are the neuter of adjectives, so they describe things too: ο πρωινός καφές, the morning coffee.",
			section: "gender/gender-families",
		},
		{
			pattern: "απασχολημένος matches whoever is busy",
			examples: [
				"Είμαι απασχολημένος. (a man)",
				"Είμαι απασχολημένη. (a woman)",
				"Είμαστε απασχολημένοι. (a group)",
			],
			explanation: "Like κουρασμένος, it changes like any adjective in -ος, -η, -ο to match the person.",
			section: "agreement/describing-yourself",
		},
		{
			pattern: "πεινάω: being hungry is a verb",
			examples: ["πεινάω, πεινάς, πεινάει", "πεινάμε, πεινάτε, πεινάνε"],
			explanation:
				"Greek says I'm hungry with a verb, not with είμαι and an adjective. It takes the -άω endings of μιλάω.",
			section: "verbs/present",
		},
		{
			pattern: "ο/η γιατρός: one form for both",
			examples: [
				"ο γιατρός · η γιατρός",
				"ο οδοντίατρος · η οδοντίατρος",
				"Η γιατρός είναι απασχολημένη.",
			],
			explanation:
				"Only the article, and any adjective, show whether the doctor is a man or a woman. The noun keeps its -ος endings either way: τον γιατρό, τη γιατρό.",
			section: "gender/gender-pairs",
		},
		{
			pattern: "Neuter plurals: αβγό → αβγά, δόντι → δόντια",
			examples: ["το αβγό → τα αβγά", "το δόντι → τα δόντια"],
			explanation: "-ο swaps to -α, and -ι adds -α. The article is τα for both.",
			section: "nouns/families-o-i",
		},
	],
});
