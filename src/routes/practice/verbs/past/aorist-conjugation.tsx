import { createFileRoute } from "@tanstack/react-router";

import { VocabDrillPage } from "../../components/engines/vocab-drill";
import { getAoristDrillQuestionsFn } from "../loader";

export const Route = createFileRoute("/practice/verbs/past/aorist-conjugation")({
	loader: async () => {
		const questions = await getAoristDrillQuestionsFn({ data: { limit: 30 } });
		return { questions };
	},
	component: AoristConjugationDrill,
});

function AoristConjugationDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-aorist-conjugation"
			category="verbs"
			initialQuestions={questions.length > 0 ? questions : undefined}
		/>
	);
}
