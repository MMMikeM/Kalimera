import { getAuthSession } from "@/lib/auth-cookie";

import type { Route } from "./+types/verbs";
import type { UnifiedAttemptResult } from "../components/unified-drill";
import { VocabDrillPage } from "./components/VocabDrillPage";
import { getVerbDrillQuestions } from "./data.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const auth = getAuthSession(request);
	const userId = auth?.userId ?? null;

	if (!userId) return { questions: [] };

	const url = new URL(request.url);
	const limit = url.searchParams.get("size") === "quick" ? 10 : 15;
	const questions = await getVerbDrillQuestions(userId, limit * 2);

	return { questions };
};

export default function VerbsDrill({ loaderData }: Route.ComponentProps) {
	return (
		<VocabDrillPage
			category="verbs"
			initialQuestions={loaderData.questions.length > 0 ? loaderData.questions : undefined}
			wordTypeFilter="verb"
			weakAreaType="verb_family"
			getWeakAreaIdentifier={(attempt: UnifiedAttemptResult) =>
				attempt.questionId.includes("verb-") ? attempt.questionId.split("-")[2] : undefined
			}
		/>
	);
}
