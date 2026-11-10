import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

import { formatDayMonth, parsePlainDate } from "@/lib/time";
import { getRecentLessonDrillsFn } from "@/server/fns/guides";
import { listStepProgressFn } from "@/server/fns/steps";

import { DrillList, PhaseHeading } from "./components/drill-index";
import { UpNext } from "./components/path";
import { type DrillGroup, GROUP_DRILLS } from "./drill-catalogue.data";
import { UNIT_PATH } from "./path/units.data";

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
	loader: async () => {
		const [lessons, stepProgress] = await Promise.all([
			getRecentLessonDrillsFn(),
			listStepProgressFn(),
		]);
		return { lessons, stepProgress };
	},
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
				<details key={`${lesson.date} ${lesson.topic}`} className="group mt-8 border-t border-border">
					<summary className="flex min-h-11 cursor-pointer list-none items-baseline justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
						<span>
							<span className="text-xs text-muted-foreground">{lessonDate(lesson)}</span>{" "}
							<span className="font-medium text-foreground">{lesson.topic}</span>
						</span>
						<ChevronDown
							size={16}
							className="shrink-0 text-muted-foreground group-open:rotate-180"
						/>
					</summary>
					<LessonDrillGroups drillIds={lesson.drillIds} />
				</details>
			))}
		</section>
	);
};

function PracticeIndex() {
	const { lessons, stepProgress } = Route.useLoaderData();
	return (
		<div className="mx-auto max-w-2xl">
			<section className="mb-12">
				<PhaseHeading as="h2">Up next</PhaseHeading>
				<UpNext name="Your path" path={UNIT_PATH} rows={stepProgress} />
				<Link
					to="/practice/path"
					className="inline-flex min-h-11 items-center text-sm font-medium text-navy-text underline-offset-2 hover:underline"
				>
					See the whole path →
				</Link>
			</section>
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
