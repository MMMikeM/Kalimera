import {
	ADJECTIVE_PARADIGMS,
	type Case,
	type Gender,
	type Num,
	isStemStressed,
} from "@/constants/adjective-agreement";
import type { AdjectiveDeclensionPattern } from "@/server/db/enums";

interface DeclinedAdjectiveForm {
	case: Case;
	number: Num;
	gender: Gender;
	form: string;
}

const CASES: Case[] = ["nominative", "accusative", "genitive"];
const NUMBERS: Num[] = ["singular", "plural"];
const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];

const getStem = (lemma: string, stripChars: number): string =>
	stripChars === 0 ? lemma : lemma.slice(0, -stripChars);

export const declineAdjective = (
	lemma: string,
	pattern: AdjectiveDeclensionPattern,
): DeclinedAdjectiveForm[] => {
	const paradigm = ADJECTIVE_PARADIGMS[pattern];
	const stem = getStem(lemma, paradigm.stripChars);
	const table = isStemStressed(stem) ? paradigm.unstressed : paradigm.stressed;

	const forms: DeclinedAdjectiveForm[] = [];
	for (const c of CASES) {
		for (const n of NUMBERS) {
			for (const g of GENDERS) {
				const suffix = table[c][n][g];
				forms.push({ case: c, number: n, gender: g, form: stem + suffix });
			}
		}
	}
	return forms;
};
