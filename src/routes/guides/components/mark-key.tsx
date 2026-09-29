import { cn } from "tailwind-variants";

import { GrammarMark } from "@/components/GrammarMark";

/** How to read the marks, shown near the top of any guide that uses them. */
export const MarkKey = ({ panelClass }: { panelClass: string }) => (
	<aside aria-label="How to read the marks" className={cn("rounded-lg border p-4", panelClass)}>
		<p className="mb-3 text-sm font-semibold text-stone-800">Reading the marks</p>
		<dl className="flex flex-wrap items-end gap-x-6 gap-y-3 text-sm">
			<div>
				<dt>
					<GrammarMark case="nominative">ο</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">Doer</dd>
			</div>
			<div>
				<dt>
					<GrammarMark case="accusative">τον</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">Target</dd>
			</div>
			<div>
				<dt>
					<GrammarMark case="genitive">του</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">Owner</dd>
			</div>
			<div>
				<dt>
					<GrammarMark case="nominative" plural>
						οι
					</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">two lines: more than one</dd>
			</div>
			<div>
				<dt>
					<GrammarMark case="nominative" gender="masculine">
						ο
					</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">masculine</dd>
			</div>
			<div>
				<dt>
					<GrammarMark case="nominative" gender="feminine">
						η
					</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">feminine</dd>
			</div>
			<div>
				<dt>
					<GrammarMark case="nominative" gender="neuter">
						το
					</GrammarMark>
				</dt>
				<dd className="mt-1 text-xs text-stone-600">neuter</dd>
			</div>
		</dl>
	</aside>
);
