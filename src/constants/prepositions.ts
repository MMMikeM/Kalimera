// =============================================================================
// PREPOSITION CONSTANTS
// =============================================================================

// The Big 4 - highest frequency prepositions (90%+ of usage)
export const BIG_4_PREPOSITIONS = [
	{
		greek: "σε",
		english: "to / at / in",
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
			examples: ["στο σπίτι (at home)", "στο κέντρο (downtown)", "στο γραφείο (at the office)"],
		},
		{
			formula: "σε + τη(ν) = στη(ν)",
			gender: "feminine",
			examples: ["στη δουλειά (at work)", "στην Ελλάδα (in Greece)", "στη θάλασσα (at the sea)"],
		},
		{
			formula: "σε + τον = στον",
			gender: "masculine",
			examples: ["στον κήπο (in the garden)", "στον δρόμο (on the road)", "στον σταθμό (at the station)"],
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
	{ greek: "προς", english: "toward", example: "προς τον σταθμό" },
	{ greek: "μέχρι", english: "until / up to", example: "μέχρι τις πέντε" },
	{ greek: "πριν", english: "before", example: "πριν το φαγητό" },
	{ greek: "μετά", english: "after", example: "μετά τη δουλειά" },
	{ greek: "χωρίς", english: "without", example: "χωρίς ζάχαρη" },
];

// =============================================================================
// COMPOUND PREPOSITIONS (for separate page)
// =============================================================================

// Spatial prepositions for the diagram
const SPATIAL_PREPOSITIONS = {
	vertical: [
		{
			position: "above",
			greek: "πάνω σε",
			english: "on / above",
			usesσε: true,
			example: "πάνω στο τραπέζι",
		},
		{
			position: "below",
			greek: "κάτω από",
			english: "under / below",
			usesσε: false,
			example: "κάτω από το κρεβάτι",
		},
	],
	horizontal: [
		{
			position: "front",
			greek: "μπροστά από",
			english: "in front of",
			usesσε: false,
			example: "μπροστά από το σπίτι",
		},
		{
			position: "behind",
			greek: "πίσω από",
			english: "behind",
			usesσε: false,
			example: "πίσω από την εκκλησία",
		},
	],
	proximity: [
		{
			position: "beside",
			greek: "δίπλα σε",
			english: "next to",
			usesσε: true,
			example: "δίπλα στο παράθυρο",
		},
		{
			position: "across",
			greek: "απέναντι από",
			english: "across from",
			usesσε: false,
			example: "απέναντι από το πάρκο",
		},
		{
			position: "near",
			greek: "κοντά σε",
			english: "near",
			usesσε: true,
			example: "κοντά στο σχολείο",
		},
		{
			position: "far",
			greek: "μακριά από",
			english: "far from",
			usesσε: false,
			example: "μακριά από την πόλη",
		},
	],
	enclosure: [
		{
			position: "between",
			greek: "ανάμεσα σε",
			english: "between",
			usesσε: true,
			example: "ανάμεσα στα δέντρα",
		},
		{
			position: "around",
			greek: "γύρω από",
			english: "around",
			usesσε: false,
			example: "γύρω από το τραπέζι",
		},
	],
};

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
