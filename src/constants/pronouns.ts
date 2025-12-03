export interface PronounForm {
	greek: string;
	english: string;
	example: string;
	exampleEnglish: string;
}

// Subject pronouns - often omitted because verb endings show person
export const SUBJECT_PRONOUNS: PronounForm[] = [
	{ greek: "εγώ", english: "I", example: "(εγώ) μιλάω", exampleEnglish: "I speak" },
	{ greek: "εσύ", english: "you", example: "(εσύ) μιλάς", exampleEnglish: "you speak" },
	{ greek: "αυτός", english: "he", example: "αυτός μιλάει", exampleEnglish: "he speaks" },
	{ greek: "αυτή", english: "she", example: "αυτή μιλάει", exampleEnglish: "she speaks" },
	{ greek: "αυτό", english: "it", example: "αυτό είναι", exampleEnglish: "it is" },
	{ greek: "εμείς", english: "we", example: "(εμείς) μιλάμε", exampleEnglish: "we speak" },
	{ greek: "εσείς", english: "you (pl/formal)", example: "(εσείς) μιλάτε", exampleEnglish: "you (pl) speak" },
	{ greek: "αυτοί", english: "they (m)", example: "αυτοί μιλάνε", exampleEnglish: "they speak" },
	{ greek: "αυτές", english: "they (f)", example: "αυτές μιλάνε", exampleEnglish: "they speak" },
	{ greek: "αυτά", english: "they (n)", example: "αυτά είναι", exampleEnglish: "they are" },
];

// Object pronouns (weak/clitic forms) - CRITICAL for daily speech
// These go BEFORE the verb!
export const OBJECT_PRONOUNS: PronounForm[] = [
	{ greek: "με", english: "me", example: "με βλέπεις;", exampleEnglish: "do you see me?" },
	{ greek: "σε", english: "you", example: "σε αγαπώ", exampleEnglish: "I love you" },
	{ greek: "τον", english: "him/it (m)", example: "τον ξέρω", exampleEnglish: "I know him" },
	{ greek: "την", english: "her/it (f)", example: "την βλέπω", exampleEnglish: "I see her" },
	{ greek: "το", english: "it (n)", example: "το θέλω", exampleEnglish: "I want it" },
	{ greek: "μας", english: "us", example: "μας περιμένουν", exampleEnglish: "they're waiting for us" },
	{ greek: "σας", english: "you (pl/formal)", example: "σας ευχαριστώ", exampleEnglish: "thank you" },
	{ greek: "τους", english: "them (m)", example: "τους βλέπω", exampleEnglish: "I see them" },
	{ greek: "τις", english: "them (f)", example: "τις ξέρω", exampleEnglish: "I know them" },
	{ greek: "τα", english: "them (n)", example: "τα θέλω", exampleEnglish: "I want them" },
];

// Possessive pronouns - go AFTER the noun!
// Pattern: article + noun + possessive
export const POSSESSIVE_PRONOUNS: PronounForm[] = [
	{ greek: "μου", english: "my", example: "το σπίτι μου", exampleEnglish: "my house" },
	{ greek: "σου", english: "your", example: "η μητέρα σου", exampleEnglish: "your mother" },
	{ greek: "του", english: "his/its (m)", example: "ο φίλος του", exampleEnglish: "his friend" },
	{ greek: "της", english: "her/its (f)", example: "η αδερφή της", exampleEnglish: "her sister" },
	{ greek: "μας", english: "our", example: "το σπίτι μας", exampleEnglish: "our house" },
	{ greek: "σας", english: "your (pl/formal)", example: "η οικογένειά σας", exampleEnglish: "your family" },
	{ greek: "τους", english: "their", example: "τα παιδιά τους", exampleEnglish: "their children" },
];

// Emphatic/Strong pronouns - used after prepositions
export const EMPHATIC_PRONOUNS: PronounForm[] = [
	{ greek: "εμένα / μένα", english: "me", example: "για μένα", exampleEnglish: "for me" },
	{ greek: "εσένα / σένα", english: "you", example: "με σένα", exampleEnglish: "with you" },
	{ greek: "αυτόν", english: "him", example: "για αυτόν", exampleEnglish: "for him" },
	{ greek: "αυτήν / αυτή", english: "her", example: "με αυτήν", exampleEnglish: "with her" },
	{ greek: "αυτό", english: "it", example: "για αυτό", exampleEnglish: "for it / that's why" },
	{ greek: "εμάς / μας", english: "us", example: "για μας", exampleEnglish: "for us" },
	{ greek: "εσάς / σας", english: "you (pl/formal)", example: "με σας", exampleEnglish: "with you" },
	{ greek: "αυτούς", english: "them (m)", example: "για αυτούς", exampleEnglish: "for them" },
	{ greek: "αυτές", english: "them (f)", example: "με αυτές", exampleEnglish: "with them" },
	{ greek: "αυτά", english: "them (n)", example: "για αυτά", exampleEnglish: "for them" },
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
