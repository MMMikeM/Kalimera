import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	users: {
		practiceSessions: r.many.practiceSessions(),
		practiceAttempts: r.many.practiceAttempts(),
		weakAreas: r.many.weakAreas(),
		vocabularySkills: r.many.vocabularySkills(),
		milestonesAchieved: r.many.milestonesAchieved(),
	},
	vocabulary: {
		verbDetails: r.one.verbDetails({
			from: r.vocabulary.id,
			to: r.verbDetails.vocabId,
		}),
		verbConjugations: r.many.verbConjugations(),
		verbImperatives: r.many.verbImperatives(),
		vocabularyTags: r.many.vocabularyTags(),
		vocabularySkills: r.many.vocabularySkills(),
		practiceAttempts: r.many.practiceAttempts(),
	},
	tags: {
		vocabularyTags: r.many.vocabularyTags(),
		section: r.one.tagSections({
			from: r.tags.id,
			to: r.tagSections.tagId,
		}),
	},
	tagSections: {
		tag: r.one.tags({
			from: r.tagSections.tagId,
			to: r.tags.id,
		}),
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
			from: r.practiceAttempts.vocabularyId,
			to: r.vocabulary.id,
		}),
	},
	weakAreas: {
		user: r.one.users({
			from: r.weakAreas.userId,
			to: r.users.id,
		}),
	},
	vocabularySkills: {
		user: r.one.users({
			from: r.vocabularySkills.userId,
			to: r.users.id,
		}),
		vocabulary: r.one.vocabulary({
			from: r.vocabularySkills.vocabularyId,
			to: r.vocabulary.id,
		}),
	},
	milestonesAchieved: {
		user: r.one.users({
			from: r.milestonesAchieved.userId,
			to: r.users.id,
		}),
	},
}));
