import { createFileRoute } from "@tanstack/react-router";

import { getAoristDrillQuestionsFn } from "@/server/fns";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/past/aorist-conjugation")({
	loader: async () => {
		const questions = await getAoristDrillQuestionsFn({ data: { limit: 30 } });
		return { questions };
	},
	staleTime: 0,
	component: AoristConjugationDrill,
});

function AoristConjugationDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-aorist-conjugation"
			category="verbs"
			backTo="/practice/verbs"
			initialQuestions={questions.length > 0 ? questions : undefined}
		/>
	);
}
