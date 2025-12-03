export interface NounDeclension {
	case: string;
	singular: string;
	plural: string;
}

export interface NounPattern {
	pattern: string;
	gender: "masculine" | "feminine" | "neuter";
	description: string;
	example: string;
	exampleEnglish: string;
	declension: NounDeclension[];
}

// Most common noun patterns - organized by frequency of use
export const NOUN_PATTERNS: NounPattern[] = [
	// MASCULINE
	{
		pattern: "-ος",
		gender: "masculine",
		description: "Most common masculine ending",
		example: "ο άνθρωπος",
		exampleEnglish: "the person/human",
		declension: [
			{ case: "Nom", singular: "ο άνθρωπος", plural: "οι άνθρωποι" },
			{ case: "Acc", singular: "τον άνθρωπο", plural: "τους ανθρώπους" },
			{ case: "Gen", singular: "του ανθρώπου", plural: "των ανθρώπων" },
		],
	},
	{
		pattern: "-ας",
		gender: "masculine",
		description: "Common for male roles/occupations",
		example: "ο άντρας",
		exampleEnglish: "the man",
		declension: [
			{ case: "Nom", singular: "ο άντρας", plural: "οι άντρες" },
			{ case: "Acc", singular: "τον άντρα", plural: "τους άντρες" },
			{ case: "Gen", singular: "του άντρα", plural: "των αντρών" },
		],
	},
	{
		pattern: "-ης",
		gender: "masculine",
		description: "Male roles, nationalities",
		example: "ο μαθητής",
		exampleEnglish: "the student (m)",
		declension: [
			{ case: "Nom", singular: "ο μαθητής", plural: "οι μαθητές" },
			{ case: "Acc", singular: "τον μαθητή", plural: "τους μαθητές" },
			{ case: "Gen", singular: "του μαθητή", plural: "των μαθητών" },
		],
	},
	{
		pattern: "-ές (stressed)",
		gender: "masculine",
		description: "Borrowed words, coffee!",
		example: "ο καφές",
		exampleEnglish: "the coffee",
		declension: [
			{ case: "Nom", singular: "ο καφές", plural: "οι καφέδες" },
			{ case: "Acc", singular: "τον καφέ", plural: "τους καφέδες" },
			{ case: "Gen", singular: "του καφέ", plural: "των καφέδων" },
		],
	},

	// FEMININE
	{
		pattern: "-α",
		gender: "feminine",
		description: "Very common feminine ending",
		example: "η μητέρα",
		exampleEnglish: "the mother",
		declension: [
			{ case: "Nom", singular: "η μητέρα", plural: "οι μητέρες" },
			{ case: "Acc", singular: "τη μητέρα", plural: "τις μητέρες" },
			{ case: "Gen", singular: "της μητέρας", plural: "των μητέρων" },
		],
	},
	{
		pattern: "-η",
		gender: "feminine",
		description: "Abstract nouns, common words",
		example: "η αδερφή",
		exampleEnglish: "the sister",
		declension: [
			{ case: "Nom", singular: "η αδερφή", plural: "οι αδερφές" },
			{ case: "Acc", singular: "την αδερφή", plural: "τις αδερφές" },
			{ case: "Gen", singular: "της αδερφής", plural: "των αδερφών" },
		],
	},
	{
		pattern: "-ση/-ξη",
		gender: "feminine",
		description: "Action nouns (like English -tion)",
		example: "η ερώτηση",
		exampleEnglish: "the question",
		declension: [
			{ case: "Nom", singular: "η ερώτηση", plural: "οι ερωτήσεις" },
			{ case: "Acc", singular: "την ερώτηση", plural: "τις ερωτήσεις" },
			{ case: "Gen", singular: "της ερώτησης", plural: "των ερωτήσεων" },
		],
	},

	// NEUTER
	{
		pattern: "-ο",
		gender: "neuter",
		description: "Very common neuter ending",
		example: "το βιβλίο",
		exampleEnglish: "the book",
		declension: [
			{ case: "Nom", singular: "το βιβλίο", plural: "τα βιβλία" },
			{ case: "Acc", singular: "το βιβλίο", plural: "τα βιβλία" },
			{ case: "Gen", singular: "του βιβλίου", plural: "των βιβλίων" },
		],
	},
	{
		pattern: "-ι",
		gender: "neuter",
		description: "Common neuter, often diminutives",
		example: "το σπίτι",
		exampleEnglish: "the house",
		declension: [
			{ case: "Nom", singular: "το σπίτι", plural: "τα σπίτια" },
			{ case: "Acc", singular: "το σπίτι", plural: "τα σπίτια" },
			{ case: "Gen", singular: "του σπιτιού", plural: "των σπιτιών" },
		],
	},
	{
		pattern: "-μα",
		gender: "neuter",
		description: "Result of action (like English -ment)",
		example: "το όνομα",
		exampleEnglish: "the name",
		declension: [
			{ case: "Nom", singular: "το όνομα", plural: "τα ονόματα" },
			{ case: "Acc", singular: "το όνομα", plural: "τα ονόματα" },
			{ case: "Gen", singular: "του ονόματος", plural: "των ονομάτων" },
		],
	},
];

// Quick reference: How to spot gender by ending
export const GENDER_HINTS = {
	masculine: {
		endings: ["-ος", "-ας", "-ης", "-ές"],
		examples: ["ο άνθρωπος", "ο άντρας", "ο μαθητής", "ο καφές"],
		tip: "Most words for male people and -ος endings",
	},
	feminine: {
		endings: ["-α", "-η", "-ος (some)", "-ση/-ξη"],
		examples: ["η μητέρα", "η αδερφή", "η οδός", "η ερώτηση"],
		tip: "Most words for female people, abstract nouns ending in -η",
	},
	neuter: {
		endings: ["-ο", "-ι", "-μα", "-ος (some)"],
		examples: ["το βιβλίο", "το σπίτι", "το όνομα", "το μέρος"],
		tip: "Diminutives (-ι, -άκι), result nouns (-μα)",
	},
};

// Key insight: Neuter nouns have same form for Nom and Acc
export const NEUTER_SIMPLIFICATION = {
	title: "Neuter nouns: Nominative = Accusative",
	explanation: "Neuter nouns don't change between subject and object position",
	examples: [
		{ greek: "Το σπίτι είναι μεγάλο", english: "The house is big (subject)" },
		{ greek: "Βλέπω το σπίτι", english: "I see the house (object)" },
	],
	tip: "One less form to memorize!",
};

// Common family nouns with full declension (high priority for learner)
export const FAMILY_NOUNS = [
	{
		nominative: "ο πατέρας",
		accusative: "τον πατέρα",
		genitive: "του πατέρα",
		english: "father",
	},
	{
		nominative: "η μητέρα",
		accusative: "τη μητέρα",
		genitive: "της μητέρας",
		english: "mother",
	},
	{
		nominative: "ο αδερφός",
		accusative: "τον αδερφό",
		genitive: "του αδερφού",
		english: "brother",
	},
	{
		nominative: "η αδερφή",
		accusative: "την αδερφή",
		genitive: "της αδερφής",
		english: "sister",
	},
	{
		nominative: "ο γιος",
		accusative: "τον γιο",
		genitive: "του γιου",
		english: "son",
	},
	{
		nominative: "η κόρη",
		accusative: "την κόρη",
		genitive: "της κόρης",
		english: "daughter",
	},
	{
		nominative: "ο παππούς",
		accusative: "τον παππού",
		genitive: "του παππού",
		english: "grandfather",
	},
	{
		nominative: "η γιαγιά",
		accusative: "τη γιαγιά",
		genitive: "της γιαγιάς",
		english: "grandmother",
	},
	{
		nominative: "ο άντρας",
		accusative: "τον άντρα",
		genitive: "του άντρα",
		english: "husband/man",
	},
	{
		nominative: "η γυναίκα",
		accusative: "τη γυναίκα",
		genitive: "της γυναίκας",
		english: "wife/woman",
	},
	{
		nominative: "το παιδί",
		accusative: "το παιδί",
		genitive: "του παιδιού",
		english: "child",
	},
	{
		nominative: "τα παιδιά",
		accusative: "τα παιδιά",
		genitive: "των παιδιών",
		english: "children",
	},
];
