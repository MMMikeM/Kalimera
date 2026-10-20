import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { formatDayMonth, parsePlainDate } from "@/lib/time";
import { getRecentLessonDrillsFn } from "@/server/fns/guides";

import { DrillList } from "./components/drill-index";
import { DRILL_REGISTRY } from "./drill-catalogue.data";

const SECTIONS = [
	{
		href: "/practice/cases",
		label: "The case system",
		thesis: "Articles, nouns, adjectives — Doer / Target / Owner.",
	},
	{
		href: "/practice/pronouns",
		label: "Pronouns",
		thesis: "Object forms, possessives, where they sit.",
	},
	{ href: "/practice/verbs", label: "Verbs", thesis: "Present, past, future, να, commands." },
	{
		href: "/practice/blocks",
		label: "Building blocks",
		thesis: "Survival phrases, numbers, days.",
	},
	{
		href: "/practice/guides",
		label: "From the guides",
		thesis: "One drill per guide section: gender, place, comparing, joining ideas.",
	},
];

export const Route = createFileRoute("/practice/")({
	loader: () => getRecentLessonDrillsFn(),
	component: PracticeIndex,
});

function PracticeIndex() {
	const lessons = Route.useLoaderData();
	return (
		<div className="mx-auto max-w-2xl">
			{lessons.length > 0 && (
				<section className="mb-10">
					<h2 className="text-sm font-semibold text-stone-600">From your lessons</h2>
					{lessons.map((lesson) => (
						<div key={`${lesson.date} ${lesson.topic}`} className="mt-4">
							<p className="mb-1 text-xs text-muted-foreground">
								{formatDayMonth(parsePlainDate(lesson.date))} · {lesson.topic}
							</p>
							<DrillList drills={lesson.drillIds.flatMap((id) => DRILL_REGISTRY[id] ?? [])} />
						</div>
					))}
				</section>
			)}
			<ul className="divide-y divide-border">
				{SECTIONS.map((s) => (
					<li key={s.href}>
						<Link
							to={s.href}
							className="flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-muted/50"
						>
							<div className="min-w-0 flex-1">
								<h3 className="mb-1 font-serif text-xl font-semibold text-navy-text">{s.label}</h3>
								<p className="text-sm text-muted-foreground">{s.thesis}</p>
							</div>
							<ArrowRight size={16} className="shrink-0 text-muted-foreground" />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
