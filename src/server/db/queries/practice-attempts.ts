import { db } from "../index";
import { practiceAttempts } from "../schema";
import { applyReviewStateAfterAttempt } from "./vocab-reviews";

type RecordAttemptInput = typeof practiceAttempts.$inferInsert;

export const recordAttempt = async (input: RecordAttemptInput) => {
	return await db.transaction(async (tx) => {
		const [attempt] = await tx.insert(practiceAttempts).values(input).returning();

		if (input.vocabId) {
			await applyReviewStateAfterAttempt(tx, {
				userId: input.userId,
				vocabId: input.vocabId,
				isCorrect: Boolean(input.isCorrect),
				timeTaken: input.timeTaken ?? 0,
			});
		}

		return attempt;
	});
};

export const listSessionVocabAttempts = async (sessionId: number) => {
	return await db.query.practiceAttempts.findMany({
		where: { sessionId, vocabId: { isNotNull: true } },
		columns: { vocabId: true, isCorrect: true, attemptedAt: true, drillId: true },
		orderBy: { attemptedAt: "asc" },
	});
};
