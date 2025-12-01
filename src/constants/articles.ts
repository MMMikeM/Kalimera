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
