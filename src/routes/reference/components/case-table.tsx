import type React from "react";
import { cn } from "tailwind-variants";

import { Card } from "@/components/Card";
import {
	CASE_ROW_DEFS,
	type ColumnDef,
	GENDER_COLUMN_DEFS,
	GrammarTable,
} from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { ARTICLE_AGREEMENT_QUICK_REF } from "@/constants/agreement";
import { GENDER_SCHEME, type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import type { Gender } from "@/server/db/enums";

interface GenderData {
	masculine: { nom: string; acc: string; gen: string };
	feminine: { nom: string; acc: string; gen: string };
	neuter: { nom: string; acc: string; gen: string };
}

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];
const CASES = ["nom", "acc", "gen"] as const;

/** A column header pill in a grammar colour. */
export const HeaderChip: React.FC<{
	scheme: GrammarScheme;
	className?: string;
	children: React.ReactNode;
}> = ({ scheme, className, children }) => (
	<span
		className={cn(
			"inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
			SCHEME[scheme].badgeBg,
			SCHEME[scheme].badgeText,
			className,
		)}
	>
		{children}
	</span>
);

/** Narrow screens get the initial; the full word needs a column wider than a phone gives. */
export const GenderChip: React.FC<{ gender: Gender }> = ({ gender }) => (
	<HeaderChip scheme={GENDER_SCHEME[gender]}>
		<span className="capitalize sm:hidden">{gender.charAt(0)}</span>
		<span className="hidden capitalize sm:inline">{gender}</span>
	</HeaderChip>
);

// Case colour on row headers, gender colour on column chips, cells neutral: the
// reader learns to read a cell as the intersection of its row and column. Colouring
// the cells too would layer both axes on one element and muddy each.
const HERO_GENDER_COLUMNS: ColumnDef[] = GENDERS.map((gender) => ({
	key: gender,
	label: <GenderChip gender={gender} />,
}));

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

export const ArticleParadigm: React.FC = () => (
	<Card variant="bordered" padding="lg">
		<CaseTableGrid data={ARTICLE_AGREEMENT_QUICK_REF} hero />
	</Card>
);
