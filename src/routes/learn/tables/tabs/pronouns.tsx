import { GrammarTable, type ColumnDef, type RowDef } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import {
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
	type PronounParadigm,
	SUBJECT_PRONOUNS,
} from "@/constants/pronouns";
import { grammaticalNumbers, type GrammaticalNumber } from "@/server/db/enums";

import { NUMBER_LABEL } from "../components/gender-case-table";
import { LookupPage, LookupSection } from "../components/lookup-section";
import { TAUGHT_IN } from "../taught-in.data";

interface PronounColumn extends ColumnDef {
	paradigm: PronounParadigm[];
}

const COLUMNS: PronounColumn[] = [
	{ key: "doer", label: "Doer", paradigm: SUBJECT_PRONOUNS },
	{ key: "target-short", label: "Target, short", paradigm: OBJECT_PRONOUNS },
	{ key: "owner", label: "Owner", paradigm: POSSESSIVE_PRONOUNS },
	{ key: "target-long", label: "Target, long", paradigm: EMPHATIC_PRONOUNS },
];

const THIRD_PERSON_GENDER: Record<string, string> = {
	"3rd m": "masculine",
	"3rd f": "feminine",
	"3rd n": "neuter",
};

/** Plural "they" is one English word for three Greek rows, so those carry their gender beneath. */
const personRows = (number: GrammaticalNumber): RowDef[] =>
	SUBJECT_PRONOUNS.map((row) => ({
		key: row.person,
		label: row[number].english,
		sublabel: number === "plural" ? THIRD_PERSON_GENDER[row.person] : undefined,
	}));

export function PronounsTab() {
	return (
		<LookupPage title="Pronouns">
			<LookupSection
				title="Every pronoun form"
				taughtIn={[TAUGHT_IN.pronounForms, TAUGHT_IN.pronounObjects, TAUGHT_IN.pronounLong]}
			>
				<GrammarTable
					columns={COLUMNS}
					rowHeaderLabel="Person"
					groups={grammaticalNumbers.map((number) => ({
						label: NUMBER_LABEL[number],
						rows: personRows(number),
						cells: SUBJECT_PRONOUNS.map((_, index) =>
							COLUMNS.map((column) => (
								<GreekText key={column.key} size="base" weight="medium">
									{column.paradigm[index]?.[number].greek ?? "—"}
								</GreekText>
							)),
						),
					}))}
				/>
			</LookupSection>
		</LookupPage>
	);
}
