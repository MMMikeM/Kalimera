import { Link } from "@tanstack/react-router";

import { BackLink } from "@/components/BackLink";
import { GreekText } from "@/components/GreekText";
import { PageHeading } from "@/components/PageHeading";
import { ProseWithGreek } from "@/components/ProseWithGreek";
import type { Guide, GuideLessonSource } from "@/types/guide";

import { GuideSection } from "./guide-section";

export const GuidePage = ({
	guide,
	sources,
}: {
	guide: Guide;
	sources: Record<string, GuideLessonSource[]>;
}) => (
	<div className="space-y-10">
		<div className="space-y-2">
			<BackLink to="/guides">Guides</BackLink>
			<PageHeading
				title={
					<>
						<GreekText size="inherit" tone="muted" className="mr-3">
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

		<nav aria-label="Sections">
			<ol className="divide-y divide-stone-200 border-y border-stone-200">
				{guide.sections.map((section, i) => (
					<li key={section.id}>
						<a href={`#${section.id}`} className="flex min-h-11 items-baseline gap-3 py-2 hover:text-terracotta-text">
							<span className="w-6 shrink-0 text-right text-sm text-stone-400">{i + 1}.</span>
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
				<GuideSection
					key={section.id}
					guide={guide}
					section={section}
					position={i + 1}
					sources={sources[section.id] ?? []}
				/>
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
							<Link to={ref.href} className="inline-flex min-h-11 items-center text-terracotta-text hover:underline">
								{ref.label}
							</Link>
						</li>
					))}
				</ul>
			</section>
		) : null}
	</div>
);
