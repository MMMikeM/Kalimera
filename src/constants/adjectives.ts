// Adjective Paradigms
// Shows how adjectives must agree with nouns in gender, case, and number

export interface AdjectiveForm {
	case: "Nom" | "Acc" | "Gen";
	form: string;
	english: string;
}

export interface AdjectiveGenderForms {
	singular: AdjectiveForm[];
	plural: AdjectiveForm[];
}

export interface AdjectiveParadigm {
	id: string;
	pattern: string;
	title: string;
	example: {
		masculine: string;
		feminine: string;
		neuter: string;
		english: string;
	};
	frequency: "very common" | "common" | "less common";
	masculine: AdjectiveGenderForms;
	feminine: AdjectiveGenderForms;
	neuter: AdjectiveGenderForms;
	tip?: string;
}

// The most common adjective pattern: -ος, -η, -ο
export const ADJECTIVE_PARADIGMS: AdjectiveParadigm[] = [
	{
		id: "os-i-o",
		pattern: "-ος, -η, -ο",
		title: "Standard adjectives",
		example: {
			masculine: "καλός",
			feminine: "καλή",
			neuter: "καλό",
			english: "good",
		},
		frequency: "very common",
		tip: "Most adjectives follow this pattern. The masculine looks like -ος nouns, feminine like -η nouns, neuter like -ο nouns.",
		masculine: {
			singular: [
				{ case: "Nom", form: "καλός", english: "good (subject)" },
				{ case: "Acc", form: "καλό", english: "good (object)" },
				{ case: "Gen", form: "καλού", english: "of good / good's" },
			],
			plural: [
				{ case: "Nom", form: "καλοί", english: "good (subjects)" },
				{ case: "Acc", form: "καλούς", english: "good (objects)" },
				{ case: "Gen", form: "καλών", english: "of good" },
			],
		},
		feminine: {
			singular: [
				{ case: "Nom", form: "καλή", english: "good (subject)" },
				{ case: "Acc", form: "καλή", english: "good (object)" },
				{ case: "Gen", form: "καλής", english: "of good / good's" },
			],
			plural: [
				{ case: "Nom", form: "καλές", english: "good (subjects)" },
				{ case: "Acc", form: "καλές", english: "good (objects)" },
				{ case: "Gen", form: "καλών", english: "of good" },
			],
		},
		neuter: {
			singular: [
				{ case: "Nom", form: "καλό", english: "good (subject)" },
				{ case: "Acc", form: "καλό", english: "good (object)" },
				{ case: "Gen", form: "καλού", english: "of good / good's" },
			],
			plural: [
				{ case: "Nom", form: "καλά", english: "good (subjects)" },
				{ case: "Acc", form: "καλά", english: "good (objects)" },
				{ case: "Gen", form: "καλών", english: "of good" },
			],
		},
	},
	{
		id: "os-a-o",
		pattern: "-ος, -α, -ο",
		title: "Adjectives with -α feminine",
		example: {
			masculine: "ωραίος",
			feminine: "ωραία",
			neuter: "ωραίο",
			english: "beautiful/nice",
		},
		frequency: "common",
		tip: "When the stem ends in a vowel or ρ, the feminine uses -α instead of -η.",
		masculine: {
			singular: [
				{ case: "Nom", form: "ωραίος", english: "beautiful (subject)" },
				{ case: "Acc", form: "ωραίο", english: "beautiful (object)" },
				{ case: "Gen", form: "ωραίου", english: "of beautiful" },
			],
			plural: [
				{ case: "Nom", form: "ωραίοι", english: "beautiful (subjects)" },
				{ case: "Acc", form: "ωραίους", english: "beautiful (objects)" },
				{ case: "Gen", form: "ωραίων", english: "of beautiful" },
			],
		},
		feminine: {
			singular: [
				{ case: "Nom", form: "ωραία", english: "beautiful (subject)" },
				{ case: "Acc", form: "ωραία", english: "beautiful (object)" },
				{ case: "Gen", form: "ωραίας", english: "of beautiful" },
			],
			plural: [
				{ case: "Nom", form: "ωραίες", english: "beautiful (subjects)" },
				{ case: "Acc", form: "ωραίες", english: "beautiful (objects)" },
				{ case: "Gen", form: "ωραίων", english: "of beautiful" },
			],
		},
		neuter: {
			singular: [
				{ case: "Nom", form: "ωραίο", english: "beautiful (subject)" },
				{ case: "Acc", form: "ωραίο", english: "beautiful (object)" },
				{ case: "Gen", form: "ωραίου", english: "of beautiful" },
			],
			plural: [
				{ case: "Nom", form: "ωραία", english: "beautiful (subjects)" },
				{ case: "Acc", form: "ωραία", english: "beautiful (objects)" },
				{ case: "Gen", form: "ωραίων", english: "of beautiful" },
			],
		},
	},
	{
		id: "is-ia-i",
		pattern: "-ύς, -ιά, -ύ",
		title: "Short adjectives",
		example: {
			masculine: "βαρύς",
			feminine: "βαριά",
			neuter: "βαρύ",
			english: "heavy",
		},
		frequency: "less common",
		tip: "A smaller group including βαρύς (heavy), ελαφρύς (light), μακρύς (long), φαρδύς (wide).",
		masculine: {
			singular: [
				{ case: "Nom", form: "βαρύς", english: "heavy (subject)" },
				{ case: "Acc", form: "βαρύ", english: "heavy (object)" },
				{ case: "Gen", form: "βαριού", english: "of heavy" },
			],
			plural: [
				{ case: "Nom", form: "βαρείς", english: "heavy (subjects)" },
				{ case: "Acc", form: "βαρείς", english: "heavy (objects)" },
				{ case: "Gen", form: "βαριών", english: "of heavy" },
			],
		},
		feminine: {
			singular: [
				{ case: "Nom", form: "βαριά", english: "heavy (subject)" },
				{ case: "Acc", form: "βαριά", english: "heavy (object)" },
				{ case: "Gen", form: "βαριάς", english: "of heavy" },
			],
			plural: [
				{ case: "Nom", form: "βαριές", english: "heavy (subjects)" },
				{ case: "Acc", form: "βαριές", english: "heavy (objects)" },
				{ case: "Gen", form: "βαριών", english: "of heavy" },
			],
		},
		neuter: {
			singular: [
				{ case: "Nom", form: "βαρύ", english: "heavy (subject)" },
				{ case: "Acc", form: "βαρύ", english: "heavy (object)" },
				{ case: "Gen", form: "βαριού", english: "of heavy" },
			],
			plural: [
				{ case: "Nom", form: "βαριά", english: "heavy (subjects)" },
				{ case: "Acc", form: "βαριά", english: "heavy (objects)" },
				{ case: "Gen", form: "βαριών", english: "of heavy" },
			],
		},
	},
];

// High-frequency adjectives for examples
export const COMMON_ADJECTIVES = [
	{ greek: "καλός", english: "good" },
	{ greek: "κακός", english: "bad" },
	{ greek: "μεγάλος", english: "big/great" },
	{ greek: "μικρός", english: "small" },
	{ greek: "νέος", english: "new/young" },
	{ greek: "παλιός", english: "old" },
	{ greek: "ωραίος", english: "beautiful/nice" },
	{ greek: "άσχημος", english: "ugly" },
	{ greek: "ζεστός", english: "hot/warm" },
	{ greek: "κρύος", english: "cold" },
	{ greek: "γρήγορος", english: "fast" },
	{ greek: "αργός", english: "slow" },
] as const;

// Agreement examples showing adjective + noun combinations
export interface AgreementExample {
	greek: string;
	english: string;
	breakdown: {
		article: string;
		adjective: string;
		noun: string;
	};
	gender: "masculine" | "feminine" | "neuter";
	case: "Nom" | "Acc" | "Gen";
}

export const ADJECTIVE_AGREEMENT_EXAMPLES: AgreementExample[] = [
	// Nominative examples
	{
		greek: "ο καλός φίλος",
		english: "the good friend",
		breakdown: { article: "ο", adjective: "καλός", noun: "φίλος" },
		gender: "masculine",
		case: "Nom",
	},
	{
		greek: "η μεγάλη πόλη",
		english: "the big city",
		breakdown: { article: "η", adjective: "μεγάλη", noun: "πόλη" },
		gender: "feminine",
		case: "Nom",
	},
	{
		greek: "το καινούριο αυτοκίνητο",
		english: "the new car",
		breakdown: { article: "το", adjective: "καινούριο", noun: "αυτοκίνητο" },
		gender: "neuter",
		case: "Nom",
	},
	// Accusative examples
	{
		greek: "τον καλό φίλο",
		english: "the good friend (object)",
		breakdown: { article: "τον", adjective: "καλό", noun: "φίλο" },
		gender: "masculine",
		case: "Acc",
	},
	{
		greek: "την ωραία θάλασσα",
		english: "the beautiful sea",
		breakdown: { article: "την", adjective: "ωραία", noun: "θάλασσα" },
		gender: "feminine",
		case: "Acc",
	},
	{
		greek: "το ζεστό καφέ",
		english: "the hot coffee",
		breakdown: { article: "το", adjective: "ζεστό", noun: "καφέ" },
		gender: "neuter",
		case: "Acc",
	},
	// Genitive examples
	{
		greek: "του καλού φίλου",
		english: "of the good friend",
		breakdown: { article: "του", adjective: "καλού", noun: "φίλου" },
		gender: "masculine",
		case: "Gen",
	},
	{
		greek: "της μεγάλης πόλης",
		english: "of the big city",
		breakdown: { article: "της", adjective: "μεγάλης", noun: "πόλης" },
		gender: "feminine",
		case: "Gen",
	},
	{
		greek: "του νέου σπιτιού",
		english: "of the new house",
		breakdown: { article: "του", adjective: "νέου", noun: "σπιτιού" },
		gender: "neuter",
		case: "Gen",
	},
];

// Common adjective mistakes
export interface AdjectiveMistake {
	wrong: string;
	correct: string;
	explanation: string;
	category: "gender" | "case" | "position";
}

export const ADJECTIVE_MISTAKES: AdjectiveMistake[] = [
	{
		wrong: "ο καλή φίλος",
		correct: "ο καλός φίλος",
		explanation:
			"Gender mismatch: φίλος is masculine, so the adjective needs masculine ending -ος (not feminine -η)",
		category: "gender",
	},
	{
		wrong: "βλέπω τον καλός φίλος",
		correct: "βλέπω τον καλό φίλο",
		explanation:
			"Case mismatch: after a verb (object), use accusative. Both article and adjective drop the -ς",
		category: "case",
	},
	{
		wrong: "η πόλη μεγάλη",
		correct: "η μεγάλη πόλη",
		explanation:
			"Position: adjectives normally come before the noun in Greek (article + adjective + noun)",
		category: "position",
	},
	{
		wrong: "το καλός βιβλίο",
		correct: "το καλό βιβλίο",
		explanation:
			"Gender mismatch: βιβλίο is neuter, so the adjective needs neuter ending -ό (not masculine -ός)",
		category: "gender",
	},
	{
		wrong: "θέλω το κρύο νερό",
		correct: "θέλω το κρύο νερό",
		explanation:
			"This is actually correct! Neuter accusative = nominative, so το κρύο νερό stays the same",
		category: "case",
	},
];

// Quick reference: adjective endings by gender for -ος/-η/-ο pattern
export const ADJECTIVE_ENDINGS_QUICK_REF = {
	singular: {
		masculine: { nom: "-ος", acc: "-ο", gen: "-ου" },
		feminine: { nom: "-η", acc: "-η", gen: "-ης" },
		neuter: { nom: "-ο", acc: "-ο", gen: "-ου" },
	},
	plural: {
		masculine: { nom: "-οι", acc: "-ους", gen: "-ων" },
		feminine: { nom: "-ες", acc: "-ες", gen: "-ων" },
		neuter: { nom: "-α", acc: "-α", gen: "-ων" },
	},
};
