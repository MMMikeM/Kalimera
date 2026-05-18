import { Temporal } from "@js-temporal/polyfill";
import { and, eq, gte, isNotNull, sql } from "drizzle-orm";

import { nowInstant, toEpochSeconds, fromEpochSeconds } from "@/lib/time";

import { db } from "../../index";
import { drillProgress, practiceAttempts } from "../../schema";

// ─── Drill rust / fading score ───────────────────────────────────────────────

const DRILL_RUST_WINDOW = 10;
const DRILL_RUST_THRESHOLD = 2;
const MASTERY_INTERVAL_DAYS = [3, 6, 9, 9] as const;

export interface DrillRust {
	drillId: string;
	lastPracticedAt: number;
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
			const lastPracticedAt = attempts[0]!.attemptedAt!;
			const daysSince = (nowSec - lastPracticedAt) / 86400;
			const correctCount = attempts.filter((a) => a.isCorrect).length;
			const recentAccuracy = attempts.length > 0 ? correctCount / attempts.length : 0;
			const avgTime = attempts.reduce((s, a) => s + (a.timeTaken ?? 0), 0) / attempts.length;
			// Forgetting-curve: >1 = overdue; higher-tier drills have longer expected interval → less rusty for same elapsed time.
			const rustScore = daysSince / intervalForDrill(drillId);
			return { drillId, lastPracticedAt, daysSince, recentAccuracy, avgTime, rustScore };
		})
		.sort((a, b) => b.rustScore - a.rustScore);
};

export interface DrillStat {
	drillId: string;
	attempts: number;
	correct: number;
	accuracy: number;
	avgTimeMs: number | null;
	lastAttemptAt: Temporal.Instant | null;
}

const WINDOW_DAYS = 14;

export const getDrillStats = async (userId: number): Promise<DrillStat[]> => {
	const since = toEpochSeconds(nowInstant().subtract({ hours: WINDOW_DAYS * 24 }));

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
			lastAttemptAt: r.lastAttemptAt == null ? null : fromEpochSeconds(Number(r.lastAttemptAt)),
		}));
};
