import type {
	milestonesAchieved,
	nominalForms,
	nounDetails,
	practiceAttempts,
	practiceSessions,
	pushSubscriptions,
	tags,
	users,
	verbConjugations,
	verbDetails,
	verbImperatives,
	vocabulary,
	vocabularySkills,
	vocabularyTags,
	weakAreas,
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
export type WeakArea = typeof weakAreas.$inferSelect;
export type VocabularySkill = typeof vocabularySkills.$inferSelect;
export type PushSubscription = typeof pushSubscriptions.$inferSelect;
export type MilestoneAchieved = typeof milestonesAchieved.$inferSelect;

// Inferred insert types (what you provide when inserting)
export type NewUser = typeof users.$inferInsert;
export type NewVocabulary = typeof vocabulary.$inferInsert;
export type NewNounDetails = typeof nounDetails.$inferInsert;
export type NewNominalForm = typeof nominalForms.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewVocabularyTag = typeof vocabularyTags.$inferInsert;
export type NewVerbDetails = typeof verbDetails.$inferInsert;
export type NewVerbConjugation = typeof verbConjugations.$inferInsert;
export type NewVerbImperative = typeof verbImperatives.$inferInsert;
export type NewPracticeSession = typeof practiceSessions.$inferInsert;
export type NewPracticeAttempt = typeof practiceAttempts.$inferInsert;
export type NewWeakArea = typeof weakAreas.$inferInsert;
export type NewVocabularySkill = typeof vocabularySkills.$inferInsert;
export type NewPushSubscription = typeof pushSubscriptions.$inferInsert;
export type NewMilestoneAchieved = typeof milestonesAchieved.$inferInsert;
