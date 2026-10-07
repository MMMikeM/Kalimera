import { cn } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { GuideCell, GuideTable as GuideTableData } from "@/types/guide";

import { GUIDE_TONE } from "./guide-tone";
import { MarkedPhrase } from "./marked-phrase";

const NOTE_SYMBOLS = ["*", "†", "‡"];

const cellParts = (cell: GuideCell) =>
	typeof cell === "string"
		? { text: cell, marks: undefined, note: undefined }
		: { text: cell.text, marks: cell.marks, note: cell.note };

const NoteMark = ({ note }: { note: number | undefined }) =>
	note === undefined ? null : <sup className="ml-0.5 font-semibold text-stone-900">{NOTE_SYMBOLS[note]}</sup>;

export const GuideTable = ({ table }: { table: GuideTableData }) => {
	// A grid of forms is read down its columns, so its cells never wrap; a single
	// Greek column beside its meaning can wrap between words on a narrow screen.
	const greekColumns = table.columns.filter((c) => c.greek).length;
	const isGrid = greekColumns > 1;
	// Three Greek columns only fit a phone with smaller text and tighter cells.
	const isDense = greekColumns > 2;
	const cellX = isDense ? "px-1 sm:px-3" : "px-1.5 sm:px-3";
	const tint = table.columns.map((c) => (c.tone ? GUIDE_TONE[c.tone] : undefined));
	return (
		<div className="space-y-3">
			{/* Every cell is padded alike, so a tinted first column needs no special case;
			    the negative margin lines the first column's text up with the prose above.
			    On a phone the card runs edge to edge, and so does the table's scroll. */}
			<div className="-mx-6 overflow-x-auto pl-4.5 sm:-mx-3 sm:pl-0">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr className="border-b border-stone-300">
							{table.columns.map((column, i) => (
								<th
									key={column.label}
									scope="col"
									className={cn(
										cellX,
										"py-2 text-xs font-medium whitespace-nowrap text-stone-600",
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
									const { text, marks, note } = cellParts(cell);
									return (
										<td
											key={table.columns[i]?.label ?? i}
											className={cn(cellX, "py-2 align-baseline", tint[i]?.column)}
										>
											{table.columns[i]?.greek ? (
												<span
													className={cn(
														"text-stone-800 sm:text-lg",
														isDense ? "text-sm" : "text-base",
														isGrid && "whitespace-nowrap",
													)}
												>
													<MarkedPhrase text={text} marks={marks} size="inherit" />
													<NoteMark note={note} />
												</span>
											) : (
												<span className={cn("block text-sm text-stone-800 sm:min-w-28", !isDense && "min-w-20")}>
													<ProseWithGreek text={text} />
													<NoteMark note={note} />
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
			{table.notes?.length ? (
				<ul className="max-w-2xl space-y-1 text-sm text-stone-700">
					{table.notes.map((note, i) => (
						<li key={note} className="flex gap-1.5">
							<span className="font-semibold text-stone-900">{NOTE_SYMBOLS[i]}</span>
							<span>
								<ProseWithGreek text={note} />
							</span>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
