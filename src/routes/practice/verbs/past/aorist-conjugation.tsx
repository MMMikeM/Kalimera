import { createFileRoute } from "@tanstack/react-router";

import { getAoristDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/past/aorist-conjugation")({
	loader: async () => {
		const questions = await getAoristDrillQuestionsFn({ data: { limit: 30 } });
		if (questions.length === 0) throw new Error("No questions available");
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
			questions={questions}
		/>
	);
}
