import { index, integer, primaryKey, real, sqliteTable } from "drizzle-orm/sqlite-core";

import {
	bool,
	cascadeFk,
	createdAt,
	nullableBool,
	nullableFk,
	nullableString,
	nullableTimestamp,
	oneOf,
	pk,
	string,
	updatedAt,
} from "./columns";
import { cefrLevels } from "./enums";
import { users } from "./schema-auth";
import { vocabulary } from "./schema-language";

// Domain-specific: SRS (Spaced Repetition System) - used in vocabularyReviews
const intervalDays = integer("interval_days").default(1);
const reviewCount = integer("review_count").default(0);

export const practiceSessions = sqliteTable(
	"practice_sessions",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		totalQuestions: integer("total_questions").notNull().default(0),
		correctAnswers: integer("correct_answers").notNull().default(0),
		startedAt: createdAt("started_at"),
		completedAt: nullableTimestamp("completed_at"),
	},
	(table) => [index("idx_practice_sessions_user_completed").on(table.userId, table.completedAt)],
);

export const practiceAttempts = sqliteTable(
	"practice_attempts",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		sessionId: nullableFk("session_id", () => practiceSessions.id),
		vocabId: nullableFk("vocab_id", () => vocabulary.id),
		drillId: nullableString("drill_id"),
		questionText: string("question_text"),
		correctAnswer: string("correct_answer"),
		userAnswer: nullableString("user_answer"),
		isCorrect: nullableBool("is_correct"),
		timeTaken: integer("time_taken"),
		attemptedAt: createdAt("attempted_at"),
	},
	(table) => [
		index("idx_practice_attempts_session").on(table.sessionId),
		index("idx_practice_attempts_vocab").on(table.vocabId),
		index("idx_practice_attempts_drill").on(table.userId, table.drillId, table.attemptedAt),
	],
);

/** SM-2 review schedule per (user, vocab). Powers dashboard due-count and push notifications. */
export const vocabProgress = sqliteTable(
	"vocabulary_progress",
	{
		userId: cascadeFk("user_id", () => users.id),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		nextReviewAt: nullableTimestamp("next_review_at"),
		intervalDays: intervalDays,
		easeFactor: real("ease_factor").default(2.3),
		reviewCount: reviewCount,
		lastReviewedAt: nullableTimestamp("last_reviewed_at"),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.vocabId] }),
		index("idx_vocabulary_progress_user_review").on(table.userId, table.nextReviewAt),
	],
);

export const userProgress = sqliteTable(
	"user_progress",
	{
		userId: cascadeFk("user_id", () => users.id),
		currentCefrLevel: oneOf("current_cefr_level", cefrLevels).default("A1"),
		updatedAt: updatedAt(),
	},
	(t) => [primaryKey({ columns: [t.userId] })],
);

export const drillDailyResults = sqliteTable(
	"drill_daily_results",
	{
		userId: cascadeFk("user_id", () => users.id),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		drillId: string("drill_id"),
		practicedDate: string("practiced_date"), // YYYY-MM-DD UTC
		correctFirstTry: bool("correct_first_try"),
		createdAt: createdAt(),
	},
	(t) => [
		primaryKey({ columns: [t.userId, t.vocabId, t.drillId, t.practicedDate] }),
		index("idx_drill_daily_user_drill").on(t.userId, t.drillId),
	],
);

/** Per-drill tier mastery schedule. Powers getDrillVocabPool bucket assignment. */
export const drillProgress = sqliteTable(
	"drill_progress",
	{
		userId: cascadeFk("user_id", () => users.id),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		drillId: string("drill_id"),
		tier: integer("tier").notNull().default(1),
		masteredAt: nullableTimestamp("mastered_at"),
		nextReviewAt: nullableTimestamp("next_review_at"),
	},
	(t) => [
		primaryKey({ columns: [t.userId, t.vocabId, t.drillId] }),
		index("idx_drill_progress_review").on(t.userId, t.drillId, t.nextReviewAt),
	],
);
