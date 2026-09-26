import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/future/conjugation")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({
			data: { drillId: "verbs-future-conjugation", limit: 30 },
		});
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: FutureConjugationDrill,
});

function FutureConjugationDrill() {
	const { questions } = Route.useLoaderData();
	return <VocabDrillPage drillId="verbs-future-conjugation" questions={questions} />;
}
