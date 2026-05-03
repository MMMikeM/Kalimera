import { useFetcher, useOutletContext } from "react-router";

import type { PracticeLoaderData } from "./layout";

export interface LogAttemptInput {
	prompt: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number;
	weakAreaIdentifier?: string;
	weakAreaType?: string;
	vocabularyId?: number;
	skillType?: string;
}

export const useLogDrillAttempt = (drillId: string) => {
	const fetcher = useFetcher();
	const ctx = useOutletContext<PracticeLoaderData | undefined>();
	const userId = ctx?.userId ?? null;

	return (input: LogAttemptInput) => {
		if (!userId) return;
		fetcher.submit(
			{
				intent: "recordAttempt",
				userId: userId.toString(),
				drillId,
				questionText: input.prompt,
				correctAnswer: input.correctAnswer,
				userAnswer: input.userAnswer,
				isCorrect: input.isCorrect ? "on" : "",
				timeTaken: Math.round(input.timeTaken).toString(),
				skillType: input.skillType ?? "production",
				...(input.weakAreaIdentifier && { weakAreaIdentifier: input.weakAreaIdentifier }),
				...(input.weakAreaType && { weakAreaType: input.weakAreaType }),
				...(input.vocabularyId != null && { vocabularyId: input.vocabularyId.toString() }),
			},
			{ method: "post", action: "/practice" },
		);
	};
};
