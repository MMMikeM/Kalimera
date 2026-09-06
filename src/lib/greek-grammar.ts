// Core grammatical types for Greek language learning

import type { GrammaticalCase, GrammaticalNumber, Gender } from "@/server/db/enums";

export type { Gender, GrammaticalNumber } from "@/server/db/enums";
/** Local alias kept for this module's callers; the canonical name is GrammaticalCase. */
export type Case = GrammaticalCase;

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

/** ν survives before a vowel and κ, π, τ, ξ, ψ, γκ, μπ, ντ, τσ, τζ. */
const NU_RETAINING_START = /^(γκ|μπ|ντ|τσ|τζ|[αεηιουωάέήίόύώϊϋΐΰκπτξψ])/;

export const retainsNu = (word: string): boolean => NU_RETAINING_START.test(word.toLowerCase());

/** The rule reads the next word, which may be an adjective: τη μαύρη πόρτα. */
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
