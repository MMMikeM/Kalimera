import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_09_18 = createLesson({
	meta: {
		date: "2026-09-18",
		topic: "Starting a new job: που, στην and σκέφτομαι",
		source:
			"Weekly lesson - revisited το ξύλο / τα ξύλα, then sentences about starting a new job: που joining a second idea (οι άνθρωποι που…), σε joined to the article (στην Αμερική), το αφεντικό and not το λεωφορείο, σκέφτομαι as an -ομαι verb, πόσες ώρες, το πιο λίγο for at least, and τεμπέλης with its plural τεμπέληδες; ended with the body (το χέρι, το στόμα)",
		homework:
			"Finish the podcast episode on the months and the calendar, to go over together and then listen to again",
	},

	verbs: [
		{ lemma: "ξεκινάω", english: "I start", conjugationFamily: "-άω", cefrLevel: "A2" },
		{ lemma: "μιλάω", english: "I speak", conjugationFamily: "-άω", cefrLevel: "A1" },
		{ lemma: "πουλάω", english: "I sell", conjugationFamily: "-άω", cefrLevel: "A2" },
		{ lemma: "σκέφτομαι", english: "I think", conjugationFamily: "-ομαι", cefrLevel: "A2" },
		{ lemma: "τεμπελιάζω", english: "I laze about, I'm lazy", conjugationFamily: "-ω", cefrLevel: "B1" },
	],

	nouns: [
		{
			lemma: "ξύλο",
			gender: "neuter",
			english: "wood; τα ξύλα, pieces of wood; (colloquial) a beating",
			cefrLevel: "A2",
		},
		{ lemma: "εταιρεία", gender: "feminine", english: "company", cefrLevel: "A2" },
		{ lemma: "Αμερική", gender: "feminine", english: "America", cefrLevel: "A1" },
		{ lemma: "Σουηδία", gender: "feminine", english: "Sweden", cefrLevel: "A1" },
		{ lemma: "άνθρωπος", gender: "masculine", english: "human/person", cefrLevel: "A1" },
		{ lemma: "πράγμα", gender: "neuter", english: "thing", cefrLevel: "A1" },
		{ lemma: "αφεντικό", gender: "neuter", english: "boss", cefrLevel: "A2" },
		{ lemma: "λεωφορείο", gender: "neuter", english: "bus", cefrLevel: "A1" },
		{ lemma: "τεμπέλης", gender: "masculine", english: "lazy (of a man); a lazy man", cefrLevel: "B1" },
		{ lemma: "τεμπέλα", gender: "feminine", english: "lazy (of a woman); a lazy woman", cefrLevel: "B1" },
		{ lemma: "τεμπελιά", gender: "feminine", english: "laziness", cefrLevel: "B1" },
		{ lemma: "χέρι", gender: "neuter", english: "hand", cefrLevel: "A1" },
		{ lemma: "στόμα", gender: "neuter", english: "mouth", cefrLevel: "A1" },
	],

	adjectives: [{ lemma: "επόμενος", english: "next", cefrLevel: "A2" }],

	phrases: [
		{
			text: "Το τραπέζι είναι από ξύλο.",
			english: "The table is made of wood.",
			metadata: { pattern: "από + material", note: "το ξύλο, τα ξύλα" },
		},
		{
			text: "Ξεκινάω καινούργια δουλειά την επόμενη εβδομάδα.",
			english: "I start a new job next week.",
			metadata: { pattern: "την επόμενη εβδομάδα: a time in the Target form, with no preposition" },
		},
		{
			text: "Είναι μικρή εταιρεία.",
			english: "It's a small company.",
			metadata: { note: "μια can go before μικρή, but isn't needed" },
		},
		{
			text: "Έχουν πολλούς ανθρώπους που δουλεύουν στην Αμερική.",
			english: "They have a lot of people who work in America.",
			metadata: { pattern: "noun + που + verb; σε + την → στην" },
		},
		{
			text: "Τα πράγματα που αγόρασα είναι ακριβά.",
			english: "The things I bought are expensive.",
			metadata: { pattern: "noun + που + verb", note: "που never changes, whatever the noun" },
		},
		{
			text: "Ο άνθρωπος που πουλάει ξύλα μένει κοντά.",
			english: "The man who sells wood lives nearby.",
			metadata: { pattern: "noun + που + verb" },
		},
		{
			text: "Η Γιάννα έχει μια φίλη που μένει κοντά.",
			english: "Yianna has a friend who lives nearby.",
			metadata: { pattern: "noun + που + verb" },
		},
		{
			text: "Το αφεντικό μου δουλεύει πολύ.",
			english: "My boss works a lot.",
			metadata: { pattern: "πολύ goes after the verb" },
		},
		{
			text: "Πάω στη δουλειά με το λεωφορείο.",
			english: "I go to work by bus.",
			metadata: { note: "το λεωφορείο is the bus; the boss is το αφεντικό" },
		},
		{
			text: "Χθες μίλησα με το αφεντικό μου.",
			english: "Yesterday I spoke to my boss.",
			metadata: { pattern: "μιλάω → μίλησα" },
		},
		{
			text: "Πόσες ώρες;",
			english: "How many hours?",
			metadata: { pattern: "πόσες matches οι ώρες" },
		},
		{
			text: "Διαβάζω ελληνικά το πιο λίγο μία ώρα τη μέρα.",
			english: "I study Greek for at least an hour a day.",
			metadata: { pattern: "το πιο λίγο = at least", note: "τουλάχιστον means the same" },
		},
		{
			text: "Τι σκέφτεσαι;",
			english: "What are you thinking about?",
			metadata: { pattern: "σκέφτομαι → σκέφτεσαι" },
		},
		{
			text: "Σκέφτομαι να πάρω το λεωφορείο.",
			english: "I'm thinking of taking the bus.",
			metadata: { pattern: "σκέφτομαι να + short form = I'm thinking of" },
		},
		{
			text: "Δεν είναι τεμπέλης, είναι κουρασμένος.",
			english: "He isn't lazy, he's tired.",
			metadata: { pattern: "είναι + τεμπέλης, no article" },
		},
		{
			text: "Δεν είμαστε τεμπέληδες.",
			english: "We aren't lazy.",
			metadata: { pattern: "τεμπέλης → τεμπέληδες" },
		},
		{
			text: "Οι γάτες είναι τεμπέλες.",
			english: "Cats are lazy.",
			metadata: { pattern: "τεμπέλα → τεμπέλες" },
		},
		{ text: "Σήμερα τεμπελιάζω.", english: "Today I'm lazing about." },
	],

	grammarNotes: [
		{
			pattern: "που after a noun: who, which, that",
			examples: [
				"Έχουν πολλούς ανθρώπους που δουλεύουν στην Αμερική.",
				"Η Γιάννα έχει μια φίλη που μένει κοντά.",
				"Τα ξύλα που αγόρασα είναι καρυδιά. (not τα ξύλα αγόρασα)",
			],
			explanation:
				"που, with no accent, joins a second idea to a noun and never changes. English can drop that, as in the wood I bought; Greek always keeps που.",
			section: "joining/pou",
		},
		{
			pattern: "σε before a place: στην Αμερική",
			examples: ["Δουλεύουν στην Αμερική.", "Πάω στη δουλειά.", "not: δουλεύουν Αμερική"],
			explanation:
				"In, at or to a place takes σε, joined to the article: σε + την → στην.",
			section: "place/se-contractions",
		},
		{
			pattern: "σκέφτομαι, an -ομαι verb",
			examples: [
				"σκέφτομαι · σκέφτεσαι · σκέφτεται",
				"σκεφτόμαστε · σκέφτεστε · σκέφτονται",
				"Θα το σκεφτώ. (I'll think about it)",
			],
			explanation:
				"σκέφτομαι takes the -μαι endings. In the we form the stress moves one syllable towards the ending: σκεφτόμαστε.",
			section: "verbs/mai-verbs",
		},
		{
			pattern: "ο τεμπέλης, οι τεμπέληδες",
			examples: [
				"ο τεμπέλης · οι τεμπέληδες (a man)",
				"η τεμπέλα · οι τεμπέλες (a woman)",
				"Δεν είμαστε τεμπέληδες.",
			],
			explanation:
				"τεμπέλης adds -δ- and a syllable in the plural, like ο καφές, οι καφέδες. Its feminine, τεμπέλα, is regular. Both work like a job after είναι, with no article: είναι τεμπέλης.",
			section: "noun-exceptions/extra-syllable",
		},
		{
			pattern: "το πιο λίγο: at least",
			examples: ["Διαβάζω το πιο λίγο μία ώρα τη μέρα.", "το πιο λίγο = τουλάχιστον"],
			explanation:
				"The article with πιο makes the most or the least: το πιο λίγο, the least, so at least. τουλάχιστον means the same.",
			section: "scales/comparing",
		},
		{
			pattern: "Πόσες ώρες;",
			examples: ["η ώρα → Πόσες ώρες;", "το πράγμα → Πόσα πράγματα;"],
			explanation: "πόσος matches the noun it asks about: οι ώρες is feminine plural, so πόσες.",
			section: "joining/which-how-many",
		},
		{
			pattern: "το αφεντικό, not το λεωφορείο",
			examples: ["Το αφεντικό μου δουλεύει πολύ. (boss)", "Πάω με το λεωφορείο. (bus)"],
			explanation:
				"Boss and bus sound alike in English, but not in Greek. Both are neuter, and το αφεντικό stays neuter whoever the boss is.",
			section: "word",
		},
	],
});
