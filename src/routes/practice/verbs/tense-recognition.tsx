import { createFileRoute } from "@tanstack/react-router";

import { getTenseRecognitionQuestionsFn } from "@/server/fns/verbs";

import { TENSE_DIMENSION_OPTIONS } from "../components/engines/drill-constants";
import { VocabDrillPage } from "../components/engines/vocab-drill";

// No category chips: filtering the deck to one tense would pre-announce the answer
// in reverse mode, which is the whole drill.
export const Route = createFileRoute("/practice/verbs/tense-recognition")({
	loader: async () => {
		const questions = await getTenseRecognitionQuestionsFn({ data: { limit: 30 } });
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: TenseRecognitionDrill,
});

function TenseRecognitionDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-tense-recognition"
			category="verbs"
			backTo="/practice/verbs"
			title="Which tense?"
			subtitle="σήμερα · χθες · αύριο / timed"
			forwardDesc="English meaning + time word → Greek form"
			reverseLabel="Greek → tense"
			reverseDesc="Greek form → select its tense"
			reverse={{
				kind: "single-select",
				options: TENSE_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
			questions={questions}
		/>
	);
}
