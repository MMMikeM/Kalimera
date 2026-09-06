import type React from "react";

import {
	type ColumnDef,
	GENDER_COLUMN_DEFS,
	GrammarTable,
	type RowDef,
} from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import type { GrammarScheme } from "@/constants/grammar-palette";

/** A row label, then one Greek form per column. */
export interface ParadigmRow {
	label: string;
	forms: readonly string[];
	/** Colours the row label when the row itself names a grammatical role. */
	scheme?: GrammarScheme;
}

interface ParadigmProps {
	columns: readonly ColumnDef[];
	rows: readonly ParadigmRow[];
	/** Small uppercase eyebrow above the grid. */
	caption?: string;
	/** Note beneath the grid. */
	children?: React.ReactNode;
	className?: string;
}

export const Paradigm = ({ columns, rows, caption, children, className }: ParadigmProps) => (
	<div className={`overflow-x-auto ${className ?? ""}`}>
		{caption && (
			<p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">{caption}</p>
		)}
		<GrammarTable
			align="center"
			rowHeaderLabel="Form"
			columns={[...columns]}
			rows={rows.map(
				(r): RowDef => ({ key: r.label, label: r.label, scheme: r.scheme, schemeVariant: "text" }),
			)}
			cells={rows.map((r) =>
				r.forms.map((form, i) => (
					<GreekText key={`${r.label}-${columns[i]?.key ?? i}`}>{form}</GreekText>
				)),
			)}
		/>
		{children && <p className="mt-2 text-xs text-muted-foreground">{children}</p>}
	</div>
);

/** The three genders, in the reserved gender tokens. */
export const GENDER_COLUMNS: readonly ColumnDef[] = GENDER_COLUMN_DEFS.map((c) => ({
	...c,
	label: c.key,
}));

export const NUMBER_COLUMNS: readonly ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];
