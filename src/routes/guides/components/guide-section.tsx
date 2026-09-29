import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";

import { GreekText } from "@/components/GreekText";
import { ProseWithGreek } from "@/components/ProseWithGreek";
import { DRILL_REGISTRY } from "@/routes/practice/drill-catalogue.data";
import type { Guide, GuideLessonSource, GuideSection as GuideSectionData } from "@/types/guide";

import { resolveSectionRef } from "../guides.data";
import { GuideTable } from "./guide-table";

const rootRoute = getRouteApi("__root__");

const LESSON_DATE = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

const formatLessonDate = (date: string) => LESSON_DATE.format(new Date(`${date}T00:00:00Z`));

const ConfuseBox = ({ guide, section }: { guide: Guide; section: GuideSectionData }) => {
	if (!section.confuse) return null;
	const target = resolveSectionRef(section.confuse.section, guide);
	return (
		<aside className="rounded-md border border-stone-300 bg-stone-50 p-4 text-sm text-stone-700">
			<p className="mb-1 font-semibold text-stone-900">Don't confuse</p>
			<p>
				<ProseWithGreek text={section.confuse.text} />
			</p>
			{target ? (
				<Link
					to="/guides/$guide"
					params={{ guide: target.guide.slug }}
					hash={target.section.id}
					className="mt-2 inline-flex min-h-11 items-center gap-1 font-medium text-terracotta-text hover:underline"
				>
					<span>
						<ProseWithGreek text={target.section.title} />
					</span>
					<ArrowRight size={14} aria-hidden="true" />
				</Link>
			) : null}
		</aside>
	);
};

const PracticeLinks = ({ drillIds }: { drillIds: string[] }) => {
	const { auth } = rootRoute.useRouteContext();
	if (drillIds.length === 0) {
		return <p className="text-sm text-stone-500">No drill covers this yet.</p>;
	}
	return (
		<ul className="flex flex-wrap gap-2">
			{drillIds.map((id) => {
				const drill = DRILL_REGISTRY[id];
				if (!drill) return null;
				return (
					<li key={id}>
						<Link
							to={auth?.userId ? drill.to : "/register"}
							className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-stone-300 px-3 text-sm text-stone-800 hover:border-terracotta hover:text-terracotta-text"
						>
							<Zap size={14} aria-hidden="true" />
							<ProseWithGreek text={drill.title} />
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export const GuideSection = ({
	guide,
	section,
	position,
	sources,
}: {
	guide: Guide;
	section: GuideSectionData;
	position: number;
	sources: GuideLessonSource[];
}) => (
	<section
		id={section.id}
		aria-labelledby={`${section.id}-title`}
		className="scroll-mt-6 space-y-5 rounded-lg border border-stone-300 p-4 sm:p-6"
	>
		<header className="space-y-2">
			<h2 id={`${section.id}-title`} className="font-serif text-2xl text-stone-900">
				<span className="mr-2 text-stone-400">{position}.</span>
				<ProseWithGreek text={section.title} />
			</h2>
			<p className="max-w-2xl leading-relaxed text-stone-700">
				<ProseWithGreek text={section.rule} />
			</p>
		</header>

		{section.table ? <GuideTable table={section.table} /> : null}

		{section.examples && section.examples.length > 0 ? (
			<ul className="space-y-3">
				{section.examples.map((example) => (
					<li key={example.greek} className="border-l-2 border-stone-300 pl-3">
						<GreekText as="p" size="lg">
							{example.greek}
						</GreekText>
						<p className="text-sm text-stone-600">{example.english}</p>
					</li>
				))}
			</ul>
		) : null}

		<ConfuseBox guide={guide} section={section} />

		<footer className="space-y-3 border-t border-stone-200 pt-4">
			<PracticeLinks drillIds={section.drills} />
			{sources.length > 0 ? (
				<p className="text-xs text-stone-500">
					From lessons on {sources.map((s) => formatLessonDate(s.date)).join(", ")}
				</p>
			) : null}
		</footer>
	</section>
);
