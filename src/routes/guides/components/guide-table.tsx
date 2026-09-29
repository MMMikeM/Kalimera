import { cn, tv } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { GuideCell, GuideTable as GuideTableData } from "@/types/guide";

import { GUIDE_TONE } from "./guide-tone";
import { MarkedPhrase } from "./marked-phrase";

// Three weights, so a regular grid still has somewhere for the eye to land: the
// form you would get wrong, the form the rest derive from, and everything else.
const cellText = tv({
	base: "",
	variants: {
		weight: {
			deviate: "font-semibold text-stone-900",
			anchor: "font-medium text-stone-900",
			plain: "text-stone-700",
		},
	},
});

const cellParts = (cell: GuideCell) =>
	typeof cell === "string"
		? { text: cell, weight: "plain" as const, marks: undefined }
		: { text: cell.text, weight: cell.weight ?? ("plain" as const), marks: cell.marks };

export const GuideTable = ({ table }: { table: GuideTableData }) => {
	// A grid of forms is read down its columns, so its cells never wrap; a single
	// Greek column beside its meaning can wrap between words on a narrow screen.
	const isGrid = table.columns.filter((c) => c.greek).length > 1;
	const tint = table.columns.map((c) => (c.tone ? GUIDE_TONE[c.tone] : undefined));
	return (
		// Every cell is padded alike, so a tinted first column needs no special case;
		// the negative margin lines the first column's text up with the prose above.
		<div className="-mx-3 overflow-x-auto">
			<table className="w-full border-collapse text-left">
				<thead>
					<tr className="border-b border-stone-300">
						{table.columns.map((column, i) => (
							<th
								key={column.label}
								scope="col"
								className={cn(
									"px-3 py-2 text-xs font-medium whitespace-nowrap text-stone-600",
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
						<tr key={row.map((cell) => cellParts(cell).text).join("|")} className="border-b border-stone-200">
							{row.map((cell, i) => {
								const { text, weight, marks } = cellParts(cell);
								return (
									<td
										key={table.columns[i]?.label ?? i}
										className={cn("px-3 py-2 align-baseline", tint[i]?.column)}
									>
										{table.columns[i]?.greek ? (
											<MarkedPhrase
												text={text}
												marks={marks}
												size="lg"
												className={cn(isGrid && "whitespace-nowrap", cellText({ weight }))}
											/>
										) : (
											<span className={cn("block min-w-28 text-sm", cellText({ weight }))}>
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
