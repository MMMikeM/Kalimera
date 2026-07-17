import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_07_10 = createLesson({
	meta: {
		date: "2026-07-10",
		topic: "Emphatic possession, weather, μου αρέσει, and υπάρχει with quantifiers",
		source:
			"Weekly lesson - δικός μου/σου/του, δεν βρέχει vs δεν έχει βροχή, μου αρέσει/αρέσουν paradigm, Fluentize 'Welcome To My Chicago Neighborhood' (A1): υπάρχει/υπάρχουν + μερικά/κανένα/ένα",
	},

	nouns: [
		{
			lemma: "πρόσωπο",
			gender: "neuter",
			english: "face",
			cefrLevel: "A1",
			metadata: { note: "plural: τα πρόσωπα; also 'person'" },
		},
		{
			lemma: "σκουπίδι",
			gender: "neuter",
			english: "garbage/rubbish",
			cefrLevel: "A2",
			metadata: { note: "usually plural: τα σκουπίδια" },
		},
		{ lemma: "χειμώνας", gender: "masculine", english: "winter", cefrLevel: "A1" },
		{ lemma: "βροχή", gender: "feminine", english: "rain", cefrLevel: "A2" },
		{
			lemma: "κλαψιάρης",
			gender: "masculine",
			english: "crybaby",
			cefrLevel: "B1",
			metadata: { note: "feminine: η κλαψιάρα; from κλαίω (to cry)" },
		},
		// Neighbourhood places (Chicago neighbourhood worksheet)
		{
			lemma: "βιβλιοπωλείο",
			gender: "neuter",
			english: "bookshop",
			cefrLevel: "A2",
			metadata: { note: "βιβλίο + πωλείο: sells books" },
		},
		{ lemma: "βιβλιοθήκη", gender: "feminine", english: "library", cefrLevel: "A2" },
		{
			lemma: "ζαχαροπλαστείο",
			gender: "neuter",
			english: "patisserie/sweet shop",
			cefrLevel: "A2",
			metadata: { note: "ζάχαρη (sugar) + πλάθω (to shape)" },
		},
		{
			lemma: "παγωτατζίδικο",
			gender: "neuter",
			english: "ice cream shop",
			cefrLevel: "B1",
			metadata: { note: "from παγωτό (ice cream); -τζίδικο = colloquial shop suffix" },
		},
		{ lemma: "τράπεζα", gender: "feminine", english: "bank", cefrLevel: "A1" },
		{ lemma: "αεροδρόμιο", gender: "neuter", english: "airport", cefrLevel: "A1" },
		{
			lemma: "μπαρ",
			gender: "neuter",
			english: "bar",
			cefrLevel: "A1",
			metadata: { note: "indeclinable: το μπαρ / τα μπαρ" },
		},
		// Nature
		{ lemma: "βουνό", gender: "neuter", english: "mountain", cefrLevel: "A1" },
	],

	adjectives: [
		{
			lemma: "δικός",
			english: "my own/mine (emphatic possessive)",
			cefrLevel: "A2",
		},
		// Describing your area (Chicago neighbourhood worksheet)
		{ lemma: "όμορφος", english: "beautiful", cefrLevel: "A1" },
		{ lemma: "φθηνός", english: "cheap", cefrLevel: "A2" },
		{ lemma: "υπέροχος", english: "wonderful", cefrLevel: "A2" },
		{ lemma: "πράσινος", english: "green", cefrLevel: "A1" },
		{ lemma: "ιστορικός", english: "historic", cefrLevel: "B1" },
		{ lemma: "οικονομικός", english: "economical/inexpensive", cefrLevel: "A2" },
	],

	adverbs: [{ lemma: "επειδή", english: "because", cefrLevel: "A1" }],

	phrases: [
		{
			text: "είναι δικό μου",
			english: "it's mine",
			metadata: { pattern: "δικός/δική/δικό + μου/σου/του", usage: "emphatic possession" },
		},
		{
			text: "είναι τρελό",
			english: "it's crazy",
			metadata: { usage: "reaction/exclamation" },
		},
		{
			text: "δεν βρέχει",
			english: "it's not raining",
			metadata: { pattern: "impersonal weather verb" },
		},
		{
			text: "δεν έχει βροχή",
			english: "there is no rain",
			metadata: { pattern: "έχει + noun (impersonal 'there is')" },
		},
		// μου αρέσει paradigm
		{
			text: "τι σου αρέσει στην πόλη σου;",
			english: "what do you like about your town?",
			metadata: { pattern: "pronoun + αρέσει", usage: "asking about likes" },
		},
		{
			text: "μου αρέσουν τα πάρκα",
			english: "I like the parks",
			metadata: { pattern: "μου αρέσουν + plural", note: "verb agrees with thing liked" },
		},
		{
			text: "μου αρέσεις",
			english: "I like you",
			metadata: { pattern: "pronoun + αρέσεις", note: "the liked person is the subject" },
		},
		// υπάρχει/υπάρχουν with quantifiers
		{
			text: "υπάρχουν μερικά καταστήματα στο κέντρο",
			english: "there are some shops in the centre",
			metadata: { pattern: "υπάρχουν + μερικά (some)" },
		},
		{
			text: "δεν υπάρχει κανένα πάρκο στη γειτονιά μου",
			english: "there isn't any park in my neighbourhood",
			metadata: { pattern: "δεν υπάρχει + κανένα (not any)" },
		},
		{
			text: "υπάρχει ένα βιβλιοπωλείο, αλλά δεν υπάρχει βιβλιοθήκη",
			english: "there is a bookshop, but there is no library",
			metadata: { pattern: "υπάρχει + ένα (a/an)" },
		},
	],

	grammarNotes: [
		{
			pattern: "Emphatic possession: δικός/δική/δικό + possessive",
			examples: [
				"ο δικός μου καφές (my own coffee)",
				"η δική σου τσάντα (your own bag)",
				"το δικό του σπίτι (his own house)",
				"είναι δικό μου (it's mine)",
			],
			explanation:
				"δικός agrees in gender/number with the thing owned (δικός/δική/δικό), then takes the short possessive (μου, σου, του...). Use it for emphasis or standalone 'mine/yours' — plain possession is just noun + μου.",
		},
		{
			pattern: "Weather: verb vs έχει + noun",
			examples: ["βρέχει (it's raining) / δεν βρέχει", "έχει βροχή (there's rain) / δεν έχει βροχή"],
			explanation:
				"Two ways to talk about weather: an impersonal verb (βρέχει) or impersonal έχει + noun (έχει βροχή). Both third person singular, no subject.",
		},
		{
			pattern: "επειδή = because",
			examples: ["Δεν βγαίνω επειδή βρέχει (I'm not going out because it's raining)"],
			explanation:
				"επειδή introduces a reason clause and answers γιατί (why). γιατί can also mean 'because' in speech, but επειδή can start a sentence.",
		},
		{
			pattern: "μου αρέσει / μου αρέσουν",
			examples: [
				"μου αρέσει ο καφές (I like coffee)",
				"σου αρέσει; (do you like it?)",
				"της αρέσει (she likes it)",
				"μας αρέσουν τα πάρκα (we like the parks)",
				"μου αρέσεις (I like you)",
			],
			explanation:
				"αρέσω works backwards: the thing liked is the subject, the liker is an indirect pronoun (μου, σου, του, της, μας, σας, τους/τις). Singular thing → αρέσει, plural → αρέσουν, a person you like → αρέσεις.",
		},
		{
			pattern: "Indirect pronouns with μιλάω",
			examples: [
				"μου μιλάς (you speak to me)",
				"σου μιλάω (I speak to you)",
				"του/της μιλάει (he/she speaks to him/her)",
				"μας μιλάει (he speaks to us)",
			],
			explanation:
				"The same short pronouns (μου, σου, του, της, μας, σας) mark 'to me/you/him...' before verbs of speaking and giving — identical in form to the possessives, but positioned before the verb.",
		},
		{
			pattern: "υπάρχει/υπάρχουν + μερικά, κανένα, ένα",
			examples: [
				"Υπάρχουν μερικά/κάποια καταστήματα (there are some shops)",
				"Δεν υπάρχει κανένα πάρκο (there isn't any park)",
				"Δεν υπάρχουν καθόλου τράπεζες (there aren't any banks)",
				"Υπάρχει ένα βιβλιοπωλείο (there is a bookshop)",
			],
			explanation:
				"υπάρχει (singular) / υπάρχουν (plural) = there is/are. 'Some' with plurals: μερικοί/μερικές/μερικά or κάποιοι/κάποιες/κάποια. 'Not any': κανένας/καμία/κανένα with singular, καθόλου with plural. 'A/an': ένας/μία/ένα. All agree in gender.",
		},
	],
});
