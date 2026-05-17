import { db } from "../index";
import { vocabMastery } from "../schema";
import type { DbTransaction } from "./transaction-client";

export const listMasteryForVocabs = async (userId: number, drillId: string, vocabIds: number[]) => {
	if (vocabIds.length === 0) return [];
	return await db.query.vocabMastery.findMany({
		where: { userId, drillId, vocabId: { in: vocabIds } },
	});
};

type UpsertMasteryInput = {
	userId: number;
	vocabId: number;
	drillId: string;
	tier: number;
	masteredAt: number;
	nextReviewAt: number;
};

export const upsertMastery = async (tx: DbTransaction, input: UpsertMasteryInput) => {
	await tx
		.insert(vocabMastery)
		.values(input)
		.onConflictDoUpdate({
			target: [vocabMastery.userId, vocabMastery.vocabId, vocabMastery.drillId],
			set: { tier: input.tier, masteredAt: input.masteredAt, nextReviewAt: input.nextReviewAt },
		});
};
