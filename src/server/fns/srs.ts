import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAuth } from "@/server/auth/session";
import { insertDailyResults } from "@/server/db/queries/drill-daily-results";
import { promoteDrillProgress } from "@/server/db/queries/drill-progress";
import { listSessionVocabAttempts, recordAttempt } from "@/server/db/queries/practice-attempts";
import {
	type PracticeSessionInsert,
	completeSession,
	startSession,
} from "@/server/db/queries/practice-sessions";

// ═══════════════════════════════════════════════════════════════════════════════
// SERVER FUNCTIONS — SRS lifecycle
// ═══════════════════════════════════════════════════════════════════════════════

export const startSessionFn = createServerFn({ method: "POST" }).handler(async () => {
	const { userId } = requireAuth();
	const row: PracticeSessionInsert = { userId };
	const session = await startSession(row);
	return { success: true, session };
});

export const recordAttemptFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			sessionId: z.number().optional(),
			vocabId: z.number().optional(),
			questionText: z.string(),
			correctAnswer: z.string(),
			userAnswer: z.string(),
			isCorrect: z.boolean(),
			timeTaken: z.number(),
			drillId: z.string().optional(),
		}),
	)
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		const attempt = await recordAttempt({
			userId,
			sessionId: data.sessionId,
			vocabId: data.vocabId,
			drillId: data.drillId,
			questionText: data.questionText,
			correctAnswer: data.correctAnswer,
			userAnswer: data.userAnswer,
			isCorrect: data.isCorrect,
			timeTaken: data.timeTaken,
		});
		return { success: true, attempt };
	});

export const completeSessionFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			sessionId: z.number(),
			totalQuestions: z.number(),
			correctAnswers: z.number(),
		}),
	)
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		const session = await completeSession(data);

		const attempts = await listSessionVocabAttempts(data.sessionId);
		if (attempts.length === 0) return { success: true, session };

		// First-try result per vocab (first attempt in session = first presentation)
		const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
		type FirstTry = { correctFirstTry: boolean; drillId: string };
		const firstTryByVocab = new Map<number, FirstTry>();
		for (const a of attempts) {
			if (a.vocabId != null && !firstTryByVocab.has(a.vocabId)) {
				firstTryByVocab.set(a.vocabId, {
					correctFirstTry: Boolean(a.isCorrect),
					drillId: a.drillId ?? "",
				});
			}
		}
		if (firstTryByVocab.size === 0) return { success: true, session };

		await insertDailyResults(
			[...firstTryByVocab.entries()].map(([vocabId, { correctFirstTry, drillId }]) => ({
				userId,
				vocabId,
				drillId,
				practicedDate: today,
				correctFirstTry,
			})),
		);

		const practicedIds = [...firstTryByVocab.keys()];
		const drillId = [...firstTryByVocab.values()][0]?.drillId ?? "";
		await promoteDrillProgress({ userId, drillId, practicedIds });

		return { success: true, session };
	});
