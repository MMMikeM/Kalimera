import type React from "react";

import { MonoText } from "@/components/MonoText";
import { CASE_SCHEME, GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";
import type { CaseName } from "@/constants/recognition";
import type { Gender } from "@/db.server/enums";

interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const CASE_LABELS = { nom: "Nom", acc: "Acc", gen: "Gen" } as const;
const CASE_NAME: Record<"nom" | "acc" | "gen", CaseName> = {
	nom: "Nominative",
	acc: "Accusative",
	gen: "Genitive",
};

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];
const GENDER_INITIAL: Record<Gender, string> = {
	masculine: "M",
	feminine: "F",
	neuter: "N",
};

export const CaseTable: React.FC<{ label: string; data: GenderData }> = ({ label, data }) => (
	<div>
		<div className="mb-2 text-xs font-medium text-stone-600">{label}</div>
		<table className="w-full text-sm">
			<thead>
				<tr className="border-b border-stone-200">
					<th className="w-16 py-1 pr-2 text-left" />
					{GENDERS.map((g) => {
						const s = SCHEME[GENDER_SCHEME[g]];
						return (
							<th key={g} className="px-2 py-1 text-left">
								<span
									className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider uppercase ${s.text}`}
								>
									{GENDER_INITIAL[g]}
								</span>
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{(["nom", "acc", "gen"] as const).map((c, i) => {
					const caseStyle = SCHEME[CASE_SCHEME[CASE_NAME[c]]];
					return (
						<tr key={c} className={i < 2 ? "border-b border-stone-100" : ""}>
							<td className="py-1.5 pr-2">
								<span
									className={`mr-6 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider uppercase ${caseStyle.badgeBg} ${caseStyle.text}`}
								>
									{CASE_LABELS[c]}
								</span>
							</td>
							{GENDERS.map((g) => (
								<td key={g} className="px-2 py-1.5">
									<MonoText size="sm" className={`font-semibold ${SCHEME[GENDER_SCHEME[g]].text}`}>
										{data[g][c]}
									</MonoText>
								</td>
							))}
						</tr>
					);
				})}
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
