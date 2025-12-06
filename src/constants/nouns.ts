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
		example: "ο φίλος",
		exampleEnglish: "the friend",
		declension: [
			{ case: "Nom", singular: "ο φίλος", plural: "οι φίλοι" },
			{ case: "Acc", singular: "τον φίλο", plural: "τους φίλους" },
			{ case: "Gen", singular: "του φίλου", plural: "των φίλων" },
			{ case: "Voc", singular: "φίλε!", plural: "φίλοι!" },
		],
	},
	{
		pattern: "-ας",
		gender: "masculine",
		description: "Common for male roles/occupations",
		example: "ο άντρας",
		exampleEnglish: "the man/husband",
		declension: [
			{ case: "Nom", singular: "ο άντρας", plural: "οι άντρες" },
			{ case: "Acc", singular: "τον άντρα", plural: "τους άντρες" },
			{ case: "Gen", singular: "του άντρα", plural: "των αντρών" },
			{ case: "Voc", singular: "άντρα!", plural: "άντρες!" },
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
			{ case: "Voc", singular: "μαθητή!", plural: "μαθητές!" },
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
			{ case: "Voc", singular: "καφέ!", plural: "καφέδες!" },
		],
	},

	// FEMININE
	{
		pattern: "-α",
		gender: "feminine",
		description: "Very common feminine ending",
		example: "η γυναίκα",
		exampleEnglish: "the woman/wife",
		declension: [
			{ case: "Nom", singular: "η γυναίκα", plural: "οι γυναίκες" },
			{ case: "Acc", singular: "τη γυναίκα", plural: "τις γυναίκες" },
			{ case: "Gen", singular: "της γυναίκας", plural: "των γυναικών" },
			{ case: "Voc", singular: "γυναίκα!", plural: "γυναίκες!" },
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
			{ case: "Voc", singular: "αδερφή!", plural: "αδερφές!" },
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
			{ case: "Voc", singular: "ερώτηση!", plural: "ερωτήσεις!" },
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
			{ case: "Voc", singular: "βιβλίο!", plural: "βιβλία!" },
		],
	},
	{
		pattern: "-ι",
		gender: "neuter",
		description: "Common neuter, often diminutives",
		example: "το παιδί",
		exampleEnglish: "the child",
		declension: [
			{ case: "Nom", singular: "το παιδί", plural: "τα παιδιά" },
			{ case: "Acc", singular: "το παιδί", plural: "τα παιδιά" },
			{ case: "Gen", singular: "του παιδιού", plural: "των παιδιών" },
			{ case: "Voc", singular: "παιδί!", plural: "παιδιά!" },
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
			{ case: "Voc", singular: "όνομα!", plural: "ονόματα!" },
		],
	},
];

// Quick reference: How to spot gender by ending
export const GENDER_HINTS = {
	masculine: {
		endings: ["-ος", "-ας", "-ης", "-ές"],
		examples: ["ο φίλος", "ο άντρας", "ο μαθητής", "ο καφές"],
		tip: "Most words for male people and -ος endings",
	},
	feminine: {
		endings: ["-α", "-η", "-ος (some)", "-ση/-ξη"],
		examples: ["η γυναίκα", "η αδερφή", "η οδός", "η ερώτηση"],
		tip: "Most words for female people, abstract nouns ending in -η",
	},
	neuter: {
		endings: ["-ο", "-ι", "-μα", "-ος (some)"],
		examples: ["το βιβλίο", "το παιδί", "το όνομα", "το μέρος"],
		tip: "Diminutives (-ι, -άκι), result nouns (-μα)",
	},
};

// Key insight: Neuter nouns have same form for Nom and Acc
export const NEUTER_SIMPLIFICATION = {
	title: "Neuter nouns: Nominative = Accusative",
	explanation: "Neuter nouns don't change between subject and object position",
	examples: [
		{ greek: "Το παιδί είναι εδώ", english: "The child is here (subject)" },
		{ greek: "Βλέπω το παιδί", english: "I see the child (object)" },
	],
	tip: "One less form to memorize!",
};

