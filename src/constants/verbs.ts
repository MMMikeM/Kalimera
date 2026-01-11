export interface VerbConjugation {
	person: string;
	form: string;
	highlighted?: string;
	english: string;
}

export interface VerbForm {
	stem: string;
	ending: string;
}

export interface UsageExample {
	greek: string;
	english: string;
}

export type VerbConjugationKey =
	| "kano"
	| "milao"
	| "erhomai"
	| "thymamai"
	| "pao"
	| "leo"
	| "troo"
	| "eimai"
	| "echo"
	| "thelo"
	| "boro";

export interface VerbFamilyConfig {
	id: string;
	displayName: string;
	shortName: string;
	description: string;
	colorScheme: "ocean" | "terracotta" | "olive" | "honey";
	patternKey: "active" | "contracted" | "deponent" | null;
	conjugationKey: VerbConjugationKey | null;
}

export const VERB_FAMILIES: Record<string, VerbFamilyConfig> = {
	"-ω": {
		id: "-ω",
		displayName: "-ω verbs (active)",
		shortName: "-ω verbs",
		description: "The main pattern — 80% of verbs work this way",
		colorScheme: "ocean",
		patternKey: "active",
		conjugationKey: "kano",
	},
	"-άω/-ώ": {
		id: "-άω/-ώ",
		displayName: "-άω verbs (contracted)",
		shortName: "-άω verbs",
		description: "Same idea, different rhythm",
		colorScheme: "terracotta",
		patternKey: "contracted",
		conjugationKey: "milao",
	},
	"-ομαι": {
		id: "-ομαι",
		displayName: "-ομαι verbs (deponent)",
		shortName: "-ομαι verbs",
		description: "Look passive, mean active",
		colorScheme: "olive",
		patternKey: "deponent",
		conjugationKey: "erhomai",
	},
	"-άμαι": {
		id: "-άμαι",
		displayName: "-άμαι verbs (deponent)",
		shortName: "-άμαι verbs",
		description: "Look passive, mean active",
		colorScheme: "olive",
		patternKey: "deponent",
		conjugationKey: "thymamai",
	},
	deponent: {
		id: "deponent",
		displayName: "-μαι verbs (deponent)",
		shortName: "-μαι verbs",
		description: "Look passive, mean active",
		colorScheme: "olive",
		patternKey: "deponent",
		conjugationKey: "erhomai",
	},
	irregular: {
		id: "irregular",
		displayName: "Irregular",
		shortName: "Irregular",
		description: "Memorise these — no pattern to follow",
		colorScheme: "honey",
		patternKey: null,
		conjugationKey: null,
	},
} as const;

export interface VerbPattern {
	name: string;
	description: string;
	endings: {
		sg1: string;
		sg2: string;
		sg3: string;
		pl1: string;
		pl2: string;
		pl3: string;
	};
	canonical: {
		stem: string;
		infinitive: string;
		meaning: string;
		forms: {
			sg1: VerbForm;
			sg2: VerbForm;
			sg3: VerbForm;
			pl1: VerbForm;
			pl2: VerbForm;
			pl3: VerbForm;
		};
	};
	samePattern: Array<{ infinitive: string; meaning: string }>;
	usage: UsageExample[];
}

export interface IrregularVerbForms {
	sg1: string;
	sg2: string;
	sg3: string;
	pl1: string;
	pl2: string;
	pl3: string;
}

export interface IrregularVerb {
	infinitive: string;
	meaning: string;
	forms: IrregularVerbForms;
	note?: string;
}

export const VERB_PATTERNS: Record<string, VerbPattern> = {
	active: {
		name: "Standard Active (-ω)",
		description: "Most Greek verbs follow this pattern. Learn the endings once, apply them to thousands of verbs.",
		endings: {
			sg1: "-ω",
			sg2: "-εις",
			sg3: "-ει",
			pl1: "-ουμε",
			pl2: "-ετε",
			pl3: "-ουν",
		},
		canonical: {
			stem: "κάν",
			infinitive: "κάνω",
			meaning: "do, make",
			forms: {
				sg1: { stem: "κάν", ending: "ω" },
				sg2: { stem: "κάν", ending: "εις" },
				sg3: { stem: "κάν", ending: "ει" },
				pl1: { stem: "κάν", ending: "ουμε" },
				pl2: { stem: "κάν", ending: "ετε" },
				pl3: { stem: "κάν", ending: "ουν" },
			},
		},
		samePattern: [
			{ infinitive: "θέλω", meaning: "want" },
			{ infinitive: "έχω", meaning: "have" },
			{ infinitive: "βλέπω", meaning: "see" },
		],
		usage: [
			{ greek: "Τι κάνεις;", english: "How are you? (lit: What do you do?)" },
			{ greek: "Κάνει κρύο.", english: "It's cold. (lit: It makes cold)" },
			{ greek: "Κάνουμε διάλειμμα.", english: "We're taking a break." },
		],
	},
	contracted: {
		name: "Contracted (-άω/-ώ)",
		description: "The α contracts with endings. Two forms exist - both are correct.",
		endings: {
			sg1: "-άω/-ώ",
			sg2: "-άς",
			sg3: "-άει/-ά",
			pl1: "-άμε",
			pl2: "-άτε",
			pl3: "-άνε/-ούν",
		},
		canonical: {
			stem: "μιλ",
			infinitive: "μιλάω",
			meaning: "speak",
			forms: {
				sg1: { stem: "μιλ", ending: "άω" },
				sg2: { stem: "μιλ", ending: "άς" },
				sg3: { stem: "μιλ", ending: "άει" },
				pl1: { stem: "μιλ", ending: "άμε" },
				pl2: { stem: "μιλ", ending: "άτε" },
				pl3: { stem: "μιλ", ending: "άνε" },
			},
		},
		samePattern: [
			{ infinitive: "αγαπάω", meaning: "love" },
			{ infinitive: "ρωτάω", meaning: "ask" },
			{ infinitive: "περνάω", meaning: "pass" },
		],
		usage: [
			{ greek: "Μιλάς ελληνικά;", english: "Do you speak Greek?" },
			{ greek: "Δεν μιλάμε πολύ.", english: "We don't speak much." },
		],
	},
	deponent: {
		name: "Deponent (-μαι)",
		description: "Look passive but have active meaning. Two sub-patterns exist: -ομαι and -άμαι (same vowel contraction as -ω/-άω).",
		endings: {
			sg1: "-ομαι",
			sg2: "-εσαι",
			sg3: "-εται",
			pl1: "-όμαστε",
			pl2: "-εστε",
			pl3: "-ονται",
		},
		canonical: {
			stem: "έρχ",
			infinitive: "έρχομαι",
			meaning: "come",
			forms: {
				sg1: { stem: "έρχ", ending: "ομαι" },
				sg2: { stem: "έρχ", ending: "εσαι" },
				sg3: { stem: "έρχ", ending: "εται" },
				pl1: { stem: "ερχ", ending: "όμαστε" },
				pl2: { stem: "έρχ", ending: "εστε" },
				pl3: { stem: "έρχ", ending: "ονται" },
			},
		},
		samePattern: [
			{ infinitive: "γίνομαι", meaning: "become" },
			{ infinitive: "κάθομαι", meaning: "sit" },
		],
		usage: [
			{ greek: "Έρχομαι αύριο.", english: "I'm coming tomorrow." },
			{ greek: "Πότε έρχεσαι;", english: "When are you coming?" },
			{ greek: "Δεν θυμάμαι.", english: "I don't remember." },
		],
	},
};

export const IRREGULAR_VERBS: IrregularVerb[] = [
	{
		infinitive: "είμαι",
		meaning: "am, is, are",
		forms: {
			sg1: "είμαι",
			sg2: "είσαι",
			sg3: "είναι",
			pl1: "είμαστε",
			pl2: "είστε",
			pl3: "είναι",
		},
		note: "3rd person is the same for singular and plural",
	},
	{
		infinitive: "λέω",
		meaning: "say, tell",
		forms: {
			sg1: "λέω",
			sg2: "λές",
			sg3: "λέει",
			pl1: "λέμε",
			pl2: "λέτε",
			pl3: "λένε",
		},
		note: "\"τα λέμε\" = see you later",
	},
	{
		infinitive: "τρώω",
		meaning: "eat",
		forms: {
			sg1: "τρώω",
			sg2: "τρώς",
			sg3: "τρώει",
			pl1: "τρώμε",
			pl2: "τρώτε",
			pl3: "τρώνε",
		},
	},
	{
		infinitive: "πάω",
		meaning: "go",
		forms: {
			sg1: "πάω",
			sg2: "πάς",
			sg3: "πάει",
			pl1: "πάμε",
			pl2: "πάτε",
			pl3: "πάνε",
		},
		note: "Alternative regular form: πηγαίνω",
	},
];

// VERB_CONJUGATIONS - Data structure expected by components
export const VERB_CONJUGATIONS: Record<string, VerbConjugation[]> = {
	kano: [
		{ person: "εγώ", form: "κάνω", highlighted: "-ω", english: "I do/make" },
		{ person: "εσύ", form: "κάνεις", highlighted: "-εις", english: "you do/make" },
		{ person: "αυτός/ή/ό", form: "κάνει", highlighted: "-ει", english: "he/she/it does/makes" },
		{ person: "εμείς", form: "κάνουμε", highlighted: "-ουμε", english: "we do/make" },
		{ person: "εσείς", form: "κάνετε", highlighted: "-ετε", english: "you (pl) do/make" },
		{ person: "αυτοί/ές/ά", form: "κάνουν", highlighted: "-ουν", english: "they do/make" },
	],
	milao: [
		{ person: "εγώ", form: "μιλάω", highlighted: "-άω", english: "I speak" },
		{ person: "εσύ", form: "μιλάς", highlighted: "-άς", english: "you speak" },
		{ person: "αυτός/ή/ό", form: "μιλάει", highlighted: "-άει", english: "he/she/it speaks" },
		{ person: "εμείς", form: "μιλάμε", highlighted: "-άμε", english: "we speak" },
		{ person: "εσείς", form: "μιλάτε", highlighted: "-άτε", english: "you (pl) speak" },
		{ person: "αυτοί/ές/ά", form: "μιλάνε", highlighted: "-άνε", english: "they speak" },
	],
	erhomai: [
		{ person: "εγώ", form: "έρχομαι", highlighted: "-ομαι", english: "I come" },
		{ person: "εσύ", form: "έρχεσαι", highlighted: "-εσαι", english: "you come" },
		{ person: "αυτός/ή/ό", form: "έρχεται", highlighted: "-εται", english: "he/she/it comes" },
		{ person: "εμείς", form: "ερχόμαστε", highlighted: "-όμαστε", english: "we come" },
		{ person: "εσείς", form: "έρχεστε", highlighted: "-εστε", english: "you (pl) come" },
		{ person: "αυτοί/ές/ά", form: "έρχονται", highlighted: "-ονται", english: "they come" },
	],
	thymamai: [
		{ person: "εγώ", form: "θυμάμαι", highlighted: "-άμαι", english: "I remember" },
		{ person: "εσύ", form: "θυμάσαι", highlighted: "-άσαι", english: "you remember" },
		{ person: "αυτός/ή/ό", form: "θυμάται", highlighted: "-άται", english: "he/she/it remembers" },
		{ person: "εμείς", form: "θυμόμαστε", highlighted: "-όμαστε", english: "we remember" },
		{ person: "εσείς", form: "θυμάστε", highlighted: "-άστε", english: "you (pl) remember" },
		{ person: "αυτοί/ές/ά", form: "θυμούνται", highlighted: "-ούνται", english: "they remember" },
	],
	pao: [
		{ person: "εγώ", form: "πάω", english: "I go" },
		{ person: "εσύ", form: "πας", english: "you go" },
		{ person: "αυτός/ή/ό", form: "πάει", english: "he/she/it goes" },
		{ person: "εμείς", form: "πάμε", english: "we go" },
		{ person: "εσείς", form: "πάτε", english: "you (pl) go" },
		{ person: "αυτοί/ές/ά", form: "πάνε", english: "they go" },
	],
	leo: [
		{ person: "εγώ", form: "λέω", english: "I say" },
		{ person: "εσύ", form: "λες", english: "you say" },
		{ person: "αυτός/ή/ό", form: "λέει", english: "he/she/it says" },
		{ person: "εμείς", form: "λέμε", english: "we say" },
		{ person: "εσείς", form: "λέτε", english: "you (pl) say" },
		{ person: "αυτοί/ές/ά", form: "λένε", english: "they say" },
	],
	troo: [
		{ person: "εγώ", form: "τρώω", english: "I eat" },
		{ person: "εσύ", form: "τρώς", english: "you eat" },
		{ person: "αυτός/ή/ό", form: "τρώει", english: "he/she/it eats" },
		{ person: "εμείς", form: "τρώμε", english: "we eat" },
		{ person: "εσείς", form: "τρώτε", english: "you (pl) eat" },
		{ person: "αυτοί/ές/ά", form: "τρώνε", english: "they eat" },
	],
	eimai: [
		{ person: "εγώ", form: "είμαι", english: "I am" },
		{ person: "εσύ", form: "είσαι", english: "you are" },
		{ person: "αυτός/ή/ό", form: "είναι", english: "he/she/it is" },
		{ person: "εμείς", form: "είμαστε", english: "we are" },
		{ person: "εσείς", form: "είστε", english: "you (pl) are" },
		{ person: "αυτοί/ές/ά", form: "είναι", english: "they are" },
	],
	echo: [
		{ person: "εγώ", form: "έχω", english: "I have" },
		{ person: "εσύ", form: "έχεις", english: "you have" },
		{ person: "αυτός/ή/ό", form: "έχει", english: "he/she/it has" },
		{ person: "εμείς", form: "έχουμε", english: "we have" },
		{ person: "εσείς", form: "έχετε", english: "you (pl) have" },
		{ person: "αυτοί/ές/ά", form: "έχουν", english: "they have" },
	],
	thelo: [
		{ person: "εγώ", form: "θέλω", english: "I want" },
		{ person: "εσύ", form: "θέλεις", english: "you want" },
		{ person: "αυτός/ή/ό", form: "θέλει", english: "he/she/it wants" },
		{ person: "εμείς", form: "θέλουμε", english: "we want" },
		{ person: "εσείς", form: "θέλετε", english: "you (pl) want" },
		{ person: "αυτοί/ές/ά", form: "θέλουν", english: "they want" },
	],
	boro: [
		{ person: "εγώ", form: "μπορώ", english: "I can" },
		{ person: "εσύ", form: "μπορείς", english: "you can" },
		{ person: "αυτός/ή/ό", form: "μπορεί", english: "he/she/it can" },
		{ person: "εμείς", form: "μπορούμε", english: "we can" },
		{ person: "εσείς", form: "μπορείτε", english: "you (pl) can" },
		{ person: "αυτοί/ές/ά", form: "μπορούν", english: "they can" },
	],
};
