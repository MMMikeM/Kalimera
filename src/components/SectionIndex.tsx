import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { GreekText } from "@/components/GreekText";
import { PageHeading } from "@/components/PageHeading";

interface IndexTopic {
	id: string;
	label: string;
	/** Section name in Greek — the row leads with it, the English follows. */
	greek: string;
	description: string;
	href: string;
}

export interface IndexGroup {
	title: string;
	topics: IndexTopic[];
}

/**
 * A table of contents, not a card grid. Groups carry no tint: a blue or green slab
 * beside the Doer and Owner colours reads as a grammatical claim it isn't making.
 */
export const SectionIndex = ({
	title,
	lede,
	groups,
}: {
	title: string;
	lede: string;
	groups: IndexGroup[];
}) => (
	<div className="space-y-10">
		<PageHeading title={title}>
			<p>{lede}</p>
		</PageHeading>

		{groups.map((group) => (
			<section key={group.title}>
				<h2 className="mb-1 text-sm font-semibold text-stone-600">{group.title}</h2>
				<ul className="divide-y divide-stone-200 border-y border-stone-200">
					{group.topics.map((topic) => (
						<li key={topic.id}>
							<Link to={topic.href} className="group flex min-h-11 items-center gap-4 py-4">
								<div className="min-w-0 flex-1">
									<p className="flex flex-wrap items-baseline gap-x-3">
										<GreekText size="2xl" className="group-hover:text-terracotta-text">
											{topic.greek}
										</GreekText>
										<span className="text-stone-700">{topic.label}</span>
									</p>
									<p className="mt-0.5 text-sm text-muted-foreground">{topic.description}</p>
								</div>
								<ChevronRight
									size={18}
									aria-hidden="true"
									className="shrink-0 text-stone-500 transition-transform group-hover:translate-x-0.5"
								/>
							</Link>
						</li>
					))}
				</ul>
			</section>
		))}
	</div>
);
