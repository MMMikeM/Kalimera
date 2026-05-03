import { useFetcher, useOutletContext } from "react-router";

import type { PracticeLoaderData } from "./layout";

const USER_STORAGE_KEY = "greek-practice-user";

const getCurrentUserId = (): number | null => {
	if (typeof window === "undefined") return null;
	const stored = localStorage.getItem(USER_STORAGE_KEY);
	return stored ? parseInt(stored, 10) : null;
};

export const useCurrentUserId = (): number | null => {
	return getCurrentUserId();
};

interface LogAttemptInput {
	prompt: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number;
	weakAreaIdentifier?: string;
	vocabularyId?: number;
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
				skillType: "production",
				...(input.weakAreaIdentifier && { weakAreaIdentifier: input.weakAreaIdentifier }),
				...(input.vocabularyId != null && { vocabularyId: input.vocabularyId.toString() }),
			},
			{ method: "post", action: "/practice" },
		);
	};
};
