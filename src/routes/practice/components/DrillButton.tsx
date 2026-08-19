import { Link } from "@tanstack/react-router";

import type { Drill } from "./group-section";
import { GreekText } from "@/components/GreekText";

export const DrillButton = ({ from, to, greek, title, minutes }: Drill) => (
	<li>
		<Link
			from={from}
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
);
