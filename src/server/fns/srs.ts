import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAuth } from "@/server/auth/session";
import { transaction } from "@/server/db";
import { listSessionVocabAttempts, recordAttempt } from "@/server/db/queries/practice-attempts";
import {
	type PracticeSessionInsert,
	completeSession,
	startSession,
} from "@/server/db/queries/practice-sessions";
import {
	insertDailyResults,
	listRecentDailyResultsByDrill,
} from "@/server/db/queries/vocab-daily-results";
import { listMasteryForVocabs, upsertMastery } from "@/server/db/queries/vocab-mastery";

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

const MASTERY_WINDOWS = [4, 7, 10, 10] as const;
const MASTERY_THRESHOLDS = [3, 6, 9, 9] as const;
const MASTERY_INTERVAL_DAYS = [3, 6, 9, 9] as const;

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

		await transaction(async (tx) => {
			await insertDailyResults(
				tx,
				[...firstTryByVocab.entries()].map(([vocabId, { correctFirstTry, drillId }]) => ({
					userId,
					vocabId,
					drillId,
					practicedDate: today,
					correctFirstTry,
				})),
			);
		});

		const practicedIds = [...firstTryByVocab.keys()];
		const drillId = [...firstTryByVocab.values()][0]?.drillId ?? "";

		const [allDailyRows, masteryRows] = await Promise.all([
			listRecentDailyResultsByDrill(userId, drillId, practicedIds),
			listMasteryForVocabs(userId, drillId, practicedIds),
		]);

		const dailyByVocab = new Map<number, typeof allDailyRows>();
		for (const row of allDailyRows) {
			const list = dailyByVocab.get(row.vocabId) ?? [];
			list.push(row);
			dailyByVocab.set(row.vocabId, list);
		}
		const masteryByVocab = new Map(masteryRows.map((m) => [m.vocabId, m]));
		const now = Math.floor(Date.now() / 1000);

		await transaction(async (tx) => {
			for (const vocabId of practicedIds) {
				const currentMastery = masteryByVocab.get(vocabId);
				const currentTier = currentMastery?.tier ?? 0;
				const tierIdx = Math.min(currentTier, 3) as 0 | 1 | 2 | 3;
				const window = MASTERY_WINDOWS[tierIdx]!;
				const threshold = MASTERY_THRESHOLDS[tierIdx]!;
				const intervalDays = MASTERY_INTERVAL_DAYS[tierIdx]!;

				const rows = (dailyByVocab.get(vocabId) ?? []).slice(0, window);
				if (rows.length < window) continue;
				const correctCount = rows.filter((r) => r.correctFirstTry).length;
				if (correctCount < threshold) continue;

				const newTier = Math.min(currentTier + 1, 3);
				await upsertMastery(tx, {
					userId,
					vocabId,
					drillId,
					tier: newTier,
					masteredAt: now,
					nextReviewAt: now + intervalDays * 86400,
				});
			}
		});

		return { success: true, session };
	});
