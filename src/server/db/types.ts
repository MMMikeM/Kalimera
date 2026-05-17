import type {
	adjectiveDetails,
	nominalForms,
	nounDetails,
	practiceAttempts,
	practiceSessions,
	pushSubscriptions,
	tags,
	userProgress,
	users,
	verbConjugations,
	verbDetails,
	verbImperatives,
	vocabDailyResults,
	vocabMastery,
	vocabulary,
	vocabReviews,
	vocabularyTags,
} from "./schema";

// Inferred select types (what you get when querying)
export type User = typeof users.$inferSelect;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type NounDetails = typeof nounDetails.$inferSelect;
export type NominalForm = typeof nominalForms.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type VocabularyTag = typeof vocabularyTags.$inferSelect;
export type VerbDetails = typeof verbDetails.$inferSelect;
export type VerbConjugation = typeof verbConjugations.$inferSelect;
export type VerbImperative = typeof verbImperatives.$inferSelect;
export type PracticeSession = typeof practiceSessions.$inferSelect;
export type PracticeAttempt = typeof practiceAttempts.$inferSelect;
export type VocabReview = typeof vocabReviews.$inferSelect;
export type PushSubscription = typeof pushSubscriptions.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;

// Inferred insert types (what you provide when inserting)
export type NewUser = typeof users.$inferInsert;
export type NewVocabulary = typeof vocabulary.$inferInsert;
export type NewNounDetails = typeof nounDetails.$inferInsert;
export type NewAdjectiveDetails = typeof adjectiveDetails.$inferInsert;
export type NewNominalForm = typeof nominalForms.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewVocabularyTag = typeof vocabularyTags.$inferInsert;
export type NewVerbDetails = typeof verbDetails.$inferInsert;
export type NewVerbConjugation = typeof verbConjugations.$inferInsert;
export type NewVerbImperative = typeof verbImperatives.$inferInsert;
export type NewPracticeSession = typeof practiceSessions.$inferInsert;
export type NewPracticeAttempt = typeof practiceAttempts.$inferInsert;
export type NewVocabReview = typeof vocabReviews.$inferInsert;
export type NewPushSubscription = typeof pushSubscriptions.$inferInsert;
export type VocabDailyResult = typeof vocabDailyResults.$inferSelect;
export type NewVocabDailyResult = typeof vocabDailyResults.$inferInsert;
export type VocabMastery = typeof vocabMastery.$inferSelect;
export type NewVocabMastery = typeof vocabMastery.$inferInsert;
