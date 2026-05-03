import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";

import type { LogAttemptInput } from "../hooks";

interface DrillCompleteInput {
	totalQuestions: number;
	correctAnswers: number;
}

interface UseDrillSessionInput {
	userId: number | null | undefined;
	drillId: string;
	sessionType: string;
	category?: string;
	wordTypeFilter?: string;
}

/**
 * DB session lifecycle for production drills: open a `practice_session`,
 * record per-question attempts under that session id, and close it on
 * completion. Re-drill (mistakes practice) skips logging — the original
 * session already captured those attempts.
 */
export const useDrillSession = ({
	userId,
	drillId,
	sessionType,
	category,
	wordTypeFilter,
}: UseDrillSessionInput) => {
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);
	const isReDrillRef = useRef(false);

	const fetchedSessionId =
		fetcher.data?.success && fetcher.data?.session?.id ? fetcher.data.session.id : null;
	useEffect(() => {
		if (fetchedSessionId && !sessionIdRef.current) {
			sessionIdRef.current = fetchedSessionId;
		}
	}, [fetchedSessionId]);

	const startDbSession = () => {
		if (!userId) return;
		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType,
				...(category && { category }),
				...(wordTypeFilter && { wordTypeFilter }),
			},
			{ method: "post", action: "/practice" },
		);
	};

	const recordAttempt = (attempt: LogAttemptInput) => {
		if (!userId || isReDrillRef.current) return;
		fetcher.submit(
			{
				intent: "recordAttempt",
				userId: userId.toString(),
				sessionId: sessionIdRef.current?.toString() ?? "",
				drillId,
				questionText: attempt.prompt,
				correctAnswer: attempt.correctAnswer,
				userAnswer: attempt.userAnswer,
				isCorrect: attempt.isCorrect ? "on" : "",
				timeTaken: attempt.timeTaken.toString(),
				skillType: attempt.skillType ?? "production",
				...(attempt.vocabularyId != null && { vocabularyId: attempt.vocabularyId.toString() }),
				...(attempt.weakAreaType && { weakAreaType: attempt.weakAreaType }),
				...(attempt.weakAreaIdentifier && { weakAreaIdentifier: attempt.weakAreaIdentifier }),
			},
			{ method: "post", action: "/practice" },
		);
	};

	const completeSession = (stats: DrillCompleteInput) => {
		if (!userId || !sessionIdRef.current || isReDrillRef.current) return;
		fetcher.submit(
			{
				intent: "completeSession",
				sessionId: sessionIdRef.current.toString(),
				totalQuestions: stats.totalQuestions.toString(),
				correctAnswers: stats.correctAnswers.toString(),
			},
			{ method: "post", action: "/practice" },
		);
	};

	const markReDrill = () => {
		isReDrillRef.current = true;
		sessionIdRef.current = null;
	};

	const resetSession = () => {
		isReDrillRef.current = false;
		sessionIdRef.current = null;
	};

	return {
		startDbSession,
		recordAttempt,
		completeSession,
		markReDrill,
		resetSession,
		sessionIdRef,
		isReDrillRef,
	};
};
