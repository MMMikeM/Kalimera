import type React from "react";
import {cn, tv } from "tailwind-variants";

import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";

export interface ColumnDef {
	key: string;
	label: React.ReactNode;
	scheme?: GrammarScheme;
}

export interface RowDef {
	key: string;
	label: string;
	sublabel?: string;
	scheme?: GrammarScheme;
	schemeVariant?: "full" | "text" | "border";
}

interface GrammarTableProps {
	columns: ColumnDef[];
	rows: RowDef[];
	cells: React.ReactNode[][];
	scheme?: GrammarScheme;
	density?: "compact" | "roomy";
	/** Paradigm grids read better centred; prose-ish tables stay left. */
	align?: "left" | "center";
	/** Screen-reader name for the empty corner cell above the row headers. */
	rowHeaderLabel?: string;
	className?: string;
}

const grammarTable = tv({
	slots: {
		root: "w-full border-collapse text-sm",
		headerRow: "border-b",
		colHeader: "px-2 py-2 text-left text-xs font-medium text-stone-500",
		bodyRow: "border-b",
		rowHeader: "w-20 border-l-2 py-2 pr-2 pl-2 text-xs font-semibold",
		rowLabel: "block leading-tight",
		rowSublabel: "block text-xs font-normal opacity-70",
		cell: "px-2 py-2",
	},
	variants: {
		align: {
			left: {},
			center: { colHeader: "text-center", cell: "text-center" },
		},
		density: {
			compact: {},
			roomy: {
				colHeader: "px-3 pb-2.5",
				rowHeader: "w-24 py-3 pr-3 pl-3",
				cell: "px-3 py-3",
			},
		},
	},
	defaultVariants: {
		density: "compact",
		align: "left",
	},
});

export const CASE_ROW_DEFS: RowDef[] = [
	{ key: "nom", label: "Doer", sublabel: "Nominative", scheme: "case-nominative" },
	{ key: "acc", label: "Target", sublabel: "Accusative", scheme: "case-accusative" },
	{ key: "gen", label: "Owner", sublabel: "Genitive", scheme: "case-genitive" },
];

export const GENDER_COLUMN_DEFS: ColumnDef[] = [
	{ key: "masculine", label: "M", scheme: "gender-masculine" },
	{ key: "feminine", label: "F", scheme: "gender-feminine" },
	{ key: "neuter", label: "N", scheme: "gender-neuter" },
];

export const GrammarTable: React.FC<GrammarTableProps> = ({
	columns,
	rows,
	cells,
	scheme,
	density,
	align,
	rowHeaderLabel = "Row",
	className,
}) => {
	const { root, headerRow, colHeader, bodyRow, rowHeader, rowLabel, rowSublabel, cell } =
		grammarTable({ density, align });
	const borderColor = scheme ? SCHEME[scheme].border : "border-stone-200";

	return (
		<table className={root({ class: className })}>
			<thead>
				<tr className={headerRow({ class: borderColor })}>
					<th className={colHeader({ class: "w-20" })} scope="col">
						<span className="sr-only">{rowHeaderLabel}</span>
					</th>
					{columns.map((col) => {
						const style = col.scheme ? SCHEME[col.scheme] : null;
						return (
							<th key={col.key} className={colHeader({ class: style?.text })}>
								{col.label}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, ri) => {
					const style = row.scheme ? SCHEME[row.scheme] : null;
					const isLast = ri === rows.length - 1;
					return (
						<tr key={row.key} className={isLast ? "" : bodyRow({ class: borderColor })}>
							<td
								className={rowHeader({
									class: style
										? row.schemeVariant === "text"
											? cn("border-transparent", style.text)
											: row.schemeVariant === "border"
												? cn("border-l-2", style.border, style.text)
												: cn(style.bg, style.border, style.text)
										: "border-transparent text-stone-500 font-normal",
								})}
							>
								<span className={rowLabel()}>{row.label}</span>
								{row.sublabel && <span className={rowSublabel()}>{row.sublabel}</span>}
							</td>
							{(cells[ri] ?? []).map((cellContent, ci) => (
								<td key={columns[ci]?.key ?? ci} className={cell()}>
									{cellContent}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
