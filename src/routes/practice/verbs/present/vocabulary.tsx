import { createFileRoute } from "@tanstack/react-router";

import { getPresentSg1QuestionsFn } from "@/server/fns";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/present/vocabulary")({
	loader: async () => {
		const questions = await getPresentSg1QuestionsFn({ data: { limit: 30 } });
		return { questions };
	},
	staleTime: 0,
	component: PresentVocabularyDrill,
});

function PresentVocabularyDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-vocabulary-sg1"
			category="verbs"
			initialQuestions={questions.length > 0 ? questions : undefined}
		/>
	);
}
