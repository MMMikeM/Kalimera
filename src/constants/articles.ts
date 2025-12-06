export interface ArticleForm {
	case: string;
	masculine: string;
	feminine: string;
	neuter: string;
}

// Definite article forms (standard order: Nom → Acc → Gen)
export const DEFINITE_ARTICLES = {
	singular: [
		{ case: "Nom (subject)", masculine: "ο", feminine: "η", neuter: "το" },
		{
			case: "Acc (object)",
			masculine: "τον",
			feminine: "τη(ν)",
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

// Formula explanations for combined forms
export const ARTICLE_FORMULAS = [
	{
		formula: "σε + το = στο",
		examples: ["στο σπίτι", "στο κέντρο", "στο γραφείο"],
		explanation: "in/to + the (neuter)",
	},
	{
		formula: "σε + τη(ν) = στη(ν)",
		examples: ["στη δουλειά", "στην αγορά", "στη θάλασσα"],
		explanation: "in/to + the (feminine)",
	},
	{
		formula: "σε + τον = στον",
		examples: ["στον καφέ", "στον κήπο", "στον δρόμο"],
		explanation: "in/to + the (masculine)",
	},
];

// Movable nu rule explanation
export const MOVABLE_NU_RULE = {
	rule: "The final -ν on τον/την/στον/στην is kept before: vowels, κ, π, τ, ξ, ψ, γκ, μπ, ντ",
	examples: {
		keep: [
			{ text: "τον άντρα", reason: "before vowel" },
			{ text: "την κόρη", reason: "before κ" },
			{ text: "στον παρκ", reason: "before π" },
		],
		drop: [
			{ text: "τη μητέρα", reason: "before μ" },
			{ text: "τη δουλειά", reason: "before δ" },
			{ text: "στη θάλασσα", reason: "before θ" },
		],
	},
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
			greek: "ο αδελφός της Μαρίας",
			english: "Maria's brother",
			explanation: "family relationships - daily use",
		},
		{
			greek: "το σπίτι του πατέρα",
			english: "father's house",
			explanation: "family possession - very common",
		},
		{
			greek: "η δουλειά του φίλου μου",
			english: "my friend's job",
			explanation: "social relationships",
		},
		{
			greek: "το όνομα του καφέ",
			english: "the name of the café",
			explanation: "'of' constructions",
		},
		{
			greek: "είμαι είκοσι χρονών",
			english: "I'm 20 years old",
			explanation: "age expressions - daily use",
		},
		{
			greek: "το κλειδί της πόρτας",
			english: "the door key",
			explanation: "everyday objects",
		},
		{
			greek: "η τιμή του ψωμιού",
			english: "the price of bread",
			explanation: "shopping - daily use",
		},
	],
};

// Simple prepositions - compact format for table display
export const SIMPLE_PREPOSITIONS = {
	location: {
		label: "Location",
		items: [
			{ greek: "σε", english: "to/at/in", note: "contracts → στο" },
			{ greek: "από", english: "from" },
			{ greek: "προς", english: "toward" },
			{ greek: "μέχρι", english: "up to" },
		],
	},
	time: {
		label: "Time",
		items: [
			{ greek: "πριν", english: "before" },
			{ greek: "μετά", english: "after" },
			{ greek: "μέχρι", english: "until" },
		],
	},
	relationship: {
		label: "Relationship",
		items: [
			{ greek: "με", english: "with" },
			{ greek: "για", english: "for" },
			{ greek: "χωρίς", english: "without" },
		],
	},
};

// Compound prepositions organized by semantic contrast pairs
export const COMPOUND_PREPOSITION_PAIRS = [
	{
		category: "Position",
		pairs: [
			{
				left: { greek: "πάνω σε", english: "on", example: "πάνω στο τραπέζι" },
				right: {
					greek: "κάτω από",
					english: "under",
					example: "κάτω από το κρεβάτι",
				},
			},
			{
				left: {
					greek: "μπροστά από",
					english: "in front",
					example: "μπροστά από το σπίτι",
				},
				right: {
					greek: "πίσω από",
					english: "behind",
					example: "πίσω από την εκκλησία",
				},
			},
		],
	},
	{
		category: "Proximity",
		pairs: [
			{
				left: {
					greek: "δίπλα σε",
					english: "next to",
					example: "δίπλα στο παράθυρο",
				},
				right: {
					greek: "απέναντι από",
					english: "across",
					example: "απέναντι από το πάρκο",
				},
			},
			{
				left: {
					greek: "κοντά σε",
					english: "near",
					example: "κοντά στο σχολείο",
				},
				right: {
					greek: "μακριά από",
					english: "far",
					example: "μακριά από την πόλη",
				},
			},
		],
	},
	{
		category: "Enclosure",
		pairs: [
			{
				left: {
					greek: "ανάμεσα σε",
					english: "between",
					example: "ανάμεσα στα δέντρα",
				},
				right: {
					greek: "γύρω από",
					english: "around",
					example: "γύρω από το τραπέζι",
				},
			},
		],
	},
];

// Preposition + pronoun examples
export const PREPOSITION_PRONOUN_EXAMPLES = [
	{ greek: "για μένα", english: "for me" },
	{ greek: "με σένα", english: "with you" },
	{ greek: "από αυτόν", english: "from him" },
	{ greek: "χωρίς εμάς", english: "without us" },
	{ greek: "μαζί σου", english: "with you (together)" },
];

// Time expressions with prepositions
export const TIME_PREPOSITION_EXAMPLES = [
	{ greek: "στις πέντε", english: "at five o'clock" },
	{ greek: "μέχρι τις πέντε", english: "until five" },
	{ greek: "μετά τις πέντε", english: "after five" },
	{ greek: "πριν τις πέντε", english: "before five" },
];

