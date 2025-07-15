import type {
	ConjugationSet,
	VerbConjugation,
	VerbCategory,
} from "../types/greek-reference";

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
