import { useRef, useCallback, useEffect } from "react";
import { useFetcher } from "react-router";

const USER_STORAGE_KEY = "greek-practice-user";

const getCurrentUserId = (): number | null => {
	if (typeof window === "undefined") return null;
	const stored = localStorage.getItem(USER_STORAGE_KEY);
	return stored ? parseInt(stored, 10) : null;
};

export const useCurrentUserId = (): number | null => {
	return getCurrentUserId();
};

interface UsePracticeSessionOptions {
	sessionType: "vocab_quiz" | "case_drill" | "conjugation_drill" | "weak_area_focus";
	category?: string;
	focusArea?: string;
}

interface UsePracticeSessionReturn {
	sessionId: number | null;
	startSession: () => void;
	recordAttempt: (data: AttemptData) => void;
	completeSession: (totalQuestions: number, correctAnswers: number) => void;
	isRecording: boolean;
}

interface AttemptData {
	vocabularyId?: number;
	questionText: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number;
	skillType?: "recognition" | "production";
	weakAreaType?: "case" | "gender" | "verb_family";
	weakAreaIdentifier?: string;
}

export const usePracticeSession = (
	options: UsePracticeSessionOptions
): UsePracticeSessionReturn => {
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	// Update sessionId when session is started
	useEffect(() => {
		if (fetcher.data?.success && fetcher.data?.session?.id) {
			sessionIdRef.current = fetcher.data.session.id;
		}
	}, [fetcher.data]);

	const startSession = useCallback(() => {
		const userId = getCurrentUserId();
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: options.sessionType,
				category: options.category || "",
				focusArea: options.focusArea || "",
			},
			{ method: "post" }
		);
	}, [fetcher, options.sessionType, options.category, options.focusArea]);

	const recordAttempt = useCallback(
		(data: AttemptData) => {
			const userId = getCurrentUserId();
			if (!userId) return;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					sessionId: sessionIdRef.current?.toString() || "",
					vocabularyId: data.vocabularyId?.toString() || "",
					questionText: data.questionText,
					correctAnswer: data.correctAnswer,
					userAnswer: data.userAnswer,
					isCorrect: data.isCorrect.toString(),
					timeTaken: data.timeTaken.toString(),
					skillType: data.skillType || "recognition",
					weakAreaType: data.weakAreaType || "",
					weakAreaIdentifier: data.weakAreaIdentifier || "",
				},
				{ method: "post" }
			);
		},
		[fetcher]
	);

	const completeSession = useCallback(
		(totalQuestions: number, correctAnswers: number) => {
			if (!sessionIdRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: totalQuestions.toString(),
					correctAnswers: correctAnswers.toString(),
				},
				{ method: "post" }
			);

			sessionIdRef.current = null;
		},
		[fetcher]
	);

	return {
		sessionId: sessionIdRef.current,
		startSession,
		recordAttempt,
		completeSession,
		isRecording: fetcher.state === "submitting",
	};
};

// Hook for tracking time spent on a question
export const useQuestionTimer = () => {
	const startTimeRef = useRef<number | null>(null);

	const startTimer = useCallback(() => {
		startTimeRef.current = Date.now();
	}, []);

	const getElapsedTime = useCallback((): number => {
		if (!startTimeRef.current) return 0;
		return Date.now() - startTimeRef.current;
	}, []);

	const resetTimer = useCallback(() => {
		startTimeRef.current = null;
	}, []);

	return {
		startTimer,
		getElapsedTime,
		resetTimer,
	};
};
