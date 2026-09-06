import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import { GroupSection } from "../components/group-section";
import { PhaseSection } from "../components/PhaseSection";
import { CASE_PHASES } from "./drills.data";

export const Route = createFileRoute("/practice/cases/")({
	component: CasesPage,
});

function CasesPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection title="The case system" returnTo={Route.fullPath}>
				{CASE_PHASES.map(({ phase, drills }) => (
					<PhaseSection key={phase} phase={phase}>
						{drills.map((d) => (
							<DrillButton {...d} from={Route.fullPath} key={d.id} />
						))}
					</PhaseSection>
				))}
			</GroupSection>
		</div>
	);
}
