import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowRight, Hourglass, Zap } from "lucide-react";
import { cn } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";
import { DRILL_REGISTRY } from "@/routes/practice/drill-catalogue.data";
import type { Guide, GuideExample, GuideSection as GuideSectionData, GuideTone, PlannedDrill } from "@/types/guide";

import { resolveSectionRef } from "../guides.data";
import { GuideProse } from "./guide-prose";
import { GUIDE_TONE } from "./guide-tone";
import { GuideTable } from "./guide-table";
import { MarkedPhrase } from "./marked-phrase";

const rootRoute = getRouteApi("__root__");

const ConfuseBox = ({ guide, section, tone }: { guide: Guide; section: GuideSectionData; tone: GuideTone }) => {
	if (!section.confuse) return null;
	const target = resolveSectionRef(section.confuse.section, guide);
	return (
		<aside className={cn("rounded-md p-4 text-sm text-stone-700", GUIDE_TONE[tone].column)}>
			<p className="mb-1 font-semibold text-stone-900">Don't confuse</p>
			<GuideProse text={section.confuse.text} className="space-y-2 leading-normal" />
			{target ? (
				<Link
					to="/guides/$guide"
					params={{ guide: target.guide.slug }}
					hash={target.section.id}
					className={cn(
						"mt-2 inline-flex min-h-11 items-center gap-1 font-medium hover:underline",
						GUIDE_TONE[tone].columnLabel,
					)}
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

const PracticeLinks = ({
	drillIds,
	planned,
	linkClass,
}: {
	drillIds: string[];
	planned: PlannedDrill[];
	linkClass: string;
}) => {
	const { auth } = rootRoute.useRouteContext();
	if (drillIds.length === 0 && planned.length === 0) {
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
							className={cn(
								"inline-flex min-h-11 items-center gap-1.5 rounded-md border border-stone-300 px-3 text-sm text-stone-800",
								linkClass,
							)}
						>
							<Zap size={14} aria-hidden="true" />
							<span>
								<ProseWithGreek text={drill.title} />
							</span>
						</Link>
					</li>
				);
			})}
			{planned.map((drill) => (
				<li
					key={drill.id}
					title={drill.tests}
					className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-dashed border-stone-300 px-3 text-sm text-stone-600"
				>
					<Hourglass size={14} aria-hidden="true" />
					<span>
								<ProseWithGreek text={drill.title} />
							</span>
					<span className="text-xs text-stone-500">· planned</span>
				</li>
			))}
		</ul>
	);
};

const ExampleList = ({ examples, ruleClass }: { examples?: GuideExample[]; ruleClass: string }) =>
	examples && examples.length > 0 ? (
		<ul className="space-y-3">
			{examples.map((example) => (
				<li key={example.greek} className={cn("border-l-2 pl-3", ruleClass)}>
					<p>
						<MarkedPhrase text={example.greek} marks={example.marks} size="lg" />
					</p>
					<p className="text-sm text-stone-600">
						<ProseWithGreek text={example.english} />
					</p>
				</li>
			))}
		</ul>
	) : null;

export const GuideSection = ({
	guide,
	section,
	position,
	tone: toneName,
}: {
	guide: Guide;
	section: GuideSectionData;
	position: number;
	tone: GuideTone;
}) => {
	const tone = GUIDE_TONE[toneName];
	return (
		<section
			id={section.id}
			aria-labelledby={`${section.id}-title`}
			className="-mx-6 scroll-mt-6 overflow-hidden border-y border-stone-300 sm:mx-0 sm:rounded-lg sm:border-x"
		>
			<header className={cn("border-b px-6 py-3", tone.header)}>
				<h2 id={`${section.id}-title`} className="font-serif text-2xl text-stone-900">
					<span className={cn("mr-2", tone.columnLabel)}>{position}.</span>
					<ProseWithGreek text={section.title} />
				</h2>
			</header>

			<div className="space-y-5 px-6 py-5 sm:py-6">
				<GuideProse text={section.rule} />

				{section.table ? <GuideTable table={section.table} /> : null}
				{section.tables?.map((table) => <GuideTable key={table.caption} table={table} />)}

				<ExampleList examples={section.examples} ruleClass={tone.exampleRule} />

				{section.details?.map((detail) => (
					<div key={detail.label} className="space-y-3 border-t border-stone-200 pt-4">
						<h3 className="font-semibold text-stone-900">
							<ProseWithGreek text={detail.label} />
						</h3>
						<GuideProse text={detail.text} />
						{detail.table ? <GuideTable table={detail.table} /> : null}
						<ExampleList examples={detail.examples} ruleClass={tone.exampleRule} />
					</div>
				))}

				<ConfuseBox guide={guide} section={section} tone={toneName} />

				<footer className="border-t border-stone-200 pt-4">
					<PracticeLinks drillIds={section.drills} planned={section.plannedDrills ?? []} linkClass={tone.link} />
				</footer>
			</div>
		</section>
	);
};
