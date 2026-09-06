import type React from "react";
import { cn } from "tailwind-variants";

import {
	CASE_ROW_DEFS,
	type ColumnDef,
	GENDER_COLUMN_DEFS,
	GrammarTable,
} from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";
import type { Gender } from "@/server/db/enums";

interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];
const CASES = ["nom", "acc", "gen"] as const;

// Case colour on row headers, gender colour on column chips, cells neutral: the
// reader learns to read a cell as the intersection of its row and column. Colouring
// the cells too would layer both axes on one element and muddy each.
const HERO_GENDER_COLUMNS: ColumnDef[] = GENDERS.map((gender) => {
	const style = SCHEME[GENDER_SCHEME[gender]];
	return {
		key: gender,
		label: (
			<span
				className={cn(
					"inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
					style.badgeBg,
					style.text,
				)}
			>
				<span className="sm:hidden">{gender.charAt(0)}</span>
				<span className="hidden sm:inline">{gender}</span>
			</span>
		),
	};
});

const CaseTable: React.FC<{ label: string; data: GenderData; hero?: boolean }> = ({
	label,
	data,
	hero,
}) => {
	const cells = CASES.map((c) =>
		GENDERS.map((g) =>
			hero ? (
				<GreekText tone="default" size="lg" key={`${c}-${g}`} className="font-semibold">
					{data[g][c]}
				</GreekText>
			) : (
				<GreekText
					tone="default"
					size="sm"
					key={`${c}-${g}`}
					className={`font-semibold ${SCHEME[GENDER_SCHEME[g]].text}`}
				>
					{data[g][c]}
				</GreekText>
			),
		),
	);

	return (
		<div>
			<div
				className={
					hero
						? "mb-3 text-xs font-semibold tracking-widest text-stone-500 uppercase"
						: "mb-2 text-xs font-medium text-stone-600"
				}
			>
				{label}
			</div>
			<div className="overflow-x-auto">
				<GrammarTable
					columns={hero ? HERO_GENDER_COLUMNS : GENDER_COLUMN_DEFS}
					rows={CASE_ROW_DEFS}
					cells={cells}
					density={hero ? "roomy" : "compact"}
				/>
			</div>
		</div>
	);
};

export const CaseTableGrid: React.FC<{
	data: { singular: GenderData; plural: GenderData };
	hero?: boolean;
}> = ({ data, hero }) => (
	<div className={cn("grid gap-4 md:grid-cols-2", hero && "gap-8 md:divide-x md:divide-stone-200")}>
		<CaseTable label="Singular" data={data.singular} hero={hero} />
		<CaseTable label="Plural" data={data.plural} hero={hero} />
	</div>
);
