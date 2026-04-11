import { z } from "zod";
import { zfd } from "zod-form-data";
import {
	type CompleteSessionInput,
	completeSession,
	getItemsDueForReview,
	getNewVocabularyItems,
	getPracticeStats,
	getVocabularyProgress,
	getWeakAreas,
	type PracticeSessionInsert,
	type PracticeStats,
	type RecordAttemptInput,
	recordAttempt,
	type StartSessionInput,
	startSession,
	type VocabItemWithSkill,
	type VocabularyProgress,
	type WeakAreaInfo,
} from "@/db.server/queries/practice";
import { createUser, getAllUsers, getUserById } from "@/db.server/queries/users";
import type { AreaType, SkillType } from "@/db.server/schema";

// Re-export queries and types for route consumers
export {
	completeSession,
	getAllUsers,
	getItemsDueForReview,
	getNewVocabularyItems,
	getPracticeStats,
	getUserById,
	getVocabularyProgress,
	getWeakAreas,
	recordAttempt,
	startSession,
	type CompleteSessionInput,
	type PracticeSessionInsert,
	type PracticeStats,
	type RecordAttemptInput,
	type StartSessionInput,
	type VocabItemWithSkill,
	type VocabularyProgress,
	type WeakAreaInfo,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ACTION HANDLERS
// ═══════════════════════════════════════════════════════════════════════════════

type ActionSuccess = { success: true } & Record<string, unknown>;
type ActionError = { success: false; error: string };
type ActionResult = ActionSuccess | ActionError;

const createHandler = <TSchema extends z.ZodType>(
	schema: TSchema,
	handler: (data: z.infer<TSchema>) => Promise<ActionSuccess>,
) => {
	return async (formData: FormData): Promise<ActionResult> => {
		const result = schema.safeParse(formData);
		if (!result.success) {
			return {
				success: false,
				error: result.error.issues[0]?.message ?? "Invalid input",
			};
		}
		try {
			return await handler(result.data);
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : "Unknown error",
			};
		}
	};
};

// ─── Schemas ───────────────────────────────────────────────────────────────────

const createUserSchema = zfd.formData({
	displayName: zfd.text(z.string().min(1, "Name is required")),
	code: zfd.text(z.string().min(1, "Code is required")),
});

const startSessionSchema = zfd.formData({
	userId: zfd.numeric(),
	sessionType: zfd.text(
		z.enum(["vocab_quiz", "case_drill", "conjugation_drill", "weak_area_focus"]),
	),
	category: zfd.text(z.string().optional()).optional(),
	focusArea: zfd.text(z.string().optional()).optional(),
});

const recordAttemptSchema = zfd.formData({
	userId: zfd.numeric(),
	sessionId: zfd.numeric(z.number().optional()).optional(),
	vocabularyId: zfd.numeric(z.number().optional()).optional(),
	questionText: zfd.text(),
	correctAnswer: zfd.text(),
	userAnswer: zfd.text(),
	isCorrect: zfd.checkbox(),
	timeTaken: zfd.numeric(),
	skillType: zfd
		.text(z.enum(["recognition", "production"]))
		.optional()
		.default("recognition"),
	weakAreaType: zfd.text(z.enum(["case", "gender", "verb_family"]).optional()).optional(),
	weakAreaIdentifier: zfd.text(z.string().optional()).optional(),
});

const completeSessionSchema = zfd.formData({
	sessionId: zfd.numeric(),
	totalQuestions: zfd.numeric(),
	correctAnswers: zfd.numeric(),
});

// ─── Handlers ──────────────────────────────────────────────────────────────────

export const actionHandlers = {
	createUser: createHandler(createUserSchema, async (data) => {
		const newUser = await createUser({ ...data });
		return { success: true, user: newUser };
	}),

	startSession: createHandler(startSessionSchema, async (data) => {
		const row: PracticeSessionInsert = {
			userId: data.userId,
			sessionType: data.sessionType,
			category: data.category ?? null,
			wordTypeFilter: null,
			focusArea: data.focusArea ?? null,
		};
		const session = await startSession(row);
		return { success: true, session };
	}),

	recordAttempt: createHandler(recordAttemptSchema, async (data) => {
		const attempt = await recordAttempt({
			userId: data.userId,
			sessionId: data.sessionId,
			vocabularyId: data.vocabularyId,
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
	}),

	completeSession: createHandler(completeSessionSchema, async (data) => {
		const session = await completeSession(data);
		return { success: true, session };
	}),
} as const;

export type ActionIntent = keyof typeof actionHandlers;
