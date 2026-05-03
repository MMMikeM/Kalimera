import { getAuthSession } from "@/lib/auth-cookie";
import type { DrillQuestion } from "@/lib/drill/generate-questions";

import { VocabDrillPage } from "../../engines/vocab-drill";
import type { Route } from "./+types/all-nouns";
import { getNominalReviewQuestions } from "./data.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const auth = getAuthSession(request);
	const userId = auth?.userId ?? null;

	if (!userId) return { questions: [] as DrillQuestion[] };

	const url = new URL(request.url);
	const limit = url.searchParams.get("size") === "quick" ? 10 : 15;
	const questions: DrillQuestion[] = await getNominalReviewQuestions(
		userId,
		"noun",
		"nominal-all-nouns",
		limit * 3,
	);
	return { questions };
};

export default function AllNounsDrill({ loaderData }: Route.ComponentProps) {
	return (
		<VocabDrillPage
			drillId="nominal-all-nouns"
			category="nouns"
			initialQuestions={loaderData.questions.length > 0 ? loaderData.questions : undefined}
			wordTypeFilter="noun"
		/>
	);
}
