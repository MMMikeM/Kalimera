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
		{ lemma: "ποδήλατο", gender: "neuter", english: "bicycle" },
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
		{ lemma: "γιατρός", gender: "masculine", english: "doctor" },
		{ lemma: "κηπουρός", gender: "masculine", english: "gardener" },
		{ lemma: "αρχηγός", gender: "masculine", english: "leader" },
		{ lemma: "άνθρωπος", gender: "masculine", english: "human/person" },
		{ lemma: "κυνηγός", gender: "masculine", english: "hunter" },
		{ lemma: "γεωργός", gender: "masculine", english: "farmer" },
		{ lemma: "οδηγός", gender: "masculine", english: "driver" },
		{ lemma: "βοσκός", gender: "masculine", english: "shepherd" },
		{ lemma: "ηθοποιός", gender: "masculine", english: "actor" },
		{ lemma: "δάσκαλος", gender: "masculine", english: "teacher" },
		{ lemma: "νάνος", gender: "masculine", english: "dwarf" },
	],

	abstract: [
		{ lemma: "ελευθερία", gender: "feminine", english: "freedom" },
		{ lemma: "δουλειά", gender: "feminine", english: "work/job" },
	],

	nature: [
		{ lemma: "κύμα", gender: "neuter", english: "wave" },
		{ lemma: "λουλούδι", gender: "neuter", english: "flower" },
		{ lemma: "ποταμός", gender: "masculine", english: "river" },
		{ lemma: "ουρανός", gender: "masculine", english: "sky" },
		{ lemma: "βράχος", gender: "masculine", english: "rock" },
		{ lemma: "νερό", gender: "neuter", english: "water" },
		{ lemma: "κεραυνός", gender: "masculine", english: "lightning/thunderbolt" },
	],

	animals: [
		{ lemma: "λαγός", gender: "masculine", english: "rabbit" },
		{ lemma: "βάτραχος", gender: "masculine", english: "frog" },
		{ lemma: "λύκος", gender: "masculine", english: "wolf" },
		{ lemma: "ποντικός", gender: "masculine", english: "mouse" },
		{ lemma: "ταύρος", gender: "masculine", english: "bull" },
		{ lemma: "γερανός", gender: "masculine", english: "crane (bird)" },
		{ lemma: "αετός", gender: "masculine", english: "eagle" },
		{ lemma: "δράκος", gender: "masculine", english: "dragon" },
	],

	places: [
		{ lemma: "δρόμος", gender: "masculine", english: "road/street" },
		{ lemma: "τοίχος", gender: "masculine", english: "wall" },
		{ lemma: "κάμπος", gender: "masculine", english: "plain/field" },
	],

	body: [
		{ lemma: "λαιμός", gender: "masculine", english: "neck" },
	],

	objects: [
		{ lemma: "πίνακας", gender: "masculine", english: "board/painting" },
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
	{ lemma: "σχεδιάζω", english: "I plan/design", conjugationFamily: "-ω" },

	// -άω/-ώ family
	{ lemma: "μιλάω", english: "I speak", conjugationFamily: "-άω/-ώ" },
	{ lemma: "προτιμώ", english: "I prefer", conjugationFamily: "-άω/-ώ" },
	{ lemma: "φταίω", english: "I'm guilty/at fault", conjugationFamily: "-άω/-ώ" },
	{ lemma: "φοράω", english: "I wear", conjugationFamily: "-άω/-ώ" },

	// -ομαι family (deponent/passive)
	{ lemma: "έρχομαι", english: "I come", conjugationFamily: "-ομαι" },

	// -άμαι family
	{ lemma: "θυμάμαι", english: "I remember", conjugationFamily: "-άμαι" },
	{ lemma: "κοιμάμαι", english: "I sleep", conjugationFamily: "-άμαι" },

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

// "They call" construction - used for names (με λένε = my name is)
export const NAME_CONSTRUCTION: Phrase[] = [
	{ text: "με λένε", english: "my name is / they call me" },
	{ text: "σε λένε", english: "your name is / they call you" },
	{ text: "τον λένε", english: "his name is / they call him" },
	{ text: "την λένε", english: "her name is / they call her" },
	{ text: "μας λένε", english: "our name is / they call us" },
	{ text: "σας λένε", english: "your name is / they call you (pl/formal)" },
	{ text: "τους λένε", english: "their name is / they call them (m)" },
	{ text: "τις λένε", english: "their name is / they call them (f)" },
];

// Time expression phrases (with article, showing accusative usage)
export const TIME_PHRASES: Phrase[] = [
	{ text: "κάθε μέρα", english: "every day" },
];

// Example sentences for practicing case and verb usage
export const EXAMPLE_SENTENCES: Phrase[] = [
	{
		text: "Ο Λιο κοιμάται στο σπίτι του γιατρού",
		english: "Leo sleeps at the doctor's house",
		metadata: { grammar: "genitive possession + location" },
	},
	{
		text: "τον φίλο μου τον λένε Γιώργο",
		english: "my friend is called George",
		metadata: { grammar: "accusative + λένε construction" },
	},
	{
		text: "το ποδήλατο του αδερφού μου είναι κόκκινο",
		english: "my brother's bicycle is red",
		metadata: { grammar: "genitive possession" },
	},
	{
		text: "τα νερά των ποταμών τρέχουν με δύναμη",
		english: "the waters of the rivers run with force",
		metadata: { grammar: "genitive plural" },
	},
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

// ============================================================================
// Conversation phrases - Discourse markers, responses, opinions
// ============================================================================

// Discourse Markers - words that connect natural speech
export const DISCOURSE_MARKERS: Phrase[] = [
	{ text: "λοιπόν", english: "so, well, anyway" },
	{ text: "δηλαδή", english: "that is, I mean" },
	{ text: "ξέρεις", english: "you know" },
	{ text: "κοίτα", english: "look, listen" },
	{ text: "τέλος πάντων", english: "anyway, in any case" },
	{ text: "εντάξει", english: "okay, alright" },
	{ text: "μάλιστα", english: "indeed, certainly" },
	{ text: "βέβαια", english: "of course, certainly" },
	{ text: "ακριβώς", english: "exactly" },
	{ text: "πράγματι", english: "indeed, really" },
];

// Common Responses - things people say TO you
export const COMMON_RESPONSES: Phrase[] = [
	{ text: "ορίστε", english: "here you go / pardon?" },
	{ text: "αμέσως", english: "right away" },
	{ text: "σίγουρα", english: "sure, certainly" },
	{ text: "καλά", english: "okay, fine, good" },
	{ text: "έγινε", english: "done, got it" },
	{ text: "περίμενε", english: "wait" },
	{ text: "δεν πειράζει", english: "it doesn't matter, no problem" },
	{ text: "τίποτα", english: "nothing / you're welcome" },
	{ text: "με συγχωρείς", english: "excuse me / sorry" },
];

// Opinion & Feeling Expressions
export const OPINION_PHRASES: Phrase[] = [
	{ text: "νομίζω", english: "I think" },
	{ text: "πιστεύω", english: "I believe" },
	{ text: "μου φαίνεται", english: "it seems to me" },
	{ text: "δεν ξέρω", english: "I don't know" },
	{ text: "έχεις δίκιο", english: "you're right" },
	{ text: "δεν συμφωνώ", english: "I don't agree" },
	{ text: "ίσως", english: "maybe, perhaps" },
	{ text: "μακάρι", english: "I wish, hopefully" },
	{ text: "ελπίζω", english: "I hope" },
];

// Arriving & Leaving phrases
export const ARRIVING_PHRASES: Phrase[] = [
	{ text: "Καλώς ήρθες", english: "Welcome (singular informal)" },
	{ text: "Καλώς ήρθατε", english: "Welcome (plural/formal)" },
	{ text: "Πέρνα μέσα", english: "Come in" },
	{ text: "Κάτσε", english: "Sit down (informal)" },
	{ text: "Καθίστε", english: "Sit down (formal/plural)" },
	{ text: "Να προσέχεις", english: "Take care" },
	{ text: "Καλό δρόμο", english: "Have a good trip/journey" },
	{ text: "Στο καλό", english: "Goodbye (go well)" },
];

// Food & Hospitality phrases
export const FOOD_PHRASES: Phrase[] = [
	{ text: "Θέλεις κάτι;", english: "Do you want something? (informal)" },
	{ text: "Θέλετε κάτι;", english: "Do you want something? (formal)" },
	{ text: "Πάρε λίγο ακόμα", english: "Take some more (informal)" },
	{ text: "Άρεσε;", english: "Did you like it?" },
	{ text: "Είναι πολύ νόστιμο", english: "It's very delicious" },
	{ text: "Χόρτασα", english: "I'm full" },
	{ text: "Φάε, φάε!", english: "Eat, eat!" },
];

// Small Talk phrases
export const SMALLTALK_PHRASES: Phrase[] = [
	{ text: "Τι κάνεις στη δουλειά;", english: "How's work?" },
	{ text: "Τι θα κάνετε το Σαββατοκύριακο;", english: "What are you doing this weekend?" },
	{ text: "Πώς είναι τα παιδιά;", english: "How are the kids?" },
	{ text: "Κάνει ζέστη σήμερα", english: "It's hot today" },
	{ text: "Κάνει κρύο σήμερα", english: "It's cold today" },
	{ text: "Δεν ξέρω ακόμα", english: "I don't know yet" },
];
