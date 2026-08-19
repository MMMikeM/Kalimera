import type React from "react";

import { CASE_ROW_DEFS, GENDER_COLUMN_DEFS, GrammarTable } from "@/components/GrammarTable";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";
import type { Gender } from "@/server/db/enums";
import { GreekText } from "@/components/GreekText";

interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];
const CASES = ["nom", "acc", "gen"] as const;

const CaseTable: React.FC<{ label: string; data: GenderData }> = ({ label, data }) => {
	const cells = CASES.map((c) =>
		GENDERS.map((g) => (
			<GreekText tone="default" size="sm" key={`${c}-${g}`} className={`font-semibold ${SCHEME[GENDER_SCHEME[g]].text}`}>
				{data[g][c]}
			</GreekText>
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
