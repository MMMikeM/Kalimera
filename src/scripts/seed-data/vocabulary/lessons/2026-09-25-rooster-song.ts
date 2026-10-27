import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_09_25 = createLesson({
	meta: {
		date: "2026-09-25",
		topic: "A children's song: Όταν θα πάω, κυρά μου, στο παζάρι",
		source:
			"Weekly lesson - listening to the children's song Όταν θα πάω, κυρά μου, στο παζάρι, where each verse adds an animal and its sound; farm animals and their small forms (κότα → κοτούλα, γάτα → γατούλα, σκυλάκι, γουρουνάκι); κοτόπουλο from κότα + πουλί; όταν inside a sentence, θα σου αγοράσω, κάθε πρωί σε ξυπνάει; κυρά, the old form of κυρία; Greek lunch comes after two",
		homework: "Sing the song; redo the first page of the last homework in the past tense",
	},

	verbs: [
		{ lemma: "αγοράζω", english: "I buy", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "πάω", english: "I go", conjugationFamily: "irregular", cefrLevel: "A1" },
		{ lemma: "ξυπνάω", english: "I wake up", conjugationFamily: "-άω", cefrLevel: "A1" },
		{ lemma: "βγάζω", english: "I take off/take out", conjugationFamily: "-ω", cefrLevel: "A2" },
	],

	nouns: [
		{ lemma: "κόκορας", gender: "masculine", english: "rooster", cefrLevel: "A2" },
		{ lemma: "κότα", gender: "feminine", english: "hen", cefrLevel: "A2" },
		{
			lemma: "πουλί",
			gender: "neuter",
			english: "bird",
			cefrLevel: "A2",
			metadata: { note: "plural τα πουλιά" },
		},
		{
			lemma: "κοτόπουλο",
			gender: "neuter",
			english: "chicken (to eat)",
			cefrLevel: "A1",
			metadata: { note: "κότα + πουλί" },
		},
		{
			lemma: "κοτούλα",
			gender: "feminine",
			english: "little hen",
			cefrLevel: "B1",
			metadata: { note: "small form of κότα" },
		},
		{
			lemma: "γατούλα",
			gender: "feminine",
			english: "little cat, kitty",
			cefrLevel: "A2",
			metadata: { note: "small form of γάτα" },
		},
		{
			lemma: "σκυλάκι",
			gender: "neuter",
			english: "little dog",
			cefrLevel: "A2",
			metadata: { note: "small form of σκύλος" },
		},
		{ lemma: "γουρούνι", gender: "neuter", english: "pig", cefrLevel: "A2" },
		{
			lemma: "γουρουνάκι",
			gender: "neuter",
			english: "piglet, little pig",
			cefrLevel: "B1",
			metadata: { note: "small form of γουρούνι" },
		},
		{ lemma: "γάλα", gender: "neuter", english: "milk", cefrLevel: "A1" },
		{ lemma: "παζάρι", gender: "neuter", english: "open market, bazaar", cefrLevel: "B1" },
	],

	phrases: [
		// From the song
		{
			text: "Όταν θα πάω, κυρά μου, στο παζάρι",
			english: "When I go to the market, my lady",
			metadata: { pattern: "όταν θα + short form", note: "the song's title and first line" },
		},
		{
			text: "Θα σου αγοράσω έναν κόκορα.",
			english: "I'll buy you a rooster.",
			metadata: { pattern: "θα + σου + short form" },
		},
		{
			text: "Κάθε πρωί σε ξυπνάει.",
			english: "It wakes you up every morning.",
			metadata: { pattern: "σε, the Target you, before the verb" },
		},
		{
			text: "Ο κόκορας κάνει κικιρίκου.",
			english: "The rooster goes cock-a-doodle-doo.",
			metadata: { note: "the song drops the verb: ο κόκορας κικιρίκου" },
		},
		// Around the song
		{
			text: "Όταν πάω στο παζάρι, θα αγοράσω γάλα.",
			english: "When I go to the market, I'll buy milk.",
			metadata: { pattern: "όταν + short form, then θα" },
		},
		{ text: "Βγάζω τον σκύλο βόλτα.", english: "I take the dog for a walk." },
		{
			text: "Οι Έλληνες τρώνε μεσημεριανό μετά τις δύο.",
			english: "Greeks eat lunch after two.",
			metadata: { note: "usually around three or four" },
		},
	],

	grammarNotes: [
		{
			pattern: "Small forms: -άκι and -ούλα",
			examples: [
				"ο σκύλος → το σκυλάκι",
				"το γουρούνι → το γουρουνάκι",
				"η κότα → η κοτούλα",
				"η γάτα → η γατούλα",
			],
			explanation:
				"-άκι makes a noun small and neuter, whatever it was before. -ούλα makes a feminine noun small and keeps it feminine. Children's songs use the small forms throughout, for affection as much as size.",
			section: "gender/small-big",
		},
		{
			pattern: "όταν links, πότε asks",
			examples: [
				"Πότε θα πας στο παζάρι; (asks when)",
				"Όταν θα πάω στο παζάρι… (links: when I go)",
				"Όταν πάω στο παζάρι, θα αγοράσω γάλα.",
			],
			explanation:
				"όταν is when inside a sentence, never the question. For something still to come it takes the short form: όταν πάω, or, as in the song, όταν θα πάω. θα marks the future; it doesn't mean we.",
			section: "joining/when-why",
		},
		{
			pattern: "θα σου αγοράσω: the short word sits between θα and the verb",
			examples: ["Θα σου αγοράσω έναν κόκορα.", "Κάθε πρωί σε ξυπνάει."],
			explanation:
				"σου (for you) and σε (you) go right before the verb, and θα goes in front of them. σου is for the person something is bought or given for; σε is the person the action is done to.",
			section: "little-words/where-it-goes",
		},
		{
			pattern: "κοτόπουλο = κότα + πουλί",
			examples: ["η κότα (hen) + το πουλί (bird) → το κοτόπουλο (chicken)", "Τρώω κοτόπουλο."],
			explanation:
				"κοτόπουλο is the chicken you eat. The live hen is η κότα and the rooster ο κόκορας. It is neuter, like πουλί.",
			section: "word",
		},
		{
			pattern: "κυρά: the old form of κυρία",
			examples: ["κυρά μου (my lady, in the song)", "η κυρία (lady, Mrs, in everyday Greek)"],
			explanation:
				"κυρά survives in songs, folk speech and set phrases. In everyday Greek use κυρία.",
			section: "word",
		},
	],
});
