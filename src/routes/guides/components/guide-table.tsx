import { cn, tv } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { GuideCell, GuideTable as GuideTableData } from "@/types/guide";

import { GUIDE_TONE } from "./guide-tone";
import { MarkedPhrase } from "./marked-phrase";

// Three weights a reader can tell apart, so a grid has somewhere for the eye to
// land: the form you would get wrong, the form the rest derive from, and the
// predictable rest, receded. A table that weights nothing stays at full strength.
const cellText = tv({
	base: "",
	variants: {
		weight: {
			deviate: "font-bold text-stone-950",
			anchor: "font-medium text-stone-900",
			receded: "text-stone-600",
			plain: "text-stone-800",
		},
	},
});

const cellParts = (cell: GuideCell, weighted: boolean) => {
	const rest = weighted ? ("receded" as const) : ("plain" as const);
	return typeof cell === "string"
		? { text: cell, weight: rest, marks: undefined }
		: { text: cell.text, weight: cell.weight ?? rest, marks: cell.marks };
};

export const isWeighted = (table: GuideTableData) =>
	table.rows.some((row) => row.some((cell) => typeof cell !== "string" && cell.weight));

export const GuideTable = ({ table }: { table: GuideTableData }) => {
	// A grid of forms is read down its columns, so its cells never wrap; a single
	// Greek column beside its meaning can wrap between words on a narrow screen.
	const isGrid = table.columns.filter((c) => c.greek).length > 1;
	const tint = table.columns.map((c) => (c.tone ? GUIDE_TONE[c.tone] : undefined));
	const weighted = isWeighted(table);
	return (
		// Every cell is padded alike, so a tinted first column needs no special case;
		// the negative margin lines the first column's text up with the prose above.
		// On a phone the card runs edge to edge, and so does the table's scroll.
		<div className="-mx-6 overflow-x-auto pl-4.5 sm:-mx-3 sm:pl-0">
			<table className="w-full border-collapse text-left">
				<thead>
					<tr className="border-b border-stone-300">
						{table.columns.map((column, i) => (
							<th
								key={column.label}
								scope="col"
								className={cn(
									"px-1.5 py-2 text-xs font-medium sm:px-3 whitespace-nowrap text-stone-600",
									tint[i] && ["font-semibold", tint[i].column, tint[i].columnLabel],
								)}
							>
								<ProseWithGreek text={column.label} />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{table.rows.map((row) => (
						<tr key={row.map((cell) => cellParts(cell, weighted).text).join("|")} className="border-b border-stone-200">
							{row.map((cell, i) => {
								const { text, weight, marks } = cellParts(cell, weighted);
								return (
									<td
										key={table.columns[i]?.label ?? i}
										className={cn("px-1.5 py-2 align-baseline sm:px-3", tint[i]?.column)}
									>
										{table.columns[i]?.greek ? (
											<MarkedPhrase
												text={text}
												marks={marks}
												size="inherit"
												className={cn("text-base sm:text-lg", isGrid && "whitespace-nowrap", cellText({ weight }))}
											/>
										) : (
											<span className={cn("block min-w-20 text-sm sm:min-w-28", cellText({ weight }))}>
												<ProseWithGreek text={text} />
											</span>
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
