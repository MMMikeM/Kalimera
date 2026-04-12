import type React from "react";

import { MonoText } from "@/components/MonoText";

interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const CASE_LABELS = { nom: "Nom", acc: "Acc", gen: "Gen" } as const;

export const CaseTable: React.FC<{ label: string; data: GenderData }> = ({ label, data }) => (
	<div>
		<div className="mb-2 text-xs font-medium text-stone-600">{label}</div>
		<table className="w-full text-sm">
			<thead>
				<tr className="border-b border-stone-200">
					<th className="w-12 py-1 pr-2 text-left font-medium text-stone-600" />
					<th className="px-2 py-1 text-left font-medium text-gender-masculine">M</th>
					<th className="px-2 py-1 text-left font-medium text-gender-feminine">F</th>
					<th className="px-2 py-1 text-left font-medium text-gender-neuter">N</th>
				</tr>
			</thead>
			<tbody>
				{(["nom", "acc", "gen"] as const).map((c, i) => (
					<tr key={c} className={i < 2 ? "border-b border-stone-100" : ""}>
						<td className="py-1 pr-2 text-xs text-stone-500">{CASE_LABELS[c]}</td>
						{(["masculine", "feminine", "neuter"] as const).map((g) => (
							<td key={g} className="px-2 py-1">
								<MonoText size="sm">{data[g][c]}</MonoText>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export const CaseTableGrid: React.FC<{ data: { singular: GenderData; plural: GenderData } }> = ({
	data,
}) => (
	<div className="grid gap-4 md:grid-cols-2">
		<CaseTable label="Singular" data={data.singular} />
		<CaseTable label="Plural" data={data.plural} />
	</div>
);
