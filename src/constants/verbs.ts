export interface VerbConjugation {
	person: string;
	form: string;
	highlighted?: string;
	english: string;
}

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
};

// Past and Future Tense Examples for Other Tenses page
export const PAST_TENSE_EXAMPLES: VerbConjugation[] = [
	{ person: "εγώ", form: "έκανα", english: "I did/made" },
	{ person: "εσύ", form: "έκανες", english: "you did/made" },
	{ person: "αυτός/ή/ό", form: "έκανε", english: "he/she/it did/made" },
	{ person: "εμείς", form: "κάναμε", english: "we did/made" },
	{ person: "εσείς", form: "κάνατε", english: "you (pl) did/made" },
	{ person: "αυτοί/ές/ά", form: "έκαναν", english: "they did/made" },
];

export const FUTURE_TENSE_EXAMPLES: VerbConjugation[] = [
	{ person: "εγώ", form: "θα κάνω", english: "I will do/make" },
	{ person: "εσύ", form: "θα κάνεις", english: "you will do/make" },
	{ person: "αυτός/ή/ό", form: "θα κάνει", english: "he/she/it will do/make" },
	{ person: "εμείς", form: "θα κάνουμε", english: "we will do/make" },
	{ person: "εσείς", form: "θα κάνετε", english: "you (pl) will do/make" },
	{ person: "αυτοί/ές/ά", form: "θα κάνουν", english: "they will do/make" },
];
