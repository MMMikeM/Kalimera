import {
	ADJECTIVE_PARADIGMS,
	type Case,
	type Gender,
	isStemStressed,
} from "@/constants/adjective-agreement";
import {
	type AdjectiveDeclensionPattern,
	type GrammaticalNumber,
	genders,
	grammaticalNumbers,
	nominalCases,
} from "@/server/db/enums";

interface DeclinedAdjectiveForm {
	case: Case;
	number: GrammaticalNumber;
	gender: Gender;
	form: string;
}

const TWO_CHAR_ENDING = /(ος|ός|ης|ής|υς|ύς|ες|ές)$/;
const ONE_CHAR_ENDING = /[οόαάηήιίυύ]$/;

/** Strip the citation ending, not a fixed count: άσπρο is cited in the neuter. */
const getStem = (lemma: string, stripChars: number): string => {
	if (stripChars === 0) return lemma;
	if (TWO_CHAR_ENDING.test(lemma)) return lemma.slice(0, -2);
	if (ONE_CHAR_ENDING.test(lemma)) return lemma.slice(0, -1);
	return lemma.slice(0, -stripChars);
};

export const declineAdjective = (
	lemma: string,
	pattern: AdjectiveDeclensionPattern,
): DeclinedAdjectiveForm[] => {
	const paradigm = ADJECTIVE_PARADIGMS[pattern];
	const stem = getStem(lemma, paradigm.stripChars);
	const table = (isStemStressed(stem) && paradigm.unstressed) || paradigm.stressed;

	const forms: DeclinedAdjectiveForm[] = [];
	for (const c of nominalCases) {
		for (const n of grammaticalNumbers) {
			for (const g of genders) {
				const suffix = table[c][n][g];
				forms.push({ case: c, number: n, gender: g, form: stem + suffix });
			}
		}
	}
	return forms;
};
