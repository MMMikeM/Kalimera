import { createFileRoute } from "@tanstack/react-router";

import { getPresentSg1QuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/present/vocabulary")({
	loader: async () => {
		const questions = await getPresentSg1QuestionsFn({ data: { limit: 30 } });
		if (questions.length === 0) throw new Error("No questions available");
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
			backTo="/practice/verbs"
			questions={questions}
		/>
	);
}
