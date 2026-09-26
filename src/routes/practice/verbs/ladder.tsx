import { createFileRoute } from "@tanstack/react-router";

import { getVerbDrillQuestionsFn } from "@/server/fns/verbs";

import { VocabDrillPage } from "../components/engines/vocab-drill";

export const Route = createFileRoute("/practice/verbs/ladder")({
	loader: async () => {
		const questions = await getVerbDrillQuestionsFn({
			data: { drillId: "verbs-tense-ladder", limit: 30 },
		});
		if (questions.length === 0) throw new Error("No questions available");
		return { questions };
	},
	staleTime: 0,
	component: TenseLadderDrill,
});

function TenseLadderDrill() {
	const { questions } = Route.useLoaderData();
	return (
		<VocabDrillPage
			drillId="verbs-tense-ladder"
			backTo="/practice/verbs"
			subtitle="σήμερα · χθες · αύριο / timed"
			forwardLabel="Greek → Greek"
			forwardDesc="Greek form → the form for the time word shown"
			reverseLabel="Greek → recall verb"
			reverseDesc="Answer form → recall the whole ladder (self-assess)"
			questions={questions}
		/>
	);
}
