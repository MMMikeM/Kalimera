import type {
	VerbCategory,
	WordInfo,
	TabInfo,
	TabId,
	ArticleForm,
	ConjugationSet,
	TimeOfDay,
	FrequencyAdverb,
	LikeConstruction,
	VocabularyItem,
	TransportationData,
	VerbConjugation,
} from "../types/greek-reference";

// Navigation tabs configuration
export const TABS: TabInfo[] = [
	{ id: "articles", label: "Articles & Cases", icon: "FileText" },
	{ id: "present", label: "Present Tense", icon: "Users" },
	{ id: "other-tenses", label: "Other Tenses", icon: "Clock" },
	{ id: "vocabulary", label: "Essential Words", icon: "BookOpen" },
	{ id: "search", label: "Quick Search", icon: "Search" },
];

// Definite article forms
export const DEFINITE_ARTICLES = {
	singular: [
		{ case: "Nom (subject)", masculine: "ο", feminine: "η", neuter: "το" },
		{
			case: "Acc (object)",
			masculine: "τον/το(ν)",
			feminine: "την/τη(ν)",
			neuter: "το",
		},
		{
			case: "Gen (of/possession)",
			masculine: "του",
			feminine: "της",
			neuter: "του",
		},
	] as ArticleForm[],
	plural: [
		{ case: "Nom", masculine: "οι", feminine: "οι", neuter: "τα" },
		{ case: "Acc", masculine: "τους", feminine: "τις", neuter: "τα" },
		{ case: "Gen", masculine: "των", feminine: "των", neuter: "των" },
	] as ArticleForm[],
};

// Practical case usage examples
export const CASE_EXAMPLES = {
	nominative: [
		{
			greek: "ο καφές είναι ζεστός",
			english: "the coffee is hot",
			explanation: "καφές is the subject",
		},
		{
			greek: "η Μαρία είναι εδώ",
			english: "Maria is here",
			explanation: "Μαρία is the subject",
		},
		{
			greek: "το σπίτι είναι μεγάλο",
			english: "the house is big",
			explanation: "σπίτι is the subject",
		},
	],
	accusative: [
		{
			greek: "βλέπω τον καφέ",
			english: "I see the coffee",
			explanation: "καφέ is the direct object",
		},
		{
			greek: "αγοράζω την εφημερίδα",
			english: "I buy the newspaper",
			explanation: "εφημερίδα is the direct object",
		},
		{
			greek: "πηγαίνω στο σπίτι",
			english: "I go to the house",
			explanation: "direction/location with στο",
		},
		{
			greek: "τη Δευτέρα",
			english: "on Monday",
			explanation: "time expressions use accusative",
		},
	],
	genitive: [
		{
			greek: "το αυτοκίνητο του Νίκου",
			english: "Nikos's car",
			explanation: "possession - whose car?",
		},
		{
			greek: "η μητέρα της Μαρίας",
			english: "Maria's mother",
			explanation: "family relationships",
		},
		{
			greek: "το όνομα του καφέ",
			english: "the name of the café",
			explanation: "'of' constructions",
		},
		{
			greek: "είμαι είκοσι χρονών",
			english: "I'm 20 years old",
			explanation: "age expressions",
		},
	],
};

// Preposition patterns with cases
export const PREPOSITION_PATTERNS = [
	{
		preposition: "με",
		case: "Accusative",
		example: "με τον φίλο μου",
		english: "with my friend",
	},
	{
		preposition: "από",
		case: "Accusative",
		example: "από το σπίτι",
		english: "from the house",
	},
	{
		preposition: "για",
		case: "Accusative",
		example: "για τον καφέ",
		english: "for the coffee",
	},
	{
		preposition: "στο/στη/στον",
		case: "Accusative",
		example: "στο κέντρο",
		english: "to/in the center",
	},
	{
		preposition: "χωρίς",
		case: "Accusative",
		example: "χωρίς τη ζάχαρη",
		english: "without the sugar",
	},
	{
		preposition: "μετά",
		case: "Accusative",
		example: "μετά τη δουλειά",
		english: "after work",
	},
];

// Quick case recognition patterns
export const CASE_RECOGNITION = {
	patterns: [
		{
			pattern: "Articles ending in -ν",
			rule: "Usually accusative",
			examples: ["τον", "την", "τους"],
		},
		{
			pattern: "Same form nom/acc",
			rule: "Neuter nouns",
			examples: ["το σπίτι", "το παιδί", "το τραπέζι"],
		},
		{
			pattern: "Articles του/της/των",
			rule: "Always genitive",
			examples: ["του πατέρα", "της μητέρας", "των παιδιών"],
		},
	],
	quickRules: [
		{
			question: "WHO does it?",
			answer: "Nominative",
			example: "ο άντρας τρέχει",
		},
		{
			question: "WHAT/WHERE to?",
			answer: "Accusative",
			example: "βλέπω τον άντρα",
		},
		{
			question: "WHOSE is it?",
			answer: "Genitive",
			example: "το σπίτι του άντρα",
		},
	],
};

// Common mistakes and corrections
export const COMMON_MISTAKES = [
	{
		wrong: "Θέλω ο καφές",
		correct: "Θέλω τον καφέ",
		explanation: "Object of the verb needs accusative, not nominative",
	},
	{
		wrong: "Πηγαίνω ο σπίτι",
		correct: "Πηγαίνω στο σπίτι",
		explanation: "Direction needs στο + accusative",
	},
	{
		wrong: "Το αυτοκίνητο ο Νίκος",
		correct: "Το αυτοκίνητο του Νίκου",
		explanation: "Possession needs genitive του, not nominative ο",
	},
	{
		wrong: "Με ο φίλος μου",
		correct: "Με τον φίλο μου",
		explanation: "Preposition με takes accusative τον, not nominative ο",
	},
];

// Verb conjugation examples
export const VERB_CONJUGATIONS: ConjugationSet = {
	kano: [
		{ person: "εγώ", form: "κάνω", highlighted: "ω", english: "I do" },
		{ person: "εσύ", form: "κάνεις", highlighted: "εις", english: "you do" },
		{ person: "αυτός", form: "κάνει", highlighted: "ει", english: "he does" },
		{ person: "εμείς", form: "κάνουμε", highlighted: "ουμε", english: "we do" },
		{ person: "εσείς", form: "κάνετε", highlighted: "ετε", english: "you do" },
		{ person: "αυτοί", form: "κάνουν", highlighted: "ουν", english: "they do" },
	],
	milao: [
		{ person: "εγώ", form: "μιλάω", highlighted: "άω", english: "I speak" },
		{ person: "εσύ", form: "μιλάς", highlighted: "άς", english: "you speak" },
		{
			person: "αυτός",
			form: "μιλάει",
			highlighted: "άει",
			english: "he speaks",
		},
		{
			person: "εμείς",
			form: "μιλάμε",
			highlighted: "άμε",
			english: "we speak",
		},
		{
			person: "εσείς",
			form: "μιλάτε",
			highlighted: "άτε",
			english: "you speak",
		},
		{
			person: "αυτοί",
			form: "μιλάνε",
			highlighted: "άνε",
			english: "they speak",
		},
	],
	erhomai: [
		{ person: "εγώ", form: "έρχομαι", highlighted: "ομαι", english: "I come" },
		{
			person: "εσύ",
			form: "έρχεσαι",
			highlighted: "εσαι",
			english: "you come",
		},
		{
			person: "αυτός",
			form: "έρχεται",
			highlighted: "εται",
			english: "he comes",
		},
		{
			person: "εμείς",
			form: "ερχόμαστε",
			highlighted: "όμαστε",
			english: "we come",
		},
		{
			person: "εσείς",
			form: "έρχεστε",
			highlighted: "εστε",
			english: "you come",
		},
		{
			person: "αυτοί",
			form: "έρχονται",
			highlighted: "ονται",
			english: "they come",
		},
	],
	thymamai: [
		{
			person: "εγώ",
			form: "θυμάμαι",
			highlighted: "άμαι",
			english: "I remember",
		},
		{
			person: "εσύ",
			form: "θυμάσαι",
			highlighted: "άσαι",
			english: "you remember",
		},
		{
			person: "αυτός",
			form: "θυμάται",
			highlighted: "άται",
			english: "he remembers",
		},
		{
			person: "εμείς",
			form: "θυμόμαστε",
			highlighted: "όμαστε",
			english: "we remember",
		},
		{
			person: "εσείς",
			form: "θυμάστε",
			highlighted: "άστε",
			english: "you remember",
		},
		{
			person: "αυτοί",
			form: "θυμούνται",
			highlighted: "ούνται",
			english: "they remember",
		},
	],
	pao: [
		{ person: "εγώ", form: "πάω", english: "I go" },
		{ person: "εσύ", form: "πας", english: "you go" },
		{ person: "αυτός", form: "πάει", english: "he goes" },
		{ person: "εμείς", form: "πάμε", english: "we go" },
		{ person: "εσείς", form: "πάτε", english: "you go" },
		{ person: "αυτοί", form: "πάνε", english: "they go" },
	],
	leo: [
		{ person: "εγώ", form: "λέω", english: "I say" },
		{ person: "εσύ", form: "λες", english: "you say" },
		{ person: "αυτός", form: "λέει", english: "he says" },
		{ person: "εμείς", form: "λέμε", english: "we say" },
		{ person: "εσείς", form: "λέτε", english: "you say" },
		{ person: "αυτοί", form: "λένε", english: "they say" },
	],
	troo: [
		{ person: "εγώ", form: "τρώω", english: "I eat" },
		{ person: "εσύ", form: "τρώς", english: "you eat" },
		{ person: "αυτός", form: "τρώει", english: "he eats" },
		{ person: "εμείς", form: "τρώμε", english: "we eat" },
		{ person: "εσείς", form: "τρώτε", english: "you eat" },
		{ person: "αυτοί", form: "τρώνε", english: "they eat" },
	],
	eimai: [
		{ person: "εγώ", form: "είμαι", english: "I am" },
		{ person: "εσύ", form: "είσαι", english: "you are" },
		{ person: "αυτός", form: "είναι", english: "he is" },
		{ person: "εμείς", form: "είμαστε", english: "we are" },
		{ person: "εσείς", form: "είστε", english: "you are" },
		{ person: "αυτοί", form: "είναι", english: "they are" },
	],
};

// Future tense examples
export const FUTURE_TENSE_EXAMPLES: VerbConjugation[] = [
	{ person: "εγώ", form: "θα κάνω", english: "I will do" },
	{ person: "εσύ", form: "θα κάνεις", english: "you will do" },
	{ person: "αυτός", form: "θα κάνει", english: "he will do" },
	{ person: "εμείς", form: "θα κάνουμε", english: "we will do" },
	{ person: "εσείς", form: "θα κάνετε", english: "you will do" },
	{ person: "αυτοί", form: "θα κάνουν", english: "they will do" },
];

// Past tense examples
export const PAST_TENSE_EXAMPLES: VerbConjugation[] = [
	{ person: "εγώ", form: "έκανα", english: "I did" },
	{ person: "εσύ", form: "έκανες", english: "you did" },
	{ person: "αυτός", form: "έκανε", english: "he did" },
	{ person: "εμείς", form: "κάναμε", english: "we did" },
	{ person: "εσείς", form: "κάνατε", english: "you did" },
	{ person: "αυτοί", form: "έκαναν", english: "they did" },
];

// Verb categories for vocabulary section
export const VERB_CATEGORIES: VerbCategory[] = [
	{
		id: "omega-verbs",
		title: "Essential -ω Verbs",
		verbs: [
			{ id: "kano", greek: "κάνω", english: "to do/make", pattern: "Type A" },
			{ id: "thelo", greek: "θέλω", english: "to want", pattern: "Type A" },
			{
				id: "boro",
				greek: "μπορώ",
				english: "to can/be able",
				pattern: "Type A",
			},
			{ id: "vlepo", greek: "βλέπω", english: "to see", pattern: "Type A" },
			{ id: "akouo", greek: "ακούω", english: "to hear", pattern: "Type A" },
			{ id: "meno", greek: "μένω", english: "to stay/live", pattern: "Type A" },
			{ id: "odigo", greek: "οδηγώ", english: "to drive", pattern: "Type A" },
			{ id: "zo", greek: "ζω", english: "to live", pattern: "Type A" },
			{ id: "argo", greek: "αργώ", english: "to be late", pattern: "Type A" },
			{
				id: "tilefono",
				greek: "τηλεφωνώ",
				english: "to phone",
				pattern: "Type A",
			},
			{ id: "fevgo", greek: "φεύγω", english: "to leave", pattern: "Type A" },
			{
				id: "perimeno",
				greek: "περιμένω",
				english: "to wait",
				pattern: "Type A",
			},
			{ id: "pairno", greek: "παίρνω", english: "to take", pattern: "Type A" },
			{
				id: "xipnao",
				greek: "ξυπνάω",
				english: "to wake up",
				pattern: "Type B",
			},
			{ id: "milao", greek: "μιλάω", english: "to speak", pattern: "Type B" },
			{ id: "agapo", greek: "αγαπώ", english: "to love", pattern: "Type B" },
			{
				id: "kolimbao",
				greek: "κολυμπάω",
				english: "to swim",
				pattern: "Type B",
			},
			{ id: "forao", greek: "φοράω", english: "to wear", pattern: "Type B" },
			{
				id: "xekinao",
				greek: "ξεκινάω",
				english: "to start/depart",
				pattern: "Type B",
			},
			{
				id: "pernao",
				greek: "περνάω",
				english: "to cross/spend",
				pattern: "Type B",
			},
			{
				id: "doulevo",
				greek: "δουλεύω",
				english: "to work",
				pattern: "Type B",
			},
		],
	},
	{
		id: "omai-verbs",
		title: "Essential -ομαι Verbs",
		verbs: [
			{
				id: "erhomai",
				greek: "έρχομαι",
				english: "to come",
				pattern: "Type A",
			},
			{
				id: "ginomai",
				greek: "γίνομαι",
				english: "to become",
				pattern: "Type A",
			},
			{
				id: "skeftomai",
				greek: "σκέφτομαι",
				english: "to think",
				pattern: "Type A",
			},
			{
				id: "thymamai",
				greek: "θυμάμαι",
				english: "to remember",
				pattern: "Type B",
			},
			{
				id: "kimamai",
				greek: "κοιμάμαι",
				english: "to sleep",
				pattern: "Type B",
			},
			{
				id: "lipamai",
				greek: "λυπάμαι",
				english: "to feel sorry",
				pattern: "Type B",
			},
			{
				id: "fovamai",
				greek: "φοβάμαι",
				english: "to be afraid",
				pattern: "Type B",
			},
		],
	},
	{
		id: "irregular-verbs",
		title: "Irregular Verbs ⚡",
		verbs: [
			{ id: "eimai", greek: "είμαι", english: "to be", pattern: "Irregular" },
			{ id: "pao", greek: "πάω", english: "to go", pattern: "Irregular" },
			{ id: "leo", greek: "λέω", english: "to say", pattern: "Irregular" },
			{ id: "troo", greek: "τρώω", english: "to eat", pattern: "Irregular" },
			{
				id: "pigeino",
				greek: "πηγαίνω",
				english: "to go (regular form)",
				pattern: "Type A",
			},
		],
	},
];

// Comprehensive vocabulary for search functionality
export const ALL_WORDS: WordInfo[] = [
	// Verbs
	{
		id: "v-kano",
		greek: "κάνω",
		english: "to do/make",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-eimai",
		greek: "είμαι",
		english: "to be",
		type: "verb",
		family: "irregular",
	},
	{ id: "v-eho", greek: "έχω", english: "to have", type: "verb", family: "-ω" },
	{
		id: "v-erhomai",
		greek: "έρχομαι",
		english: "to come",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-thymamai",
		greek: "θυμάμαι",
		english: "to remember",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-pao",
		greek: "πάω",
		english: "to go",
		type: "verb",
		family: "irregular",
	},
	{
		id: "v-leo",
		greek: "λέω",
		english: "to say",
		type: "verb",
		family: "irregular",
	},
	{
		id: "v-troo",
		greek: "τρώω",
		english: "to eat",
		type: "verb",
		family: "irregular",
	},
	{
		id: "v-meno",
		greek: "μένω",
		english: "to stay/live",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-odigo",
		greek: "οδηγώ",
		english: "to drive",
		type: "verb",
		family: "-ω",
	},
	{ id: "v-zo", greek: "ζω", english: "to live", type: "verb", family: "-ω" },
	{
		id: "v-argo",
		greek: "αργώ",
		english: "to be late",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-tilefono",
		greek: "τηλεφωνώ",
		english: "to phone",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-xipnao",
		greek: "ξυπνάω",
		english: "to wake up",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-kolimbao",
		greek: "κολυμπάω",
		english: "to swim",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-forao",
		greek: "φοράω",
		english: "to wear",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-pigeino",
		greek: "πηγαίνω",
		english: "to go",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-kimamai",
		greek: "κοιμάμαι",
		english: "to sleep",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-lipamai",
		greek: "λυπάμαι",
		english: "to feel sorry",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-fovamai",
		greek: "φοβάμαι",
		english: "to be afraid",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-ginomai",
		greek: "γίνομαι",
		english: "to become",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-skeftomai",
		greek: "σκέφτομαι",
		english: "to think",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-fotografizo",
		greek: "φωτογραφίζω",
		english: "to take picture",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-halarono",
		greek: "χαλαρώνω",
		english: "to relax/chill",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-taxidevo",
		greek: "ταξιδεύω",
		english: "to travel",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-kathomai",
		greek: "κάθομαι",
		english: "to sit",
		type: "verb",
		family: "-ομαι",
	},
	{
		id: "v-akouo",
		greek: "ακούω",
		english: "to listen/hear",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-pairno",
		greek: "παίρνω",
		english: "to take",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-pernao",
		greek: "περνάω",
		english: "to cross/spend",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-xekinao",
		greek: "ξεκινάω",
		english: "to start/depart",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-fevgo",
		greek: "φεύγω",
		english: "to leave",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-perimeno",
		greek: "περιμένω",
		english: "to wait",
		type: "verb",
		family: "-ω",
	},
	{
		id: "v-doulevo",
		greek: "δουλεύω",
		english: "to work",
		type: "verb",
		family: "-ω",
	},

	// Articles
	{ id: "a-o", greek: "ο", english: "the (masc.)", type: "article" },
	{ id: "a-i", greek: "η", english: "the (fem.)", type: "article" },
	{ id: "a-to", greek: "το", english: "the (neut.)", type: "article" },
	{ id: "a-ton", greek: "τον", english: "the (masc. acc.)", type: "article" },
	{ id: "a-tin", greek: "την", english: "the (fem. acc.)", type: "article" },
	{
		id: "a-tous",
		greek: "τους",
		english: "the (masc. pl. acc.)",
		type: "article",
	},
	{
		id: "a-tis",
		greek: "τις",
		english: "the (fem. pl. acc.)",
		type: "article",
	},
	{ id: "a-ta", greek: "τα", english: "the (neut. pl.)", type: "article" },

	// Adverbs of frequency
	{ id: "f-pote", greek: "ποτέ", english: "never", type: "adverb" },
	{
		id: "f-shedon-pote",
		greek: "σχεδόν ποτέ",
		english: "almost never",
		type: "adverb",
	},
	{ id: "f-spania", greek: "σπάνια", english: "rarely", type: "adverb" },
	{
		id: "f-kamia-fora",
		greek: "καμιά φορά",
		english: "sometimes",
		type: "adverb",
	},
	{
		id: "f-kapou-kapou",
		greek: "κάπου κάπου",
		english: "from time to time",
		type: "adverb",
	},
	{
		id: "f-pote-pote",
		greek: "πότε πότε",
		english: "occasionally",
		type: "adverb",
	},
	{
		id: "f-merikes-fores",
		greek: "μερικές φορές",
		english: "sometimes",
		type: "adverb",
	},
	{ id: "f-sihna", greek: "συχνά", english: "often", type: "adverb" },
	{
		id: "f-polles-fores",
		greek: "πολλές φορές",
		english: "many times",
		type: "adverb",
	},
	{ id: "f-sinithios", greek: "συνήθως", english: "usually", type: "adverb" },
	{
		id: "f-shedon-panta",
		greek: "σχεδόν πάντα",
		english: "almost always",
		type: "adverb",
	},
	{ id: "f-panta", greek: "πάντα", english: "always", type: "adverb" },

	// Likes construction
	{
		id: "l-mou-aresi",
		greek: "μου αρέσει",
		english: "I like (one thing)",
		type: "phrase",
	},
	{
		id: "l-mou-aresoun",
		greek: "μου αρέσουν",
		english: "I like (multiple things)",
		type: "phrase",
	},
	{
		id: "l-sou-aresi",
		greek: "σου αρέσει",
		english: "you like (one thing)",
		type: "phrase",
	},
	{
		id: "l-tou-aresi",
		greek: "του αρέσει",
		english: "he likes",
		type: "phrase",
	},
	{
		id: "l-tis-aresi",
		greek: "της αρέσει",
		english: "she likes",
		type: "phrase",
	},

	// Summer/beach vocabulary
	{ id: "n-kalokairi", greek: "το καλοκαίρι", english: "summer", type: "noun" },
	{ id: "n-thalassa", greek: "η θάλασσα", english: "sea", type: "noun" },
	{ id: "n-paralia", greek: "η παραλία", english: "beach", type: "noun" },
	{ id: "n-ilios", greek: "ο ήλιος", english: "sun", type: "noun" },
	{ id: "n-zesti", greek: "η ζέστη", english: "warmth", type: "noun" },
	{
		id: "n-ksenodochio",
		greek: "το ξενοδοχείο",
		english: "hotel",
		type: "noun",
	},
	{
		id: "n-taksidi",
		greek: "το ταξίδι",
		english: "trip/journey",
		type: "noun",
	},
	{ id: "n-ksaplostra", greek: "η ξαπλώστρα", english: "sunbed", type: "noun" },
	{
		id: "n-magio",
		greek: "το μαγιό",
		english: "swimming costume",
		type: "noun",
	},
	{ id: "n-kapelo", greek: "το καπέλο", english: "hat", type: "noun" },
	{ id: "n-valitsa", greek: "η βαλίτσα", english: "luggage", type: "noun" },
	{ id: "n-pagoto", greek: "το παγωτό", english: "ice cream", type: "noun" },
	{ id: "n-rodakino", greek: "το ροδάκινο", english: "peach", type: "noun" },
	{ id: "n-psari", greek: "το ψάρι", english: "fish", type: "noun" },
	{
		id: "n-karpouzi",
		greek: "το καρπούζι",
		english: "watermelon",
		type: "noun",
	},
	{ id: "n-peponi", greek: "το πεπόνι", english: "melon", type: "noun" },

	// Time expressions
	{
		id: "te-kathe-mera",
		greek: "κάθε μέρα",
		english: "every day",
		type: "phrase",
	},
	{ id: "te-mera", greek: "η μέρα", english: "day", type: "noun" },
	{ id: "te-mesimeri", greek: "το μεσημέρι", english: "midday", type: "noun" },
	{
		id: "te-apogema",
		greek: "το απόγευμα",
		english: "afternoon",
		type: "noun",
	},
	{ id: "te-vradi", greek: "το βράδυ", english: "evening", type: "noun" },
	{ id: "te-nihta", greek: "η νύχτα", english: "night", type: "noun" },
	{
		id: "te-diakopes",
		greek: "οι διακοπές",
		english: "holidays",
		type: "noun",
	},

	// Question words
	{ id: "q-pote", greek: "πότε", english: "when (question)", type: "question" },
	{ id: "q-pou", greek: "πού", english: "where", type: "question" },
	{ id: "q-ti", greek: "τι", english: "what", type: "question" },
	{ id: "r-pou", greek: "που", english: "that/which", type: "relative" },

	// Basic vocabulary
	{
		id: "g-kalimera",
		greek: "καλημέρα",
		english: "good morning",
		type: "greeting",
	},
	{
		id: "p-efharisto",
		greek: "ευχαριστώ",
		english: "thank you",
		type: "phrase",
	},
	{
		id: "p-parakalo",
		greek: "παρακαλώ",
		english: "please/you're welcome",
		type: "phrase",
	},
	{ id: "w-ne", greek: "ναι", english: "yes", type: "word" },
	{ id: "w-ohi", greek: "όχι", english: "no", type: "word" },

	// Expressions
	{ id: "p-fisika", greek: "φυσικά", english: "of course", type: "phrase" },
	{ id: "ad-episis", greek: "επίσης", english: "also", type: "adverb" },
	{ id: "pr-kati", greek: "κάτι", english: "something", type: "pronoun" },
	{
		id: "p-ta-panta",
		greek: "τα πάντα",
		english: "everything",
		type: "phrase",
	},
	{ id: "r-oti", greek: "ότι", english: "whatever/that", type: "relative" },
	{ id: "pr-ola", greek: "όλα", english: "everything", type: "pronoun" },
	{
		id: "p-ti-ginetai",
		greek: "τι γίνεται",
		english: "what's happening",
		type: "phrase",
	},
	{
		id: "p-ta-leme",
		greek: "τα λέμε",
		english: "see ya later",
		type: "phrase",
	},
	{ id: "ad-arga", greek: "αργά", english: "late", type: "adverb" },
	{
		id: "p-para-poli",
		greek: "πάρα πολύ",
		english: "very much",
		type: "phrase",
	},
	{
		id: "adj-zoiros",
		greek: "ζωηρός",
		english: "full of life",
		type: "adjective",
	},
	{
		id: "adj-ataktos",
		greek: "άτακτος",
		english: "naughty",
		type: "adjective",
	},
	{ id: "adj-mikros", greek: "μικρός", english: "small", type: "adjective" },
	{ id: "adj-megalos", greek: "μεγάλος", english: "big", type: "adjective" },
	{
		id: "c-otan",
		greek: "όταν",
		english: "when (duration)",
		type: "conjunction",
	},

	// Time-related vocabulary
	{
		id: "p-ti-ora-ine",
		greek: "τι ώρα είναι",
		english: "what time is it",
		type: "phrase",
	},
	{ id: "n-ora", greek: "η ώρα", english: "the time/hour", type: "noun" },
	{ id: "ad-akrivos", greek: "ακριβώς", english: "exactly", type: "adverb" },
	{ id: "n-tetarto", greek: "τέταρτο", english: "quarter", type: "noun" },
	{ id: "adj-misi", greek: "μισή", english: "half", type: "adjective" },
	{
		id: "pre-para",
		greek: "παρά",
		english: "minus/to (time)",
		type: "preposition",
	},
	{
		id: "c-kai",
		greek: "και",
		english: "and/past (time)",
		type: "conjunction",
	},
	{
		id: "p-sti-mia",
		greek: "στη μία",
		english: "at one o'clock",
		type: "phrase",
	},
	{
		id: "p-stis-tris",
		greek: "στις τρεις",
		english: "at three o'clock",
		type: "phrase",
	},
	{
		id: "p-stis-teseris",
		greek: "στις τέσσερις",
		english: "at four o'clock",
		type: "phrase",
	},

	// Transportation
	{ id: "n-treno", greek: "το τρένο", english: "train", type: "noun" },
	{ id: "n-taksi", greek: "το ταξί", english: "taxi", type: "noun" },
	{
		id: "n-taksitzis",
		greek: "ο ταξιτζής",
		english: "taxi driver",
		type: "noun",
	},
	{
		id: "n-aeroplano",
		greek: "το αεροπλάνο",
		english: "airplane",
		type: "noun",
	},
	{ id: "n-trolley", greek: "το τρόλεϊ", english: "trolley", type: "noun" },
	{
		id: "n-taksidiotiko",
		greek: "το ταξιδιωτικό γραφείο",
		english: "travel agency",
		type: "noun",
	},

	// Other vocabulary
	{
		id: "n-fili",
		greek: "η φίλη",
		english: "girlfriend/female friend",
		type: "noun",
	},
	{
		id: "n-mathima",
		greek: "το μάθημα",
		english: "lesson/class",
		type: "noun",
	},
	{
		id: "n-ellinika",
		greek: "ελληνικά",
		english: "Greek (language)",
		type: "noun",
	},
	{
		id: "n-dialeima",
		greek: "το διάλειμμα",
		english: "break/recess",
		type: "noun",
	},
	{ id: "n-proi", greek: "πρωί", english: "morning", type: "noun" },
	{ id: "n-vradi", greek: "βράδυ", english: "evening", type: "noun" },
	{ id: "n-nihta", greek: "νύχτα", english: "night", type: "noun" },
];

// Times of day
export const TIMES_OF_DAY: TimeOfDay[] = [
	{
		id: "tod-proi",
		greek: "πρωί",
		english: "morning",
		timeRange: "(5:00-12:00)",
	},
	{
		id: "tod-mesimeri",
		greek: "μεσημέρι",
		english: "midday",
		timeRange: "(12:00-15:00)",
	},
	{
		id: "tod-apogema",
		greek: "απόγευμα",
		english: "afternoon",
		timeRange: "(15:00-19:00)",
	},
	{
		id: "tod-vradi",
		greek: "βράδυ",
		english: "evening",
		timeRange: "(19:00-24:00)",
	},
	{
		id: "tod-nihta",
		greek: "νύχτα",
		english: "night",
		timeRange: "(24:00-5:00)",
	},
];

// Frequency adverbs in order
export const FREQUENCY_ADVERBS: FrequencyAdverb[] = [
	{ id: "freq-pote", greek: "ποτέ", english: "never" },
	{ id: "freq-shedon-pote", greek: "σχεδόν ποτέ", english: "almost never" },
	{ id: "freq-spania", greek: "σπάνια", english: "rarely" },
	{ id: "freq-kamia-fora", greek: "καμιά φορά", english: "sometimes" },
	{
		id: "freq-kapou-kapou",
		greek: "κάπου κάπου",
		english: "from time to time",
	},
	{ id: "freq-pote-pote", greek: "πότε πότε", english: "occasionally" },
	{ id: "freq-merikes-fores", greek: "μερικές φορές", english: "sometimes" },
	{ id: "freq-sihna", greek: "συχνά", english: "often" },
	{ id: "freq-polles-fores", greek: "πολλές φορές", english: "many times" },
	{ id: "freq-sinithios", greek: "συνήθως", english: "usually" },
	{ id: "freq-shedon-panta", greek: "σχεδόν πάντα", english: "almost always" },
	{ id: "freq-panta", greek: "πάντα", english: "always" },
];

// Likes construction forms
export const LIKES_CONSTRUCTION = {
	singular: [
		{ id: "like-s-mou", greek: "μου αρέσει", english: "I like" },
		{ id: "like-s-sou", greek: "σου αρέσει", english: "you like" },
		{ id: "like-s-tou-tis", greek: "του/της αρέσει", english: "he/she likes" },
		{ id: "like-s-mas", greek: "μας αρέσει", english: "we like" },
		{ id: "like-s-sas", greek: "σας αρέσει", english: "you like" },
		{ id: "like-s-tous", greek: "τους αρέσει", english: "they like" },
	] as LikeConstruction[],
	plural: [
		{ id: "like-p-mou", greek: "μου αρέσουν", english: "I like (them)" },
		{ id: "like-p-sou", greek: "σου αρέσουν", english: "you like (them)" },
		{
			id: "like-p-tou-tis",
			greek: "του/της αρέσουν",
			english: "he/she likes (them)",
		},
		{ id: "like-p-mas", greek: "μας αρέσουν", english: "we like (them)" },
		{ id: "like-p-sas", greek: "σας αρέσουν", english: "you like (them)" },
		{ id: "like-p-tous", greek: "τους αρέσουν", english: "they like (them)" },
	] as LikeConstruction[],
};

// Summer/beach vocabulary
export const SUMMER_VOCABULARY: VocabularyItem[] = [
	{ id: "sum-kalokairi", greek: "το καλοκαίρι", english: "summer" },
	{ id: "sum-thalassa", greek: "η θάλασσα", english: "sea" },
	{ id: "sum-paralia", greek: "η παραλία", english: "beach" },
	{ id: "sum-ilios", greek: "ο ήλιος", english: "sun" },
	{ id: "sum-zesti", greek: "η ζέστη", english: "warmth" },
	{ id: "sum-magio", greek: "το μαγιό", english: "swimming costume" },
	{ id: "sum-kapelo", greek: "το καπέλο", english: "hat" },
	{ id: "sum-ksaplostra", greek: "η ξαπλώστρα", english: "sunbed" },
	{ id: "sum-pagoto", greek: "το παγωτό", english: "ice cream" },
	{ id: "sum-karpouzi", greek: "το καρπούζι", english: "watermelon" },
];

// Time expressions
export const TIME_EXPRESSIONS: VocabularyItem[] = [
	{ id: "time-kathe-mera", greek: "κάθε μέρα", english: "every day" },
	{ id: "time-mera", greek: "η μέρα", english: "day" },
	{ id: "time-mesimeri", greek: "το μεσημέρι", english: "midday" },
	{ id: "time-apogema", greek: "το απόγευμα", english: "afternoon" },
	{ id: "time-vradi", greek: "το βράδυ", english: "evening" },
	{ id: "time-nihta", greek: "η νύχτα", english: "night" },
	{ id: "time-diakopes", greek: "οι διακοπές", english: "holidays" },
	{ id: "time-taksidi", greek: "το ταξίδι", english: "journey/trip" },
];

// Numbers 1-10
export const NUMBERS = [
	"ένα (1)",
	"δύο (2)",
	"τρία (3)",
	"τέσσερα (4)",
	"πέντε (5)",
	"έξι (6)",
	"επτά (7)",
	"οκτώ (8)",
	"εννέα (9)",
	"δέκα (10)",
];

// Colors
export const COLORS = [
	"άσπρο (white)",
	"μαύρο (black)",
	"κόκκινο (red)",
	"μπλε (blue)",
	"πράσινο (green)",
	"κίτρινο (yellow)",
];

// Useful expressions
export const USEFUL_EXPRESSIONS: VocabularyItem[] = [
	{ id: "exp-fisika", greek: "φυσικά", english: "of course" },
	{ id: "exp-episis", greek: "επίσης", english: "also" },
	{ id: "exp-kati", greek: "κάτι", english: "something" },
	{ id: "exp-ta-panta", greek: "τα πάντα", english: "everything" },
	{ id: "exp-ti-ginetai", greek: "τι γίνεται;", english: "what's happening?" },
	{ id: "exp-ta-leme", greek: "τα λέμε", english: "see ya" },
];

// Transportation vocabulary
export const TRANSPORTATION: TransportationData = {
	vehicles: [
		{ id: "trans-v-treno", greek: "το τρένο", english: "train" },
		{ id: "trans-v-taksi", greek: "το ταξί", english: "taxi" },
		{ id: "trans-v-taksitzis", greek: "ο ταξιτζής", english: "taxi driver" },
		{ id: "trans-v-aeroplano", greek: "το αεροπλάνο", english: "airplane" },
		{ id: "trans-v-trolley", greek: "το τρόλεϊ", english: "trolley" },
	],
	actions: [
		{ id: "trans-a-ksekina", greek: "ξεκινάει", english: "departs/starts" },
		{ id: "trans-a-fevgi", greek: "φεύγει", english: "leaves" },
		{ id: "trans-a-perimeni", greek: "περιμένει", english: "waits" },
		{ id: "trans-a-pairno", greek: "παίρνω", english: "I take" },
		{ id: "trans-a-doulevi", greek: "δουλεύει", english: "works" },
	],
};

// Default tab ID
export const DEFAULT_TAB: TabId = "articles";
