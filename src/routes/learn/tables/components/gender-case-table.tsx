import { markedCell } from "@/lib/guide-marks";
import { type Gender, type GrammaticalNumber, type NominalCase, genders, grammaticalNumbers } from "@/server/db/enums";
import type { GuideTable as GuideTableData } from "@/types/guide";

export const CASE_ORDER: readonly NominalCase[] = ["nominative", "accusative", "genitive"];

/** The guides' row labels: one Doer, Target, Owner, then several. */
export const CASE_LABEL: Record<GrammaticalNumber, Record<NominalCase, string>> = {
	singular: { nominative: "Doer", accusative: "Target", genitive: "Owner" },
	plural: { nominative: "Doers", accusative: "Targets", genitive: "Owners" },
};

const capitalise = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

/** Doer, Target and Owner down the side, gender across the top, singular above plural; every form marked. */
export const genderCaseTable = (
	form: (number: GrammaticalNumber, grammaticalCase: NominalCase, gender: Gender) => string | undefined,
): GuideTableData => ({
	columns: [{ label: "Form" }, ...genders.map((gender) => ({ label: capitalise(gender), greek: true }))],
	rows: grammaticalNumbers.flatMap((number) =>
		CASE_ORDER.map((grammaticalCase) => [
			CASE_LABEL[number][grammaticalCase],
			...genders.map((gender) => {
				const text = form(number, grammaticalCase, gender);
				return text ? markedCell(text, grammaticalCase, gender, number === "plural") : "—";
			}),
		]),
	),
});
