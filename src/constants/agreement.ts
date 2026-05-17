// Article-Noun Agreement Paradigms
// Shows how articles and noun endings must match in gender, case, and number

export type Case = "nom" | "acc" | "gen" | "voc";
type Gender = "masculine" | "feminine" | "neuter";

interface AgreementPattern {
	case: Case;
	article: string;
	ending: string;
	full: string;
	english: string;
}

export interface AgreementParadigm {
	id: string;
	gender: Gender;
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
				case: "nom",
				article: "ο",
				ending: "-ος",
				full: "ο φίλος",
				english: "the friend",
			},
			{
				case: "acc",
				article: "τον",
				ending: "-ο",
				full: "τον φίλο",
				english: "the friend (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-ου",
				full: "του φίλου",
				english: "of the friend",
			},
			{
				case: "voc",
				article: "—",
				ending: "-ε",
				full: "φίλε!",
				english: "Friend!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-οι",
				full: "οι φίλοι",
				english: "the friends",
			},
			{
				case: "acc",
				article: "τους",
				ending: "-ους",
				full: "τους φίλους",
				english: "the friends (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ων",
				full: "των φίλων",
				english: "of the friends",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "ο",
				ending: "-ας",
				full: "ο πατέρας",
				english: "the father",
			},
			{
				case: "acc",
				article: "τον",
				ending: "-α",
				full: "τον πατέρα",
				english: "the father (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-α",
				full: "του πατέρα",
				english: "of the father",
			},
			{
				case: "voc",
				article: "—",
				ending: "-α",
				full: "πατέρα!",
				english: "Father!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-ες",
				full: "οι πατέρες",
				english: "the fathers",
			},
			{
				case: "acc",
				article: "τους",
				ending: "-ες",
				full: "τους πατέρες",
				english: "the fathers (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ων",
				full: "των πατέρων",
				english: "of the fathers",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "ο",
				ending: "-ης",
				full: "ο μαθητής",
				english: "the student",
			},
			{
				case: "acc",
				article: "τον",
				ending: "-ή",
				full: "τον μαθητή",
				english: "the student (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-ή",
				full: "του μαθητή",
				english: "of the student",
			},
			{
				case: "voc",
				article: "—",
				ending: "-ή",
				full: "μαθητή!",
				english: "Student!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-ές",
				full: "οι μαθητές",
				english: "the students",
			},
			{
				case: "acc",
				article: "τους",
				ending: "-ές",
				full: "τους μαθητές",
				english: "the students (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ών",
				full: "των μαθητών",
				english: "of the students",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "ο",
				ending: "-ές",
				full: "ο καφές",
				english: "the coffee",
			},
			{
				case: "acc",
				article: "τον",
				ending: "-έ",
				full: "τον καφέ",
				english: "the coffee (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-έ",
				full: "του καφέ",
				english: "of the coffee",
			},
			{
				case: "voc",
				article: "—",
				ending: "-έ",
				full: "καφέ!",
				english: "Coffee!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-έδες",
				full: "οι καφέδες",
				english: "the coffees",
			},
			{
				case: "acc",
				article: "τους",
				ending: "-έδες",
				full: "τους καφέδες",
				english: "the coffees (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-έδων",
				full: "των καφέδων",
				english: "of the coffees",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "η",
				ending: "-α",
				full: "η γυναίκα",
				english: "the woman",
			},
			{
				case: "acc",
				article: "τη(ν)",
				ending: "-α",
				full: "τη γυναίκα",
				english: "the woman (object)",
			},
			{
				case: "gen",
				article: "της",
				ending: "-ας",
				full: "της γυναίκας",
				english: "of the woman",
			},
			{
				case: "voc",
				article: "—",
				ending: "-α",
				full: "γυναίκα!",
				english: "Woman!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-ες",
				full: "οι γυναίκες",
				english: "the women",
			},
			{
				case: "acc",
				article: "τις",
				ending: "-ες",
				full: "τις γυναίκες",
				english: "the women (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ων",
				full: "των γυναικών",
				english: "of the women",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "η",
				ending: "-η",
				full: "η ζωή",
				english: "the life",
			},
			{
				case: "acc",
				article: "τη(ν)",
				ending: "-η",
				full: "τη ζωή",
				english: "the life (object)",
			},
			{
				case: "gen",
				article: "της",
				ending: "-ης",
				full: "της ζωής",
				english: "of the life",
			},
			{
				case: "voc",
				article: "—",
				ending: "-η",
				full: "ζωή!",
				english: "Life!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-ές",
				full: "οι ζωές",
				english: "the lives",
			},
			{
				case: "acc",
				article: "τις",
				ending: "-ές",
				full: "τις ζωές",
				english: "the lives (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ών",
				full: "των ζωών",
				english: "of the lives",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "η",
				ending: "-ση",
				full: "η ερώτηση",
				english: "the question",
			},
			{
				case: "acc",
				article: "τη(ν)",
				ending: "-ση",
				full: "την ερώτηση",
				english: "the question (object)",
			},
			{
				case: "gen",
				article: "της",
				ending: "-σης",
				full: "της ερώτησης",
				english: "of the question",
			},
			{
				case: "voc",
				article: "—",
				ending: "-ση",
				full: "ερώτηση!",
				english: "Question!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "οι",
				ending: "-σεις",
				full: "οι ερωτήσεις",
				english: "the questions",
			},
			{
				case: "acc",
				article: "τις",
				ending: "-σεις",
				full: "τις ερωτήσεις",
				english: "the questions (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-σεων",
				full: "των ερωτήσεων",
				english: "of the questions",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "το",
				ending: "-ο",
				full: "το βιβλίο",
				english: "the book",
			},
			{
				case: "acc",
				article: "το",
				ending: "-ο",
				full: "το βιβλίο",
				english: "the book (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-ου",
				full: "του βιβλίου",
				english: "of the book",
			},
			{
				case: "voc",
				article: "—",
				ending: "-ο",
				full: "βιβλίο!",
				english: "Book!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "τα",
				ending: "-α",
				full: "τα βιβλία",
				english: "the books",
			},
			{
				case: "acc",
				article: "τα",
				ending: "-α",
				full: "τα βιβλία",
				english: "the books (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ων",
				full: "των βιβλίων",
				english: "of the books",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "το",
				ending: "-ί",
				full: "το παιδί",
				english: "the child",
			},
			{
				case: "acc",
				article: "το",
				ending: "-ί",
				full: "το παιδί",
				english: "the child (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-ιού",
				full: "του παιδιού",
				english: "of the child",
			},
			{
				case: "voc",
				article: "—",
				ending: "-ί",
				full: "παιδί!",
				english: "Child!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "τα",
				ending: "-ιά",
				full: "τα παιδιά",
				english: "the children",
			},
			{
				case: "acc",
				article: "τα",
				ending: "-ιά",
				full: "τα παιδιά",
				english: "the children (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-ιών",
				full: "των παιδιών",
				english: "of the children",
			},
			{
				case: "voc",
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
				case: "nom",
				article: "το",
				ending: "-μα",
				full: "το όνομα",
				english: "the name",
			},
			{
				case: "acc",
				article: "το",
				ending: "-μα",
				full: "το όνομα",
				english: "the name (object)",
			},
			{
				case: "gen",
				article: "του",
				ending: "-ματος",
				full: "του ονόματος",
				english: "of the name",
			},
			{
				case: "voc",
				article: "—",
				ending: "-μα",
				full: "όνομα!",
				english: "Name!",
			},
		],
		pluralForms: [
			{
				case: "nom",
				article: "τα",
				ending: "-ματα",
				full: "τα ονόματα",
				english: "the names",
			},
			{
				case: "acc",
				article: "τα",
				ending: "-ματα",
				full: "τα ονόματα",
				english: "the names (object)",
			},
			{
				case: "gen",
				article: "των",
				ending: "-μάτων",
				full: "των ονομάτων",
				english: "of the names",
			},
			{
				case: "voc",
				article: "—",
				ending: "-ματα",
				full: "ονόματα!",
				english: "Names!",
			},
		],
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
} as const satisfies Record<"singular" | "plural", Record<Gender, Record<Case, string>>>;
