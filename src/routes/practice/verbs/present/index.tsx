import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/present/")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({ data: { limit: 30 } });
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
			initialQuestions={questions.length > 0 ? questions : undefined}
		/>
	);
}
