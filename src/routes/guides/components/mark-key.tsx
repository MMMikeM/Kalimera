import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { GrammarMark } from "@/components/GrammarMark";

type MarkProps = ComponentProps<typeof GrammarMark>;

interface KeyRow {
	axis: string;
	entries: { label: string; mark: Omit<MarkProps, "size"> }[];
}

const ROWS: KeyRow[] = [
	{
		axis: "The ends show the job",
		entries: [
			{ label: "Doer", mark: { case: "nominative", children: "ο" } },
			{ label: "Target", mark: { case: "accusative", children: "τον" } },
			{ label: "Owner", mark: { case: "genitive", children: "του" } },
		],
	},
	{
		axis: "The lines show how many",
		entries: [
			{ label: "one", mark: { case: "nominative", children: "ο" } },
			{ label: "more than one", mark: { case: "nominative", plural: true, children: "οι" } },
		],
	},
	{
		axis: "The colour shows the gender",
		entries: [
			{ label: "masculine", mark: { case: "nominative", gender: "masculine", children: "ο" } },
			{ label: "feminine", mark: { case: "nominative", gender: "feminine", children: "η" } },
			{ label: "neuter", mark: { case: "nominative", gender: "neuter", children: "το" } },
		],
	},
];

/** How to read the marks, shown near the top of any guide that uses them. */
export const MarkKey = ({ panelClass }: { panelClass: string }) => (
	<aside aria-label="How to read the marks" className={cn("rounded-lg border p-4 sm:p-5", panelClass)}>
		<p className="mb-4 text-sm font-semibold text-stone-800">Reading the marks</p>
		<dl className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
			{ROWS.map((row) => (
				<div key={row.axis}>
					<dt className="mb-2 text-xs text-stone-600">{row.axis}</dt>
					<dd>
						<ul className="grid grid-cols-3 gap-3">
							{row.entries.map((entry) => (
								<li key={entry.label}>
									<GrammarMark {...entry.mark} size="lg" className="min-w-12" />
									<p className="text-xs text-stone-700">{entry.label}</p>
								</li>
							))}
						</ul>
					</dd>
				</div>
			))}
		</dl>
	</aside>
);
