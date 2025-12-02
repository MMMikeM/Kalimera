import { relations } from "drizzle-orm";
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
} from "./columns";
import {
	areaTypes,
	caseTypes,
	genders,
	sessionTypes,
	skillTypes,
	statuses,
	wordTypes,
} from "./enums";

// Domain-specific: SRS (Spaced Repetition System)
const easeFactor = real("ease_factor").default(2.5);
const intervalDays = integer("interval_days").default(1);
const reviewCount = integer("review_count").default(0);
const mistakeCount = integer("mistake_count").default(0);
const difficultyLevel = integer("difficulty_level").notNull().default(0);

// Re-export enums for convenience
export * from "./enums";

// ============================================
// VOCABULARY TABLE
// ============================================
export const vocabulary = sqliteTable(
	"vocabulary",
	{
		id: pk(),
		greekText: string("greek_text"),
		englishTranslation: string("english_translation"),
		pronunciation: nullableString("pronunciation"),
		wordType: nullableOneOf("word_type", wordTypes),
		category: nullableString("category"),
		exampleGreek: nullableString("example_greek"),
		exampleEnglish: nullableString("example_english"),
		status: oneOf("status", statuses).default("unprocessed"),
		difficultyLevel: difficultyLevel,
		isProblemWord: bool("is_problem_word").default(false),
		mistakeCount: mistakeCount,
		reviewCount: reviewCount,
		lastReviewed: nullableTimestamp("last_reviewed"),
		createdAt: createdAt(),
		gender: nullableOneOf("gender", genders),
		metadata: json<Record<string, unknown>>("metadata"),
		nextReviewAt: nullableTimestamp("next_review_at"),
		intervalDays: intervalDays,
		easeFactor: easeFactor,
	},
	(table) => [
		index("idx_vocabulary_category").on(table.category),
		index("idx_vocabulary_word_type").on(table.wordType),
		index("idx_vocabulary_difficulty").on(table.difficultyLevel),
		index("idx_vocabulary_review").on(table.nextReviewAt),
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
		slug: string("slug").unique(),
		name: string("name"),
		description: nullableString("description"),
		isSystem: bool("is_system").default(true),
		createdAt: createdAt(),
	},
	(table) => [index("idx_tags_is_system").on(table.isSystem)],
);

// ============================================
// VOCABULARY_TAGS (Join Table)
// ============================================
export const vocabularyTags = sqliteTable(
	"vocabulary_tags",
	{
		vocabularyId: cascadeFk("vocabulary_id", () => vocabulary.id),
		tagId: cascadeFk("tag_id", () => tags.id),
	},
	(table) => [primaryKey({ columns: [table.vocabularyId, table.tagId] })],
);

// ============================================
// NOUN_DETAILS TABLE
// ============================================
export const nounDetails = sqliteTable("noun_details", {
	vocabId: cascadeFk("vocab_id", () => vocabulary.id).primaryKey(),
	gender: oneOf("gender", genders),
	nominativeSingular: string("nominative_singular"),
	accusativeSingular: nullableString("accusative_singular"),
	genitiveSingular: nullableString("genitive_singular"),
	nominativePlural: nullableString("nominative_plural"),
	accusativePlural: nullableString("accusative_plural"),
	genitivePlural: nullableString("genitive_plural"),
	notes: nullableString("notes"),
});

// ============================================
// VERB_DETAILS TABLE
// ============================================
export const verbDetails = sqliteTable("verb_details", {
	vocabId: cascadeFk("vocab_id", () => vocabulary.id).primaryKey(),
	infinitive: string("infinitive"),
	conjugationFamily: string("conjugation_family"),
	notes: nullableString("notes"),
	presentEgo: nullableString("present_ego"),
	presentEsy: nullableString("present_esy"),
	presentAftos: nullableString("present_aftos"),
	presentEmeis: nullableString("present_emeis"),
	presentEseis: nullableString("present_eseis"),
	presentAftoi: nullableString("present_aftoi"),
	pastEgo: nullableString("past_ego"),
	pastEsy: nullableString("past_esy"),
	pastAftos: nullableString("past_aftos"),
	pastEmeis: nullableString("past_emeis"),
	pastEseis: nullableString("past_eseis"),
	pastAftoi: nullableString("past_aftoi"),
	futureEgo: nullableString("future_ego"),
	futureEsy: nullableString("future_esy"),
	futureAftos: nullableString("future_aftos"),
	futureEmeis: nullableString("future_emeis"),
	futureEseis: nullableString("future_eseis"),
	futureAftoi: nullableString("future_aftoi"),
});

// ============================================
// PRACTICE_SESSIONS TABLE
// ============================================
export const practiceSessions = sqliteTable("practice_sessions", {
	id: pk(),
	sessionType: nullableOneOf("session_type", sessionTypes),
	category: nullableString("category"),
	wordTypeFilter: nullableString("word_type_filter"),
	totalQuestions: nullableInt("total_questions"),
	correctAnswers: nullableInt("correct_answers"),
	focusArea: nullableString("focus_area"),
	startedAt: createdAt("started_at"),
	completedAt: nullableTimestamp("completed_at"),
});

// ============================================
// PRACTICE_ATTEMPTS TABLE
// ============================================
export const practiceAttempts = sqliteTable("practice_attempts", {
	id: pk(),
	sessionId: nullableFk("session_id", () => practiceSessions.id),
	vocabularyId: nullableFk("vocabulary_id", () => vocabulary.id),
	questionText: string("question_text"),
	correctAnswer: string("correct_answer"),
	userAnswer: nullableString("user_answer"),
	isCorrect: nullableBool("is_correct"),
	timeTaken: nullableInt("time_taken"),
	attemptedAt: createdAt("attempted_at"),
});

// ============================================
// WEAK_AREAS TABLE
// ============================================
export const weakAreas = sqliteTable("weak_areas", {
	id: pk(),
	areaType: oneOf("area_type", areaTypes),
	areaIdentifier: string("area_identifier"),
	mistakeCount: integer("mistake_count").notNull().default(1),
	lastMistakeAt: createdAt("last_mistake_at"),
	needsFocus: bool("needs_focus").default(true),
});

// ============================================
// VOCABULARY_SKILLS TABLE
// ============================================
export const vocabularySkills = sqliteTable(
	"vocabulary_skills",
	{
		vocabularyId: cascadeFk("vocabulary_id", () => vocabulary.id),
		skillType: oneOf("skill_type", skillTypes),
		nextReviewAt: nullableTimestamp("next_review_at"),
		intervalDays: intervalDays,
		easeFactor: easeFactor,
		reviewCount: reviewCount,
		lastReviewedAt: nullableTimestamp("last_reviewed_at"),
	},
	(table) => [
		primaryKey({ columns: [table.vocabularyId, table.skillType] }),
		index("idx_vocabulary_skills_review").on(table.nextReviewAt),
	],
);

// ============================================
// GRAMMAR_PATTERNS TABLE
// ============================================
export const grammarPatterns = sqliteTable(
	"grammar_patterns",
	{
		id: pk(),
		caseType: oneOf("case_type", caseTypes),
		context: string("context"),
		greek: string("greek"),
		english: string("english"),
		explanation: nullableString("explanation"),
		whyThisCase: nullableString("why_this_case"),
		nextReviewAt: nullableTimestamp("next_review_at"),
		intervalDays: intervalDays,
		easeFactor: easeFactor,
		reviewCount: reviewCount,
		createdAt: createdAt(),
	},
	(table) => [
		index("idx_grammar_patterns_case").on(table.caseType),
		index("idx_grammar_patterns_review").on(table.nextReviewAt),
	],
);

// ============================================
// EXAMPLE_SENTENCES TABLE
// ============================================
export const exampleSentences = sqliteTable(
	"example_sentences",
	{
		id: pk(),
		vocabularyId: cascadeFk("vocabulary_id", () => vocabulary.id),
		greekText: string("greek_text"),
		englishText: string("english_text"),
		audioUrl: nullableString("audio_url"),
		source: nullableString("source"),
		grammarPatternId: nullableFk("grammar_pattern_id", () => grammarPatterns.id),
		createdAt: createdAt(),
	},
	(table) => [index("idx_example_sentences_vocab").on(table.vocabularyId)],
);

// ============================================
// RELATIONS
// ============================================
export const vocabularyRelations = relations(vocabulary, ({ one, many }) => ({
	nounDetails: one(nounDetails, {
		fields: [vocabulary.id],
		references: [nounDetails.vocabId],
	}),
	verbDetails: one(verbDetails, {
		fields: [vocabulary.id],
		references: [verbDetails.vocabId],
	}),
	vocabularyTags: many(vocabularyTags),
	vocabularySkills: many(vocabularySkills),
	exampleSentences: many(exampleSentences),
	practiceAttempts: many(practiceAttempts),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	vocabularyTags: many(vocabularyTags),
}));

export const vocabularyTagsRelations = relations(vocabularyTags, ({ one }) => ({
	vocabulary: one(vocabulary, {
		fields: [vocabularyTags.vocabularyId],
		references: [vocabulary.id],
	}),
	tag: one(tags, {
		fields: [vocabularyTags.tagId],
		references: [tags.id],
	}),
}));

export const nounDetailsRelations = relations(nounDetails, ({ one }) => ({
	vocabulary: one(vocabulary, {
		fields: [nounDetails.vocabId],
		references: [vocabulary.id],
	}),
}));

export const verbDetailsRelations = relations(verbDetails, ({ one }) => ({
	vocabulary: one(vocabulary, {
		fields: [verbDetails.vocabId],
		references: [vocabulary.id],
	}),
}));

export const practiceSessionsRelations = relations(practiceSessions, ({ many }) => ({
	attempts: many(practiceAttempts),
}));

export const practiceAttemptsRelations = relations(practiceAttempts, ({ one }) => ({
	session: one(practiceSessions, {
		fields: [practiceAttempts.sessionId],
		references: [practiceSessions.id],
	}),
	vocabulary: one(vocabulary, {
		fields: [practiceAttempts.vocabularyId],
		references: [vocabulary.id],
	}),
}));

export const vocabularySkillsRelations = relations(vocabularySkills, ({ one }) => ({
	vocabulary: one(vocabulary, {
		fields: [vocabularySkills.vocabularyId],
		references: [vocabulary.id],
	}),
}));

export const grammarPatternsRelations = relations(grammarPatterns, ({ many }) => ({
	exampleSentences: many(exampleSentences),
}));

export const exampleSentencesRelations = relations(exampleSentences, ({ one }) => ({
	vocabulary: one(vocabulary, {
		fields: [exampleSentences.vocabularyId],
		references: [vocabulary.id],
	}),
	grammarPattern: one(grammarPatterns, {
		fields: [exampleSentences.grammarPatternId],
		references: [grammarPatterns.id],
	}),
}));

// Types are exported from ./types.ts
export * from "./types";
