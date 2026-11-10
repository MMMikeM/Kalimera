import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CollapsibleSection } from "@/components/CollapsibleSection";
import { formatDayMonth, parsePlainDate } from "@/lib/time";
import { getRecentLessonDrillsFn } from "@/server/fns/guides";

import { DrillList, PhaseHeading } from "./components/drill-index";
import { type DrillGroup, GROUP_DRILLS } from "./drill-catalogue.data";

const SECTIONS: Array<{ group: DrillGroup; href: string; label: string; thesis: string }> = [
	{
		group: "cases",
		href: "/practice/cases",
		label: "The case system",
		thesis: "Articles, nouns, adjectives — Doer / Target / Owner.",
	},
	{
		group: "pronouns",
		href: "/practice/pronouns",
		label: "Pronouns",
		thesis: "Object forms, possessives, where they sit.",
	},
	{
		group: "verbs",
		href: "/practice/verbs",
		label: "Verbs",
		thesis: "Present, past, future, να, commands.",
	},
	{
		group: "blocks",
		href: "/practice/blocks",
		label: "Building blocks",
		thesis: "Survival phrases, numbers, days.",
	},
	{
		group: "guides",
		href: "/practice/guides",
		label: "From the guides",
		thesis: "One drill per guide section: gender, place, comparing, joining ideas.",
	},
];

export const Route = createFileRoute("/practice/")({
	loader: () => getRecentLessonDrillsFn(),
	component: PracticeIndex,
});

type LessonDrills = Awaited<ReturnType<typeof getRecentLessonDrillsFn>>[number];

const lessonDate = (lesson: LessonDrills) => formatDayMonth(parsePlainDate(lesson.date));

/** A lesson's drills under the group that owns each, in that group's own order. */
const LessonDrillGroups = ({ drillIds }: { drillIds: string[] }) => (
	<div className="space-y-5">
		{SECTIONS.map(({ group, label }) => {
			const drills = GROUP_DRILLS[group].filter((drill) => drillIds.includes(drill.id));
			if (drills.length === 0) return null;
			return (
				<div key={group}>
					<h4 className="text-xs font-medium text-muted-foreground">{label}</h4>
					<DrillList drills={drills} />
				</div>
			);
		})}
	</div>
);

const FromYourLessons = ({ lessons }: { lessons: LessonDrills[] }) => {
	const [latest, ...earlier] = lessons;
	if (!latest) return null;
	return (
		<section className="mb-12">
			<PhaseHeading as="h2">From your lessons</PhaseHeading>
			<header className="mt-4 mb-4">
				<p className="text-xs text-muted-foreground">{lessonDate(latest)}</p>
				<h3 className="text-lg font-semibold text-navy-text">{latest.topic}</h3>
			</header>
			<LessonDrillGroups drillIds={latest.drillIds} />
			{earlier.map((lesson) => (
				<CollapsibleSection
					key={`${lesson.date} ${lesson.topic}`}
					title={`${lessonDate(lesson)} · ${lesson.topic}`}
					className="mt-8"
				>
					<LessonDrillGroups drillIds={lesson.drillIds} />
				</CollapsibleSection>
			))}
		</section>
	);
};

function PracticeIndex() {
	const lessons = Route.useLoaderData();
	return (
		<div className="mx-auto max-w-2xl">
			<FromYourLessons lessons={lessons} />
			<section>
				<PhaseHeading as="h2">All drills</PhaseHeading>
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
			</section>
		</div>
	);
}
