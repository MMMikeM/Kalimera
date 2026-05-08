import { userIdContext } from "@/lib/auth-context";

import { VocabDrillPage } from "../../engines/vocab-drill";
import type { Route } from "./+types/future-conjugation";
import { getFutureDrillQuestions } from "./data.server";

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const userId = context.get(userIdContext);
	const url = new URL(request.url);
	const limit = url.searchParams.get("size") === "quick" ? 10 : 15;
	const questions = await getFutureDrillQuestions(userId, limit * 2);
	return { questions };
};

export default function FutureConjugationDrill({ loaderData }: Route.ComponentProps) {
	return (
		<VocabDrillPage
			drillId="verbs-future-conjugation"
			category="verbs"
			initialQuestions={loaderData.questions.length > 0 ? loaderData.questions : undefined}
			wordTypeFilter="verb"
			weakAreaType="verb_family"
		/>
	);
}
