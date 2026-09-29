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
	return (
	<div className="overflow-x-auto">
		<table className="w-full border-collapse text-left">
			<thead>
				<tr className="border-b border-stone-300">
					{table.columns.map((column) => (
						<th
							key={column.label}
							scope="col"
							className={cn(
								"px-3 py-2 text-xs font-medium whitespace-nowrap text-stone-600 first:pl-0",
								column.tone && ["font-semibold", GUIDE_TONE[column.tone].accent],
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
							const tone = table.columns[i]?.tone;
							const className = cn(cellText({ weight }), tone && GUIDE_TONE[tone].accent);
							return (
								<td key={table.columns[i]?.label ?? i} className="px-3 py-2 align-baseline first:pl-0">
									{table.columns[i]?.greek ? (
										<MarkedPhrase
											text={text}
											marks={marks}
											size="lg"
											className={cn(isGrid && "whitespace-nowrap", className)}
										/>
									) : (
										<span className={cn("block min-w-28 text-sm", className)}>
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
