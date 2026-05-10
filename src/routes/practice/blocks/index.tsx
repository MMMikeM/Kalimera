import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import type { Drill } from "../components/group-section";

export const drills: Drill[] = [
	{
		id: "blocks-chunks",
		to: "./chunks",
		title: "Survival phrases",
		greek: "Γεια σου · Ευχαριστώ · Θα ήθελα",
		minutes: 1,
	},
	{
		id: "blocks-numbers",
		to: "./numbers",
		title: "Numbers",
		greek: "ένα, δύο, δέκα, είκοσι, τριάντα…",
		minutes: 1,
	},
	{
		id: "blocks-days-of-week",
		to: "./days-of-week",
		title: "Days & time",
		greek: "Δευτέρα · Τρίτη · χτες · αύριο",
		minutes: 1,
	},
];

export const Route = createFileRoute("/practice/blocks/")({
	component: BlocksPage,
});

function BlocksPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection
				title="Building blocks"
				subtitle="Phrases, numbers, and time words you reach for every day."
			>
				<ul className="divide-y divide-border">
					{drills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</ul>
			</GroupSection>
		</div>
	);
}
