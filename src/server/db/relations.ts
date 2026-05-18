import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	users: {
		practiceSessions: r.many.practiceSessions(),
		practiceAttempts: r.many.practiceAttempts(),
		vocabProgress: r.many.vocabProgress(),
		drillDailyResults: r.many.drillDailyResults(),
		drillProgress: r.many.drillProgress(),
		userProgress: r.one.userProgress({
			from: r.users.id,
			to: r.userProgress.userId,
		}),
		passkeys: r.many.passkeys(),
		authChallenges: r.many.authChallenges(),
		pushSubscriptions: r.many.pushSubscriptions(),
		notificationLogs: r.many.notificationLogs(),
	},
	vocabulary: {
		nounDetails: r.one.nounDetails({
			from: r.vocabulary.id,
			to: r.nounDetails.vocabId,
		}),
		nominalForms: r.many.nominalForms(),
		verbDetails: r.one.verbDetails({
			from: r.vocabulary.id,
			to: r.verbDetails.vocabId,
		}),
		verbConjugations: r.many.verbConjugations(),
		verbImperatives: r.many.verbImperatives(),
		vocabularyTags: r.many.vocabularyTags(),
		vocabProgress: r.many.vocabProgress(),
		practiceAttempts: r.many.practiceAttempts(),
		drillDailyResults: r.many.drillDailyResults(),
		drillProgress: r.many.drillProgress(),
	},
	nounDetails: {
		vocabulary: r.one.vocabulary({
			from: r.nounDetails.vocabId,
			to: r.vocabulary.id,
		}),
	},
	nominalForms: {
		vocabulary: r.one.vocabulary({
			from: r.nominalForms.vocabId,
			to: r.vocabulary.id,
		}),
	},
	tags: {
		vocabularyTags: r.many.vocabularyTags(),
	},
	vocabularyTags: {
		vocabulary: r.one.vocabulary({
			from: r.vocabularyTags.vocabularyId,
			to: r.vocabulary.id,
		}),
		tag: r.one.tags({
			from: r.vocabularyTags.tagId,
			to: r.tags.id,
		}),
	},
	verbDetails: {
		vocabulary: r.one.vocabulary({
			from: r.verbDetails.vocabId,
			to: r.vocabulary.id,
		}),
	},
	verbConjugations: {
		vocabulary: r.one.vocabulary({
			from: r.verbConjugations.vocabId,
			to: r.vocabulary.id,
		}),
	},
	verbImperatives: {
		vocabulary: r.one.vocabulary({
			from: r.verbImperatives.vocabId,
			to: r.vocabulary.id,
		}),
	},
	practiceSessions: {
		user: r.one.users({
			from: r.practiceSessions.userId,
			to: r.users.id,
		}),
		attempts: r.many.practiceAttempts(),
	},
	practiceAttempts: {
		user: r.one.users({
			from: r.practiceAttempts.userId,
			to: r.users.id,
		}),
		session: r.one.practiceSessions({
			from: r.practiceAttempts.sessionId,
			to: r.practiceSessions.id,
		}),
		vocabulary: r.one.vocabulary({
			from: r.practiceAttempts.vocabId,
			to: r.vocabulary.id,
		}),
	},
	vocabProgress: {
		user: r.one.users({
			from: r.vocabProgress.userId,
			to: r.users.id,
		}),
		vocabulary: r.one.vocabulary({
			from: r.vocabProgress.vocabId,
			to: r.vocabulary.id,
		}),
	},
	userProgress: {
		user: r.one.users({
			from: r.userProgress.userId,
			to: r.users.id,
		}),
	},
	drillDailyResults: {
		user: r.one.users({
			from: r.drillDailyResults.userId,
			to: r.users.id,
		}),
		vocabulary: r.one.vocabulary({
			from: r.drillDailyResults.vocabId,
			to: r.vocabulary.id,
		}),
	},
	drillProgress: {
		user: r.one.users({
			from: r.drillProgress.userId,
			to: r.users.id,
		}),
		vocabulary: r.one.vocabulary({
			from: r.drillProgress.vocabId,
			to: r.vocabulary.id,
		}),
	},
	passkeys: {
		user: r.one.users({
			from: r.passkeys.userId,
			to: r.users.id,
		}),
	},
	authChallenges: {
		user: r.one.users({
			from: r.authChallenges.userId,
			to: r.users.id,
			optional: true,
		}),
	},
	pushSubscriptions: {
		user: r.one.users({
			from: r.pushSubscriptions.userId,
			to: r.users.id,
		}),
	},
	notificationLogs: {
		user: r.one.users({
			from: r.notificationLogs.userId,
			to: r.users.id,
		}),
	},
}));
