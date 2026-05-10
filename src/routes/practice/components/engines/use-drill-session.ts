import { useEffect, useRef } from "react";

import type { LogAttemptInput } from "../hooks";
import { completeSessionFn, recordAttemptFn, startSessionFn } from "../srs-loader";

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
	const sessionIdRef = useRef<number | null>(null);
	const isReDrillRef = useRef(false);
	const pendingSessionRef = useRef<Promise<void> | null>(null);

	useEffect(() => {
		// No cleanup needed — server fn calls are fire-and-forget
	}, []);

	const startDbSession = () => {
		if (!userId) return;
		pendingSessionRef.current = startSessionFn({
			data: {
				userId,
				sessionType: sessionType as Parameters<typeof startSessionFn>[0]["data"]["sessionType"],
				category,
				wordTypeFilter,
			},
		})
			.then((json) => {
				if (json?.success && json?.session?.id) {
					sessionIdRef.current = json.session.id ?? null;
				}
			})
			.catch(() => {
				// Session tracking is best-effort
			});
	};

	const recordAttempt = (attempt: LogAttemptInput) => {
		if (!userId || isReDrillRef.current) return;
		recordAttemptFn({
			data: {
				userId,
				sessionId: sessionIdRef.current ?? undefined,
				drillId,
				questionText: attempt.prompt,
				correctAnswer: attempt.correctAnswer,
				userAnswer: attempt.userAnswer,
				isCorrect: attempt.isCorrect,
				timeTaken: Math.round(attempt.timeTaken),
				skillType: (attempt.skillType ?? "production") as "recognition" | "production",
				vocabularyId: attempt.vocabularyId,
				weakAreaType: attempt.weakAreaType as "case" | "gender" | "verb_family" | undefined,
				weakAreaIdentifier: attempt.weakAreaIdentifier,
			},
		}).catch(() => {
			// Attempt logging is best-effort
		});
	};

	const completeSession = (stats: DrillCompleteInput) => {
		if (!userId || !sessionIdRef.current || isReDrillRef.current) return;
		completeSessionFn({
			data: {
				sessionId: sessionIdRef.current,
				totalQuestions: stats.totalQuestions,
				correctAnswers: stats.correctAnswers,
			},
		}).catch(() => {
			// Completion logging is best-effort
		});
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
