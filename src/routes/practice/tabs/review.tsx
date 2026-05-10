import { Link, getRouteApi } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import { DRILL_BY_ID } from "../components/drill-lookup";
import { SimpleListDrill, type SimpleListItem } from "../components/engines/simple-list-drill";

const MIN_ATTEMPTS = 5;
const WEAK_THRESHOLD = 0.85;

const practiceRoute = getRouteApi("/practice/_layout");

export function ReviewTab() {
	const { reviewItems, stats, drillStats } = practiceRoute.useLoaderData();

	const weakDrills = drillStats
		.filter((s) => s.attempts >= MIN_ATTEMPTS && s.accuracy < WEAK_THRESHOLD)
		.map((s) => ({ stat: s, drill: DRILL_BY_ID[s.drillId] }))
		.filter((row): row is { stat: typeof row.stat; drill: NonNullable<typeof row.drill> } =>
			Boolean(row.drill),
		)
		.sort((a, b) => a.stat.accuracy - b.stat.accuracy);

	return (
		<div className="mx-auto max-w-2xl space-y-12">
			<section>
				<header className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
					<h3 className="font-serif text-lg font-semibold text-navy-text">Weakest drills</h3>
					<span className="text-xs text-muted-foreground tabular-nums">last 14 days</span>
				</header>
				{weakDrills.length === 0 ? (
					<p className="py-4 text-sm text-muted-foreground">
						Nothing flagged. Run more drill sessions and weak areas will surface here.
					</p>
				) : (
					<ul className="divide-y divide-border">
						{weakDrills.map(({ stat, drill }) => {
							const pct = Math.round(stat.accuracy * 100);
							return (
								<li key={drill.id}>
									<Link
										to={"."}
										className="flex items-baseline justify-between gap-3 py-3 transition-colors hover:bg-muted/50"
									>
										<div className="min-w-0 flex-1">
											<div className="mb-0.5 text-sm font-medium text-foreground">
												{drill.title}
											</div>
											<p lang="el" className="greek-text truncate text-xs text-muted-foreground">
												{drill.greek}
											</p>
										</div>
										<div className="shrink-0 text-right text-xs text-muted-foreground tabular-nums">
											<div className="text-terracotta">{pct}%</div>
											<div>{stat.attempts} tries</div>
										</div>
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</section>

			<section>
				<header className="mb-3 border-b border-border pb-2">
					<h3 className="font-serif text-lg font-semibold text-navy-text">Vocabulary review</h3>
					{stats?.dueCount ? (
						<p className="text-xs text-muted-foreground">{stats.dueCount} items due</p>
					) : null}
				</header>
				{reviewItems.length === 0 ? (
					<div className="rounded-xl border border-ocean-300 bg-ocean-100 py-12 text-center">
						<div className="mb-4 text-5xl">?</div>
						<h3 className="mb-2 text-xl font-semibold text-ocean-text">All caught up!</h3>
						<p className="text-ocean-text">No items due for review right now. Great work!</p>
						<p className="mt-2 text-sm text-stone-600">Check back later for new reviews.</p>
					</div>
				) : (
					<div className="mx-auto max-w-xl">
						<SimpleListDrill
							items={reviewItems.map<SimpleListItem>((v) => ({
								id: `review-${v.id}`,
								greek: v.greekText,
								greeklish: greekToPhonetic(v.greekText),
								label: v.englishTranslation,
								english: v.englishTranslation,
								vocabularyId: v.id,
							}))}
							title={`Review (${reviewItems.length} due)`}
							subtitle="Spaced repetition keeps it sharp"
							drillId="srs-review"
							colorTheme="ocean"
							autoStart
						/>
					</div>
				)}
			</section>
		</div>
	);
}
