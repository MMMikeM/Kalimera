import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAuth } from "@/server/auth/session";
import { recordAttempt } from "@/server/db/queries/practice-attempts";
import {
	type PracticeSessionInsert,
	completeSession,
	startSession,
} from "@/server/db/queries/practice-sessions";
import { db } from "@/server/db";
import { vocabDailyResults, vocabMastery } from "@/server/db/schema";
import type { AreaType, SkillType } from "@/server/db/schema";

// ═══════════════════════════════════════════════════════════════════════════════
// SERVER FUNCTIONS — SRS lifecycle
// ═══════════════════════════════════════════════════════════════════════════════

export const startSessionFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			sessionType: z.enum(["vocab_quiz", "case_drill", "conjugation_drill", "weak_area_focus"]),
			category: z.string().optional(),
			focusArea: z.string().optional(),
			wordTypeFilter: z.string().optional(),
		}),
	)
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		const row: PracticeSessionInsert = {
			userId,
			sessionType: data.sessionType,
			category: data.category ?? null,
			wordTypeFilter: data.wordTypeFilter ?? null,
			focusArea: data.focusArea ?? null,
		};
		const session = await startSession(row);
		return { success: true, session };
	});

export const recordAttemptFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			sessionId: z.number().optional(),
			vocabularyId: z.number().optional(),
			questionText: z.string(),
			correctAnswer: z.string(),
			userAnswer: z.string(),
			isCorrect: z.boolean(),
			timeTaken: z.number(),
			skillType: z.enum(["recognition", "production"]).default("recognition"),
			weakAreaType: z.enum(["case", "gender", "verb_family"]).optional(),
			weakAreaIdentifier: z.string().optional(),
			drillId: z.string().optional(),
		}),
	)
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		const attempt = await recordAttempt({
			userId,
			sessionId: data.sessionId,
			vocabularyId: data.vocabularyId,
			drillId: data.drillId,
			questionText: data.questionText,
			correctAnswer: data.correctAnswer,
			userAnswer: data.userAnswer,
			isCorrect: data.isCorrect,
			timeTaken: data.timeTaken,
			skillType: data.skillType as SkillType,
			weakAreaType: data.weakAreaType as AreaType | undefined,
			weakAreaIdentifier: data.weakAreaIdentifier,
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

		// Fetch all vocab attempts from this session in chronological order
		const attempts = await db.query.practiceAttempts.findMany({
			where: { sessionId: data.sessionId, vocabularyId: { isNotNull: true } },
			columns: { vocabularyId: true, isCorrect: true, attemptedAt: true, drillId: true },
			orderBy: { attemptedAt: "asc" },
		});

		if (attempts.length === 0) return { success: true, session };

		// First-try result per vocab (first attempt in session = first presentation)
		const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
		type FirstTry = { correctFirstTry: boolean; drillId: string };
		const firstTryByVocab = new Map<number, FirstTry>();
		for (const a of attempts) {
			if (a.vocabularyId != null && !firstTryByVocab.has(a.vocabularyId)) {
				firstTryByVocab.set(a.vocabularyId, {
					correctFirstTry: Boolean(a.isCorrect),
					drillId: a.drillId ?? "",
				});
			}
		}
		if (firstTryByVocab.size === 0) return { success: true, session };

		// Write daily results — onConflictDoNothing so first session of day wins
		await db
			.insert(vocabDailyResults)
			.values(
				[...firstTryByVocab.entries()].map(([vocabId, { correctFirstTry, drillId }]) => ({
					userId,
					vocabId,
					drillId,
					practicedDate: today,
					correctFirstTry,
				})),
			)
			.onConflictDoNothing();

		// Mastery check — batch query all daily results + mastery rows
		const practicedIds = [...firstTryByVocab.keys()];
		const drillId = [...firstTryByVocab.values()][0]?.drillId ?? "";

		const [allDailyRows, masteryRows] = await Promise.all([
			db.query.vocabDailyResults.findMany({
				where: { userId, drillId, vocabId: { in: practicedIds } },
				columns: { vocabId: true, practicedDate: true, correctFirstTry: true },
				orderBy: { practicedDate: "desc" },
			}),
			db.query.vocabMastery.findMany({
				where: { userId, drillId, vocabId: { in: practicedIds } },
			}),
		]);

		// Group daily rows by vocabId (already desc order → head = most recent)
		const dailyByVocab = new Map<number, typeof allDailyRows>();
		for (const row of allDailyRows) {
			const list = dailyByVocab.get(row.vocabId) ?? [];
			list.push(row);
			dailyByVocab.set(row.vocabId, list);
		}
		const masteryByVocab = new Map(masteryRows.map((m) => [m.vocabId, m]));
		const now = Math.floor(Date.now() / 1000);

		for (const vocabId of practicedIds) {
			const currentMastery = masteryByVocab.get(vocabId);
			const currentTier = currentMastery?.tier ?? 0;
			const tierIdx = Math.min(currentTier, 3) as 0 | 1 | 2 | 3;
			const window = MASTERY_WINDOWS[tierIdx]!;
			const threshold = MASTERY_THRESHOLDS[tierIdx]!;
			const intervalDays = MASTERY_INTERVAL_DAYS[tierIdx]!;

			const rows = (dailyByVocab.get(vocabId) ?? []).slice(0, window);
			if (rows.length < window) continue; // not enough practice days yet
			const correctCount = rows.filter((r) => r.correctFirstTry).length;
			if (correctCount < threshold) continue;

			const newTier = Math.min(currentTier + 1, 3);
			const nextReviewAt = now + intervalDays * 86400;
			await db
				.insert(vocabMastery)
				.values({ userId, vocabId, drillId, tier: newTier, masteredAt: now, nextReviewAt })
				.onConflictDoUpdate({
					target: [vocabMastery.userId, vocabMastery.vocabId, vocabMastery.drillId],
					set: { tier: newTier, masteredAt: now, nextReviewAt },
				});
		}

		return { success: true, session };
	});
