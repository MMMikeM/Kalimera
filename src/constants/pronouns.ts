// Paradigm table structure - shows singular/plural relationship
export interface PronounParadigm {
	person: string;
	singular: { greek: string; english: string };
	plural: { greek: string; english: string };
}

// Object pronouns (weak/clitic forms) - CRITICAL for daily speech
// These go BEFORE the verb!
export const OBJECT_PRONOUNS: PronounParadigm[] = [
	{
		person: "1st",
		singular: { greek: "με", english: "me" },
		plural: { greek: "μας", english: "us" },
	},
	{
		person: "2nd",
		singular: { greek: "σε", english: "you" },
		plural: { greek: "σας", english: "you (pl/formal)" },
	},
	{
		person: "3rd m",
		singular: { greek: "τον", english: "him/it" },
		plural: { greek: "τους", english: "them" },
	},
	{
		person: "3rd f",
		singular: { greek: "την", english: "her/it" },
		plural: { greek: "τις", english: "them" },
	},
	{
		person: "3rd n",
		singular: { greek: "το", english: "it" },
		plural: { greek: "τα", english: "them" },
	},
];

export const OBJECT_PRONOUN_EXAMPLES = [
	{ greek: "με βλέπεις;", english: "do you see me?" },
	{ greek: "σε αγαπώ", english: "I love you" },
	{ greek: "τον ξέρω", english: "I know him" },
	{ greek: "μας περιμένουν", english: "they're waiting for us" },
	{ greek: "σας ευχαριστώ", english: "thank you (formal)" },
];

// Possessive pronouns - go AFTER the noun!
export const POSSESSIVE_PRONOUNS: PronounParadigm[] = [
	{
		person: "1st",
		singular: { greek: "μου", english: "my" },
		plural: { greek: "μας", english: "our" },
	},
	{
		person: "2nd",
		singular: { greek: "σου", english: "your" },
		plural: { greek: "σας", english: "your (pl/formal)" },
	},
	{
		person: "3rd m",
		singular: { greek: "του", english: "his" },
		plural: { greek: "τους", english: "their" },
	},
	{
		person: "3rd f",
		singular: { greek: "της", english: "her" },
		plural: { greek: "τους", english: "their" },
	},
];

export const POSSESSIVE_PRONOUN_EXAMPLES = [
	{ greek: "το σπίτι μου", english: "my house" },
	{ greek: "η μητέρα σου", english: "your mother" },
	{ greek: "ο φίλος του", english: "his friend" },
	{ greek: "το σπίτι μας", english: "our house" },
	{ greek: "τα παιδιά τους", english: "their children" },
];

// Subject pronouns - often omitted because verb endings show person
export const SUBJECT_PRONOUNS: PronounParadigm[] = [
	{
		person: "1st",
		singular: { greek: "εγώ", english: "I" },
		plural: { greek: "εμείς", english: "we" },
	},
	{
		person: "2nd",
		singular: { greek: "εσύ", english: "you" },
		plural: { greek: "εσείς", english: "you (pl/formal)" },
	},
	{
		person: "3rd m",
		singular: { greek: "αυτός", english: "he" },
		plural: { greek: "αυτοί", english: "they" },
	},
	{
		person: "3rd f",
		singular: { greek: "αυτή", english: "she" },
		plural: { greek: "αυτές", english: "they" },
	},
	{
		person: "3rd n",
		singular: { greek: "αυτό", english: "it" },
		plural: { greek: "αυτά", english: "they" },
	},
];

export const SUBJECT_PRONOUN_EXAMPLES = [
	{ greek: "(εγώ) μιλάω", english: "I speak", note: "pronoun optional" },
	{ greek: "αυτός μιλάει", english: "he speaks", note: "for emphasis/clarity" },
	{ greek: "(εμείς) μιλάμε", english: "we speak", note: "pronoun optional" },
];

// Emphatic/Strong pronouns - used after prepositions
export const EMPHATIC_PRONOUNS: PronounParadigm[] = [
	{
		person: "1st",
		singular: { greek: "εμένα/μένα", english: "me" },
		plural: { greek: "εμάς/μας", english: "us" },
	},
	{
		person: "2nd",
		singular: { greek: "εσένα/σένα", english: "you" },
		plural: { greek: "εσάς/σας", english: "you (pl/formal)" },
	},
	{
		person: "3rd m",
		singular: { greek: "αυτόν", english: "him" },
		plural: { greek: "αυτούς", english: "them" },
	},
	{
		person: "3rd f",
		singular: { greek: "αυτήν/αυτή", english: "her" },
		plural: { greek: "αυτές", english: "them" },
	},
	{
		person: "3rd n",
		singular: { greek: "αυτό", english: "it" },
		plural: { greek: "αυτά", english: "them" },
	},
];

export const EMPHATIC_PRONOUN_EXAMPLES = [
	{ greek: "για μένα", english: "for me" },
	{ greek: "με σένα", english: "with you" },
	{ greek: "για αυτόν", english: "for him" },
	{ greek: "για μας", english: "for us" },
	{ greek: "για αυτό", english: "that's why / for this reason" },
];

// Key patterns to understand
export const PRONOUN_PATTERNS = {
	objectWordOrder: {
		title: "Object pronouns go BEFORE the verb",
		wrong: "Βλέπω σε",
		correct: "Σε βλέπω",
		english: "I see you",
		explanation: "Unlike English, the object pronoun comes first",
	},
	possessiveWordOrder: {
		title: "Possessives go AFTER the noun",
		wrong: "μου σπίτι",
		correct: "το σπίτι μου",
		english: "my house",
		explanation: "Always: article + noun + possessive",
	},
	doubleObject: {
		title: "Double object pattern",
		examples: [
			{ greek: "δώσε μου το", english: "give it to me", literal: "give me it" },
			{ greek: "πες μου το", english: "tell it to me", literal: "tell me it" },
			{ greek: "φέρε μου το", english: "bring it to me", literal: "bring me it" },
		],
		explanation: "Indirect object (μου) comes before direct object (το)",
	},
	formalYou: {
		title: "Formal 'you' = plural forms",
		examples: [
			{ greek: "σας ευχαριστώ", english: "thank you (formal)" },
			{ greek: "σας παρακαλώ", english: "please (formal)" },
			{ greek: "η γνώμη σας", english: "your opinion (formal)" },
		],
		explanation: "Use σας/εσάς with people you don't know well, elders, or in formal situations",
	},
};

// Common phrases using pronouns - for family context
export const PRONOUN_PHRASES = [
	{ greek: "πες μου", english: "tell me", category: "requests" },
	{ greek: "δώσε μου", english: "give me", category: "requests" },
	{ greek: "περίμενέ με", english: "wait for me", category: "requests" },
	{ greek: "βοήθησέ με", english: "help me", category: "requests" },
	{ greek: "άκουσέ με", english: "listen to me", category: "requests" },
	{ greek: "μ' αρέσει", english: "I like it", category: "opinions" },
	{ greek: "δε μ' αρέσει", english: "I don't like it", category: "opinions" },
	{ greek: "μου φαίνεται", english: "it seems to me", category: "opinions" },
	{ greek: "τι σου φαίνεται;", english: "what do you think?", category: "questions" },
	{ greek: "πώς σε λένε;", english: "what's your name?", category: "questions" },
	{ greek: "με λένε...", english: "my name is... (they call me)", category: "answers" },
	{ greek: "σ' αγαπώ", english: "I love you", category: "family" },
	{ greek: "μου λείπεις", english: "I miss you", category: "family" },
];
