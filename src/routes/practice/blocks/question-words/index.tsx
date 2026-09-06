import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../../components/DrillButton";
import { GroupSection } from "../../components/group-section";
import { PhaseSection } from "../../components/PhaseSection";
import { QUESTION_WORD_PHASES } from "./drills.data";

export const Route = createFileRoute("/practice/blocks/question-words/")({
	component: QuestionWordsPage,
});

function QuestionWordsPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection title="Question words" returnTo="/practice/blocks">
				{QUESTION_WORD_PHASES.map(({ phase, drills }) => (
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
