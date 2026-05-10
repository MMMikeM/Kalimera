import { Link } from "@tanstack/react-router";

import type { FileRoutesByFullPath } from "@/routeTree.gen";

import type { Drill } from "./group-section";

export const DrillButton = ({
	from,
	to,
	greek,
	title,
	minutes,
}: Drill & { from: keyof FileRoutesByFullPath }) => (
	<li>
		<Link
			from={from}
			to={to}
			className="flex items-baseline justify-between gap-3 py-3 transition-colors hover:bg-foreground/5"
		>
			<div className="min-w-0 flex-1">
				<div className="mb-0.5 text-sm font-medium text-foreground">{title}</div>
				<p lang="el" className="greek-text truncate text-muted-foreground">
					{greek}
				</p>
			</div>
			<span className="shrink-0 text-xs text-muted-foreground tabular-nums">{minutes} min</span>
		</Link>
	</li>
);
