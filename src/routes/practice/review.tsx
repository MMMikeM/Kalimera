import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronRight } from "lucide-react";

import { DRILL_CATEGORY_LABELS, DRILL_REGISTRY, type DrillCategory } from "@/constants/drills";
import { requireAuth } from "@/server/auth/session";
import { getSchemaRust } from "@/server/db/queries/analytics/drill-stats";

const getReviewDrillsFn = createServerFn({ method: "GET" }).handler(async () => {
	const { userId } = requireAuth();
	const rust = await getSchemaRust(userId);
	return rust.filter((d) => DRILL_REGISTRY[d.drillId]);
});

export const Route = createFileRoute("/practice/review")({
	loader: () => getReviewDrillsFn(),
	component: ReviewPage,
});

const rustBarWidth = (score: number) => `${Math.min(100, (score / 15) * 100).toFixed(0)}%`;
const rustBarColor = (score: number) =>
	score >= 8 ? "bg-incorrect" : score >= 4 ? "bg-honey" : "bg-olive";

function ReviewPage() {
	const drills = Route.useLoaderData();

	const byCategory = new Map<DrillCategory, typeof drills>();
	for (const d of drills) {
		const meta = DRILL_REGISTRY[d.drillId]!;
		const list = byCategory.get(meta.category) ?? [];
		list.push(d);
		byCategory.set(meta.category, list);
	}

	const categoryOrder: DrillCategory[] = [
		"articles",
		"nouns",
		"adjectives",
		"phrases",
		"verbs",
		"pronouns",
		"blocks",
	];

	return (
		<div className="mx-auto max-w-sm px-4 py-6">
			<Link to="/" className="mb-6 inline-block text-xs text-stone-400 hover:text-stone-600">
				← back
			</Link>
			<h2 className="mb-1 font-serif text-2xl text-navy-text">Review</h2>
			<p className="mb-6 text-sm text-muted-foreground">
				{drills.length === 0
					? "All caught up — nothing to review."
					: `${drills.length} ${drills.length === 1 ? "drill" : "drills"} need attention.`}
			</p>

			{drills.length === 0 ? (
				<div className="rounded-xl border border-olive-200 bg-olive-50 py-10 text-center">
					<p className="greek-text font-serif text-2xl text-olive">Μπράβο!</p>
					<p className="mt-2 text-sm text-stone-500">Come back after some time away.</p>
				</div>
			) : (
				<div className="space-y-8">
					{categoryOrder.map((cat) => {
						const items = byCategory.get(cat);
						if (!items?.length) return null;
						return (
							<section key={cat}>
								<p className="mb-3 text-xs tracking-widest text-stone-400 uppercase">
									{DRILL_CATEGORY_LABELS[cat]}
								</p>
								<div className="space-y-2">
									{items.map((d) => {
										const meta = DRILL_REGISTRY[d.drillId]!;
										return (
											<Link
												key={d.drillId}
												to={meta.route}
												className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-colors hover:border-stone-300 hover:bg-stone-50"
											>
												<div className="min-w-0 flex-1">
													<p className="text-sm font-medium text-stone-800">{meta.label}</p>
													<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
														<div
															className={`h-full rounded-full transition-all ${rustBarColor(d.rustScore)}`}
															style={{ width: rustBarWidth(d.rustScore) }}
														/>
													</div>
													<p className="mt-1 text-xs text-stone-400">
														{d.daysSince < 1
															? "Practiced today"
															: `${Math.floor(d.daysSince)}d ago · ${Math.round(d.recentAccuracy * 100)}% correct`}
													</p>
												</div>
												<ChevronRight className="h-4 w-4 shrink-0 text-stone-300" />
											</Link>
										);
									})}
								</div>
							</section>
						);
					})}
				</div>
			)}
		</div>
	);
}
