import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	practiceAttempts: {
		vocabulary: r.one.vocabulary({
			from: r.practiceAttempts.vocabId,
			to: r.vocabulary.id
		}),
		practiceSession: r.one.practiceSessions({
			from: r.practiceAttempts.sessionId,
			to: r.practiceSessions.id
		}),
		user: r.one.users({
			from: r.practiceAttempts.userId,
			to: r.users.id
		}),
	},
	vocabulary: {
		practiceAttempts: r.many.practiceAttempts(),
		verbDetails: r.many.verbDetails(),
		tags: r.many.tags(),
		verbConjugations: r.many.verbConjugations(),
		verbImperatives: r.many.verbImperatives(),
		nominalForms: r.many.nominalForms(),
		adjectiveDetails: r.many.adjectiveDetails(),
		nounDetails: r.many.nounDetails(),
		usersViaVocabDailyResults: r.many.users({
			from: r.vocabulary.id.through(r.vocabDailyResults.vocabId),
			to: r.users.id.through(r.vocabDailyResults.userId),
			alias: "vocabulary_id_users_id_via_vocabDailyResults"
		}),
		usersViaVocabMastery: r.many.users({
			from: r.vocabulary.id.through(r.vocabMastery.vocabId),
			to: r.users.id.through(r.vocabMastery.userId),
			alias: "vocabulary_id_users_id_via_vocabMastery"
		}),
		usersViaVocabularyReviews: r.many.users({
			from: r.vocabulary.id.through(r.vocabularyReviews.vocabId),
			to: r.users.id.through(r.vocabularyReviews.userId),
			alias: "vocabulary_id_users_id_via_vocabularyReviews"
		}),
	},
	practiceSessions: {
		practiceAttempts: r.many.practiceAttempts(),
		user: r.one.users({
			from: r.practiceSessions.userId,
			to: r.users.id
		}),
	},
	users: {
		practiceAttempts: r.many.practiceAttempts(),
		pushSubscriptions: r.many.pushSubscriptions(),
		authChallenges: r.many.authChallenges(),
		passkeys: r.many.passkeys(),
		notificationLogs: r.many.notificationLogs(),
		userProgresses: r.many.userProgress(),
		vocabulariesViaVocabDailyResults: r.many.vocabulary({
			alias: "vocabulary_id_users_id_via_vocabDailyResults"
		}),
		vocabulariesViaVocabMastery: r.many.vocabulary({
			alias: "vocabulary_id_users_id_via_vocabMastery"
		}),
		vocabulariesViaVocabularyReviews: r.many.vocabulary({
			alias: "vocabulary_id_users_id_via_vocabularyReviews"
		}),
		practiceSessions: r.many.practiceSessions(),
	},
	pushSubscriptions: {
		user: r.one.users({
			from: r.pushSubscriptions.userId,
			to: r.users.id
		}),
	},
	verbDetails: {
		vocabulary: r.one.vocabulary({
			from: r.verbDetails.vocabId,
			to: r.vocabulary.id
		}),
	},
	tags: {
		vocabularies: r.many.vocabulary({
			from: r.tags.id.through(r.vocabularyTags.tagId),
			to: r.vocabulary.id.through(r.vocabularyTags.vocabularyId)
		}),
	},
	verbConjugations: {
		vocabulary: r.one.vocabulary({
			from: r.verbConjugations.vocabId,
			to: r.vocabulary.id
		}),
	},
	verbImperatives: {
		vocabulary: r.one.vocabulary({
			from: r.verbImperatives.vocabId,
			to: r.vocabulary.id
		}),
	},
	authChallenges: {
		user: r.one.users({
			from: r.authChallenges.userId,
			to: r.users.id
		}),
	},
	passkeys: {
		user: r.one.users({
			from: r.passkeys.userId,
			to: r.users.id
		}),
	},
	notificationLogs: {
		user: r.one.users({
			from: r.notificationLogs.userId,
			to: r.users.id
		}),
	},
	nominalForms: {
		vocabulary: r.one.vocabulary({
			from: r.nominalForms.vocabId,
			to: r.vocabulary.id
		}),
	},
	adjectiveDetails: {
		vocabulary: r.one.vocabulary({
			from: r.adjectiveDetails.vocabId,
			to: r.vocabulary.id
		}),
	},
	nounDetails: {
		vocabulary: r.one.vocabulary({
			from: r.nounDetails.vocabId,
			to: r.vocabulary.id
		}),
	},
	userProgress: {
		user: r.one.users({
			from: r.userProgress.userId,
			to: r.users.id
		}),
	},
}))