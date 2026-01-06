import { index, integer, primaryKey, real, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import {
	bool,
	cascadeFk,
	createdAt,
	json,
	nullableBool,
	nullableFk,
	nullableInt,
	nullableOneOf,
	nullableString,
	nullableTimestamp,
	oneOf,
	pk,
	string,
	timestamp,
} from "./columns";
import {
	areaTypes,
	type AuthenticatorTransport,
	challengeTypes,
	declensionPatterns,
	displaySections,
	genders,
	grammaticalNumbers,
	imperativeAspects,
	personNumbers,
	sessionTypes,
	skillTypes,
	verbTenses,
	wordTypes,
} from "./enums";
import type { VocabMetadata } from "./metadata";

// Domain-specific: SRS (Spaced Repetition System) - used in vocabularySkills
const intervalDays = integer("interval_days").default(1);
const reviewCount = integer("review_count").default(0);

// Re-export enums for convenience
export * from "./enums";

// ============================================
// USERS TABLE
// ============================================
export const users = sqliteTable(
	"users",
	{
		id: pk(),
		code: string("code"),
		username: nullableString("username"), // For login (nullable during migration, will become NOT NULL)
		displayName: string("display_name"),
		passwordHash: nullableString("password_hash"), // SHA-256 hash for password fallback
		createdAt: createdAt(),
		// Streak freeze feature
		freezeCount: integer("freeze_count").notNull().default(0),
		lastFreezeUsedAt: nullableTimestamp("last_freeze_used_at"),
		freezeUsedForDate: nullableString("freeze_used_for_date"), // ISO date string like "2026-01-05"
		consecutiveDaysAtEarn: integer("consecutive_days_at_earn").notNull().default(0),
	},
	(table) => [
		uniqueIndex("idx_users_code").on(table.code),
		uniqueIndex("idx_users_username").on(table.username),
	],
);

// ============================================
// VOCABULARY TABLE
// ============================================
export const vocabulary = sqliteTable(
	"vocabulary",
	{
		id: pk(),
		greekText: string("greek_text"),
		englishTranslation: string("english_translation"),
		wordType: oneOf("word_type", wordTypes),
		difficultyLevel: integer("difficulty_level").notNull().default(0),
		createdAt: createdAt(),
		gender: nullableOneOf("gender", genders), // Only for nouns
		declensionPattern: nullableOneOf("declension_pattern", declensionPatterns), // Only for nouns
		metadata: json<VocabMetadata>("metadata"), // Sparse, tag-specific data (timeRange, numericValue, etc.)
	},
	(table) => [
		index("idx_vocabulary_word_type").on(table.wordType),
		index("idx_vocabulary_difficulty").on(table.difficultyLevel),
		uniqueIndex("idx_vocabulary_greek_text").on(table.greekText),
	],
);

// ============================================
// TAGS TABLE
// ============================================
export const tags = sqliteTable(
	"tags",
	{
		id: pk(),
		slug: string("slug"),
		name: string("name"),
		description: nullableString("description"),
		createdAt: createdAt(),
	},
	(table) => [uniqueIndex("idx_tags_slug").on(table.slug)],
);

// ============================================
// TAG_SECTIONS TABLE (Lookup table for UI display organization)
// ============================================
export const tagSections = sqliteTable("tag_sections", {
	tagId: cascadeFk("tag_id", () => tags.id).primaryKey(),
	section: oneOf("section", displaySections), // 'nouns' | 'verbs' | 'phrases' | 'reference'
	displayOrder: integer("display_order").default(0),
});

// ============================================
// VOCABULARY_TAGS (Join Table)
// ============================================
export const vocabularyTags = sqliteTable(
	"vocabulary_tags",
	{
		vocabularyId: cascadeFk("vocabulary_id", () => vocabulary.id),
		tagId: cascadeFk("tag_id", () => tags.id),
	},
	(table) => [
		primaryKey({ columns: [table.vocabularyId, table.tagId] }),
		index("idx_vocabulary_tags_tag").on(table.tagId),
	],
);

// ============================================
// VERB_DETAILS TABLE (Extension table for verb-specific data)
// ============================================
export const verbDetails = sqliteTable("verb_details", {
	vocabId: cascadeFk("vocab_id", () => vocabulary.id).primaryKey(),
	conjugationFamily: string("conjugation_family"),
	notes: nullableString("notes"),
	presentStem: nullableString("present_stem"),
	aoristStem: nullableString("aorist_stem"),
	futureStem: nullableString("future_stem"),
	isSuppletive: nullableBool("is_suppletive"),
});

// ============================================
// VERB_CONJUGATIONS TABLE (Full paradigm forms for each tense)
// ============================================
export const verbConjugations = sqliteTable(
	"verb_conjugations",
	{
		id: pk(),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		tense: oneOf("tense", verbTenses),
		person: oneOf("person", personNumbers),
		form: string("form"),
		stem: nullableString("stem"),
		ending: nullableString("ending"),
	},
	(table) => [
		index("idx_verb_conjugations_vocab").on(table.vocabId),
		index("idx_verb_conjugations_vocab_tense").on(table.vocabId, table.tense),
		uniqueIndex("idx_verb_conjugations_unique").on(table.vocabId, table.tense, table.person),
	],
);

// ============================================
// VERB_IMPERATIVES TABLE (Imperative mood forms)
// ============================================
export const verbImperatives = sqliteTable(
	"verb_imperatives",
	{
		id: pk(),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		aspect: oneOf("aspect", imperativeAspects),
		number: oneOf("number", grammaticalNumbers),
		form: string("form"),
	},
	(table) => [
		index("idx_verb_imperatives_vocab").on(table.vocabId),
		uniqueIndex("idx_verb_imperatives_unique").on(table.vocabId, table.aspect, table.number),
	],
);

// ============================================
// PRACTICE_SESSIONS TABLE
// ============================================
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

// ============================================
// PRACTICE_ATTEMPTS TABLE
// ============================================
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

// ============================================
// WEAK_AREAS TABLE
// ============================================
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

// ============================================
// VOCABULARY_SKILLS TABLE
// ============================================
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
		primaryKey({ columns: [table.userId, table.vocabularyId, table.skillType] }),
		index("idx_vocabulary_skills_review").on(table.nextReviewAt),
		index("idx_vocabulary_skills_user").on(table.userId),
	],
);

// ============================================
// PUSH_SUBSCRIPTIONS TABLE
// ============================================
export const pushSubscriptions = sqliteTable(
	"push_subscriptions",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		endpoint: string("endpoint"),
		p256dh: string("p256dh"), // Client's ECDH public key
		auth: string("auth"), // Client's auth secret
		createdAt: createdAt(),
	},
	(table) => [
		index("idx_push_subscriptions_user").on(table.userId),
		uniqueIndex("idx_push_subscriptions_endpoint").on(table.endpoint),
	],
);

// ============================================
// PASSKEYS TABLE (WebAuthn credentials)
// ============================================
export const passkeys = sqliteTable(
	"passkeys",
	{
		id: pk(),
		userId: cascadeFk("user_id", () => users.id),
		credentialId: string("credential_id"), // Base64URL from WebAuthn
		publicKey: string("public_key"), // Base64URL-encoded COSE key
		counter: integer("counter").notNull().default(0),
		transports: json<AuthenticatorTransport[]>("transports"),
		deviceType: nullableString("device_type"), // "singleDevice" | "multiDevice"
		backedUp: nullableBool("backed_up"), // Credential backup status
		name: nullableString("name"), // User-friendly name like "MacBook Pro"
		lastUsedAt: nullableTimestamp("last_used_at"),
		createdAt: createdAt(),
	},
	(table) => [
		uniqueIndex("idx_passkeys_credential_id").on(table.credentialId),
		index("idx_passkeys_user").on(table.userId),
	],
);

// ============================================
// AUTH_CHALLENGES TABLE (Short-lived WebAuthn challenges)
// ============================================
export const authChallenges = sqliteTable(
	"auth_challenges",
	{
		id: pk(),
		challenge: string("challenge"), // Random Base64URL string
		type: oneOf("type", challengeTypes), // "registration" | "authentication"
		userId: nullableFk("user_id", () => users.id),
		expiresAt: timestamp("expires_at"), // Always set TTL (5 min)
		createdAt: createdAt(),
	},
	(table) => [
		uniqueIndex("idx_auth_challenges_challenge").on(table.challenge),
		index("idx_auth_challenges_expires").on(table.expiresAt),
	],
);

// Types are exported from ./types.ts
export * from "./types";
