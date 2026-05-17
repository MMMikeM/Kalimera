import { sql } from "drizzle-orm";
import {
	sqliteTable,
	primaryKey,
	index,
	uniqueIndex,
	integer,
	text,
	real,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
	"users",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		code: text().notNull(),
		displayName: text("display_name").notNull(),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
		freezeCount: integer("freeze_count").default(0).notNull(),
		lastFreezeUsedAt: integer("last_freeze_used_at"),
		freezeUsedForDate: text("freeze_used_for_date"),
		consecutiveDaysAtEarn: integer("consecutive_days_at_earn").default(0).notNull(),
		username: text(),
		passwordHash: text("password_hash"),
	},
	(table) => [
		uniqueIndex("idx_users_username").on(table.username),
		uniqueIndex("idx_users_code").on(table.code),
	],
);

export const tags = sqliteTable(
	"tags",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		slug: text().notNull(),
		name: text().notNull(),
		description: text(),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
		section: text(),
		sectionDisplayOrder: integer("section_display_order"),
	},
	(table) => [
		index("idx_tags_section_order").on(table.section, table.sectionDisplayOrder),
		uniqueIndex("idx_tags_slug").on(table.slug),
	],
);

export const practiceAttempts = sqliteTable(
	"practice_attempts",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		sessionId: integer("session_id").references(() => practiceSessions.id, {
			onDelete: "set null",
		}),
		vocabId: integer("vocab_id").references(() => vocabulary.id, { onDelete: "set null" }),
		questionText: text("question_text").notNull(),
		correctAnswer: text("correct_answer").notNull(),
		userAnswer: text("user_answer"),
		isCorrect: integer("is_correct"),
		timeTaken: integer("time_taken"),
		attemptedAt: integer("attempted_at")
			.default(sql`unixepoch()`)
			.notNull(),
		drillId: text("drill_id"),
	},
	(table) => [
		index("idx_practice_attempts_drill").on(table.userId, table.drillId, table.attemptedAt),
		index("idx_practice_attempts_vocab").on(table.vocabId),
		index("idx_practice_attempts_session").on(table.sessionId),
	],
);

export const pushSubscriptions = sqliteTable(
	"push_subscriptions",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		endpoint: text().notNull(),
		p256Dh: text().notNull(),
		auth: text().notNull(),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
		snoozedUntil: integer("snoozed_until"),
		notificationMode: text("notification_mode").default("adaptive").notNull(),
		taperOfferPending: integer("taper_offer_pending", { mode: "boolean" }).default(false).notNull(),
	},
	(table) => [
		uniqueIndex("idx_push_subscriptions_endpoint").on(table.endpoint),
		index("idx_push_subscriptions_user").on(table.userId),
	],
);

export const verbDetails = sqliteTable("verb_details", {
	vocabId: integer("vocab_id")
		.primaryKey()
		.references(() => vocabulary.id, { onDelete: "cascade" }),
	conjugationFamily: text("conjugation_family").notNull(),
	notes: text(),
	presentStem: text("present_stem"),
	aoristStem: text("aorist_stem"),
	futureStem: text("future_stem"),
	isSuppletive: integer("is_suppletive"),
});

export const vocabularyTags = sqliteTable(
	"vocabulary_tags",
	{
		vocabularyId: integer("vocabulary_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		tagId: integer("tag_id")
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
		displayOrder: integer("display_order"),
	},
	(table) => [
		index("idx_vocabulary_tags_tag_order").on(table.tagId, table.displayOrder),
		index("idx_vocabulary_tags_tag").on(table.tagId),
		primaryKey({ columns: [table.vocabularyId, table.tagId], name: "vocabulary_tags_pk" }),
	],
);

export const verbConjugations = sqliteTable(
	"verb_conjugations",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		vocabId: integer("vocab_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		tense: text().notNull(),
		person: text().notNull(),
		form: text().notNull(),
		stem: text(),
		ending: text(),
	},
	(table) => [
		uniqueIndex("idx_verb_conjugations_unique").on(table.vocabId, table.tense, table.person),
		index("idx_verb_conjugations_vocab_tense").on(table.vocabId, table.tense),
		index("idx_verb_conjugations_vocab").on(table.vocabId),
	],
);

export const verbImperatives = sqliteTable(
	"verb_imperatives",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		vocabId: integer("vocab_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		aspect: text().notNull(),
		number: text().notNull(),
		form: text().notNull(),
	},
	(table) => [
		uniqueIndex("idx_verb_imperatives_unique").on(table.vocabId, table.aspect, table.number),
		index("idx_verb_imperatives_vocab").on(table.vocabId),
	],
);

export const authChallenges = sqliteTable(
	"auth_challenges",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		challenge: text().notNull(),
		type: text().notNull(),
		userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
		expiresAt: integer("expires_at").notNull(),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
	},
	(table) => [
		index("idx_auth_challenges_expires").on(table.expiresAt),
		uniqueIndex("idx_auth_challenges_challenge").on(table.challenge),
	],
);

export const passkeys = sqliteTable(
	"passkeys",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		credentialId: text("credential_id").notNull(),
		publicKey: text("public_key").notNull(),
		counter: integer().default(0).notNull(),
		transports: text(),
		deviceType: text("device_type"),
		backedUp: integer("backed_up"),
		name: text(),
		lastUsedAt: integer("last_used_at"),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
	},
	(table) => [
		index("idx_passkeys_user").on(table.userId),
		uniqueIndex("idx_passkeys_credential_id").on(table.credentialId),
	],
);

export const notificationLogs = sqliteTable(
	"notification_logs",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		sentAt: integer("sent_at"),
		type: text().notNull(),
		tappedAction: text("tapped_action"),
		tappedAt: integer("tapped_at"),
	},
	(table) => [
		index("idx_notification_logs_sent_at").on(table.sentAt),
		index("idx_notification_logs_user").on(table.userId),
	],
);

export const nominalForms = sqliteTable(
	"nominal_forms",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		vocabId: integer("vocab_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		grammaticalCase: text("grammatical_case").notNull(),
		number: text().notNull(),
		form: text().notNull(),
		article: text(),
		gender: text(),
		genderKey: text("gender_key").default("").notNull(),
	},
	(table) => [
		uniqueIndex("idx_nominal_forms_unique").on(
			table.vocabId,
			table.grammaticalCase,
			table.number,
			table.genderKey,
		),
		index("idx_nominal_forms_vocab").on(table.vocabId),
	],
);

export const adjectiveDetails = sqliteTable("adjective_details", {
	vocabId: integer("vocab_id")
		.primaryKey()
		.references(() => vocabulary.id, { onDelete: "cascade" }),
	pattern: text().notNull(),
});

export const nounDetails = sqliteTable("noun_details", {
	vocabId: integer("vocab_id")
		.primaryKey()
		.references(() => vocabulary.id, { onDelete: "cascade" }),
	gender: text().notNull(),
	declensionPattern: text("declension_pattern").notNull(),
});

export const vocabulary = sqliteTable(
	"vocabulary",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		greekText: text("greek_text").notNull(),
		englishTranslation: text("english_translation").notNull(),
		wordType: text("word_type").notNull(),
		cefrLevel: text("cefr_level"),
		frequencyRank: integer("frequency_rank"),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
		metadata: text(),
	},
	(table) => [
		uniqueIndex("idx_vocabulary_greek_text").on(table.greekText),
		index("idx_vocabulary_cefr").on(table.cefrLevel),
		index("idx_vocabulary_word_type").on(table.wordType),
	],
);

export const userProgress = sqliteTable("user_progress", {
	userId: integer("user_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	currentCefrLevel: text("current_cefr_level").default("A1").notNull(),
	updatedAt: integer("updated_at"),
});

export const vocabDailyResults = sqliteTable(
	"vocab_daily_results",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		vocabId: integer("vocab_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		drillId: text("drill_id").notNull(),
		practicedDate: text("practiced_date").notNull(),
		correctFirstTry: integer("correct_first_try").notNull(),
		createdAt: integer("created_at")
			.default(sql`unixepoch()`)
			.notNull(),
	},
	(table) => [
		index("idx_vocab_daily_user_drill").on(table.userId, table.drillId),
		primaryKey({
			columns: [table.userId, table.vocabId, table.drillId, table.practicedDate],
			name: "vocab_daily_results_pk",
		}),
	],
);

export const vocabMastery = sqliteTable(
	"vocab_mastery",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		vocabId: integer("vocab_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		drillId: text("drill_id").notNull(),
		tier: integer().default(1).notNull(),
		masteredAt: integer("mastered_at"),
		nextReviewAt: integer("next_review_at"),
	},
	(table) => [
		index("idx_vocab_mastery_review").on(table.userId, table.drillId, table.nextReviewAt),
		primaryKey({ columns: [table.userId, table.vocabId, table.drillId], name: "vocab_mastery_pk" }),
	],
);

export const vocabularyReviews = sqliteTable(
	"vocabulary_reviews",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		vocabId: integer("vocab_id")
			.notNull()
			.references(() => vocabulary.id, { onDelete: "cascade" }),
		nextReviewAt: integer("next_review_at"),
		intervalDays: integer("interval_days").default(1),
		easeFactor: real("ease_factor").default(2.3),
		reviewCount: integer("review_count").default(0),
		lastReviewedAt: integer("last_reviewed_at"),
	},
	(table) => [
		index("idx_vocabulary_reviews_user_review").on(table.userId, table.nextReviewAt),
		primaryKey({ columns: [table.userId, table.vocabId], name: "vocabulary_reviews_pk" }),
	],
);

export const practiceSessions = sqliteTable(
	"practice_sessions",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		totalQuestions: integer("total_questions").default(0).notNull(),
		correctAnswers: integer("correct_answers").default(0).notNull(),
		startedAt: integer("started_at")
			.default(sql`unixepoch()`)
			.notNull(),
		completedAt: integer("completed_at"),
	},
	(table) => [index("idx_practice_sessions_user_completed").on(table.userId, table.completedAt)],
);
