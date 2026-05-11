import { AGREEMENT_PARADIGMS } from "@/constants/agreement";
import type { NounDeclensionPattern } from "@/server/db/enums";

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
	ά: "α",
	ε: "ε",
	έ: "ε",
	η: "η",
	ή: "η",
	ί: "ι",
	ό: "ο",
	ύ: "υ",
	ώ: "ω",
	ΐ: "ϊ",
	ΰ: "ϋ",
};
const ADD_TONOS_MAP: Record<string, string> = {
	α: "ά",
	ε: "έ",
	η: "ή",
	ι: "ί",
	ο: "ό",
	υ: "ύ",
	ω: "ώ",
};
const stripTonos = (s: string): string => s.replace(/[άέήίόύώΐΰ]/g, (m) => TONOS_MAP[m] ?? m);

/** Add accent to the last vowel of a string (for oxytone forms where stem has no tonos). */
const addTonosToLastVowel = (s: string): string => {
	for (let i = s.length - 1; i >= 0; i--) {
		const ch = s[i];
		const accented = ch ? ADD_TONOS_MAP[ch] : undefined;
		if (accented) return s.slice(0, i) + accented + s.slice(i + 1);
	}
	return s;
};

/** Greek allows only one tonos per word. When stem and suffix both carry stress,
 * one must drop. Genitive forms typically shift stress to the suffix; other
 * forms keep stress on the stem. This is a pragmatic approximation — full
 * stress-shift rules per paradigm are out of scope. */
const applyEnding = (stem: string, ending: string, isGenitive = false): string => {
	if (ending === "—") return stem;
	const cleanEnding = ending.startsWith("-") ? ending.slice(1) : ending;

	const stemHasTonos = TONOS_CHARS.test(stem);
	const endingHasTonos = TONOS_CHARS.test(cleanEnding);

	let result: string;
	if (stemHasTonos && endingHasTonos) {
		result = isGenitive ? stripTonos(stem) + cleanEnding : stem + stripTonos(cleanEnding);
	} else {
		result = stem + cleanEnding;
	}

	// Oxytone nouns: stem has no accent because it was on the stripped ending.
	// Every Greek word must carry exactly one tonos — restore it on the last vowel.
	if (!TONOS_CHARS.test(result) && result.length > 1) {
		return addTonosToLastVowel(result);
	}
	return result;
};

const GREEK_VOWEL_START = /^[αεηιοουωάέήίόύώ]/;

/** Feminine accusative article: τη before consonants, την before vowels. */
const mapArticleForAccusative = (article: string, noun: string): string => {
	if (article === "τη(ν)") {
		return GREEK_VOWEL_START.test(noun) ? "την" : "τη";
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

		const noun = applyEnding(stem, form.ending, grammaticalCase === "genitive");
		const article = mapArticleForAccusative(form.article, noun);

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
