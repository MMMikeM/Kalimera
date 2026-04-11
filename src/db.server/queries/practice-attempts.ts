import { createInsertSchema } from "drizzle-orm/zod";
import { z } from "zod/v4";
import { areaTypes, skillTypes } from "../enums";
import { db } from "../index";
import { practiceAttempts } from "../schema";
import { applyVocabularySkillSideEffect } from "./vocabulary-skills";
import { applyWeakAreaSideEffect } from "./weak-areas";

const practiceAttemptInsertSchema = createInsertSchema(practiceAttempts);

export type PracticeAttemptInsert = z.infer<typeof practiceAttemptInsertSchema>;

export const recordAttemptInputSchema = practiceAttemptInsertSchema
	.extend({
		skillType: z.enum(skillTypes),
		weakAreaType: z.enum(areaTypes).optional(),
		weakAreaIdentifier: z.string().optional(),
	})
	.refine(
		(d) => {
			const hasArea = d.weakAreaType != null;
			const hasId = d.weakAreaIdentifier != null && d.weakAreaIdentifier.length > 0;
			return hasArea === hasId;
		},
		{
			message: "weakAreaType and weakAreaIdentifier must both be set or both omitted",
			path: ["weakAreaIdentifier"],
		},
	);

export type RecordAttemptInput = z.infer<typeof recordAttemptInputSchema>;

export const recordAttempt = async (input: RecordAttemptInput) => {
	const { skillType, weakAreaType, weakAreaIdentifier, ...attemptInsert } = input;

	return await db.transaction(async (tx) => {
		const [attempt] = await tx.insert(practiceAttempts).values(attemptInsert).returning();

		if (attemptInsert.vocabularyId) {
			await applyVocabularySkillSideEffect(tx, {
				userId: attemptInsert.userId,
				vocabularyId: attemptInsert.vocabularyId,
				skillType,
				isCorrect: Boolean(attemptInsert.isCorrect),
				timeTaken: attemptInsert.timeTaken ?? 0,
			});
		}

		if (weakAreaType && weakAreaIdentifier) {
			await applyWeakAreaSideEffect(tx, {
				userId: attemptInsert.userId,
				areaType: weakAreaType,
				areaIdentifier: weakAreaIdentifier,
				isCorrect: Boolean(attemptInsert.isCorrect),
			});
		}

		return attempt;
	});
};
