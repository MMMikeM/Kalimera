import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/future/vocabulary")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({
			data: { drillId: "verbs-future-sg1", limit: 30 },
		});
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: FutureVocabularyDrill,
});

function FutureVocabularyDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-future-sg1"
			backTo="/practice/verbs"
			subtitle="θα forms / timed"
			forwardDesc="English meaning → θα form"
			questions={questions}
		/>
	);
}
