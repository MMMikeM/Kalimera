import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import { PhaseSection } from "../components/PhaseSection";
import { VERB_PHASES } from "./drills.data";

const VerbsPage = () => (
	<div className="mx-auto max-w-2xl">
		<GroupSection title="Verbs">
			{VERB_PHASES.map(({ phase, drills }) => (
				<PhaseSection key={phase} phase={phase}>
					{drills.map((d) => (
						<DrillButton key={d.id} from={Route.fullPath} {...d} />
					))}
				</PhaseSection>
			))}
		</GroupSection>
	</div>
);

export const Route = createFileRoute("/practice/verbs/")({
	component: VerbsPage,
});
