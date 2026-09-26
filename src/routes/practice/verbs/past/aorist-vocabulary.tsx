import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/past/aorist-vocabulary")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({
			data: { drillId: "verbs-aorist-sg1", limit: 30 },
		});
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: AoristVocabularyDrill,
});

function AoristVocabularyDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage drillId="verbs-aorist-sg1" backTo="/practice/verbs" questions={questions} />
	);
}
