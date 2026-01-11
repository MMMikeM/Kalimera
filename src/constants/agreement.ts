// Article-Noun Agreement Paradigms
// Shows how articles and noun endings must match in gender, case, and number

export interface AgreementPattern {
	case: "Nom" | "Acc" | "Gen" | "Voc";
	article: string;
	ending: string;
	full: string;
	english: string;
}

export interface AgreementParadigm {
	id: string;
	gender: "masculine" | "feminine" | "neuter";
	pattern: string;
	title: string;
	example: string;
	frequency: "very common" | "common" | "less common";
	forms: AgreementPattern[];
	pluralForms: AgreementPattern[];
	tip?: string;
}

export const AGREEMENT_PARADIGMS: AgreementParadigm[] = [
	// ============================================================================
	// MASCULINE PATTERNS
	// ============================================================================
	{
		id: "masc-os",
		gender: "masculine",
		pattern: "-ος",
		title: "Masculine -ος words",
		example: "φίλος (friend)",
		frequency: "very common",
		forms: [
			{
				case: "Nom",
				article: "ο",
				ending: "-ος",
				full: "ο φίλος",
				english: "the friend",
			},
			{
				case: "Acc",
				article: "τον",
				ending: "-ο",
				full: "τον φίλο",
				english: "the friend (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-ου",
				full: "του φίλου",
				english: "of the friend",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ε",
				full: "φίλε!",
				english: "Friend!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-οι",
				full: "οι φίλοι",
				english: "the friends",
			},
			{
				case: "Acc",
				article: "τους",
				ending: "-ους",
				full: "τους φίλους",
				english: "the friends (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ων",
				full: "των φίλων",
				english: "of the friends",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-οι",
				full: "φίλοι!",
				english: "Friends!",
			},
		],
	},
	{
		id: "masc-as",
		gender: "masculine",
		pattern: "-ας",
		title: "Masculine -ας words",
		example: "πατέρας (father)",
		frequency: "common",
		tip: "Many family words: πατέρας, άντρας, παππούς",
		forms: [
			{
				case: "Nom",
				article: "ο",
				ending: "-ας",
				full: "ο πατέρας",
				english: "the father",
			},
			{
				case: "Acc",
				article: "τον",
				ending: "-α",
				full: "τον πατέρα",
				english: "the father (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-α",
				full: "του πατέρα",
				english: "of the father",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-α",
				full: "πατέρα!",
				english: "Father!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-ες",
				full: "οι πατέρες",
				english: "the fathers",
			},
			{
				case: "Acc",
				article: "τους",
				ending: "-ες",
				full: "τους πατέρες",
				english: "the fathers (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ων",
				full: "των πατέρων",
				english: "of the fathers",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ες",
				full: "πατέρες!",
				english: "Fathers!",
			},
		],
	},
	{
		id: "masc-is",
		gender: "masculine",
		pattern: "-ης",
		title: "Masculine -ης words",
		example: "μαθητής (student)",
		frequency: "common",
		forms: [
			{
				case: "Nom",
				article: "ο",
				ending: "-ης",
				full: "ο μαθητής",
				english: "the student",
			},
			{
				case: "Acc",
				article: "τον",
				ending: "-ή",
				full: "τον μαθητή",
				english: "the student (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-ή",
				full: "του μαθητή",
				english: "of the student",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ή",
				full: "μαθητή!",
				english: "Student!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-ές",
				full: "οι μαθητές",
				english: "the students",
			},
			{
				case: "Acc",
				article: "τους",
				ending: "-ές",
				full: "τους μαθητές",
				english: "the students (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ών",
				full: "των μαθητών",
				english: "of the students",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ές",
				full: "μαθητές!",
				english: "Students!",
			},
		],
	},
	{
		id: "masc-es",
		gender: "masculine",
		pattern: "-ές",
		title: "Masculine -ές words",
		example: "καφές (coffee)",
		frequency: "less common",
		tip: "Often borrowed words: καφές, καναπές",
		forms: [
			{
				case: "Nom",
				article: "ο",
				ending: "-ές",
				full: "ο καφές",
				english: "the coffee",
			},
			{
				case: "Acc",
				article: "τον",
				ending: "-έ",
				full: "τον καφέ",
				english: "the coffee (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-έ",
				full: "του καφέ",
				english: "of the coffee",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-έ",
				full: "καφέ!",
				english: "Coffee!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-έδες",
				full: "οι καφέδες",
				english: "the coffees",
			},
			{
				case: "Acc",
				article: "τους",
				ending: "-έδες",
				full: "τους καφέδες",
				english: "the coffees (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-έδων",
				full: "των καφέδων",
				english: "of the coffees",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-έδες",
				full: "καφέδες!",
				english: "Coffees!",
			},
		],
	},

	// ============================================================================
	// FEMININE PATTERNS
	// ============================================================================
	{
		id: "fem-a",
		gender: "feminine",
		pattern: "-α",
		title: "Feminine -α words",
		example: "γυναίκα (woman/wife)",
		frequency: "very common",
		tip: "Vocative = Nominative for feminine nouns",
		forms: [
			{
				case: "Nom",
				article: "η",
				ending: "-α",
				full: "η γυναίκα",
				english: "the woman",
			},
			{
				case: "Acc",
				article: "τη(ν)",
				ending: "-α",
				full: "τη γυναίκα",
				english: "the woman (object)",
			},
			{
				case: "Gen",
				article: "της",
				ending: "-ας",
				full: "της γυναίκας",
				english: "of the woman",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-α",
				full: "γυναίκα!",
				english: "Woman!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-ες",
				full: "οι γυναίκες",
				english: "the women",
			},
			{
				case: "Acc",
				article: "τις",
				ending: "-ες",
				full: "τις γυναίκες",
				english: "the women (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ων",
				full: "των γυναικών",
				english: "of the women",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ες",
				full: "γυναίκες!",
				english: "Women!",
			},
		],
	},
	{
		id: "fem-i",
		gender: "feminine",
		pattern: "-η",
		title: "Feminine -η words",
		example: "ζωή (life)",
		frequency: "very common",
		tip: "Vocative = Nominative for feminine nouns",
		forms: [
			{
				case: "Nom",
				article: "η",
				ending: "-η",
				full: "η ζωή",
				english: "the life",
			},
			{
				case: "Acc",
				article: "τη(ν)",
				ending: "-η",
				full: "τη ζωή",
				english: "the life (object)",
			},
			{
				case: "Gen",
				article: "της",
				ending: "-ης",
				full: "της ζωής",
				english: "of the life",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-η",
				full: "ζωή!",
				english: "Life!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-ές",
				full: "οι ζωές",
				english: "the lives",
			},
			{
				case: "Acc",
				article: "τις",
				ending: "-ές",
				full: "τις ζωές",
				english: "the lives (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ών",
				full: "των ζωών",
				english: "of the lives",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ές",
				full: "ζωές!",
				english: "Lives!",
			},
		],
	},
	{
		id: "fem-si",
		gender: "feminine",
		pattern: "-ση/-ξη",
		title: "Feminine -ση/-ξη words",
		example: "ερώτηση (question)",
		frequency: "common",
		tip: "Action nouns (like English -tion)",
		forms: [
			{
				case: "Nom",
				article: "η",
				ending: "-ση",
				full: "η ερώτηση",
				english: "the question",
			},
			{
				case: "Acc",
				article: "τη(ν)",
				ending: "-ση",
				full: "την ερώτηση",
				english: "the question (object)",
			},
			{
				case: "Gen",
				article: "της",
				ending: "-σης",
				full: "της ερώτησης",
				english: "of the question",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ση",
				full: "ερώτηση!",
				english: "Question!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "οι",
				ending: "-σεις",
				full: "οι ερωτήσεις",
				english: "the questions",
			},
			{
				case: "Acc",
				article: "τις",
				ending: "-σεις",
				full: "τις ερωτήσεις",
				english: "the questions (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-σεων",
				full: "των ερωτήσεων",
				english: "of the questions",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-σεις",
				full: "ερωτήσεις!",
				english: "Questions!",
			},
		],
	},

	// ============================================================================
	// NEUTER PATTERNS
	// ============================================================================
	{
		id: "neut-o",
		gender: "neuter",
		pattern: "-ο",
		title: "Neuter -ο words",
		example: "βιβλίο (book)",
		frequency: "very common",
		tip: "Nom = Acc = Voc (neuter simplification!)",
		forms: [
			{
				case: "Nom",
				article: "το",
				ending: "-ο",
				full: "το βιβλίο",
				english: "the book",
			},
			{
				case: "Acc",
				article: "το",
				ending: "-ο",
				full: "το βιβλίο",
				english: "the book (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-ου",
				full: "του βιβλίου",
				english: "of the book",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ο",
				full: "βιβλίο!",
				english: "Book!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "τα",
				ending: "-α",
				full: "τα βιβλία",
				english: "the books",
			},
			{
				case: "Acc",
				article: "τα",
				ending: "-α",
				full: "τα βιβλία",
				english: "the books (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ων",
				full: "των βιβλίων",
				english: "of the books",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-α",
				full: "βιβλία!",
				english: "Books!",
			},
		],
	},
	{
		id: "neut-i",
		gender: "neuter",
		pattern: "-ι",
		title: "Neuter -ι words",
		example: "παιδί (child)",
		frequency: "common",
		tip: "Nom = Acc = Voc (neuter simplification!)",
		forms: [
			{
				case: "Nom",
				article: "το",
				ending: "-ί",
				full: "το παιδί",
				english: "the child",
			},
			{
				case: "Acc",
				article: "το",
				ending: "-ί",
				full: "το παιδί",
				english: "the child (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-ιού",
				full: "του παιδιού",
				english: "of the child",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ί",
				full: "παιδί!",
				english: "Child!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "τα",
				ending: "-ιά",
				full: "τα παιδιά",
				english: "the children",
			},
			{
				case: "Acc",
				article: "τα",
				ending: "-ιά",
				full: "τα παιδιά",
				english: "the children (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-ιών",
				full: "των παιδιών",
				english: "of the children",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ιά",
				full: "παιδιά!",
				english: "Kids!",
			},
		],
	},
	{
		id: "neut-ma",
		gender: "neuter",
		pattern: "-μα",
		title: "Neuter -μα words",
		example: "όνομα (name)",
		frequency: "common",
		tip: "Ancient Greek pattern, Nom = Acc = Voc",
		forms: [
			{
				case: "Nom",
				article: "το",
				ending: "-μα",
				full: "το όνομα",
				english: "the name",
			},
			{
				case: "Acc",
				article: "το",
				ending: "-μα",
				full: "το όνομα",
				english: "the name (object)",
			},
			{
				case: "Gen",
				article: "του",
				ending: "-ματος",
				full: "του ονόματος",
				english: "of the name",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-μα",
				full: "όνομα!",
				english: "Name!",
			},
		],
		pluralForms: [
			{
				case: "Nom",
				article: "τα",
				ending: "-ματα",
				full: "τα ονόματα",
				english: "the names",
			},
			{
				case: "Acc",
				article: "τα",
				ending: "-ματα",
				full: "τα ονόματα",
				english: "the names (object)",
			},
			{
				case: "Gen",
				article: "των",
				ending: "-μάτων",
				full: "των ονομάτων",
				english: "of the names",
			},
			{
				case: "Voc",
				article: "—",
				ending: "-ματα",
				full: "ονόματα!",
				english: "Names!",
			},
		],
	},
];

// Agreement mistakes - common errors learners make
export interface AgreementMistake {
	wrong: string;
	correct: string;
	explanation: string;
	category: "gender" | "case" | "number";
}

export const AGREEMENT_MISTAKES: AgreementMistake[] = [
	// Gender mismatches
	{
		wrong: "τα άνθρωπο",
		correct: "τον άνθρωπο",
		explanation:
			"Gender mismatch: άνθρωπος is masculine, use τον (not τα which is neuter plural)",
		category: "gender",
	},
	{
		wrong: "ο μητέρα μου",
		correct: "η μητέρα μου",
		explanation:
			"Gender mismatch: μητέρα is feminine, use η (not ο which is masculine)",
		category: "gender",
	},
	{
		wrong: "η βιβλίο",
		correct: "το βιβλίο",
		explanation:
			"Gender mismatch: βιβλίο is neuter, use το (not η which is feminine)",
		category: "gender",
	},

	// Case mismatches
	{
		wrong: "βλέπω ο πατέρας",
		correct: "βλέπω τον πατέρα",
		explanation:
			"Case mismatch: object of verb needs accusative (τον πατέρα), not nominative (ο πατέρας)",
		category: "case",
	},
	{
		wrong: "θέλω ο καφές",
		correct: "θέλω τον καφέ",
		explanation:
			"Case mismatch: 'I want' takes accusative object (τον καφέ), not nominative (ο καφές)",
		category: "case",
	},
	{
		wrong: "το σπίτι ο Νίκος",
		correct: "το σπίτι του Νίκου",
		explanation:
			"Case mismatch: possession needs genitive (του Νίκου = of Nikos), not nominative",
		category: "case",
	},

	// Number mismatches
	{
		wrong: "οι παιδί",
		correct: "τα παιδιά",
		explanation:
			"Number mismatch: plural needs τα παιδιά (not οι which is masc/fem plural)",
		category: "number",
	},
	{
		wrong: "το βιβλία",
		correct: "τα βιβλία",
		explanation:
			"Number mismatch: plural nouns need plural article τα (not το which is singular)",
		category: "number",
	},
];

// Quick reference: article endings by gender/case/number
// Note: Vocative has no article (use "—" to indicate this)
export const ARTICLE_AGREEMENT_QUICK_REF = {
	singular: {
		masculine: { nom: "ο", acc: "τον", gen: "του", voc: "—" },
		feminine: { nom: "η", acc: "τη(ν)", gen: "της", voc: "—" },
		neuter: { nom: "το", acc: "το", gen: "του", voc: "—" },
	},
	plural: {
		masculine: { nom: "οι", acc: "τους", gen: "των", voc: "—" },
		feminine: { nom: "οι", acc: "τις", gen: "των", voc: "—" },
		neuter: { nom: "τα", acc: "τα", gen: "των", voc: "—" },
	},
};
