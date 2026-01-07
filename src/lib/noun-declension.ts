import { AGREEMENT_PARADIGMS } from "@/constants/agreement";
import type { DeclensionPattern } from "@/db.server/enums";

export type Case = "nominative" | "accusative" | "genitive";
export type Number = "singular" | "plural";

export interface DeclinedForm {
	case: Case;
	number: Number;
	article: string;
	noun: string;
	full: string;
}

const CASE_MAP = {
	nominative: "Nom",
	accusative: "Acc",
	genitive: "Gen",
} as const;

const getStemFromLemma = (
	lemma: string,
	pattern: DeclensionPattern
): string => {
	switch (pattern) {
		case "masc-os":
			return lemma.slice(0, -2); // Remove -ος
		case "masc-as":
			return lemma.slice(0, -2); // Remove -ας
		case "masc-is":
			return lemma.slice(0, -2); // Remove -ης
		case "masc-es":
			return lemma.slice(0, -2); // Remove -ές
		case "fem-a":
			return lemma.slice(0, -1); // Remove -α
		case "fem-i":
			return lemma.slice(0, -1); // Remove -η
		case "fem-si":
			return lemma.slice(0, -2); // Remove -ση or -ξη
		case "neut-o":
			return lemma.slice(0, -1); // Remove -ο
		case "neut-i":
			return lemma.slice(0, -1); // Remove -ί
		case "neut-ma":
			return lemma.slice(0, -2); // Remove -μα
		default: {
			const _exhaustive: never = pattern;
			return _exhaustive;
		}
	}
};

const applyEnding = (stem: string, ending: string): string => {
	// Handle special cases where endings have specific formatting rules
	if (ending === "—") {
		return stem; // Vocative with no article
	}

	// Remove leading dash from ending if present
	const cleanEnding = ending.startsWith("-") ? ending.slice(1) : ending;
	return stem + cleanEnding;
};

const mapArticleForAccusative = (article: string): string => {
	// Handle special case for feminine accusative τη(ν)
	// Remove the parenthetical notation for display
	if (article === "τη(ν)") {
		return "τη";
	}
	return article;
};

const declineNounSingular = (
	lemma: string,
	pattern: DeclensionPattern
): DeclinedForm[] => {
	const paradigm = AGREEMENT_PARADIGMS.find((p) => p.id === pattern);
	if (!paradigm) {
		throw new Error(`Unknown declension pattern: ${pattern}`);
	}

	const stem = getStemFromLemma(lemma, pattern);
	const forms: DeclinedForm[] = [];

	for (const form of paradigm.forms) {
		const grammaticalCase = Object.keys(CASE_MAP).find(
			(key) => CASE_MAP[key as Case] === form.case
		) as Case | undefined;

		if (!grammaticalCase) continue;

		const article = mapArticleForAccusative(form.article);
		const noun = applyEnding(stem, form.ending);

		const fullForm =
			article === "—"
				? noun
				: `${article} ${noun}`;

		forms.push({
			case: grammaticalCase,
			number: "singular",
			article,
			noun,
			full: fullForm,
		});
	}

	return forms;
};

const declineNounPlural = (
	lemma: string,
	pattern: DeclensionPattern
): DeclinedForm[] => {
	const paradigm = AGREEMENT_PARADIGMS.find((p) => p.id === pattern);
	if (!paradigm) {
		throw new Error(`Unknown declension pattern: ${pattern}`);
	}

	const stem = getStemFromLemma(lemma, pattern);
	const forms: DeclinedForm[] = [];

	for (const form of paradigm.pluralForms) {
		const grammaticalCase = Object.keys(CASE_MAP).find(
			(key) => CASE_MAP[key as Case] === form.case
		) as Case | undefined;

		if (!grammaticalCase) continue;

		const article = form.article;
		const noun = applyEnding(stem, form.ending);

		const fullForm =
			article === "—"
				? noun
				: `${article} ${noun}`;

		forms.push({
			case: grammaticalCase,
			number: "plural",
			article,
			noun,
			full: fullForm,
		});
	}

	return forms;
};

export const declineNoun = (
	lemma: string,
	pattern: DeclensionPattern
): DeclinedForm[] => {
	const singularForms = declineNounSingular(lemma, pattern);
	const pluralForms = declineNounPlural(lemma, pattern);

	return [...singularForms, ...pluralForms];
};

export const getNounForm = (
	lemma: string,
	pattern: DeclensionPattern,
	grammaticalCase: Case,
	number: Number
): DeclinedForm | undefined => {
	const allForms = declineNoun(lemma, pattern);
	return allForms.find(
		(form) => form.case === grammaticalCase && form.number === number
	);
};
