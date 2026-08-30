import { eq, sql } from "drizzle-orm";

import { fromISOString, nowInstant, toEpochSeconds } from "@/lib/time";

import { db } from "../../index";
import { drillProgress } from "../../schema";

// ─── Drill rust / fading score ───────────────────────────────────────────────

const DRILL_RUST_WINDOW = 10;
const DRILL_RUST_THRESHOLD = 2;
const MASTERY_INTERVAL_DAYS = [3, 6, 9, 9] as const;

export interface DrillRust {
	drillId: string;
	lastPracticedAt: string; // ISO 8601
	daysSince: number;
	recentAccuracy: number;
	avgTime: number;
	rustScore: number;
}

export const RUST_THRESHOLD_VALUE = DRILL_RUST_THRESHOLD;

export const getSchemaRust = async (userId: number): Promise<DrillRust[]> => {
	const [rows, tierAggregates] = await Promise.all([
		db.query.practiceAttempts.findMany({
			columns: { drillId: true, isCorrect: true, timeTaken: true, attemptedAt: true },
			where: { userId, drillId: { isNotNull: true } },
			orderBy: { attemptedAt: "desc" },
			limit: 500,
		}),
		db
			.select({
				drillId: drillProgress.drillId,
				avgTier: sql<number>`AVG(${drillProgress.tier})`,
			})
			.from(drillProgress)
			.where(eq(drillProgress.userId, userId))
			.groupBy(drillProgress.drillId),
	]);

	const tierMap = new Map(tierAggregates.map((t) => [t.drillId, t.avgTier]));
	const intervalForDrill = (drillId: string): number => {
		const avg = tierMap.get(drillId);
		if (avg == null) return MASTERY_INTERVAL_DAYS[0];
		return MASTERY_INTERVAL_DAYS[Math.min(Math.round(avg), 3) as 0 | 1 | 2 | 3]!;
	};

	const byDrill = new Map<string, typeof rows>();
	for (const row of rows) {
		if (!row.drillId) continue;
		const list = byDrill.get(row.drillId) ?? [];
		if (list.length < DRILL_RUST_WINDOW) {
			list.push(row);
			byDrill.set(row.drillId, list);
		}
	}

	const nowSec = toEpochSeconds(nowInstant());

	return [...byDrill.entries()]
		.map(([drillId, attempts]) => {
			const lastAttemptedAt = attempts[0]!.attemptedAt!;
			const daysSince = (nowSec - toEpochSeconds(fromISOString(lastAttemptedAt))) / 86400;
			const correctCount = attempts.filter((a) => a.isCorrect).length;
			const recentAccuracy = attempts.length > 0 ? correctCount / attempts.length : 0;
			const avgTime = attempts.reduce((s, a) => s + (a.timeTaken ?? 0), 0) / attempts.length;
			// Forgetting-curve: >1 = overdue; higher-tier drills have longer expected interval → less rusty for same elapsed time.
			const rustScore = daysSince / intervalForDrill(drillId);
			return {
				drillId,
				lastPracticedAt: lastAttemptedAt,
				daysSince,
				recentAccuracy,
				avgTime,
				rustScore,
			};
		})
		.sort((a, b) => b.rustScore - a.rustScore);
};

