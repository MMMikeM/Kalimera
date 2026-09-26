import { Link } from "@tanstack/react-router";

import { GreekText } from "@/components/GreekText";
import { SCHEME } from "@/constants/grammar-palette";
import type { FileRoutesByTo } from "@/routeTree.gen";

/** What a row in a drill list needs. `DrillEntry` satisfies it; so does a
 *  plain link to a sub-group that has no drill of its own. */
export interface DrillLink {
	id: string;
	to: keyof FileRoutesByTo;
	title: string;
	greek: string;
	minutes: number;
}

/** Doer/Target/Owner name a case role; Review mixes them and claims none. */
const PHASE_TINT: Record<string, string> = {
	Doer: `${SCHEME["case-nominative"].text} ${SCHEME["case-nominative"].border}`,
	Target: `${SCHEME["case-accusative"].text} ${SCHEME["case-accusative"].border}`,
	Owner: `${SCHEME["case-genitive"].text} ${SCHEME["case-genitive"].border}`,
	Review: "text-muted-foreground border-border",
};

const DrillList = ({ drills }: { drills: DrillLink[] }) => (
	<ul className="divide-y divide-border">
		{drills.map(({ id, to, greek, title, minutes }) => (
			<li key={id}>
				<Link
					to={to}
					className="flex items-baseline justify-between gap-3 py-3 transition-colors hover:bg-foreground/5"
				>
					<div className="min-w-0 flex-1">
						<div className="mb-0.5 text-sm font-medium text-foreground">{title}</div>
						<GreekText as="p" tone="muted" className="truncate">
							{greek}
						</GreekText>
					</div>
					<span className="shrink-0 text-xs text-muted-foreground tabular-nums">{minutes} min</span>
				</Link>
			</li>
		))}
	</ul>
);

type DrillIndexProps = {
	title: string;
	subtitle?: string;
	backTo?: keyof FileRoutesByTo;
} & (
	| { phases: Array<{ phase: string; drills: DrillLink[] }>; drills?: never }
	| { drills: DrillLink[]; phases?: never }
);

/** A group's index page: its drills as one list, or in labelled phases. */
export function DrillIndex({
	title,
	subtitle,
	backTo = "/practice",
	phases,
	drills,
}: DrillIndexProps) {
	return (
		<div className="mx-auto max-w-2xl">
			<section>
				<Link to={backTo} className="mb-4 inline-block text-xs text-stone-400 hover:text-stone-600">
					← back
				</Link>
				<header className="mb-6">
					<h3 className="font-serif text-2xl font-semibold text-navy-text">{title}</h3>
					{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
				</header>
				<div className="space-y-8">
					{drills && <DrillList drills={drills} />}
					{phases?.map(({ phase, drills }) => (
						<div key={phase}>
							<h4
								className={`mb-2 border-b pb-2 font-sans text-sm font-bold tracking-widest uppercase ${PHASE_TINT[phase] ?? "border-border text-muted-foreground"}`}
							>
								{phase}
							</h4>
							<DrillList drills={drills} />
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
