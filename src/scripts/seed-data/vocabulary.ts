// Vocabulary data organized by word type, grouped by theme
// Lemmas are stored without articles - use formatNounWithArticle() for display

import type { ConjugationFamily, Gender } from "../../lib/greek-grammar";

// ============================================================================
// Type definitions for seed data
// ============================================================================

export interface Noun {
	lemma: string;
	gender: Gender;
	english: string;
	metadata?: Record<string, unknown>;
}

export interface Verb {
	lemma: string;
	english: string;
	conjugationFamily: ConjugationFamily;
}

export interface Adverb {
	lemma: string;
	english: string;
}

export interface Phrase {
	text: string;
	english: string;
	metadata?: Record<string, unknown>;
}

export interface Adjective {
	lemma: string;
	english: string;
}

export interface NumberWord {
	lemma: string;
	value: number;
}

// ============================================================================
// Nouns - grouped by theme
// ============================================================================

export const NOUNS = {
	summer: [
		{ lemma: "καλοκαίρι", gender: "neuter", english: "summer" },
		{ lemma: "θάλασσα", gender: "feminine", english: "sea" },
		{ lemma: "παραλία", gender: "feminine", english: "beach" },
		{ lemma: "ήλιος", gender: "masculine", english: "sun" },
		{ lemma: "ζέστη", gender: "feminine", english: "warmth" },
		{ lemma: "μαγιό", gender: "neuter", english: "swimming costume" },
		{ lemma: "καπέλο", gender: "neuter", english: "hat" },
		{ lemma: "ξαπλώστρα", gender: "feminine", english: "sunbed" },
		{ lemma: "παγωτό", gender: "neuter", english: "ice cream" },
		{ lemma: "καρπούζι", gender: "neuter", english: "watermelon" },
	],

	transport: [
		{ lemma: "τρένο", gender: "neuter", english: "train" },
		{ lemma: "ταξί", gender: "neuter", english: "taxi" },
		{ lemma: "ταξιτζής", gender: "masculine", english: "taxi driver" },
		{ lemma: "αεροπλάνο", gender: "neuter", english: "airplane" },
		{ lemma: "τρόλεϊ", gender: "neuter", english: "trolley" },
	],

	timeOfDay: [
		{
			lemma: "πρωί",
			gender: "neuter",
			english: "morning",
			metadata: { timeRange: "(5:00-12:00)" },
		},
		{
			lemma: "μεσημέρι",
			gender: "neuter",
			english: "midday",
			metadata: { timeRange: "(12:00-15:00)" },
		},
		{
			lemma: "απόγευμα",
			gender: "neuter",
			english: "afternoon",
			metadata: { timeRange: "(15:00-19:00)" },
		},
		{
			lemma: "βράδυ",
			gender: "neuter",
			english: "evening",
			metadata: { timeRange: "(19:00-24:00)" },
		},
		{
			lemma: "νύχτα",
			gender: "feminine",
			english: "night",
			metadata: { timeRange: "(24:00-5:00)" },
		},
	],

	timeExpressions: [
		{ lemma: "μέρα", gender: "feminine", english: "day" },
		{ lemma: "μεσημέρι", gender: "neuter", english: "midday" },
		{ lemma: "απόγευμα", gender: "neuter", english: "afternoon" },
		{ lemma: "βράδυ", gender: "neuter", english: "evening" },
		{ lemma: "νύχτα", gender: "feminine", english: "night" },
		{ lemma: "διακοπές", gender: "feminine", english: "holidays" },
		{ lemma: "ταξίδι", gender: "neuter", english: "journey/trip" },
	],

	shopping: [
		{ lemma: "χυμός", gender: "masculine", english: "juice" },
		{ lemma: "ντομάτα", gender: "feminine", english: "tomato" },
		{ lemma: "αγγούρι", gender: "neuter", english: "cucumber" },
		{ lemma: "αντηλιακό", gender: "neuter", english: "sunscreen" },
		{ lemma: "μπουκάλι", gender: "neuter", english: "bottle" },
		{ lemma: "απόδειξη", gender: "feminine", english: "receipt" },
		{ lemma: "πορτοκάλι", gender: "neuter", english: "orange" },
		{ lemma: "ψωμί", gender: "neuter", english: "bread" },
		{ lemma: "ψώνια", gender: "neuter", english: "shopping/groceries" },
	],

	clothing: [
		{ lemma: "ντουλάπα", gender: "feminine", english: "wardrobe/closet" },
		{ lemma: "ρούχα", gender: "neuter", english: "clothes" },
		{ lemma: "παντελόνι", gender: "neuter", english: "pants/trousers" },
		{ lemma: "μπλουζάκι", gender: "neuter", english: "t-shirt" },
	],

	household: [
		{ lemma: "σπίτι", gender: "neuter", english: "house/home" },
		{ lemma: "γραφείο", gender: "neuter", english: "office/desk" },
		{ lemma: "αυτοκίνητο", gender: "neuter", english: "car" },
		{ lemma: "κλειδί", gender: "neuter", english: "key" },
		{ lemma: "πόρτα", gender: "feminine", english: "door" },
		{ lemma: "κήπος", gender: "masculine", english: "garden" },
	],

	people: [
		{ lemma: "γυναίκα", gender: "feminine", english: "woman/wife" },
		{ lemma: "άντρας", gender: "masculine", english: "man/husband" },
		{ lemma: "παιδί", gender: "neuter", english: "child" },
		{ lemma: "σκύλος", gender: "masculine", english: "dog" },
		{ lemma: "φίλος", gender: "masculine", english: "friend (male)" },
		{ lemma: "φίλη", gender: "feminine", english: "friend (female)" },
		{ lemma: "αδελφός", gender: "masculine", english: "brother" },
		{ lemma: "αδελφή", gender: "feminine", english: "sister" },
		{ lemma: "μητέρα", gender: "feminine", english: "mother" },
		{ lemma: "πατέρας", gender: "masculine", english: "father" },
		{ lemma: "πεθερά", gender: "feminine", english: "mother-in-law" },
		{ lemma: "σύζυγος", gender: "masculine", english: "spouse" },
	],

	nature: [
		{ lemma: "κύμα", gender: "neuter", english: "wave" },
		{ lemma: "λουλούδι", gender: "neuter", english: "flower" },
	],
} as const satisfies Record<string, Noun[]>;

// ============================================================================
// Verbs
// ============================================================================

export const VERBS: Verb[] = [
	// -ω family (regular)
	{ lemma: "κάνω", english: "I do/make", conjugationFamily: "-ω" },
	{ lemma: "έχω", english: "I have", conjugationFamily: "-ω" },
	{ lemma: "υπάρχω", english: "I exist/there is", conjugationFamily: "-ω" },
	{ lemma: "δίνω", english: "I give", conjugationFamily: "-ω" },
	{ lemma: "παίρνω", english: "I take", conjugationFamily: "-ω" },
	{ lemma: "φεύγω", english: "I leave", conjugationFamily: "-ω" },
	{ lemma: "αγοράζω", english: "I buy", conjugationFamily: "-ω" },
	{ lemma: "νευριάζω", english: "I get nervous", conjugationFamily: "-ω" },
	{ lemma: "σταματάω", english: "I stop", conjugationFamily: "-ω" },
	{ lemma: "ζητάω", english: "I ask for", conjugationFamily: "-ω" },
	{ lemma: "ξεχνάω", english: "I forget", conjugationFamily: "-ω" },
	{ lemma: "χαλαρώνω", english: "I relax", conjugationFamily: "-ω" },
	{ lemma: "μένω", english: "I live/stay", conjugationFamily: "-ω" },
	{ lemma: "δουλεύω", english: "I work", conjugationFamily: "-ω" },
	{ lemma: "θέλω", english: "I want", conjugationFamily: "-ω" },
	{ lemma: "βλέπω", english: "I see", conjugationFamily: "-ω" },

	// -άω/-ώ family
	{ lemma: "μιλάω", english: "I speak", conjugationFamily: "-άω/-ώ" },
	{ lemma: "προτιμώ", english: "I prefer", conjugationFamily: "-άω/-ώ" },
	{ lemma: "φταίω", english: "I'm guilty/at fault", conjugationFamily: "-άω/-ώ" },

	// -ομαι family (deponent/passive)
	{ lemma: "έρχομαι", english: "I come", conjugationFamily: "-ομαι" },

	// -άμαι family
	{ lemma: "θυμάμαι", english: "I remember", conjugationFamily: "-άμαι" },

	// Irregular
	{ lemma: "είμαι", english: "I am", conjugationFamily: "irregular" },
	{ lemma: "πάω", english: "I go", conjugationFamily: "irregular" },
	{ lemma: "λέω", english: "I say", conjugationFamily: "irregular" },
	{ lemma: "τρώω", english: "I eat", conjugationFamily: "irregular" },
];

// Transport-related verbs (third person forms for describing schedules)
export const TRANSPORT_VERBS: Phrase[] = [
	{ text: "ξεκινάει", english: "departs/starts" },
	{ text: "φεύγει", english: "leaves" },
	{ text: "περιμένει", english: "waits" },
	{ text: "παίρνω", english: "I take" },
	{ text: "δουλεύει", english: "works" },
];

// ============================================================================
// Adverbs
// ============================================================================

export const FREQUENCY_ADVERBS: Adverb[] = [
	{ lemma: "ποτέ", english: "never" },
	{ lemma: "σχεδόν ποτέ", english: "almost never" },
	{ lemma: "σπάνια", english: "rarely" },
	{ lemma: "καμιά φορά", english: "sometimes" },
	{ lemma: "κάπου κάπου", english: "from time to time" },
	{ lemma: "πότε πότε", english: "occasionally" },
	{ lemma: "μερικές φορές", english: "sometimes" },
	{ lemma: "συχνά", english: "often" },
	{ lemma: "πολλές φορές", english: "many times" },
	{ lemma: "συνήθως", english: "usually" },
	{ lemma: "σχεδόν πάντα", english: "almost always" },
	{ lemma: "πάντα", english: "always" },
];

export const POSITION_ADVERBS: Adverb[] = [
	{ lemma: "έξω", english: "outside" },
	{ lemma: "μέσα", english: "inside" },
	{ lemma: "κάτω", english: "down/under" },
	{ lemma: "πάνω", english: "up/over" },
	{ lemma: "μπροστά", english: "in front" },
	{ lemma: "πίσω", english: "behind" },
	{ lemma: "δίπλα", english: "next to" },
	{ lemma: "ανάμεσα", english: "between" },
	{ lemma: "απέναντι", english: "across/opposite" },
	{ lemma: "δεξιά", english: "right" },
	{ lemma: "αριστερά", english: "left" },
	{ lemma: "κοντά", english: "close/near" },
	{ lemma: "μακριά", english: "far" },
	{ lemma: "εδώ", english: "here" },
	{ lemma: "εκεί", english: "there" },
];

// ============================================================================
// Phrases and expressions
// ============================================================================

export const USEFUL_EXPRESSIONS: Phrase[] = [
	{ text: "φυσικά", english: "of course" },
	{ text: "επίσης", english: "also" },
	{ text: "κάτι", english: "something" },
	{ text: "τα πάντα", english: "everything" },
	{ text: "τι γίνεται;", english: "what's happening?" },
	{ text: "τα λέμε", english: "see ya" },
	{ text: "καλή όρεξη", english: "bon appetit/enjoy your meal" },
	{ text: "σιγά σιγά", english: "slowly/little by little" },
	{ text: "μαζί", english: "together" },
	{ text: "γι' αυτό", english: "that's why/therefore" },
	{ text: "αν", english: "if" },
	{ text: "όταν", english: "when" },
	{ text: "πού;", english: "where?" },
	{ text: "πώς;", english: "how?" },
	{ text: "γιατί;", english: "why?" },
	{ text: "ποιος;", english: "who?" },
	{ text: "τι;", english: "what?" },
	{ text: "πόσο;", english: "how much?" },
];

export const COMMANDS: Phrase[] = [
	{ text: "κάτσε κάτω", english: "sit down" },
	{ text: "σήκω πάνω", english: "stand up" },
	{ text: "έλα", english: "come" },
	{ text: "πες το ξανά", english: "say it again" },
	{ text: "περίμενε", english: "wait" },
];

// "Likes" construction - grammatically interesting (dative-like construction)
export const LIKES_CONSTRUCTION = {
	singular: [
		{ text: "μου αρέσει", english: "I like" },
		{ text: "σου αρέσει", english: "you like" },
		{ text: "του/της αρέσει", english: "he/she likes" },
		{ text: "μας αρέσει", english: "we like" },
		{ text: "σας αρέσει", english: "you like" },
		{ text: "τους αρέσει", english: "they like" },
	],
	plural: [
		{ text: "μου αρέσουν", english: "I like (them)" },
		{ text: "σου αρέσουν", english: "you like (them)" },
		{ text: "του/της αρέσουν", english: "he/she likes (them)" },
		{ text: "μας αρέσουν", english: "we like (them)" },
		{ text: "σας αρέσουν", english: "you like (them)" },
		{ text: "τους αρέσουν", english: "they like (them)" },
	],
} as const satisfies Record<string, Phrase[]>;

// Time expression phrases (with article, showing accusative usage)
export const TIME_PHRASES: Phrase[] = [
	{ text: "κάθε μέρα", english: "every day" },
];

// ============================================================================
// Adjectives (colors, etc.)
// ============================================================================

export const COLORS: Adjective[] = [
	{ lemma: "άσπρο", english: "white" },
	{ lemma: "μαύρο", english: "black" },
	{ lemma: "κόκκινο", english: "red" },
	{ lemma: "μπλε", english: "blue" },
	{ lemma: "πράσινο", english: "green" },
	{ lemma: "κίτρινο", english: "yellow" },
	{ lemma: "πορτοκαλί", english: "orange" },
	{ lemma: "σκούρο μπλε", english: "navy/dark blue" },
];

export const ADJECTIVES: Adjective[] = [
	{ lemma: "φρέσκος", english: "fresh" },
	{ lemma: "ίδιος", english: "same/identical" },
	{ lemma: "δυνατός", english: "strong/loud" },
	{ lemma: "ενθουσιασμένος", english: "enthusiastic" },
	{ lemma: "μεγάλος", english: "big/large" },
	{ lemma: "μικρός", english: "small" },
	{ lemma: "καλός", english: "good" },
	{ lemma: "κακός", english: "bad" },
	{ lemma: "ζεστός", english: "hot/warm" },
	{ lemma: "κρύος", english: "cold" },
	{ lemma: "πολύς", english: "much/many" },
	{ lemma: "λίγος", english: "few/little" },
	{ lemma: "οργανωμένος", english: "organized" },
	{ lemma: "απλός", english: "simple" },
];

// ============================================================================
// Numbers
// ============================================================================

export const NUMBERS: NumberWord[] = [
	{ lemma: "ένα", value: 1 },
	{ lemma: "δύο", value: 2 },
	{ lemma: "τρία", value: 3 },
	{ lemma: "τέσσερα", value: 4 },
	{ lemma: "πέντε", value: 5 },
	{ lemma: "έξι", value: 6 },
	{ lemma: "επτά", value: 7 },
	{ lemma: "οκτώ", value: 8 },
	{ lemma: "εννέα", value: 9 },
	{ lemma: "δέκα", value: 10 },
];
