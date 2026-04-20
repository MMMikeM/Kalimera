import type React from "react";

import { CASE_ROW_DEFS, GENDER_COLUMN_DEFS, GrammarTable } from "@/components/GrammarTable";
import { MonoText } from "@/components/MonoText";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";
import type { Gender } from "@/db.server/enums";

export interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];
const CASES = ["nom", "acc", "gen"] as const;

export const CaseTable: React.FC<{ label: string; data: GenderData }> = ({ label, data }) => {
	const cells = CASES.map((c) =>
		GENDERS.map((g) => (
			<MonoText size="sm" className={`font-semibold ${SCHEME[GENDER_SCHEME[g]].text}`}>
				{data[g][c]}
			</MonoText>
		)),
	);

	return (
		<div>
			<div className="mb-2 text-xs font-medium text-stone-600">{label}</div>
			<GrammarTable columns={GENDER_COLUMN_DEFS} rows={CASE_ROW_DEFS} cells={cells} />
		</div>
	);
};

export const CaseTableGrid: React.FC<{ data: { singular: GenderData; plural: GenderData } }> = ({
	data,
}) => (
	<div className="grid gap-4 md:grid-cols-2">
		<CaseTable label="Singular" data={data.singular} />
		<CaseTable label="Plural" data={data.plural} />
	</div>
);
