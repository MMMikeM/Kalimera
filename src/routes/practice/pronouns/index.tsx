import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import type { Drill } from "../components/group-section";

const drills: Drill[] = [
	{
		id: "pronouns-object",
		to: "/practice/pronouns/object",
		title: "Object pronouns",
		greek: "με, σε, τον, την, μας, σας…",
		minutes: 1,
	},
	{
		id: "pronouns-placement",
		to: "/practice/pronouns/placement",
		title: "Placement",
		greek: "Με βλέπει · Δες με! · Θα με δει",
		minutes: 2,
	},
	{
		id: "pronouns-possessives",
		to: "/practice/pronouns/possessives",
		title: "Possessives",
		greek: "μου, σου, του, της, μας…",
		minutes: 1,
	},
];

export const Route = createFileRoute("/practice/pronouns/")({
	component: PronounsPage,
});

function PronounsPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection
				title="Pronouns"
				subtitle="Object forms, possessives, and where they sit in a sentence."
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
