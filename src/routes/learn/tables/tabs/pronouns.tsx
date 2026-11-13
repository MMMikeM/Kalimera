import { markedCell } from "@/lib/guide-marks";
import {
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
	type PronounParadigm,
	SUBJECT_PRONOUNS,
} from "@/constants/pronouns";
import { GuideTable } from "@/routes/guides/components/guide-table";
import { type Gender, type GrammaticalCase, grammaticalNumbers } from "@/server/db/enums";
import type { GuideTable as GuideTableData } from "@/types/guide";

import { LookupPage, LookupSection } from "../components/lookup-section";
import { TAUGHT_IN } from "../taught-in.data";

const COLUMNS: { label: string; case: GrammaticalCase; paradigm: PronounParadigm[] }[] = [
	{ label: "Doer", case: "nominative", paradigm: SUBJECT_PRONOUNS },
	{ label: "Target, short", case: "accusative", paradigm: OBJECT_PRONOUNS },
	{ label: "Owner", case: "genitive", paradigm: POSSESSIVE_PRONOUNS },
	{ label: "Target, long", case: "accusative", paradigm: EMPHATIC_PRONOUNS },
];

const THIRD_PERSON_GENDER: Partial<Record<string, Gender>> = {
	"3rd m": "masculine",
	"3rd f": "feminine",
	"3rd n": "neuter",
};

/** Plural "they" is one English word for three Greek rows, so those carry their gender beside it. */
const PRONOUNS: GuideTableData = {
	columns: [{ label: "Who" }, ...COLUMNS.map(({ label }) => ({ label, greek: true }))],
	rows: grammaticalNumbers.flatMap((number) =>
		SUBJECT_PRONOUNS.map((row, index) => {
			const gender = THIRD_PERSON_GENDER[row.person];
			const who = number === "plural" && gender ? `${row[number].english} (${gender})` : row[number].english;
			return [
				who,
				...COLUMNS.map((column) => {
					const greek = column.paradigm[index]?.[number].greek;
					return greek ? markedCell(greek, column.case, gender, number === "plural") : "—";
				}),
			];
		}),
	),
};

export function PronounsTab() {
	return (
		<LookupPage title="Pronouns">
			<LookupSection
				title="Every pronoun form"
				tone="ocean"
				taughtIn={[TAUGHT_IN.pronounForms, TAUGHT_IN.pronounObjects, TAUGHT_IN.pronounLong]}
			>
				<GuideTable table={PRONOUNS} />
			</LookupSection>
		</LookupPage>
	);
}
