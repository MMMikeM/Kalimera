import { AGREEMENT_PARADIGMS } from "@/constants/agreement";
import type { NounDeclensionPattern } from "@/db.server/enums";

type Case = "nominative" | "accusative" | "genitive";
type Number = "singular" | "plural";

interface DeclinedForm {
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

const getStemFromLemma = (lemma: string, pattern: NounDeclensionPattern): string => {
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

const TONOS_CHARS = /[άέήίόύώΐΰ]/;
const TONOS_MAP: Record<string, string> = {
	ά: "α", // ά → α
	έ: "ε", // έ → ε
	ή: "η", // ή → η
	ί: "ι", // ί → ι
	ό: "ο", // ό → ο
	ύ: "υ", // ύ → υ
	ώ: "ω", // ώ → ω
	ΐ: "ϊ", // ΐ → ϊ
	ΰ: "ϋ", // ΰ → ϋ
};
const stripTonos = (s: string): string => s.replace(/[άέήίόύώΐΰ]/g, (m) => TONOS_MAP[m] ?? m);

/** Greek allows only one tonos per word. When stem and suffix both carry stress,
 * one must drop. Genitive forms typically shift stress to the suffix; other
 * forms keep stress on the stem. This is a pragmatic approximation — full
 * stress-shift rules per paradigm are out of scope. */
const applyEnding = (stem: string, ending: string, isGenitive = false): string => {
	if (ending === "—") return stem;
	const cleanEnding = ending.startsWith("-") ? ending.slice(1) : ending;

	const stemHasTonos = TONOS_CHARS.test(stem);
	const endingHasTonos = TONOS_CHARS.test(cleanEnding);

	if (stemHasTonos && endingHasTonos) {
		return isGenitive ? stripTonos(stem) + cleanEnding : stem + stripTonos(cleanEnding);
	}
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

type ParadigmForms = (typeof AGREEMENT_PARADIGMS)[0]["forms"];

const _declineNounForms = (
	lemma: string,
	pattern: NounDeclensionPattern,
	getForms: (paradigm: (typeof AGREEMENT_PARADIGMS)[0]) => ParadigmForms,
	number: "singular" | "plural",
): DeclinedForm[] => {
	const paradigm = AGREEMENT_PARADIGMS.find((p) => p.id === pattern);
	if (!paradigm) {
		throw new Error(`Unknown declension pattern: ${pattern}`);
	}

	const stem = getStemFromLemma(lemma, pattern);
	const forms: DeclinedForm[] = [];

	for (const form of getForms(paradigm)) {
		const grammaticalCase = Object.keys(CASE_MAP).find(
			(key) => CASE_MAP[key as Case] === form.case,
		) as Case | undefined;

		if (!grammaticalCase) continue;

		const article = mapArticleForAccusative(form.article);
		const noun = applyEnding(stem, form.ending, grammaticalCase === "genitive");

		forms.push({
			case: grammaticalCase,
			number,
			article,
			noun,
			full: article === "—" ? noun : `${article} ${noun}`,
		});
	}

	return forms;
};

const declineNounSingular = (lemma: string, pattern: NounDeclensionPattern): DeclinedForm[] =>
	_declineNounForms(lemma, pattern, (p) => p.forms, "singular");

const declineNounPlural = (lemma: string, pattern: NounDeclensionPattern): DeclinedForm[] =>
	_declineNounForms(lemma, pattern, (p) => p.pluralForms, "plural");

export const declineNoun = (lemma: string, pattern: NounDeclensionPattern): DeclinedForm[] => {
	const singularForms = declineNounSingular(lemma, pattern);
	const pluralForms = declineNounPlural(lemma, pattern);

	return [...singularForms, ...pluralForms];
};
