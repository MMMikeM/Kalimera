import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { recordAttempt } from "@/db.server/queries/practice-attempts";
import {
	type PracticeSessionInsert,
	completeSession,
	startSession,
} from "@/db.server/queries/practice-sessions";
import type { AreaType, SkillType } from "@/db.server/schema";
import { authMiddleware } from "@/middleware";

// ═══════════════════════════════════════════════════════════════════════════════
// SERVER FUNCTIONS — SRS lifecycle
// ═══════════════════════════════════════════════════════════════════════════════

export const startSessionFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		z.object({
			userId: z.number(),
			sessionType: z.enum(["vocab_quiz", "case_drill", "conjugation_drill", "weak_area_focus"]),
			category: z.string().optional(),
			focusArea: z.string().optional(),
			wordTypeFilter: z.string().optional(),
		}),
	)
	.handler(async ({ data }) => {
		const row: PracticeSessionInsert = {
			userId: data.userId,
			sessionType: data.sessionType,
			category: data.category ?? null,
			wordTypeFilter: data.wordTypeFilter ?? null,
			focusArea: data.focusArea ?? null,
		};
		const session = await startSession(row);
		return { success: true, session };
	});

export const recordAttemptFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		z.object({
			userId: z.number(),
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
		const attempt = await recordAttempt({
			userId: data.userId,
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

export const completeSessionFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		z.object({
			sessionId: z.number(),
			totalQuestions: z.number(),
			correctAnswers: z.number(),
		}),
	)
	.handler(async ({ data }) => {
		const session = await completeSession(data);
		return { success: true, session };
	});
