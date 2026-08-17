// Core grammatical types for Greek language learning

export type Gender = "masculine" | "feminine" | "neuter";
export type GrammaticalNumber = "singular" | "plural";
export type Case = "nominative" | "genitive" | "accusative" | "vocative";

export type ConjugationFamily = "-ω" | "-άω/-ώ" | "-ομαι" | "-άμαι" | "irregular";

// Definite article lookup table
// Usage: DEFINITE_ARTICLES[gender][number][case]
const DEFINITE_ARTICLES: Record<Gender, Record<GrammaticalNumber, Record<Case, string>>> = {
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

/**
 * ν survives before a vowel and before κ, π, τ, ξ, ψ and the clusters γκ, μπ,
 * ντ, τσ, τζ. It drops before every other consonant. The rule looks at the word
 * immediately after the article, so for "τη μαύρη πόρτα" that is the adjective.
 */
const NU_RETAINING_START = /^(γκ|μπ|ντ|τσ|τζ|[αεηιουωάέήίόύώϊϋΐΰκπτξψ])/;

export const retainsNu = (word: string): boolean => NU_RETAINING_START.test(word.toLowerCase());

/** Article for a specific following word, applying the ν rule to την. */
export const getArticleForWord = (
	gender: Gender,
	number: GrammaticalNumber,
	grammaticalCase: Case,
	word: string,
): string => {
	const article = getArticle(gender, number, grammaticalCase);
	return article === "την" && !retainsNu(word) ? "τη" : article;
};

export const formatNounWithArticle = (
	lemma: string,
	gender: Gender,
	number: GrammaticalNumber = "singular",
	grammaticalCase: Case = "nominative",
): string => {
	const article = getArticle(gender, number, grammaticalCase);
	return article ? `${article} ${lemma}` : lemma;
};
