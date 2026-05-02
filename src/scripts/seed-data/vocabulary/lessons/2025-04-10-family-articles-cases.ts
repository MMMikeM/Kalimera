import { createLesson } from "@/types/lesson-builder";

export const LESSON_2025_04_10 = createLesson({
	meta: {
		date: "2025-04-10",
		topic: "Family vocabulary, nominative and accusative articles, case contractions",
		source: "Weekly lesson - Ελληνικά A pp.28-30, family tree exercise, articles chart",
	},

	nouns: [
		{ lemma: "άντρας", gender: "masculine", english: "man/husband", cefrLevel: "A1" },
		{ lemma: "γυναίκα", gender: "feminine", english: "woman/wife", cefrLevel: "A1" },
		{ lemma: "πατέρας", gender: "masculine", english: "father", cefrLevel: "A1" },
		{ lemma: "μπαμπάς", gender: "masculine", english: "dad", cefrLevel: "A1" },
		{ lemma: "μητέρα", gender: "feminine", english: "mother", cefrLevel: "A1" },
		{ lemma: "μαμά", gender: "feminine", english: "mum", cefrLevel: "A1" },
		{ lemma: "γονέας", gender: "masculine", english: "parent (γονείς = parents)", cefrLevel: "A1" },
		{ lemma: "παππούς", gender: "masculine", english: "grandpa", cefrLevel: "A1" },
		{ lemma: "γιαγιά", gender: "feminine", english: "grandma", cefrLevel: "A1" },
		{ lemma: "αγόρι", gender: "neuter", english: "boy", cefrLevel: "A1" },
		{ lemma: "κορίτσι", gender: "neuter", english: "girl", cefrLevel: "A1" },
		{ lemma: "γιος", gender: "masculine", english: "son", cefrLevel: "A1" },
		{ lemma: "κόρη", gender: "feminine", english: "daughter", cefrLevel: "A1" },
		{ lemma: "παιδί", gender: "neuter", english: "child (παιδιά = children)", cefrLevel: "A1" },
		{ lemma: "αδελφός", gender: "masculine", english: "brother (αδέλφια = siblings)", cefrLevel: "A1" },
		{ lemma: "αδελφή", gender: "feminine", english: "sister", cefrLevel: "A1" },
	],

	adjectives: [
		{ lemma: "παντρεμένος", english: "married", cefrLevel: "A1" },
		{ lemma: "ελεύθερος", english: "single/free", cefrLevel: "A1" },
		{ lemma: "χωρισμένος", english: "separated/divorced", cefrLevel: "A2" },
	],

	phrases: [
		// Family description patterns
		{
			text: "Ο Μαικ είναι παντρεμένος",
			english: "Mike is married",
			metadata: { pattern: "name + είναι + adjective", usage: "describing marital status" },
		},
		{
			text: "Η Χρυσάνθη είναι η γυναίκα του",
			english: "Chrysanthi is his wife",
			metadata: { pattern: "name + είναι + ο/η + noun + possessive", usage: "family relationships" },
		},
		{
			text: "Έχουν ένα παιδί και ένα σκύλο",
			english: "They have one child and one dog",
			metadata: { pattern: "έχουν + accusative", usage: "possession — third person plural" },
		},
		{
			text: "Το παιδί τον λένε Λουκά",
			english: "The child's name is Lukas (they call him Lukas)",
			metadata: { pattern: "τον/την/το λένε + name", usage: "stating someone's name" },
		},
		// Name questions
		{
			text: "πώς σε λένε;",
			english: "What's your name? (what do they call you?)",
			metadata: { pattern: "πώς + indirect pronoun + λένε;", usage: "asking name" },
		},
		{
			text: "πώς τον λένε;",
			english: "What's his name?",
			metadata: { pattern: "πώς τον λένε; — masculine", usage: "asking for his name" },
		},
		{
			text: "πώς την λένε;",
			english: "What's her name?",
			metadata: { pattern: "πώς την λένε; — feminine", usage: "asking for her name" },
		},
		{
			text: "πώς το λένε στα ελληνικά;",
			english: "What do you call it in Greek?",
			metadata: { pattern: "πώς το λένε στα + language", usage: "asking for a word in another language" },
		},
		// Identity questions
		{
			text: "ποιος είναι αυτός;",
			english: "Who is he?",
			metadata: { pattern: "ποιος/ποια/ποιο + είναι + αυτός/ή/ό;", usage: "asking identity — masculine" },
		},
		{
			text: "ποια είναι αυτή;",
			english: "Who is she?",
			metadata: { usage: "asking identity — feminine" },
		},
		{
			text: "ποιο είναι αυτό το παιδί;",
			english: "Who is this child?",
			metadata: { usage: "asking identity — neuter" },
		},
		// Accusative contractions
		{
			text: "στον / στην / στο",
			english: "to the / at the (σε + accusative article)",
			metadata: {
				pattern: "σε + τον = στον, σε + την = στην, σε + το = στο",
				usage: "preposition σε contracts with accusative articles",
			},
		},
	],

	grammarNotes: [
		{
			pattern: "Articles — nominative singular",
			examples: [
				"ο άντρας (the man) — masculine",
				"η γυναίκα (the woman) — feminine",
				"το παιδί (the child) — neuter",
			],
			explanation:
				"Nominative is used for the subject of a sentence — the person or thing doing the action or being described.",
		},
		{
			pattern: "Articles — accusative singular",
			examples: [
				"τον άντρα (the man) — masculine",
				"την γυναίκα (the woman) — feminine",
				"το παιδί (the child) — neuter (unchanged)",
			],
			explanation:
				"Accusative is used for the direct object and after most prepositions. Masculine changes ο → τον, feminine changes η → την, neuter τo stays the same.",
		},
		{
			pattern: "σε + accusative article contractions",
			examples: [
				"σε + τον = στον (to/at the — masculine)",
				"σε + την = στην (to/at the — feminine)",
				"σε + το = στο (to/at the — neuter)",
			],
			explanation:
				"The preposition σε always contracts with the accusative article to form στον/στην/στο. από does NOT contract — it remains από τον, από την, από το.",
		},
		{
			pattern: "πώς τον/την/το λένε; — asking names",
			examples: [
				"Πώς σε λένε; (What's your name?)",
				"Πώς τον λένε; (What's his name?)",
				"Πώς την λένε; (What's her name?)",
				"Πώς το λένε στα ελληνικά; (What's it called in Greek?)",
			],
			explanation:
				"λένε literally means 'they call'. The pronoun (σε/τον/την/το) agrees with the gender of the person or thing being named.",
		},
	],
});
