import { vocabDailyResults } from "../schema";
import type { DbTransaction } from "./transaction-client";

type DailyResultRow = typeof vocabDailyResults.$inferInsert;

export const insertDailyResults = async (tx: DbTransaction, rows: DailyResultRow[]) => {
	if (rows.length === 0) return;
	await tx.insert(vocabDailyResults).values(rows).onConflictDoNothing();
};
