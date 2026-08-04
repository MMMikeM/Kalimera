import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../../components/DrillButton";
import { GroupSection } from "../../components/group-section";
import type { Drill } from "../../components/group-section";
import { PhaseSection } from "../../components/PhaseSection";

const basicsDrills: Drill[] = [
	{
		id: "blocks-qw-basics",
		to: "/practice/blocks/question-words/basics",
		title: "The five invariables",
		greek: "τι · πού · πότε · πώς · γιατί",
		minutes: 1,
	},
];

const whichDrills: Drill[] = [
	{
		id: "blocks-qw-which-forms",
		to: "/practice/blocks/question-words/which-forms",
		title: "Which — forms",
		greek: "ποιος · ποια · ποιο · ποιανού",
		minutes: 2,
	},
	{
		id: "blocks-qw-which-phrase",
		to: "/practice/blocks/question-words/which-phrase",
		title: "Which + noun",
		greek: "ποιον καφέ · ποια μέρα · ποιο σπίτι",
		minutes: 2,
	},
];

const howManyDrills: Drill[] = [
	{
		id: "blocks-qw-how-many-forms",
		to: "/practice/blocks/question-words/how-many-forms",
		title: "How much — forms",
		greek: "πόσος · πόση · πόσο · πόσα",
		minutes: 1,
	},
	{
		id: "blocks-qw-how-many-phrase",
		to: "/practice/blocks/question-words/how-many-phrase",
		title: "How much + noun",
		greek: "πόση ζάχαρη · πόσο καιρό · πόσα παιδιά",
		minutes: 2,
	},
];

const reviewDrills: Drill[] = [
	{
		id: "blocks-qw-review",
		to: "/practice/blocks/question-words/review",
		title: "All question words",
		greek: "τι · ποιανού · πόσες · γιατί",
		minutes: 2,
	},
];

export const Route = createFileRoute("/practice/blocks/question-words/")({
	component: QuestionWordsPage,
});

function QuestionWordsPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection title="Question words" returnTo="/practice/blocks">
				<PhaseSection phase="Basics">
					{basicsDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
				<PhaseSection phase="Which? (ποιος)">
					{whichDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
				<PhaseSection phase="How much? (πόσος)">
					{howManyDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
				<PhaseSection phase="Review">
					{reviewDrills.map((d) => (
						<DrillButton {...d} from={Route.fullPath} key={d.id} />
					))}
				</PhaseSection>
			</GroupSection>
		</div>
	);
}
