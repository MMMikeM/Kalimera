import { db } from "../index";
import { vocabDailyResults } from "../schema";
import type { DbTransaction } from "./transaction-client";

type DailyResultRow = typeof vocabDailyResults.$inferInsert;

export const insertDailyResults = async (tx: DbTransaction, rows: DailyResultRow[]) => {
	if (rows.length === 0) return;
	await tx.insert(vocabDailyResults).values(rows).onConflictDoNothing();
};

export const listRecentDailyResultsByDrill = async (
	userId: number,
	drillId: string,
	vocabIds: number[],
) => {
	if (vocabIds.length === 0) return [];
	return await db.query.vocabDailyResults.findMany({
		where: { userId, drillId, vocabId: { in: vocabIds } },
		columns: { vocabId: true, practicedDate: true, correctFirstTry: true },
		orderBy: { practicedDate: "desc" },
	});
};
