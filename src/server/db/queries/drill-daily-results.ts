import { db } from "../index";
import { drillDailyResults } from "../schema";

type DailyResultRow = typeof drillDailyResults.$inferInsert;

export const insertDailyResults = async (rows: DailyResultRow[]) => {
	if (rows.length === 0) return;
	await db.insert(drillDailyResults).values(rows).onConflictDoNothing();
};
