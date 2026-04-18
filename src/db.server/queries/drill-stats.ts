import { and, eq, gte, isNotNull, sql } from "drizzle-orm";

import { db } from "../index";
import { practiceAttempts } from "../schema";

export interface DrillStat {
	drillId: string;
	attempts: number;
	correct: number;
	accuracy: number;
	avgTimeMs: number | null;
	lastAttemptAt: Date | null;
}

const WINDOW_DAYS = 14;

export const getDrillStats = async (userId: number): Promise<DrillStat[]> => {
	const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000);

	const rows = await db
		.select({
			drillId: practiceAttempts.drillId,
			attempts: sql<number>`COUNT(*)`,
			correct: sql<number>`SUM(CASE WHEN ${practiceAttempts.isCorrect} THEN 1 ELSE 0 END)`,
			avgTimeMs: sql<number | null>`AVG(${practiceAttempts.timeTaken})`,
			lastAttemptAt: sql<number | null>`MAX(${practiceAttempts.attemptedAt})`,
		})
		.from(practiceAttempts)
		.where(
			and(
				eq(practiceAttempts.userId, userId),
				isNotNull(practiceAttempts.drillId),
				gte(practiceAttempts.attemptedAt, since),
			),
		)
		.groupBy(practiceAttempts.drillId);

	return rows
		.filter((r): r is typeof r & { drillId: string } => r.drillId != null)
		.map((r) => ({
			drillId: r.drillId,
			attempts: Number(r.attempts),
			correct: Number(r.correct),
			accuracy: r.attempts > 0 ? Number(r.correct) / Number(r.attempts) : 0,
			avgTimeMs: r.avgTimeMs == null ? null : Number(r.avgTimeMs),
			lastAttemptAt: r.lastAttemptAt == null ? null : new Date(Number(r.lastAttemptAt) * 1000),
		}));
};
