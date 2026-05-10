import { getRouteApi } from "@tanstack/react-router";

import { recordAttemptFn } from "./srs-loader";

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

const practiceRoute = getRouteApi("/practice/_layout");

export const useLogDrillAttempt = (drillId: string) => {
	const { userId } = practiceRoute.useLoaderData();

	return (input: LogAttemptInput) => {
		if (!userId) return;
		recordAttemptFn({
			data: {
				userId,
				drillId,
				questionText: input.prompt,
				correctAnswer: input.correctAnswer,
				userAnswer: input.userAnswer,
				isCorrect: input.isCorrect,
				timeTaken: Math.round(input.timeTaken),
				skillType: (input.skillType ?? "production") as "recognition" | "production",
				vocabularyId: input.vocabularyId,
				weakAreaType: input.weakAreaType as "case" | "gender" | "verb_family" | undefined,
				weakAreaIdentifier: input.weakAreaIdentifier,
			},
		}).catch(() => {
			// Attempt logging is best-effort
		});
	};
};
