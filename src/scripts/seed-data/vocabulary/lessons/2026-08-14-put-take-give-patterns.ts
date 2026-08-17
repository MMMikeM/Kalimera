import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_08_14 = createLesson({
	meta: {
		date: "2026-08-14",
		topic: "Past and future shapes for βάζω, βγάζω, δίνω, παίρνω",
		source:
			"Weekly lesson - two shape families (βάλ-/βγάλ- and δώσ-/πάρ-), αύριο↔χθες flip drills, παίρνω τηλέφωνο",
		homework: "Flip each αύριο sentence to χθες and each χθες sentence to σήμερα",
	},

	verbs: [
		{ lemma: "βάζω", english: "I put", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "βγάζω", english: "I take off/take out", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "δίνω", english: "I give", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "παίρνω", english: "I take", conjugationFamily: "-ω", cefrLevel: "A1" },
	],

	nouns: [
		{ lemma: "ψυγείο", gender: "neuter", english: "fridge", cefrLevel: "A2" },
		{ lemma: "παπούτσι", gender: "neuter", english: "shoe", cefrLevel: "A1" },
		{ lemma: "τσάντα", gender: "feminine", english: "bag", cefrLevel: "A1" },
		{
			lemma: "κρεοπώλης",
			gender: "masculine",
			english: "butcher",
			cefrLevel: "A2",
			metadata: { note: "το κρεοπωλείο = the butcher's shop" },
		},
	],

	phrases: [
		{
			text: "αύριο θα βάλω το γάλα στο ψυγείο",
			english: "tomorrow I'll put the milk in the fridge",
			metadata: { pattern: "θα βάλω ↔ έβαλα" },
		},
		{
			text: "χθες έβαλα τα κλειδιά στην τσάντα",
			english: "yesterday I put the keys in the bag",
			metadata: { pattern: "έβαλα ↔ θα βάλω" },
		},
		{
			text: "αύριο θα βγάλω τα παπούτσια μου",
			english: "tomorrow I'll take off my shoes",
			metadata: { pattern: "θα βγάλω ↔ έβγαλα" },
		},
		{
			text: "χθες έβγαλα μια φωτογραφία",
			english: "yesterday I took a photo",
			metadata: { pattern: "έβγαλα ↔ θα βγάλω", note: "βγάζω φωτογραφία = take a photo" },
		},
		{
			text: "αύριο θα δώσω τα λεφτά στον κρεοπώλη",
			english: "tomorrow I'll give the money to the butcher",
			metadata: { pattern: "θα δώσω ↔ έδωσα", usage: "στον + masculine target form" },
		},
		{
			text: "χθες έδωσα το βιβλίο στη Μαρία",
			english: "yesterday I gave the book to Maria",
			metadata: { pattern: "έδωσα ↔ θα δώσω" },
		},
		{
			text: "αύριο θα πάρω τηλέφωνο τον φίλο μου",
			english: "tomorrow I'll phone my friend",
			metadata: { pattern: "παίρνω τηλέφωνο + person", usage: "phoning someone" },
		},
		{
			text: "χθες πήρα καρπούζι από το Lidl",
			english: "yesterday I got a watermelon from Lidl",
			metadata: { pattern: "πήρα ↔ θα πάρω", note: "παίρνω also covers buying/getting" },
		},
	],

	grammarNotes: [
		{
			pattern: "Family A — βάζω and βγάζω keep -αλ-",
			examples: [
				"βάζω → θα βάλω → έβαλα",
				"βγάζω → θα βγάλω → έβγαλα",
				"θα βάλω το γάλα στο ψυγείο / έβαλα το γάλα στο ψυγείο",
			],
			explanation:
				"Both verbs swap -ζ- for -λ- in the past and the θα form. Once you have θα βάλω, the past is the same shape with έ- in front and -α on the end: έβαλα. Same for βγάζω.",
		},
		{
			pattern: "Family B — δίνω and παίρνω change the vowel",
			examples: [
				"δίνω → θα δώσω → έδωσα",
				"παίρνω → θα πάρω → πήρα",
				"θα δώσω το βιβλίο / έδωσα το βιβλίο",
			],
			explanation:
				"The whole stem swaps: δίν- becomes δώσ- (θα δώσω, έδωσα), παίρν- becomes πάρ- for the θα form and πήρ- for the past. Endings stay ordinary: -ω for θα, -α for the past.",
		},
		{
			pattern: "Where the έ- comes from",
			examples: [
				"θα βάλω → έβαλα",
				"θα βγάλω → έβγαλα",
				"θα δώσω → έδωσα",
				"θα πάρω → πήρα (no έ-)",
			],
			explanation:
				"Past forms need the stress on the third syllable from the end. Two-syllable stems are too short, so an έ- is glued on to carry it. πήρα already carries its own stressed πή-, so it needs no extra vowel.",
		},
		{
			pattern: "πήρα across all persons",
			examples: ["πήρα", "πήρες", "πήρε", "πήραμε", "πήρατε", "πήραν"],
			explanation:
				"Past endings are the same for every verb in these families: -α, -ες, -ε, -αμε, -ατε, -αν. Learn them once on πήρα and they transfer to έβαλα, έβγαλα, έδωσα.",
		},
		{
			pattern: "Fixed chunks with βγάζω and παίρνω",
			examples: [
				"βγάζω φωτογραφία (take a photo)",
				"βγάζω τα παπούτσια (take off shoes)",
				"παίρνω τηλέφωνο (phone someone)",
				"παίρνω καρπούζι από το σούπερ μάρκετ (get/buy)",
			],
			explanation:
				"These verbs carry meanings English splits between different words. Learn each chunk whole rather than translating βγάζω or παίρνω on its own.",
		},
	],
});
