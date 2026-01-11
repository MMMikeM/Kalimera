// Core grammatical types for Greek language learning

export type Gender = "masculine" | "feminine" | "neuter";
export type GrammaticalNumber = "singular" | "plural";
export type Case = "nominative" | "genitive" | "accusative" | "vocative";

export type ConjugationFamily =
	| "-ω"
	| "-άω/-ώ"
	| "-ομαι"
	| "-άμαι"
	| "irregular";

// Definite article lookup table
// Usage: DEFINITE_ARTICLES[gender][number][case]
export const DEFINITE_ARTICLES: Record<
	Gender,
	Record<GrammaticalNumber, Record<Case, string>>
> = {
	masculine: {
		singular: {
			nominative: "ο",
			genitive: "του",
			accusative: "τον",
			vocative: "",
		},
		plural: {
			nominative: "οι",
			genitive: "των",
			accusative: "τους",
			vocative: "",
		},
	},
	feminine: {
		singular: {
			nominative: "η",
			genitive: "της",
			accusative: "την",
			vocative: "",
		},
		plural: {
			nominative: "οι",
			genitive: "των",
			accusative: "τις",
			vocative: "",
		},
	},
	neuter: {
		singular: {
			nominative: "το",
			genitive: "του",
			accusative: "το",
			vocative: "το",
		},
		plural: {
			nominative: "τα",
			genitive: "των",
			accusative: "τα",
			vocative: "τα",
		},
	},
};

export const getArticle = (
	gender: Gender,
	number: GrammaticalNumber = "singular",
	grammaticalCase: Case = "nominative",
): string => DEFINITE_ARTICLES[gender][number][grammaticalCase];

export const formatNounWithArticle = (
	lemma: string,
	gender: Gender,
	number: GrammaticalNumber = "singular",
	grammaticalCase: Case = "nominative",
): string => {
	const article = getArticle(gender, number, grammaticalCase);
	return article ? `${article} ${lemma}` : lemma;
};
