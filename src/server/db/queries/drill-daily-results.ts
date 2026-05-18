import { drillDailyResults } from "../schema";
import type { DbTransaction } from "./transaction-client";

type DailyResultRow = typeof drillDailyResults.$inferInsert;

export const insertDailyResults = async (tx: DbTransaction, rows: DailyResultRow[]) => {
	if (rows.length === 0) return;
	await tx.insert(drillDailyResults).values(rows).onConflictDoNothing();
};
