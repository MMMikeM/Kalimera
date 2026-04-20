import type React from "react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";
import { SCHEME, type GrammarScheme } from "@/constants/grammar-palette";

export interface ColumnDef {
	key: string;
	label: string;
	scheme?: GrammarScheme;
}

export interface RowDef {
	key: string;
	label: string;
	sublabel?: string;
	scheme?: GrammarScheme;
}

interface GrammarTableProps {
	columns: ColumnDef[];
	rows: RowDef[];
	cells: React.ReactNode[][];
	className?: string;
}

const grammarTable = tv({
	slots: {
		root: "w-full text-sm border-collapse",
		headerRow: "border-b border-stone-200",
		colHeader: "px-2 py-2 text-left text-xs font-medium text-stone-500",
		bodyRow: "border-b border-stone-100",
		rowHeader: "w-20 border-l-2 py-2 pl-2 pr-2 text-xs font-semibold",
		rowLabel: "block leading-tight",
		rowSublabel: "block text-[10px] font-normal opacity-70",
		cell: "px-2 py-2",
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

export const GrammarTable: React.FC<GrammarTableProps> = ({ columns, rows, cells, className }) => {
	const { root, headerRow, colHeader, bodyRow, rowHeader, rowLabel, rowSublabel, cell } =
		grammarTable();

	return (
		<table className={root({ class: className })}>
			<thead>
				<tr className={headerRow()}>
					<th className={colHeader({ class: "w-20" })} />
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
						<tr key={row.key} className={isLast ? "" : bodyRow()}>
							<td
								className={rowHeader({
									class: style
										? cn(style.bgSoft, style.border, style.text)
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
