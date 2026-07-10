import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_06_26 = createLesson({
	meta: {
		date: "2026-06-26",
		topic: "Neighbourhood and places in town",
		source: "Weekly lesson - για + purpose, πάμε σε + place, -πωλείο shops",
		homework: "https://www.youtube.com/watch?v=f-jyagaFapk",
		lessonObjective: "Sing μικρό ελεφαντάκι",
	},

	verbs: [{ lemma: "πουλάω", english: "I sell", conjugationFamily: "-άω/-ώ", cefrLevel: "A2" }],

	nouns: [
		// Neighbourhood
		{ lemma: "γειτονιά", gender: "feminine", english: "neighbourhood", cefrLevel: "A2" },
		{
			lemma: "γείτονας",
			gender: "masculine",
			english: "neighbour",
			cefrLevel: "A2",
			metadata: { note: "female: η γειτόνισσα" },
		},
		{ lemma: "γειτόνισσα", gender: "feminine", english: "neighbour (female)", cefrLevel: "A2" },
		{
			lemma: "μέρος",
			gender: "neuter",
			english: "place",
			cefrLevel: "A2",
			metadata: { note: "plural: τα μέρη" },
		},
		{
			lemma: "εικόνα",
			gender: "feminine",
			english: "image/picture",
			cefrLevel: "A2",
			metadata: { note: "plural: οι εικόνες" },
		},
		// Places in town
		{
			lemma: "μίνι μάρκετ",
			gender: "neuter",
			english: "grocery shop/mini market",
			cefrLevel: "A1",
			metadata: { note: "indeclinable; = παντοπωλείο" },
		},
		{
			lemma: "παντοπωλείο",
			gender: "neuter",
			english: "grocery store",
			cefrLevel: "B1",
			metadata: { note: "πάντα + πωλείο: sells everything" },
		},
		{
			lemma: "πωλητής",
			gender: "masculine",
			english: "seller/salesperson",
			cefrLevel: "A2",
			metadata: { note: "from πουλάω (to sell)" },
		},
		{ lemma: "πανεπιστήμιο", gender: "neuter", english: "university", cefrLevel: "A2" },
		{ lemma: "εστιατόριο", gender: "neuter", english: "restaurant", cefrLevel: "A1" },
		{ lemma: "πάρκο", gender: "neuter", english: "park", cefrLevel: "A1" },
		{ lemma: "φαρμακείο", gender: "neuter", english: "pharmacy", cefrLevel: "A1" },
		{ lemma: "νοσοκομείο", gender: "neuter", english: "hospital", cefrLevel: "A1" },
		{
			lemma: "ανθοπωλείο",
			gender: "neuter",
			english: "florist's shop",
			cefrLevel: "B1",
			metadata: { note: "άνθος (flower) + πωλείο" },
		},
		// Purposes
		{ lemma: "φαγητό", gender: "neuter", english: "food", cefrLevel: "A1" },
		{ lemma: "ποτό", gender: "neuter", english: "drink", cefrLevel: "A1" },
		{ lemma: "υγεία", gender: "feminine", english: "health", cefrLevel: "A2" },
		{ lemma: "εκπαίδευση", gender: "feminine", english: "education", cefrLevel: "A2" },
		{
			lemma: "κατάστημα",
			gender: "neuter",
			english: "store/shop",
			cefrLevel: "A2",
			metadata: { note: "plural: τα καταστήματα" },
		},
		{ lemma: "χαλάρωση", gender: "feminine", english: "relaxation", cefrLevel: "B1" },
		{
			lemma: "ψώνια",
			gender: "neuter",
			english: "shopping",
			cefrLevel: "A2",
			metadata: { note: "plural-only: τα ψώνια" },
		},
		{
			lemma: "ρούχο",
			gender: "neuter",
			english: "item of clothing",
			cefrLevel: "A1",
			metadata: { note: "usually plural: τα ρούχα" },
		},
	],

	adverbs: [
		{
			lemma: "ή",
			english: "or / either",
			cefrLevel: "A1",
		},
	],

	phrases: [
		{
			text: "για φαγητό πάμε στα εστιατόρια και στις καφετέριες",
			english: "for food we go to restaurants and cafés",
			metadata: { pattern: "για + purpose, πάμε σε + place" },
		},
		{
			text: "για την υγεία μας πάμε στα νοσοκομεία ή στα φαρμακεία",
			english: "for our health we go to hospitals or pharmacies",
			metadata: { pattern: "για + purpose, πάμε σε + place" },
		},
		{
			text: "για την εκπαίδευσή μας πάμε ή στα σχολεία ή στα πανεπιστήμια",
			english: "for our education we go either to schools or universities",
			metadata: { pattern: "ή ... ή ... (either ... or ...)" },
		},
		{
			text: "για τα ψώνια πάμε ή στο μίνι μάρκετ ή στα ανθοπωλεία ή στα καταστήματα ρούχων",
			english: "for shopping we go to the mini market, the florists, or the clothes shops",
			metadata: { pattern: "ή ... ή ...", note: "καταστήματα ρούχων = genitive plural" },
		},
		{
			text: "ποιο είναι το αγαπημένο σου μέρος στην Πάφο;",
			english: "what is your favourite place in Paphos?",
			metadata: { usage: "asking about favourites" },
		},
	],

	grammarNotes: [
		{
			pattern: "για + purpose, πάμε σε + place",
			examples: [
				"για φαγητό πάμε στα εστιατόρια",
				"για την υγεία μας πάμε στα νοσοκομεία",
				"για τα ψώνια πάμε στο μίνι μάρκετ",
			],
			explanation:
				"για introduces the purpose; σε + accusative (contracted στο/στη/στα) gives the destination. Plural places take στα (neuter) or στις (feminine).",
		},
		{
			pattern: "ή ... ή ... (either ... or ...)",
			examples: ["πάμε ή στα σχολεία ή στα πανεπιστήμια"],
			explanation:
				"Single ή means 'or'. Doubled ή ... ή ... means 'either ... or ...'. Note the accent: ή (or) vs η (the, feminine article).",
		},
		{
			pattern: "-πωλείο = shop that sells X",
			examples: [
				"παντοπωλείο (grocery — sells everything)",
				"ανθοπωλείο (florist — sells flowers)",
			],
			explanation:
				"From πουλάω (to sell) / πωλητής (seller). The suffix -πωλείο names the shop by what it sells. All -πωλείο shops are neuter.",
		},
	],
});
