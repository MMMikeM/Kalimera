import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import { BLOCK_DRILLS, QUESTION_WORDS_LINK } from "./drills.data";

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
					{[...BLOCK_DRILLS, QUESTION_WORDS_LINK].map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</ul>
			</GroupSection>
		</div>
	);
}
