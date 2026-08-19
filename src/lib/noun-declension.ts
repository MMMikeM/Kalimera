import { AGREEMENT_PARADIGMS } from "@/constants/agreement";
import type { NounDeclensionPattern } from "@/server/db/enums";

import { retainsNu } from "./greek-grammar";
import { typedKeys } from "./object";

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
	nominative: "nom",
	accusative: "acc",
	genitive: "gen",
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
			return lemma.slice(0, -2); // Remove -ση
		case "fem-ksi":
			return lemma.slice(0, -2); // Remove -ξη
		case "fem-psi":
			return lemma.slice(0, -2); // Remove -ψη
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

const TONOS_CHARS = /[άέήίόύώΐΰΆΈΉΊΌΎΏ]/;
const TONOS_MAP: Record<string, string> = {
	Ά: "Α",
	Έ: "Ε",
	Ή: "Η",
	Ί: "Ι",
	Ό: "Ο",
	Ύ: "Υ",
	Ώ: "Ω",
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
const stripTonos = (s: string): string =>
	s.replace(/[άέήίόύώΐΰΆΈΉΊΌΎΏ]/g, (m) => TONOS_MAP[m] ?? m);

const NUCLEUS = /(αι|ει|οι|ου|αυ|ευ|υι|[αεηιουωάέήίόύώΆΈΉΊΌΎΏϊϋΐΰ])/g;

/** Genitive plural -ων pulls stress to the penult: Έλληνας → Ελλήνων. */
const shiftStressToPenult = (phrase: string): string => {
	// Only the head word declines (ουράνιο τόξο).
	const split = phrase.lastIndexOf(" ");
	if (split !== -1) {
		return phrase.slice(0, split + 1) + shiftStressToPenult(phrase.slice(split + 1));
	}

	const word = phrase;
	// Synizesis: an unstressed ι/υ running straight into another vowel is a glide,
	// so ήλιος is ή-λιος and already paroxytone — shifting it would give ηλίου.
	const nuclei = [...word.matchAll(NUCLEUS)].filter(
		(m, i, all) =>
			!(/^[ιυ]$/.test(m[0]!) && all[i + 1]?.index === m.index + 1),
	);
	if (nuclei.length < 2) return word;
	const accentedAt = nuclei.findIndex((m) => TONOS_CHARS.test(m[0]!));
	const penult = nuclei.length - 2;
	if (accentedAt === -1 || accentedAt >= penult) return word;

	const target = nuclei[penult]!;
	const plain = stripTonos(word);
	const index = target.index + target[0]!.length - 1;
	return addTonosToLastVowel(plain.slice(0, index + 1)) + plain.slice(index + 1);
};

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
const applyEnding = (
	stem: string,
	ending: string,
	isGenitive = false,
	stressOnStemFinal = false,
	pattern?: NounDeclensionPattern,
): string => {
	if (ending === "—") return stem;
	const cleanEnding = ending.startsWith("-") ? ending.slice(1) : ending;

	// ερώτηση → ερωτήσεις: stress lands on the stem's final vowel.
	if (stressOnStemFinal) {
		return addTonosToLastVowel(stripTonos(stem)) + cleanEnding;
	}

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

	const shouldShiftToPenult =
		cleanEnding === "ων" ||
		(pattern === "masc-os" && (cleanEnding === "ου" || cleanEnding === "ους"));

	return shouldShiftToPenult ? shiftStressToPenult(result) : result;
};

const mapArticleForAccusative = (article: string, noun: string): string => {
	if (article === "τη(ν)") {
		return retainsNu(noun) ? "την" : "τη";
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
		const grammaticalCase = typedKeys(CASE_MAP).find((key) => CASE_MAP[key] === form.case);

		if (!grammaticalCase) continue;

		const noun = applyEnding(
			stem,
			form.ending,
			grammaticalCase === "genitive",
			form.stressOnStemFinal,
			pattern,
		);
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
