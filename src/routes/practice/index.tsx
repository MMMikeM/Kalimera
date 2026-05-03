import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { DRILLS, GROUP_META } from "./drills";

interface Section {
	href: string;
	label: string;
	thesis: string;
	count: number;
}

const SECTIONS: Section[] = [
	{
		href: "/practice/cases",
		label: GROUP_META.nominal.label,
		thesis: "Articles, nouns, adjectives — Doer / Target / Owner.",
		count: DRILLS.filter((d) => d.group === "nominal").length,
	},
	{
		href: "/practice/pronouns",
		label: GROUP_META.pronouns.label,
		thesis: "Object forms, possessives, where they sit.",
		count: DRILLS.filter((d) => d.group === "pronouns").length,
	},
	{
		href: "/practice/verbs",
		label: GROUP_META.verbs.label,
		thesis: "Present, past, future, να, commands.",
		count: DRILLS.filter((d) => d.group === "verbs").length,
	},
	{
		href: "/practice/blocks",
		label: GROUP_META.blocks.label,
		thesis: "Survival phrases, numbers, days.",
		count: DRILLS.filter((d) => d.group === "blocks").length,
	},
];

export default function PracticeIndex() {
	return (
		<div className="mx-auto max-w-2xl">
			<ul className="divide-y divide-border">
				{SECTIONS.map((s) => (
					<li key={s.href}>
						<Link
							to={s.href}
							className="flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-muted/50"
						>
							<div className="min-w-0 flex-1">
								<h3 className="mb-1 font-serif text-xl font-semibold text-navy-text">
									{s.label}
								</h3>
								<p className="text-sm text-muted-foreground">{s.thesis}</p>
							</div>
							<div className="flex shrink-0 items-baseline gap-3">
								<span className="text-xs text-muted-foreground tabular-nums">
									{s.count} drills
								</span>
								<ArrowRight size={16} className="text-muted-foreground" />
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
