import { createFileRoute } from "@tanstack/react-router";

import { VocabDrillPage } from "../../components/engines/vocab-drill";
import { getNominalReviewQuestionsFn } from "./loader";

export const Route = createFileRoute("/practice/cases/review/adjectives")({
	loader: async () => {
		const questions = await getNominalReviewQuestionsFn({
			data: { wordType: "adjective", drillId: "nominal-all-adjectives", limit: 45 },
		});
		return { questions };
	},
	component: AllAdjectivesDrill,
});

function AllAdjectivesDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="nominal-all-adjectives"
			category="nouns"
			initialQuestions={questions.length > 0 ? questions : undefined}
		/>
	);
}
