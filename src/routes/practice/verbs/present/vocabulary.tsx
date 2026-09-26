import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/present/vocabulary")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({
			data: { drillId: "verbs-vocabulary-sg1", limit: 30 },
		});
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: PresentVocabularyDrill,
});

function PresentVocabularyDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage drillId="verbs-vocabulary-sg1" backTo="/practice/verbs" questions={questions} />
	);
}
