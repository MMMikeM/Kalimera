import { createFileRoute } from "@tanstack/react-router";

import { BackLink } from "@/components/BackLink";
import { type IndexGroup, SectionIndex } from "@/components/SectionIndex";
import { pageTitle } from "@/lib/page-title";

const groups: IndexGroup[] = [
	{
		title: "Counting and describing",
		topics: [
			{
				id: "numbers",
				label: "Numbers",
				greek: "Αριθμοί",
				description: "Count, tell the time, give prices",
				href: "/learn/essentials/numbers",
			},
			{
				id: "colours",
				label: "Colours",
				greek: "Χρώματα",
				description: "Describe what you see",
				href: "/learn/essentials/colours",
			},
		],
	},
	{
		title: "Time and place",
		topics: [
			{
				id: "time",
				label: "Time",
				greek: "Χρόνος",
				description: "Times of day, days and months",
				href: "/learn/essentials/time",
			},
			{
				id: "frequency",
				label: "Frequency",
				greek: "Συχνότητα",
				description: "How often things happen",
				href: "/learn/essentials/frequency",
			},
			{
				id: "position",
				label: "Position",
				greek: "Θέση",
				description: "Give and understand directions",
				href: "/learn/essentials/position",
			},
		],
	},
];

export const Route = createFileRoute("/learn/essentials/")({
	head: () => ({ meta: [{ title: pageTitle("Essentials") }] }),
	component: EssentialsIndex,
});

function EssentialsIndex() {
	return (
		<div className="space-y-2">
			<BackLink to="/learn">Learn</BackLink>
			<SectionIndex
				title="Essentials"
				lede="Numbers, colours, time and position words you'll need constantly in everyday Greek."
				groups={groups}
			/>
		</div>
	);
}
