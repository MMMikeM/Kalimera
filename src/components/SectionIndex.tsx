import type { ReactNode } from "react";

import { SectionCard } from "@/components/SectionCard";

interface IndexTopic {
	id: string;
	label: string;
	/** Section name in Greek — the card leads with it, the English follows. */
	greek: string;
	description: string;
	/** A bare icon; the chip around it belongs to this component. */
	icon: ReactNode;
	href: string;
}

export interface IndexGroup {
	title: string;
	topics: IndexTopic[];
}

/**
 * Positional, not semantic. The tint separates one group from the next and says
 * nothing about the Greek on the cards, so it stays off the reserved `case-*`
 * and `gender-*` tokens — see "Colour — Two Palettes" in CLAUDE.md.
 *
 * All three sit on the -200 step, which shares a lightness and a chroma across
 * these ramps; honey would have been half again as saturated and pulled the eye
 * to whichever group happened to draw it.
 */
const GROUP_TINTS = [
	"border-ocean-300 bg-ocean-200 text-ocean-800",
	"border-olive-300 bg-olive-200 text-olive-800",
	"border-cream-300 bg-cream-200 text-cream-800",
] as const;

const tintFor = (index: number): string =>
	GROUP_TINTS[index % GROUP_TINTS.length] ?? GROUP_TINTS[0];

const TopicIcon = ({ children }: { children: ReactNode }) => (
	<div className="flex size-10 items-center justify-center rounded-lg bg-white/70">{children}</div>
);

export const SectionIndex = ({
	title,
	lede,
	groups,
}: {
	title: string;
	lede: string;
	groups: IndexGroup[];
}) => (
	<div className="space-y-6">
		<div>
			<h1 className="text-2xl font-bold text-stone-800">{title}</h1>
			<p className="mt-1 text-stone-600">{lede}</p>
		</div>

		{groups.map((group, index) => (
			<section key={group.title}>
				<h2 className="mb-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">
					{group.title}
				</h2>
				<div className="grid gap-3">
					{group.topics.map((topic) => (
						<SectionCard
							key={topic.id}
							section={{
								...topic,
								icon: <TopicIcon>{topic.icon}</TopicIcon>,
								color: tintFor(index),
							}}
						/>
					))}
				</div>
			</section>
		))}
	</div>
);
