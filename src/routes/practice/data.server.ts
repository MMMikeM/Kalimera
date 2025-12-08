import { and, eq, gte, sql, desc, count } from "drizzle-orm";
import { z, type ZodSchema } from "zod";
import { zfd } from "zod-form-data";
import { db } from "../../db";
import {
	vocabulary,
	vocabularySkills,
	weakAreas,
	practiceSessions,
	practiceAttempts,
	users,
	type SkillType,
	type SessionType,
	type AreaType,
} from "../../db/schema";
import { calculateSRS, qualityFromAttempt, getInitialSRSValues } from "./srs";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface VocabItemWithSkill {
	id: number;
	greekText: string;
	englishTranslation: string;
	pronunciation: string | null;
	wordType: string | null;
	category: string | null;
	skill: {
		nextReviewAt: Date | null;
		intervalDays: number | null;
		easeFactor: number | null;
		reviewCount: number | null;
	} | null;
}

export interface WeakAreaInfo {
	id: number;
	areaType: string;
	areaIdentifier: string;
	mistakeCount: number;
	needsFocus: boolean;
	lastMistakeAt: Date;
}

export interface PracticeStats {
	streak: number;
	itemsMastered: number;
	dueCount: number;
	totalLearned: number;
	newAvailable: number;
}

export interface StartSessionInput {
	userId: number;
	sessionType: SessionType;
	category?: string;
	wordTypeFilter?: string;
	focusArea?: string;
}

export interface RecordAttemptInput {
	userId: number;
	sessionId?: number;
	vocabularyId?: number;
	questionText: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number;
	skillType: SkillType;
	weakAreaType?: AreaType;
	weakAreaIdentifier?: string;
}

export interface CompleteSessionInput {
	sessionId: number;
	totalQuestions: number;
	correctAnswers: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const getItemsDueForReview = async (
	userId: number,
	skillType: SkillType = "recognition",
	limit = 20,
): Promise<VocabItemWithSkill[]> => {
	const now = new Date();

	const results = await db
		.select({
			id: vocabulary.id,
			greekText: vocabulary.greekText,
			englishTranslation: vocabulary.englishTranslation,
			pronunciation: vocabulary.pronunciation,
			wordType: vocabulary.wordType,
			category: vocabulary.category,
			nextReviewAt: vocabularySkills.nextReviewAt,
			intervalDays: vocabularySkills.intervalDays,
			easeFactor: vocabularySkills.easeFactor,
			reviewCount: vocabularySkills.reviewCount,
		})
		.from(vocabulary)
		.innerJoin(
			vocabularySkills,
			and(
				eq(vocabularySkills.vocabularyId, vocabulary.id),
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType),
			),
		)
		.where(sql`${vocabularySkills.nextReviewAt} <= ${now}`)
		.orderBy(vocabularySkills.nextReviewAt)
		.limit(limit);

	return results.map((r) => ({
		id: r.id,
		greekText: r.greekText,
		englishTranslation: r.englishTranslation,
		pronunciation: r.pronunciation,
		wordType: r.wordType,
		category: r.category,
		skill: r.nextReviewAt
			? {
				nextReviewAt: r.nextReviewAt,
				intervalDays: r.intervalDays,
				easeFactor: r.easeFactor,
				reviewCount: r.reviewCount,
			}
			: null,
	}));
};

export const getNewVocabularyItems = async (
	userId: number,
	limit = 20,
): Promise<VocabItemWithSkill[]> => {
	const results = await db
		.select({
			id: vocabulary.id,
			greekText: vocabulary.greekText,
			englishTranslation: vocabulary.englishTranslation,
			pronunciation: vocabulary.pronunciation,
			wordType: vocabulary.wordType,
			category: vocabulary.category,
		})
		.from(vocabulary)
		.leftJoin(
			vocabularySkills,
			and(
				eq(vocabularySkills.vocabularyId, vocabulary.id),
				eq(vocabularySkills.userId, userId),
			),
		)
		.where(sql`${vocabularySkills.userId} IS NULL`)
		.orderBy(vocabulary.difficultyLevel)
		.limit(limit);

	return results.map((r) => ({
		id: r.id,
		greekText: r.greekText,
		englishTranslation: r.englishTranslation,
		pronunciation: r.pronunciation,
		wordType: r.wordType,
		category: r.category,
		skill: null,
	}));
};

export const getWeakAreas = async (userId: number): Promise<WeakAreaInfo[]> => {
	const results = await db
		.select()
		.from(weakAreas)
		.where(and(eq(weakAreas.userId, userId), eq(weakAreas.needsFocus, true)))
		.orderBy(desc(weakAreas.mistakeCount));

	return results.map((r) => ({
		id: r.id,
		areaType: r.areaType,
		areaIdentifier: r.areaIdentifier,
		mistakeCount: r.mistakeCount,
		needsFocus: r.needsFocus,
		lastMistakeAt: r.lastMistakeAt,
	}));
};

export const getPracticeStats = async (
	userId: number,
	skillType: SkillType = "recognition",
): Promise<PracticeStats> => {
	const now = new Date();
	const masteredThresholdDays = 21;

	const [masteredResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType),
				gte(vocabularySkills.intervalDays, masteredThresholdDays),
			),
		);

	const [dueResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType),
				sql`${vocabularySkills.nextReviewAt} <= ${now}`,
			),
		);

	const [learnedResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.skillType, skillType),
			),
		);

	const [totalVocabResult] = await db.select({ count: count() }).from(vocabulary);

	const streak = await calculateStreak(userId);

	const totalLearned = learnedResult?.count || 0;
	const totalVocab = totalVocabResult?.count || 0;

	return {
		streak,
		itemsMastered: masteredResult?.count || 0,
		dueCount: dueResult?.count || 0,
		totalLearned,
		newAvailable: totalVocab - totalLearned,
	};
};

const calculateStreak = async (userId: number): Promise<number> => {
	const sessions = await db
		.select({
			completedAt: practiceSessions.completedAt,
		})
		.from(practiceSessions)
		.where(
			and(
				eq(practiceSessions.userId, userId),
				sql`${practiceSessions.completedAt} IS NOT NULL`,
			),
		)
		.orderBy(desc(practiceSessions.completedAt))
		.limit(365);

	if (sessions.length === 0) return 0;

	const uniqueDates = new Set<string>();
	for (const session of sessions) {
		if (session.completedAt) {
			const dateStr =
				new Date(session.completedAt).toISOString().split("T")[0] ?? "";
			uniqueDates.add(dateStr);
		}
	}

	const sortedDates = Array.from(uniqueDates).sort().reverse();
	if (sortedDates.length === 0) return 0;

	const today = new Date().toISOString().split("T")[0] ?? "";
	const yesterday =
		new Date(Date.now() - 86400000).toISOString().split("T")[0] ?? "";
	const firstDate = sortedDates[0];

	if (!firstDate || (firstDate !== today && firstDate !== yesterday)) {
		return 0;
	}

	let streak = 1;
	for (let i = 1; i < sortedDates.length; i++) {
		const prevDateStr = sortedDates[i - 1];
		const currDateStr = sortedDates[i];
		if (!prevDateStr || !currDateStr) break;

		const prevDate = new Date(prevDateStr);
		const currDate = new Date(currDateStr);
		const diffDays = Math.round(
			(prevDate.getTime() - currDate.getTime()) / 86400000,
		);

		if (diffDays === 1) {
			streak++;
		} else {
			break;
		}
	}

	return streak;
};

export const getVocabularyProgress = async (userId: number) => {
	const [totalResult] = await db.select({ count: count() }).from(vocabulary);

	const [learnedResult] = await db
		.select({ count: count() })
		.from(vocabularySkills)
		.where(eq(vocabularySkills.userId, userId));

	return {
		total: totalResult?.count || 0,
		learned: learnedResult?.count || 0,
	};
};

// ═══════════════════════════════════════════════════════════════════════════════
// MUTATIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const startSession = async (input: StartSessionInput) => {
	const [session] = await db
		.insert(practiceSessions)
		.values({
			userId: input.userId,
			sessionType: input.sessionType,
			category: input.category || null,
			wordTypeFilter: input.wordTypeFilter || null,
			focusArea: input.focusArea || null,
		})
		.returning();

	return session;
};

export const recordAttempt = async (input: RecordAttemptInput) => {
	const [attempt] = await db
		.insert(practiceAttempts)
		.values({
			userId: input.userId,
			sessionId: input.sessionId || null,
			vocabularyId: input.vocabularyId || null,
			questionText: input.questionText,
			correctAnswer: input.correctAnswer,
			userAnswer: input.userAnswer,
			isCorrect: input.isCorrect,
			timeTaken: input.timeTaken,
		})
		.returning();

	if (input.vocabularyId) {
		await updateVocabularySkill({
			userId: input.userId,
			vocabularyId: input.vocabularyId,
			skillType: input.skillType,
			isCorrect: input.isCorrect,
			timeTaken: input.timeTaken,
		});
	}

	if (input.weakAreaType && input.weakAreaIdentifier) {
		await updateWeakArea({
			userId: input.userId,
			areaType: input.weakAreaType,
			areaIdentifier: input.weakAreaIdentifier,
			isCorrect: input.isCorrect,
		});
	}

	return attempt;
};

interface UpdateVocabularySkillInput {
	userId: number;
	vocabularyId: number;
	skillType: SkillType;
	isCorrect: boolean;
	timeTaken: number;
}

const updateVocabularySkill = async (input: UpdateVocabularySkillInput) => {
	const { userId, vocabularyId, skillType, isCorrect, timeTaken } = input;

	const [existingSkill] = await db
		.select()
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.vocabularyId, vocabularyId),
				eq(vocabularySkills.skillType, skillType),
			),
		);

	const quality = qualityFromAttempt(isCorrect, timeTaken);

	if (existingSkill) {
		const srsResult = calculateSRS({
			quality,
			easeFactor: existingSkill.easeFactor || 2.3,
			intervalDays: existingSkill.intervalDays || 1,
			reviewCount: existingSkill.reviewCount || 0,
		});

		await db
			.update(vocabularySkills)
			.set({
				easeFactor: srsResult.nextEaseFactor,
				intervalDays: srsResult.nextIntervalDays,
				nextReviewAt: srsResult.nextReviewAt,
				reviewCount: (existingSkill.reviewCount || 0) + 1,
				lastReviewedAt: new Date(),
			})
			.where(
				and(
					eq(vocabularySkills.userId, userId),
					eq(vocabularySkills.vocabularyId, vocabularyId),
					eq(vocabularySkills.skillType, skillType),
				),
			);
	} else {
		const initial = getInitialSRSValues();
		const srsResult = calculateSRS({
			quality,
			easeFactor: initial.easeFactor,
			intervalDays: initial.intervalDays,
			reviewCount: initial.reviewCount,
		});

		await db.insert(vocabularySkills).values({
			userId,
			vocabularyId,
			skillType,
			easeFactor: srsResult.nextEaseFactor,
			intervalDays: srsResult.nextIntervalDays,
			nextReviewAt: srsResult.nextReviewAt,
			reviewCount: 1,
			lastReviewedAt: new Date(),
		});
	}
};

interface UpdateWeakAreaInput {
	userId: number;
	areaType: AreaType;
	areaIdentifier: string;
	isCorrect: boolean;
}

const updateWeakArea = async (input: UpdateWeakAreaInput) => {
	const { userId, areaType, areaIdentifier, isCorrect } = input;

	const [existingArea] = await db
		.select()
		.from(weakAreas)
		.where(
			and(
				eq(weakAreas.userId, userId),
				eq(weakAreas.areaType, areaType),
				eq(weakAreas.areaIdentifier, areaIdentifier),
			),
		);

	if (isCorrect) {
		if (existingArea) {
			if (existingArea.mistakeCount <= 1) {
				await db.delete(weakAreas).where(eq(weakAreas.id, existingArea.id));
			} else {
				await db
					.update(weakAreas)
					.set({
						mistakeCount: existingArea.mistakeCount - 1,
						needsFocus: existingArea.mistakeCount - 1 >= 3,
					})
					.where(eq(weakAreas.id, existingArea.id));
			}
		}
	} else {
		if (existingArea) {
			await db
				.update(weakAreas)
				.set({
					mistakeCount: existingArea.mistakeCount + 1,
					lastMistakeAt: new Date(),
					needsFocus: true,
				})
				.where(eq(weakAreas.id, existingArea.id));
		} else {
			await db.insert(weakAreas).values({
				userId,
				areaType,
				areaIdentifier,
				mistakeCount: 1,
				needsFocus: false,
			});
		}
	}
};

export const completeSession = async (input: CompleteSessionInput) => {
	const [session] = await db
		.update(practiceSessions)
		.set({
			totalQuestions: input.totalQuestions,
			correctAnswers: input.correctAnswers,
			completedAt: new Date(),
		})
		.where(eq(practiceSessions.id, input.sessionId))
		.returning();

	return session;
};

// ═══════════════════════════════════════════════════════════════════════════════
// ACTION HANDLERS
// ═══════════════════════════════════════════════════════════════════════════════

type ActionSuccess = { success: true } & Record<string, unknown>;
type ActionError = { success: false; error: string };
type ActionResult = ActionSuccess | ActionError;

function createHandler<TSchema extends ZodSchema>(
	schema: TSchema,
	handler: (data: z.infer<TSchema>) => Promise<ActionSuccess>,
) {
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
}

// ─── Schemas ───────────────────────────────────────────────────────────────────

const createUserSchema = zfd.formData({
	displayName: zfd.text(z.string().min(1, "Name is required")),
	code: zfd.text(z.string().min(1, "Code is required")),
});

const startSessionSchema = zfd.formData({
	userId: zfd.numeric(),
	sessionType: zfd.text(
		z.enum([
			"vocab_quiz",
			"case_drill",
			"conjugation_drill",
			"weak_area_focus",
		]),
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
	weakAreaType: zfd
		.text(z.enum(["case", "gender", "verb_family"]).optional())
		.optional(),
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
		const normalizedCode = data.code.toLowerCase();

		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.code, normalizedCode));

		if (existingUser.length > 0) {
			throw new Error("A user with this code already exists");
		}

		const [newUser] = await db
			.insert(users)
			.values({ displayName: data.displayName, code: normalizedCode })
			.returning();

		return { success: true, user: newUser };
	}),

	startSession: createHandler(startSessionSchema, async (data) => {
		const session = await startSession({
			userId: data.userId,
			sessionType: data.sessionType,
			category: data.category,
			focusArea: data.focusArea,
		});
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
export type ActionHandlerResult = Awaited<
	ReturnType<(typeof actionHandlers)[ActionIntent]>
>;
