import type {
	AdjectiveSeed,
	AdverbSeed,
	NounSeed,
	Phrase,
	VerbSeed,
} from "../../../../types/seed";

export const LESSON_2024_12_30 = {
	meta: {
		date: "2024-12-30",
		topic: "Entertainment, events, and descriptive adjectives",
		source: "Weekly lesson - comparatives game, picture descriptions",
	},

	verbs: [
		{ lemma: "μπαίνω", english: "I enter/get in", conjugationFamily: "-ω" },
		{ lemma: "βγαίνω", english: "I exit/get out", conjugationFamily: "-ω" },
		{ lemma: "παίζω", english: "I play", conjugationFamily: "-ω" },
	] satisfies VerbSeed[],

	nouns: [
		// Entertainment
		{ lemma: "τηλεόραση", gender: "feminine", english: "television" },
		{
			lemma: "ηθοποιός",
			gender: "masculine",
			english: "actor",
			metadata: { note: "Common gender: ο/η ηθοποιός" },
		},
		{ lemma: "ταινία", gender: "feminine", english: "movie/film" },
		{ lemma: "εικόνα", gender: "feminine", english: "image/picture" },
		{ lemma: "τέχνη", gender: "feminine", english: "art" },
		// Events and venues
		{ lemma: "σινεμά", gender: "neuter", english: "cinema" },
		{ lemma: "συναυλία", gender: "feminine", english: "concert" },
		{ lemma: "πικνίκ", gender: "neuter", english: "picnic" },
		{
			lemma: "αγώνας",
			gender: "masculine",
			english: "match/game",
			metadata: { note: "ποδοσφαιρικός αγώνας = football match" },
		},
		{ lemma: "πάρτι", gender: "neuter", english: "party" },
		{ lemma: "γκαλερί", gender: "feminine", english: "gallery" },
		// From error correction sentences
		{ lemma: "καρέκλα", gender: "feminine", english: "chair" },
		{ lemma: "καρπούζι", gender: "neuter", english: "watermelon" },
		{
			lemma: "πορτοκαλάδα",
			gender: "feminine",
			english: "orange juice/orangeade",
		},
		{ lemma: "γιαγιά", gender: "feminine", english: "grandmother" },
	] satisfies NounSeed[],

	adjectives: [
		// Descriptive adjectives for events (-ος/-η/-ο pattern)
		{ lemma: "καταπληκτικός", english: "awesome/amazing" },
		{ lemma: "βαρετός", english: "boring" },
		{ lemma: "διασκεδαστικός", english: "fun/entertaining" },
		{ lemma: "χαλαρωτικός", english: "relaxing" },
		{ lemma: "αργός", english: "slow" },
		{ lemma: "ποδοσφαιρικός", english: "football/soccer (adj)" },
		// Different pattern: -ης/-ης/-ες
		{ lemma: "θορυβώδης", english: "noisy" },
		// From error correction
		{ lemma: "κόκκινος", english: "red" },
		{ lemma: "νότιος", english: "south/southern" },
	] satisfies AdjectiveSeed[],

	adverbs: [{ lemma: "έξω", english: "outside/out" }] satisfies AdverbSeed[],

	phrases: [
		// Entertainment questions
		{
			text: "σε ποια ταινία παίζεις;",
			english: "in which film do you play?",
			metadata: { pattern: "σε ποια + noun + verb" },
		},
		// Describing crowded places
		{
			text: "γεμάτο κόσμο",
			english: "crowded (full of people)",
			metadata: { pattern: "γεμάτο + noun", note: "Literally 'full of world'" },
		},
		{
			text: "πολύ κόσμο",
			english: "many people/crowded",
			metadata: { usage: "describing busy places" },
		},
		// From error correction - location expressions
		{
			text: "μένω στην Πάφο",
			english: "I live in Paphos",
			metadata: {
				correction: "στη Πάφο → στην Πάφο",
				note: "σε + την contracts to στην before vowel",
			},
		},
		{
			text: "έχει Άγγλους στην Πάφο",
			english: "there are English people in Paphos",
			metadata: { pattern: "έχει + accusative plural + location" },
		},
		{
			text: "είμαι από τη Νότια Αφρική",
			english: "I am from South Africa",
			metadata: { pattern: "είμαι από + accusative" },
		},
		{
			text: "δεν κάνω τίποτα",
			english: "I don't do anything",
			metadata: { pattern: "δεν + verb + τίποτα" },
		},
		{
			text: "δουλεύω από το σπίτι",
			english: "I work from home",
			metadata: { pattern: "δουλεύω από + accusative" },
		},
		{
			text: "γι'αυτό δεν βγαίνω έξω από το σπίτι",
			english: "that's why I don't go out of the house",
			metadata: { pattern: "γι'αυτό + clause (giving reason)" },
		},
		// Picture descriptions from practice
		{
			text: "βλέπω τρεις ανθρώπους",
			english: "I see three people",
			metadata: {
				correction: "τρείς ανθρώπου → τρεις ανθρώπους",
				note: "Accusative plural for direct object",
			},
		},
		{
			text: "βλέπουν μια ταινία στο σινεμά",
			english: "they are watching a movie at the cinema",
			metadata: { pattern: "βλέπω + accusative + σε + accusative" },
		},
		{
			text: "οι καρέκλες είναι κόκκινες",
			english: "the chairs are red",
			metadata: { grammar: "Plural noun + είναι + plural adjective" },
		},
		{
			text: "το παιδί τρώει καρπούζι",
			english: "the child is eating watermelon",
			metadata: { grammar: "Subject + verb + direct object" },
		},
		{
			text: "η γιαγιά έχει πορτοκαλάδα",
			english: "the grandmother has orange juice",
			metadata: { pattern: "subject + έχει + accusative" },
		},
		{
			text: "ο άντρας θέλει πορτοκαλάδα",
			english: "the man wants orange juice",
			metadata: { pattern: "subject + θέλει + accusative" },
		},
	] satisfies Phrase[],

	grammarNotes: [
		{
			pattern: "στην vs στη before vowels",
			examples: [
				"στην Πάφο (before Π)",
				"στην Αθήνα (before Α)",
				"στη Λεμεσό (before Λ)",
			],
			explanation:
				"Use στην before words starting with vowels or certain consonants. The -ν helps avoid vowel hiatus.",
		},
		{
			pattern: "Accusative plural for direct objects",
			examples: [
				"βλέπω τρεις ανθρώπους (I see three people)",
				"έχει Άγγλους (there are English people)",
			],
			explanation:
				"Direct objects of verbs like βλέπω, έχω take accusative. Masculine plural: -ους ending.",
		},
		{
			pattern: "Adjective patterns: -ος/-η/-ο vs -ης/-ης/-ες",
			examples: [
				"καταπληκτικός/καταπληκτική/καταπληκτικό",
				"θορυβώδης/θορυβώδης/θορυβώδες (same m/f form)",
			],
			explanation:
				"Most adjectives follow -ος/-η/-ο. Some use -ης/-ης/-ες where masculine and feminine are identical.",
		},
		{
			pattern: "γι'αυτό for giving reasons",
			examples: [
				"δουλεύω από το σπίτι, γι'αυτό δεν βγαίνω (I work from home, that's why I don't go out)",
			],
			explanation:
				"γι'αυτό (= για αυτό) means 'that's why' or 'for this reason'. Connects cause to effect.",
		},
	],
} as const;
