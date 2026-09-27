import type React from "react";
import { cn, tv } from "tailwind-variants";

import { GENDER_SCHEME, type GrammarScheme, SCHEME } from "@/constants/grammar-palette";

export interface ColumnDef {
	key: string;
	label: React.ReactNode;
	scheme?: GrammarScheme;
}

export interface RowDef {
	key: string;
	label: React.ReactNode;
	sublabel?: string;
	scheme?: GrammarScheme;
	schemeVariant?: "full" | "text" | "border";
}

/** A labelled run of body rows, so singular and plural can share one header. */
export interface RowGroup {
	label: string;
	rows: RowDef[];
	cells: React.ReactNode[][];
}

/** A header cell over adjacent columns that share a value, e.g. one gender over two patterns. */
export interface ColumnGroup {
	key: string;
	label: React.ReactNode;
	span: number;
}

type GrammarTableProps = {
	columns: ColumnDef[];
	columnGroups?: ColumnGroup[];
	scheme?: GrammarScheme;
	density?: "compact" | "roomy";
	/** Paradigm grids read better centred; prose-ish tables stay left. */
	align?: "left" | "center";
	/** Screen-reader name for the empty corner cell above the row headers. */
	rowHeaderLabel?: string;
	className?: string;
} & (
	| { rows: RowDef[]; cells: React.ReactNode[][]; groups?: never }
	| { groups: RowGroup[]; rows?: never; cells?: never }
);

const grammarTable = tv({
	slots: {
		root: "w-full border-collapse text-sm",
		headerRow: "border-b",
		colHeader: "px-2 py-2 text-left text-xs font-medium text-stone-500",
		bodyRow: "border-b",
		rowHeader: "w-20 border-l-2 py-2 pr-2 pl-2 text-left text-xs font-semibold",
		rowLabel: "block leading-tight",
		rowSublabel: "block text-xs font-normal",
		cell: "px-2 py-2",
		groupLabel:
			"pt-5 pb-1.5 text-left text-xs font-semibold tracking-widest text-stone-500 uppercase",
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

/** Iterate `CASE_ROW_DEFS`; look one up by key here. */
const CASE_ROW_BY_KEY = {
	nom: { key: "nom", label: "Doer", sublabel: "Nominative", scheme: "case-nominative" },
	acc: { key: "acc", label: "Target", sublabel: "Accusative", scheme: "case-accusative" },
	gen: { key: "gen", label: "Owner", sublabel: "Genitive", scheme: "case-genitive" },
} as const satisfies Record<string, RowDef>;

export const CASE_ROW_DEFS: RowDef[] = Object.values(CASE_ROW_BY_KEY);

export const GENDER_COLUMN_DEFS: ColumnDef[] = [
	{ key: "masculine", label: "M", scheme: GENDER_SCHEME.masculine },
	{ key: "feminine", label: "F", scheme: GENDER_SCHEME.feminine },
	{ key: "neuter", label: "N", scheme: GENDER_SCHEME.neuter },
];

export const GrammarTable: React.FC<GrammarTableProps> = (props) => {
	const { columns, columnGroups, scheme, density, align, rowHeaderLabel = "Row", className } =
		props;
	const {
		root,
		headerRow,
		colHeader,
		bodyRow,
		rowHeader,
		rowLabel,
		rowSublabel,
		cell,
		groupLabel,
	} = grammarTable({ density, align });
	const borderColor = scheme ? SCHEME[scheme].border : "border-stone-200";
	const bodyGroups: Array<{ label?: string; rows: RowDef[]; cells: React.ReactNode[][] }> =
		props.groups ?? [{ rows: props.rows, cells: props.cells }];

	return (
		<table className={root({ class: className })}>
			<thead>
				{columnGroups ? (
					<tr>
						<td className={colHeader({ class: "w-20 pb-0" })} aria-hidden="true" />
						{columnGroups.map((group) => (
							<th
								key={group.key}
								colSpan={group.span}
								scope="colgroup"
								className={colHeader({ class: "pb-0" })}
							>
								{group.label}
							</th>
						))}
					</tr>
				) : null}
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
			{bodyGroups.map(({ label, rows, cells }) => (
				<tbody key={label ?? "rows"}>
					{label ? (
						<tr>
							<th colSpan={columns.length + 1} scope="rowgroup" className={groupLabel()}>
								{label}
							</th>
						</tr>
					) : null}
					{rows.map((row, ri) => {
						const style = row.scheme ? SCHEME[row.scheme] : null;
						const isLast = ri === rows.length - 1;
						return (
							<tr key={row.key} className={isLast ? "" : bodyRow({ class: borderColor })}>
								<th
									scope="row"
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
								</th>
								{(cells[ri] ?? []).map((cellContent, ci) => (
									<td key={columns[ci]?.key ?? ci} className={cell()}>
										{cellContent}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			))}
		</table>
	);
};
