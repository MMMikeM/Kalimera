import { createFileRoute } from "@tanstack/react-router";

import { VocabDrillPage } from "../../components/engines/vocab-drill";
import { getVerbDrillQuestionsFn } from "../loader";

export const Route = createFileRoute("/practice/verbs/present/")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({ data: { limit: 30 } });
		return { questions };
	},
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
