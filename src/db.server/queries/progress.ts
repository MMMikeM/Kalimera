import { subDays, subMonths } from "date-fns";
import { and, count, eq, gte, sql } from "drizzle-orm";
import { db } from "../index";
import { practiceAttempts, practiceSessions } from "../schema";

// =====================================================================================
// TYPES
// =====================================================================================

export type PracticeDate = {
	date: string; // ISO date string (YYYY-MM-DD)
	sessionCount: number;
};

export type AccuracyTrend = {
	date: string;
	accuracy: number; // 0-100
	totalAttempts: number;
	correctAttempts: number;
};

export type TimeInvested = {
	totalMinutes: number;
	sessionCount: number;
};

// =====================================================================================
// QUERIES
// =====================================================================================

export const getPracticeDatesForCalendar = async (
	userId: number,
	months: number,
): Promise<PracticeDate[]> => {
	const cutoff = subMonths(new Date(), months);

	const results = await db
		.select({
			date: sql<string>`date(${practiceSessions.completedAt}, 'unixepoch')`.as(
				"date",
			),
			sessionCount: count().as("session_count"),
		})
		.from(practiceSessions)
		.where(
			and(
				eq(practiceSessions.userId, userId),
				sql`${practiceSessions.completedAt} IS NOT NULL`,
				gte(practiceSessions.completedAt, cutoff),
			),
		)
		.groupBy(sql`date(${practiceSessions.completedAt}, 'unixepoch')`)
		.orderBy(sql`date(${practiceSessions.completedAt}, 'unixepoch')`);

	return results.map((r) => ({
		date: r.date,
		sessionCount: r.sessionCount,
	}));
};

export const getAccuracyTrends = async (
	userId: number,
	days: number,
): Promise<AccuracyTrend[]> => {
	const cutoff = subDays(new Date(), days);

	const results = await db
		.select({
			date: sql<string>`date(${practiceAttempts.attemptedAt}, 'unixepoch')`.as(
				"date",
			),
			totalAttempts: count().as("total"),
			correctAttempts:
				sql<number>`sum(case when ${practiceAttempts.isCorrect} = 1 then 1 else 0 end)`.as(
					"correct",
				),
		})
		.from(practiceAttempts)
		.where(
			and(
				eq(practiceAttempts.userId, userId),
				sql`${practiceAttempts.isCorrect} IS NOT NULL`,
				gte(practiceAttempts.attemptedAt, cutoff),
			),
		)
		.groupBy(sql`date(${practiceAttempts.attemptedAt}, 'unixepoch')`)
		.orderBy(sql`date(${practiceAttempts.attemptedAt}, 'unixepoch')`);

	return results.map((r) => ({
		date: r.date,
		totalAttempts: r.totalAttempts,
		correctAttempts: r.correctAttempts ?? 0,
		accuracy:
			r.totalAttempts > 0
				? Math.round(((r.correctAttempts ?? 0) / r.totalAttempts) * 100)
				: 0,
	}));
};

export const getTimeInvested = async (
	userId: number,
): Promise<TimeInvested> => {
	const [result] = await db
		.select({
			totalSeconds:
				sql<number>`sum(${practiceSessions.completedAt} - ${practiceSessions.startedAt})`.as(
					"total_seconds",
				),
			sessionCount: count().as("session_count"),
		})
		.from(practiceSessions)
		.where(
			and(
				eq(practiceSessions.userId, userId),
				sql`${practiceSessions.completedAt} IS NOT NULL`,
			),
		);

	return {
		totalMinutes: Math.round((result?.totalSeconds ?? 0) / 60),
		sessionCount: result?.sessionCount ?? 0,
	};
};
