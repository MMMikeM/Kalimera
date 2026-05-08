import { userIdContext } from "@/lib/auth-context";

import { VocabDrillPage } from "../../engines/vocab-drill";
import type { Route } from "./+types/all-adjectives";
import { getNominalReviewQuestions } from "./data.server";

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const userId = context.get(userIdContext);
	const url = new URL(request.url);
	const limit = url.searchParams.get("size") === "quick" ? 10 : 15;
	const questions = await getNominalReviewQuestions(userId, "adjective", "nominal-all-adjectives", limit * 3);
	return { questions };
};

export default function AllAdjectivesDrill({ loaderData }: Route.ComponentProps) {
	return (
		<VocabDrillPage
			drillId="nominal-all-adjectives"
			category="nouns"
			initialQuestions={loaderData.questions.length > 0 ? loaderData.questions : undefined}
			wordTypeFilter="adjective"
		/>
	);
}
