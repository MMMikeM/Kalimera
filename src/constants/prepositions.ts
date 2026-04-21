// =============================================================================
// PREPOSITION CONSTANTS
// =============================================================================

// The Big 4 - highest frequency prepositions (90%+ of usage)
export const BIG_4_PREPOSITIONS = [
	{
		greek: "σε",
		english: "to / at / in",
		role: "Location · Direction",
		contracts: true,
		colorScheme: "ocean" as const,
		examples: [
			{ greek: "Πάω στο σπίτι", english: "I'm going home" },
			{ greek: "Είμαι στη δουλειά", english: "I'm at work" },
		],
	},
	{
		greek: "από",
		english: "from",
		role: "Origin · Source",
		contracts: false,
		colorScheme: "terracotta" as const,
		examples: [
			{ greek: "Είμαι από την Αθήνα", english: "I'm from Athens" },
			{ greek: "Έρχομαι από το σπίτι", english: "I'm coming from home" },
		],
	},
	{
		greek: "με",
		english: "with",
		role: "Accompaniment",
		contracts: false,
		colorScheme: "olive" as const,
		examples: [
			{ greek: "Καφέ με γάλα", english: "Coffee with milk" },
			{ greek: "Πάω με τον φίλο μου", english: "I'm going with my friend" },
		],
	},
	{
		greek: "για",
		english: "for",
		role: "Purpose · Recipient",
		contracts: false,
		colorScheme: "honey" as const,
		examples: [
			{ greek: "Αυτό είναι για σένα", english: "This is for you" },
			{ greek: "Δουλεύω για την εταιρεία", english: "I work for the company" },
		],
	},
];

// Navigator options - for the decision guide
export const PREPOSITION_NAVIGATOR_OPTIONS = [
	{
		question: "Where is it / going TO?",
		answer: "σε → στο",
		icon: "MapPin",
		examples: [
			{ greek: "Πάω στο σπίτι", english: "I'm going home" },
			{ greek: "Είμαι στη δουλειά", english: "I'm at work" },
		],
	},
	{
		question: "Where FROM?",
		answer: "από",
		icon: "ArrowLeft",
		examples: [
			{ greek: "Είμαι από την Ελλάδα", english: "I'm from Greece" },
			{ greek: "Έρχομαι από τη δουλειά", english: "I'm coming from work" },
		],
	},
	{
		question: "WITH whom/what?",
		answer: "με",
		icon: "Users",
		examples: [
			{ greek: "Καφέ με γάλα", english: "Coffee with milk" },
			{ greek: "Μένω με τους γονείς μου", english: "I live with my parents" },
		],
	},
	{
		question: "FOR whom/purpose?",
		answer: "για",
		icon: "Gift",
		examples: [
			{ greek: "Αυτό είναι για σένα", english: "This is for you" },
			{ greek: "Ευχαριστώ για όλα", english: "Thanks for everything" },
		],
	},
];

// σε contraction formulas
export const SE_CONTRACTIONS = {
	intro: "σε + article ALWAYS contracts. You'll never hear 'σε το' in speech.",
	formulas: [
		{
			formula: "σε + το = στο",
			gender: "neuter",
			number: "singular",
			examples: [
				{ greek: "στο σπίτι", english: "at home" },
				{ greek: "στο κέντρο", english: "downtown" },
				{ greek: "στο γραφείο", english: "at the office" },
			],
		},
		{
			formula: "σε + τη(ν) = στη(ν)",
			gender: "feminine",
			number: "singular",
			examples: [
				{ greek: "στη δουλειά", english: "at work" },
				{ greek: "στην Ελλάδα", english: "in Greece" },
				{ greek: "στη θάλασσα", english: "at the sea" },
			],
		},
		{
			formula: "σε + τον = στον",
			gender: "masculine",
			number: "singular",
			examples: [
				{ greek: "στον κήπο", english: "in the garden" },
				{ greek: "στον δρόμο", english: "on the road" },
				{ greek: "στον σταθμό", english: "at the station" },
			],
		},
		{
			formula: "σε + τα = στα",
			gender: "neuter",
			number: "plural",
			examples: [
				{ greek: "στα παιδιά", english: "to the children" },
				{ greek: "στα σπίτια", english: "at the houses" },
			],
		},
		{
			formula: "σε + τις = στις",
			gender: "feminine",
			number: "plural",
			examples: [
				{ greek: "στις πέντε", english: "at five" },
				{ greek: "στις πόλεις", english: "in the cities" },
			],
		},
		{
			formula: "σε + τους = στους",
			gender: "masculine",
			number: "plural",
			examples: [
				{ greek: "στους φίλους", english: "to the friends" },
				{ greek: "στους δρόμους", english: "on the roads" },
			],
		},
	],
	noArticle: {
		title: "When σε stays as σε",
		explanation: "Without an article, there's nothing to contract with",
		examples: [
			{ greek: "σε δύο μέρες", english: "in two days" },
			{ greek: "σε λίγο", english: "in a bit" },
		],
	},
};

// Common mistakes with prepositions
export const PREPOSITION_MISTAKES = [
	{
		wrong: "σε το σπίτι",
		right: "στο σπίτι",
		rule: "Contraction is mandatory",
	},
	{
		wrong: "για με",
		right: "για μένα",
		rule: "Use emphatic pronouns after prepositions",
	},
	{
		wrong: "πάνω το τραπέζι",
		right: "πάνω στο τραπέζι",
		rule: "Compound prepositions need σε/από",
	},
	{
		wrong: "από στο σπίτι",
		right: "από το σπίτι",
		rule: "Only σε contracts, not από",
	},
];

// Preposition + pronoun patterns
export const PREPOSITION_PRONOUN_INFO = {
	rule: "After prepositions, use emphatic (long) pronoun forms",
	why: "Short pronouns (με, σε) go BEFORE verbs. After prepositions, you need the emphatic forms.",
	examples: [
		{ greek: "για μένα", english: "for me" },
		{ greek: "με σένα", english: "with you" },
		{ greek: "από αυτόν", english: "from him" },
		{ greek: "χωρίς εμάς", english: "without us" },
		{ greek: "μαζί σου", english: "with you (together)" },
	],
};

// Time expressions with prepositions
export const TIME_EXPRESSIONS = {
	patterns: [
		{
			pattern: "στις + time",
			meaning: "at (o'clock)",
			examples: [
				{ greek: "στις πέντε", english: "at five" },
				{ greek: "στις οκτώ", english: "at eight" },
			],
		},
		{
			pattern: "τη(ν) + day",
			meaning: "on (weekday)",
			examples: [
				{ greek: "τη Δευτέρα", english: "on Monday" },
				{ greek: "την Παρασκευή", english: "on Friday" },
			],
		},
		{
			pattern: "μέχρι / μετά / πριν + τις",
			meaning: "until / after / before",
			examples: [
				{ greek: "μέχρι τις πέντε", english: "until five" },
				{ greek: "μετά τις πέντε", english: "after five" },
				{ greek: "πριν τις πέντε", english: "before five" },
			],
		},
	],
};

// Other simple prepositions (less common)
export const OTHER_PREPOSITIONS = [
	{ greek: "μετά", english: "after", example: "μετά τη δουλειά", exampleEnglish: "after work" },
	{ greek: "πριν", english: "before", example: "πριν το φαγητό", exampleEnglish: "before the meal" },
	{ greek: "μέχρι", english: "until / up to", example: "μέχρι τις πέντε", exampleEnglish: "until five" },
	{ greek: "χωρίς", english: "without", example: "χωρίς ζάχαρη", exampleEnglish: "without sugar" },
	{ greek: "προς", english: "toward", example: "προς τον σταθμό", exampleEnglish: "toward the station" },
];

// Contrast pairs for compound prepositions
export const COMPOUND_CONTRAST_PAIRS = [
	{
		left: {
			greek: "πάνω σε",
			english: "on",
			example: "πάνω στο τραπέζι",
			usesσε: true,
		},
		right: {
			greek: "κάτω από",
			english: "under",
			example: "κάτω από το κρεβάτι",
			usesσε: false,
		},
	},
	{
		left: {
			greek: "μπροστά από",
			english: "in front",
			example: "μπροστά από το σπίτι",
			usesσε: false,
		},
		right: {
			greek: "πίσω από",
			english: "behind",
			example: "πίσω από την εκκλησία",
			usesσε: false,
		},
	},
	{
		left: {
			greek: "δίπλα σε",
			english: "next to",
			example: "δίπλα στο παράθυρο",
			usesσε: true,
		},
		right: {
			greek: "απέναντι από",
			english: "across",
			example: "απέναντι από το πάρκο",
			usesσε: false,
		},
	},
	{
		left: {
			greek: "κοντά σε",
			english: "near",
			example: "κοντά στο σχολείο",
			usesσε: true,
		},
		right: {
			greek: "μακριά από",
			english: "far",
			example: "μακριά από την πόλη",
			usesσε: false,
		},
	},
	{
		left: {
			greek: "ανάμεσα σε",
			english: "between",
			example: "ανάμεσα στα δέντρα",
			usesσε: true,
		},
		right: {
			greek: "γύρω από",
			english: "around",
			example: "γύρω από το τραπέζι",
			usesσε: false,
		},
	},
];
