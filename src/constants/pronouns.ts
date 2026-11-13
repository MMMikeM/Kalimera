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
