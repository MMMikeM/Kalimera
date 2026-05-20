import { createFileRoute } from "@tanstack/react-router";

import { getFutureDrillQuestionsFn } from "@/server/fns";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/future/conjugation")({
	loader: async () => {
		const questions = await getFutureDrillQuestionsFn({ data: { limit: 30 } });
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: FutureConjugationDrill,
});

function FutureConjugationDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage drillId="verbs-future-conjugation" category="verbs" questions={questions} />
	);
}
