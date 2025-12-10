import type {
	practiceAttempts,
	practiceSessions,
	tags,
	tagSections,
	verbDetails,
	vocabulary,
	vocabularySkills,
	vocabularyTags,
	weakAreas,
} from "./schema";

// Inferred select types (what you get when querying)
export type Vocabulary = typeof vocabulary.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type TagSection = typeof tagSections.$inferSelect;
export type VocabularyTag = typeof vocabularyTags.$inferSelect;
export type VerbDetails = typeof verbDetails.$inferSelect;
export type PracticeSession = typeof practiceSessions.$inferSelect;
export type PracticeAttempt = typeof practiceAttempts.$inferSelect;
export type WeakArea = typeof weakAreas.$inferSelect;
export type VocabularySkill = typeof vocabularySkills.$inferSelect;

// Inferred insert types (what you provide when inserting)
export type NewVocabulary = typeof vocabulary.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewTagSection = typeof tagSections.$inferInsert;
export type NewVocabularyTag = typeof vocabularyTags.$inferInsert;
export type NewVerbDetails = typeof verbDetails.$inferInsert;
export type NewPracticeSession = typeof practiceSessions.$inferInsert;
export type NewPracticeAttempt = typeof practiceAttempts.$inferInsert;
export type NewWeakArea = typeof weakAreas.$inferInsert;
export type NewVocabularySkill = typeof vocabularySkills.$inferInsert;
