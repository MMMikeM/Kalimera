import { GrammarTable, type ColumnDef, type RowDef, CASE_ROW_DEFS } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import {
	type Gender,
	type GrammaticalNumber,
	genders,
	type NominalCase,
	grammaticalNumbers,
} from "@/server/db/enums";

const CASE_KEYS: Record<string, NominalCase> = {
	nom: "nominative",
	acc: "accusative",
	gen: "genitive",
};

const GENDER_COLUMNS: ColumnDef[] = genders.map((gender) => ({
	key: gender,
	label: gender.charAt(0).toUpperCase() + gender.slice(1),
}));

export const CASE_ROWS: RowDef[] = CASE_ROW_DEFS.map(({ scheme: _scheme, ...row }) => row);

export const NUMBER_LABEL: Record<GrammaticalNumber, string> = { singular: "Singular", plural: "Plural" };

/** Doer, Target and Owner down the side, gender across the top, singular above plural. */
export const GenderCaseTable = ({
	form,
}: {
	form: (number: GrammaticalNumber, grammaticalCase: NominalCase, gender: Gender) => string;
}) => (
	<GrammarTable
		columns={GENDER_COLUMNS}
		rowHeaderLabel="Job"
		groups={grammaticalNumbers.map((number) => ({
			label: NUMBER_LABEL[number],
			rows: CASE_ROWS,
			cells: CASE_ROWS.map((row) =>
				genders.map((gender) => (
					<GreekText key={gender} size="base" weight="medium">
						{form(number, CASE_KEYS[row.key]!, gender)}
					</GreekText>
				)),
			),
		}))}
	/>
);
