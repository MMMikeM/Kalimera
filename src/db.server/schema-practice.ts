import {
	index,
	integer,
	primaryKey,
	real,
	sqliteTable,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";

import {
	bool,
	cascadeFk,
	createdAt,
	nullableBool,
	nullableFk,
	nullableInt,
	nullableOneOf,
	nullableString,
	nullableTimestamp,
	oneOf,
	pk,
	string,
	updatedAt,
} from "./columns";
import { areaTypes, cefrLevels, sessionTypes, skillTypes } from "./enums";
import { users } from "./schema-auth";
import { vocabulary } from "./schema-language";

// Domain-specific: SRS (Spaced Repetition System) - used in vocabularySkills
const intervalDays = integer("interval_days").default(1);
const reviewCount = integer("review_count").default(0);

export const practiceSessions = sqliteTable(
	"practice_sessions",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		sessionType: nullableOneOf("session_type", sessionTypes),
		category: nullableString("category"),
		wordTypeFilter: nullableString("word_type_filter"),
		totalQuestions: nullableInt("total_questions"),
		correctAnswers: nullableInt("correct_answers"),
		focusArea: nullableString("focus_area"),
		startedAt: createdAt("started_at"),
		completedAt: nullableTimestamp("completed_at"),
	},
	(table) => [
		index("idx_practice_sessions_user").on(table.userId),
		index("idx_practice_sessions_user_completed").on(table.userId, table.completedAt),
	],
);

export const practiceAttempts = sqliteTable(
	"practice_attempts",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		sessionId: nullableFk("session_id", () => practiceSessions.id),
		vocabularyId: nullableFk("vocabulary_id", () => vocabulary.id),
		questionText: string("question_text"),
		correctAnswer: string("correct_answer"),
		userAnswer: nullableString("user_answer"),
		isCorrect: nullableBool("is_correct"),
		timeTaken: nullableInt("time_taken"),
		attemptedAt: createdAt("attempted_at"),
	},
	(table) => [
		index("idx_practice_attempts_user").on(table.userId),
		index("idx_practice_attempts_session").on(table.sessionId),
		index("idx_practice_attempts_vocab").on(table.vocabularyId),
	],
);

export const weakAreas = sqliteTable(
	"weak_areas",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		areaType: oneOf("area_type", areaTypes),
		areaIdentifier: string("area_identifier"),
		mistakeCount: integer("mistake_count").notNull().default(1),
		lastMistakeAt: createdAt("last_mistake_at"),
		needsFocus: bool("needs_focus").default(true),
	},
	(table) => [
		index("idx_weak_areas_user").on(table.userId),
		uniqueIndex("idx_weak_areas_user_area").on(table.userId, table.areaType, table.areaIdentifier),
	],
);

export const vocabularySkills = sqliteTable(
	"vocabulary_skills",
	{
		userId: cascadeFk("user_id", () => users.id),
		vocabularyId: cascadeFk("vocabulary_id", () => vocabulary.id),
		skillType: oneOf("skill_type", skillTypes),
		nextReviewAt: nullableTimestamp("next_review_at"),
		intervalDays: intervalDays,
		easeFactor: real("ease_factor").default(2.3), // Start at 2.3 for new learners
		reviewCount: reviewCount,
		lastReviewedAt: nullableTimestamp("last_reviewed_at"),
	},
	(table) => [
		primaryKey({
			columns: [table.userId, table.vocabularyId, table.skillType],
		}),
		index("idx_vocabulary_skills_review").on(table.nextReviewAt),
		index("idx_vocabulary_skills_user").on(table.userId),
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

export const milestonesAchieved = sqliteTable(
	"milestones_achieved",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		milestone: integer("milestone").notNull(), // 7, 30, 100
		achievedAt: createdAt("achieved_at"),
		streakAtAchievement: integer("streak_at_achievement").notNull(),
	},
	(table) => [uniqueIndex("idx_milestones_user_milestone").on(table.userId, table.milestone)],
);
