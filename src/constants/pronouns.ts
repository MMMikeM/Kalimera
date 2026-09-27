import type { CaseName } from "./recognition";

// Form structure with optional shortened/variant form
interface PronounForm {
	greek: string;
	alt?: string; // optional shortened/colloquial variant
	english: string;
}

// Paradigm table structure - shows singular/plural relationship
export interface PronounParadigm {
	person: string;
	singular: PronounForm;
	plural: PronounForm;
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
		plural: { greek: "σας", english: "you (pl.)" },
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
		plural: { greek: "σας", english: "your (pl.)" },
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
	{
		person: "3rd n",
		singular: { greek: "του", english: "its" },
		plural: { greek: "τους", english: "their" },
	},
];

// Note: Neuter singular uses the same form as masculine (του)

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
		plural: { greek: "εσείς", english: "you (pl.)" },
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

// Emphatic/Strong pronouns - used after prepositions
export const EMPHATIC_PRONOUNS: PronounParadigm[] = [
	{
		person: "1st",
		singular: { greek: "εμένα", alt: "μένα", english: "me" },
		plural: { greek: "εμάς", alt: "μας", english: "us" },
	},
	{
		person: "2nd",
		singular: { greek: "εσένα", alt: "σένα", english: "you" },
		plural: { greek: "εσάς", alt: "σας", english: "you (pl.)" },
	},
	{
		person: "3rd m",
		singular: { greek: "αυτόν", english: "him" },
		plural: { greek: "αυτούς", english: "them" },
	},
	{
		person: "3rd f",
		singular: { greek: "αυτήν", alt: "αυτή", english: "her" },
		plural: { greek: "αυτές", english: "them" },
	},
	{
		person: "3rd n",
		singular: { greek: "αυτό", english: "it" },
		plural: { greek: "αυτά", english: "them" },
	},
];

/** An example whose `marked` words carry the case colour; the rest stays neutral. */
interface MarkedExample {
	greek: string;
	marked: string;
	english: string;
}

export interface PronounJob {
	greek: string;
	caseName: CaseName;
	/** The learner handle, plus short or long where two forms share a case. */
	handle: string;
	job: string;
	examples: MarkedExample[];
}

// English "me" does three jobs; Greek gives each its own word. μου is the one that
// surprises: it covers "to me" as well as "my".
export const PRONOUN_JOBS: PronounJob[] = [
	{
		greek: "με",
		caseName: "Accusative",
		handle: "Target · short",
		job: "The action lands on me. It sits right before the verb.",
		examples: [{ greek: "με βλέπει", marked: "με", english: "he sees me" }],
	},
	{
		greek: "μου",
		caseName: "Genitive",
		handle: "Owner",
		job: "“My”, and also “to me”. After a noun it owns; before a verb it receives.",
		examples: [
			{ greek: "το σπίτι μου", marked: "μου", english: "my house" },
			{ greek: "μου λέει", marked: "μου", english: "he tells me" },
		],
	},
	{
		greek: "εμένα",
		caseName: "Accusative",
		handle: "Target · long",
		job: "After a preposition, or when “me” carries the stress.",
		examples: [{ greek: "για εμένα", marked: "εμένα", english: "for me" }],
	},
];

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
	{
		greek: "τι σου φαίνεται;",
		english: "what do you think?",
		category: "questions",
	},
	{
		greek: "πώς σε λένε;",
		english: "what's your name?",
		category: "questions",
	},
	{
		greek: "με λένε...",
		english: "my name is... (they call me)",
		category: "answers",
	},
	{ greek: "σ' αγαπώ", english: "I love you", category: "family" },
	{ greek: "μου λείπεις", english: "I miss you", category: "family" },
];
