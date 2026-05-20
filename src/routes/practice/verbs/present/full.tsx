import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/present/full")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({ data: { limit: 30 } });
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: VerbsDrill,
});

function VerbsDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-present"
			category="verbs"
			backTo="/practice/verbs"
			questions={questions}
		/>
	);
}
