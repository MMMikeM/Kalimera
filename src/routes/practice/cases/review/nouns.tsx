import { createFileRoute } from "@tanstack/react-router";

import { getNominalReviewQuestionsFn } from "@/server/fns";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/cases/review/nouns")({
	loader: async () => {
		const questions = await getNominalReviewQuestionsFn({
			data: { wordType: "noun", drillId: "nominal-all-nouns", limit: 45 },
		});
		return { questions };
	},
	component: AllNounsDrill,
});

function AllNounsDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="nominal-all-nouns"
			category="nouns"
			initialQuestions={questions.length > 0 ? questions : undefined}
		/>
	);
}
