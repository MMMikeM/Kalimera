import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import { PRONOUN_DRILLS } from "./drills.data";

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
					{PRONOUN_DRILLS.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</ul>
			</GroupSection>
		</div>
	);
}
