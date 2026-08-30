import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_08_25 = createLesson({
	meta: {
		date: "2026-08-25",
		topic: "Body parts, leisure activities, and the λένε naming pattern",
		source: "Weekly lesson - με λένε / τον λένε, χρησιμοποιώ + target forms, sports and hobbies",
		homework: "Write which body parts people use for each activity, or write about Lio and Luka",
	},

	verbs: [
		{ lemma: "σηκώνω", english: "I lift", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "χρησιμοποιώ", english: "I use", conjugationFamily: "-άω/-ώ", cefrLevel: "B1" },
	],

	nouns: [
		{ lemma: "χέρι", gender: "neuter", english: "hand/arm", cefrLevel: "A1" },
		{
			lemma: "μπράτσο",
			gender: "neuter",
			english: "arm",
			cefrLevel: "A2",
			metadata: { note: "μπράτσο is the upper arm; χέρι covers hand and arm together" },
		},
		{ lemma: "πόδι", gender: "neuter", english: "leg/foot", cefrLevel: "A1" },
		{ lemma: "γόνατο", gender: "neuter", english: "knee", cefrLevel: "A2" },
		{ lemma: "ώμος", gender: "masculine", english: "shoulder", cefrLevel: "A2" },
		{
			lemma: "κοιλιά",
			gender: "feminine",
			english: "belly/abdomen",
			cefrLevel: "A2",
			metadata: { note: "κοιλιά is the outside; στομάχι is the organ inside" },
		},
		{ lemma: "στομάχι", gender: "neuter", english: "stomach", cefrLevel: "A2" },
		{ lemma: "στήθος", gender: "neuter", english: "chest", cefrLevel: "B1" },
		{ lemma: "λαιμός", gender: "masculine", english: "neck/throat", cefrLevel: "B1" },
		{ lemma: "στόμα", gender: "neuter", english: "mouth", cefrLevel: "A1" },
		{ lemma: "μάτι", gender: "neuter", english: "eye", cefrLevel: "A1" },
		{
			lemma: "αυτί",
			gender: "neuter",
			english: "ear",
			cefrLevel: "A1",
			metadata: { note: "also spelled αφτί; both are current" },
		},
		{
			lemma: "βάρος",
			gender: "neuter",
			english: "weight",
			cefrLevel: "A2",
			metadata: { note: "σηκώνω βάρη = I lift weights (always plural for the gym sense)" },
		},
		{ lemma: "μπαλέτο", gender: "neuter", english: "ballet", cefrLevel: "A2" },
		{
			lemma: "κατάδυση",
			gender: "feminine",
			english: "dive/scuba diving",
			cefrLevel: "B2",
			metadata: { note: "the hobby is usually plural: κάνω καταδύσεις" },
		},
		{ lemma: "παιχνίδι", gender: "neuter", english: "game/toy", cefrLevel: "A1" },
		{ lemma: "διασκέδαση", gender: "feminine", english: "fun/entertainment", cefrLevel: "B1" },
	],

	phrases: [
		{
			text: "με λένε Μάικ",
			english: "my name is Mike",
			metadata: { pattern: "με/σε/τον/την + λένε", usage: "giving your own name" },
		},
		{
			text: "πώς σε λένε;",
			english: "what's your name?",
			metadata: { pattern: "πώς + σε λένε", usage: "asking someone's name" },
		},
		{
			text: "τον λένε Άκη",
			english: "his name is Akis",
			metadata: { pattern: "τον/την λένε + name", usage: "naming a third person" },
		},
		{
			text: "όταν οι άνθρωποι σηκώνουν βάρη, χρησιμοποιούν τα μπράτσα, τα πόδια, την κοιλιά και τους ώμους",
			english:
				"when people lift weights, they use their arms, legs, abdomen and shoulders",
			metadata: { pattern: "όταν + activity, χρησιμοποιούν + target forms" },
		},
		{
			text: "ο Άκης χρησιμοποιεί τα χέρια του, το στόμα του, το στήθος του και τα αυτιά του",
			english: "Akis uses his hands, his mouth, his chest and his ears",
			metadata: { pattern: "noun + του for possession" },
		},
		{
			text: "κάνω πιλάτες",
			english: "I do pilates",
			metadata: { pattern: "κάνω + activity", note: "πιλάτες stays the same in every position" },
		},
		{
			text: "παίζω μουσικό όργανο",
			english: "I play a musical instrument",
			metadata: { pattern: "παίζω + instrument" },
		},
		{
			text: "παίζω βίντεο παιχνίδια",
			english: "I play video games",
			metadata: { pattern: "παίζω + activity" },
		},
		{
			text: "κάνω καταδύσεις",
			english: "I go scuba diving",
			metadata: { pattern: "κάνω + activity" },
		},
	],

	grammarNotes: [
		{
			pattern: "Names with λένε — literally 'they call me'",
			examples: [
				"με λένε Μάικ (my name is Mike)",
				"πώς σε λένε; (what's your name?)",
				"τον λένε Άκη / την λένε Άννα (his name is Akis / her name is Anna)",
				"μας λένε / σας λένε / τους λένε / τις λένε",
			],
			explanation:
				"Greek says the name sentence backwards from English: the person is the target, not the doer. The little word in front is the same one you already use for 'me, you, him, her' as a target — με, σε, τον, την, μας, σας, τους, τις — and λένε never changes. Το όνομά μου είναι Μάικ also works, but λένε is what people actually say.",
		},
		{
			pattern: "The name after λένε is a target too",
			examples: ["τον λένε Άκη (not Άκης)", "τον λένε Γιώργο (not Γιώργος)", "την λένε Άννα"],
			explanation:
				"A masculine name loses its -ς after λένε, because it is being pointed at rather than doing anything. Feminine and neuter names look unchanged.",
		},
		{
			pattern: "χρησιμοποιώ points at the body part",
			examples: [
				"η κοιλιά → χρησιμοποιώ την κοιλιά",
				"οι ώμοι → χρησιμοποιώ τους ώμους",
				"ο λαιμός → χρησιμοποιώ τον λαιμό",
				"τα πόδια → χρησιμοποιώ τα πόδια (unchanged)",
			],
			explanation:
				"Whatever you use is the target of the verb, so its article and ending shift. Neuter words hide this — τα πόδια, τα χέρια, τα μάτια look identical either way — which makes the masculine and feminine ones easy to forget. οι ώμοι becomes τους ώμους; η κοιλιά becomes την κοιλιά.",
		},
		{
			pattern: "Body parts in -ι take -ια in the plural",
			examples: [
				"πόδι → πόδια",
				"χέρι → χέρια",
				"μάτι → μάτια",
				"αυτί → αυτιά",
				"στομάχι → στομάχια",
			],
			explanation:
				"Every one of these adds -α to the -ι. μπράτσο and γόνατο end in -ο instead, so they simply swap it for -α: τα μπράτσα, τα γόνατα.",
		},
		{
			pattern: "Whose body part — the word goes after",
			examples: [
				"τα χέρια του (his hands)",
				"το στόμα του (his mouth)",
				"τα μάτια μου (my eyes)",
				"την κοιλιά της (her belly)",
			],
			explanation:
				"Greek keeps the article and adds μου/σου/του/της/μας/σας/τους after the noun. Greek uses the article where English uses 'his' — τα χέρια του is 'the hands of-him'.",
		},
	],
});
