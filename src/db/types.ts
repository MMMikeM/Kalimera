import type {
	exampleSentences,
	grammarPatterns,
	nounDetails,
	practiceAttempts,
	practiceSessions,
	tags,
	verbDetails,
	vocabulary,
	vocabularySkills,
	vocabularyTags,
	weakAreas,
} from "./schema";

// Inferred select types (what you get when querying)
export type Vocabulary = typeof vocabulary.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type VocabularyTag = typeof vocabularyTags.$inferSelect;
export type NounDetails = typeof nounDetails.$inferSelect;
export type VerbDetails = typeof verbDetails.$inferSelect;
export type PracticeSession = typeof practiceSessions.$inferSelect;
export type PracticeAttempt = typeof practiceAttempts.$inferSelect;
export type WeakArea = typeof weakAreas.$inferSelect;
export type VocabularySkill = typeof vocabularySkills.$inferSelect;
export type GrammarPattern = typeof grammarPatterns.$inferSelect;
export type ExampleSentence = typeof exampleSentences.$inferSelect;

// Inferred insert types (what you provide when inserting)
export type NewVocabulary = typeof vocabulary.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewVocabularyTag = typeof vocabularyTags.$inferInsert;
export type NewNounDetails = typeof nounDetails.$inferInsert;
export type NewVerbDetails = typeof verbDetails.$inferInsert;
export type NewPracticeSession = typeof practiceSessions.$inferInsert;
export type NewPracticeAttempt = typeof practiceAttempts.$inferInsert;
export type NewWeakArea = typeof weakAreas.$inferInsert;
export type NewVocabularySkill = typeof vocabularySkills.$inferInsert;
export type NewGrammarPattern = typeof grammarPatterns.$inferInsert;
export type NewExampleSentence = typeof exampleSentences.$inferInsert;
