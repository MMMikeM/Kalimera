import { Link } from "@tanstack/react-router";
import { ChevronRight, Play } from "lucide-react";

import { DRILL_REGISTRY } from "@/constants/drills";
import type { DrillRust } from "@/server/db/queries/practice-attempts";

const MAX_SHOWN = 3;

const rustLabel = (score: number) => {
	if (score >= 8) return "Very rusty";
	if (score >= 4) return "Rusty";
	return "A bit rusty";
};

const rustColor = (score: number) => {
	if (score >= 8) return "text-incorrect";
	if (score >= 4) return "text-honey-text";
	return "text-stone-500";
};

export const PracticeCTA = ({ rustyDrills }: { rustyDrills: DrillRust[] }) => {
	const known = rustyDrills.filter((d) => DRILL_REGISTRY[d.drillId]);
	const shown = known.slice(0, MAX_SHOWN);
	const hasMore = known.length > MAX_SHOWN;

	return (
		<div className="space-y-3">
			<div className="rounded-2xl border-2 border-honey-400 bg-linear-to-br from-honey-100 to-honey-200 p-5 shadow-md">
				<div className="mb-4 flex items-center justify-between">
					<p className="font-serif text-xl text-honey-text">
						{known.length} {known.length === 1 ? "drill" : "drills"} to review
					</p>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-honey-400 text-white shadow-sm">
						<Play className="ml-0.5 h-4 w-4" />
					</div>
				</div>

				<div className="space-y-2">
					{shown.map((drill) => {
						const meta = DRILL_REGISTRY[drill.drillId]!;
						return (
							<Link
								key={drill.drillId}
								to={meta.route}
								className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3 transition-colors hover:bg-white/90"
							>
								<div>
									<p className="text-sm font-medium text-stone-800">{meta.label}</p>
									<p className={`text-xs ${rustColor(drill.rustScore)}`}>
										{rustLabel(drill.rustScore)}
										{drill.daysSince >= 1
											? ` · ${Math.floor(drill.daysSince)}d ago`
											: " · today"}
									</p>
								</div>
								<ChevronRight className="h-4 w-4 text-stone-400" />
							</Link>
						);
					})}
				</div>

				{hasMore && (
					<Link
						to="/practice/review"
						className="mt-3 block rounded-xl bg-honey-300/50 py-2.5 text-center text-sm font-medium text-honey-text transition-colors hover:bg-honey-300/70"
					>
						View all {known.length} drills →
					</Link>
				)}
			</div>
		</div>
	);
};
