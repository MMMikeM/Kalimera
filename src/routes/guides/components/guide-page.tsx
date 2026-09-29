import { Link } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { BackLink } from "@/components/BackLink";
import { GreekText } from "@/components/GreekText";
import { PageHeading } from "@/components/PageHeading";
import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { Guide } from "@/types/guide";

import { GUIDE_TONE } from "./guide-tone";
import { GuideSection } from "./guide-section";
import { MarkKey } from "./mark-key";

const usesMarks = (guide: Guide) =>
	guide.sections.some(
		(s) =>
			s.examples?.some((e) => e.marks?.length) ||
			s.table?.rows.some((row) => row.some((cell) => typeof cell !== "string" && cell.marks?.length)),
	);

export const GuidePage = ({ guide }: { guide: Guide }) => {
	const tone = GUIDE_TONE[guide.tone];
	return (
		<div className="space-y-10">
			<div className="space-y-2">
				<BackLink to="/guides">Guides</BackLink>
				<PageHeading
					title={
						<>
							<GreekText size="inherit" tone="inherit" className={cn("mr-3", tone.accent)}>
								{guide.greek}
							</GreekText>
							<ProseWithGreek text={guide.title} />
						</>
					}
				>
					<p>
						<ProseWithGreek text={guide.idea} />
					</p>
				</PageHeading>
			</div>

			{usesMarks(guide) ? <MarkKey panelClass={tone.panel} /> : null}

			<nav aria-label="Sections">
				<ol className="divide-y divide-stone-200 border-y border-stone-200">
					{guide.sections.map((section, i) => (
						<li key={section.id}>
							<a href={`#${section.id}`} className="flex min-h-11 items-baseline gap-3 py-2 hover:underline">
								<span className={cn("w-6 shrink-0 text-right text-sm", tone.accent)}>{i + 1}.</span>
								<span className="text-stone-800">
									<ProseWithGreek text={section.title} />
								</span>
							</a>
						</li>
					))}
				</ol>
			</nav>

			<div className="space-y-8">
				{guide.sections.map((section, i) => (
					<GuideSection key={section.id} guide={guide} section={section} position={i + 1} />
				))}
			</div>

			{guide.reference.length > 0 ? (
				<section aria-labelledby="full-tables" className="space-y-3">
					<h2 id="full-tables" className="font-serif text-xl text-stone-900">
						Full tables
					</h2>
					<ul className="flex flex-wrap gap-x-6 gap-y-1">
						{guide.reference.map((ref) => (
							<li key={ref.href}>
								<Link to={ref.href} className={cn("inline-flex min-h-11 items-center hover:underline", tone.accent)}>
									{ref.label}
								</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}
		</div>
	);
};
