import { mark } from "@/lib/guide-marks";
import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_10_16 = createLesson({
	meta: {
		date: "2026-10-16",
		topic: "The beach and the sea",
		source:
			"Weekly lesson - vocabulary for the beach and the sea (πισίνα, παραλία, θάλασσα, βάρκα, πλοίο and καράβι, καρχαρίας, φώκια) and σαν for like. From the notes only; the example sentences are simple ones built on that vocabulary",
	},

	verbs: [{ lemma: "κολυμπάω", english: "I swim", conjugationFamily: "-άω", cefrLevel: "A1" }],

	nouns: [
		{ lemma: "πισίνα", gender: "feminine", english: "swimming pool", cefrLevel: "A2" },
		{ lemma: "παραλία", gender: "feminine", english: "beach", cefrLevel: "A2" },
		{ lemma: "θάλασσα", gender: "feminine", english: "sea", cefrLevel: "A1" },
		{ lemma: "βάρκα", gender: "feminine", english: "boat", cefrLevel: "A2" },
		{ lemma: "πλοίο", gender: "neuter", english: "ship", cefrLevel: "A2" },
		{ lemma: "καράβι", gender: "neuter", english: "ship", cefrLevel: "A2" },
		{ lemma: "καρχαρίας", gender: "masculine", english: "shark", cefrLevel: "B1" },
		{ lemma: "φώκια", gender: "feminine", english: "seal", cefrLevel: "B1" },
	],

	adverbs: [{ lemma: "σαν", english: "like (comparing)", cefrLevel: "A2" }],

	phrases: [
		{
			text: "Πάμε στην παραλία;",
			english: "Shall we go to the beach?",
			metadata: { pattern: "σε + την → στην" },
		},
		{
			text: "Κολυμπάω στη θάλασσα.",
			english: "I swim in the sea.",
			metadata: { pattern: "σε + τη → στη" },
		},
		{ text: "Κολυμπάω στην πισίνα.", english: "I swim in the pool." },
		{
			text: "Η φώκια κολυμπάει σαν ψάρι.",
			english: "The seal swims like a fish.",
			metadata: { pattern: "σαν + noun" },
		},
		{
			text: "Σήμερα η θάλασσα είναι σαν πισίνα.",
			english: "Today the sea is like a pool.",
			metadata: { note: "said of a calm, clear sea" },
		},
		{ text: "Υπάρχουν καρχαρίες εδώ;", english: "Are there sharks here?" },
		{
			text: "Πάμε στο νησί με τη βάρκα.",
			english: "We're going to the island by boat.",
			metadata: { pattern: "με + Target form" },
		},
		{ text: "Το πλοίο φεύγει στις δέκα.", english: "The ship leaves at ten." },
		{ text: "Βλέπω ένα καράβι στη θάλασσα.", english: "I can see a ship on the sea." },
	],

	grammarNotes: [
		{
			pattern: "σε + article at the beach and in the sea",
			examples: [{ greek: "στην παραλία", english: "at the beach", marks: [mark("στην παραλία", "accusative", "feminine")] }, { greek: "στην πισίνα", english: "in the pool", marks: [mark("στην πισίνα", "accusative", "feminine")] }, { greek: "στη θάλασσα", english: "in the sea", marks: [mark("στη θάλασσα", "accusative", "feminine")] }, { greek: "στο πλοίο", english: "on the ship", marks: [mark("στο πλοίο", "accusative", "neuter")] }],
			explanation:
				"σε joins the article as one word, and the noun takes the Target form. παραλία and πισίνα begin with π, so την keeps its ν; θάλασσα does not, so στη.",
			section: "place/se-contractions",
		},
		{
			pattern: "σαν: like",
			examples: ["Η φώκια κολυμπάει σαν ψάρι.", { greek: "σαν τον καρχαρία", english: "like the shark", marks: [mark("τον καρχαρία", "accusative", "masculine")] }],
			explanation:
				"σαν says one thing is like another. With an article, the noun after it takes the Target form, as after σε.",
			section: "place/without-until",
		},
		{
			pattern: "πλοίο and καράβι: ship",
			examples: ["το πλοίο", "το καράβι"],
			explanation:
				"Both mean ship and both are neuter. πλοίο is the usual word on tickets and timetables; καράβι is the everyday one.",
			section: "word",
		},
	],
});
