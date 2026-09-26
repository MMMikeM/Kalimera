import { createFileRoute } from "@tanstack/react-router";

import { DrillIndex } from "../../components/drill-index";
import { QUESTION_WORD_PHASES } from "./drills.data";

export const Route = createFileRoute("/practice/blocks/question-words/")({
	component: QuestionWordsPage,
});

function QuestionWordsPage() {
	return (
		<DrillIndex title="Question words" backTo="/practice/blocks" phases={QUESTION_WORD_PHASES} />
	);
}
