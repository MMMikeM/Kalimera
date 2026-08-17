import { createFileRoute } from "@tanstack/react-router";

import { getFutureSg1QuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/future/vocabulary")({
	loader: async () => {
		const questions = await getFutureSg1QuestionsFn({ data: { limit: 30 } });
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
			category="verbs"
			backTo="/practice/verbs"
			title="Verb vocabulary · future"
			subtitle="θα forms / timed"
			forwardDesc="English meaning → θα form"
			questions={questions}
		/>
	);
}
