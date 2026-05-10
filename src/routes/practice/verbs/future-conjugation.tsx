import { createFileRoute } from "@tanstack/react-router";

import { VocabDrillPage } from "../components/engines/vocab-drill";
import { getFutureDrillQuestionsFn } from "./loader";

export const Route = createFileRoute("/practice/verbs/future-conjugation")({
	loader: async () => {
		const questions = await getFutureDrillQuestionsFn({ data: { limit: 30 } });
		return { questions };
	},
	component: FutureConjugationDrill,
});

function FutureConjugationDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-future-conjugation"
			category="verbs"
			initialQuestions={questions.length > 0 ? questions : undefined}
			wordTypeFilter="verb"
			weakAreaType="verb_family"
		/>
	);
}
