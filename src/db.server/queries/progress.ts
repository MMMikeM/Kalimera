import { and, count, eq, gte, sql } from "drizzle-orm";
import { subMonths, subDays } from "date-fns";
import { db } from "../index";
import { practiceAttempts, practiceSessions, vocabularySkills } from "../schema";

// =====================================================================================
// TYPES
// =====================================================================================

export type PracticeDate = {
	date: string; // ISO date string (YYYY-MM-DD)
	sessionCount: number;
};

export type ResponseTimeTrend = {
	date: string;
	avgResponseTimeMs: number;
	attemptCount: number;
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

export type MasterySnapshot = {
	date: string;
	masteredCount: number;
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
			date: sql<string>`date(${practiceSessions.completedAt}, 'unixepoch')`.as("date"),
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

const getResponseTimeTrends = async (
	userId: number,
	days: number,
): Promise<ResponseTimeTrend[]> => {
	const cutoff = subDays(new Date(), days);

	const results = await db
		.select({
			date: sql<string>`date(${practiceAttempts.attemptedAt}, 'unixepoch')`.as("date"),
			avgResponseTimeMs: sql<number>`avg(${practiceAttempts.timeTaken})`.as("avg_time"),
			attemptCount: count().as("attempt_count"),
		})
		.from(practiceAttempts)
		.where(
			and(
				eq(practiceAttempts.userId, userId),
				sql`${practiceAttempts.timeTaken} IS NOT NULL`,
				gte(practiceAttempts.attemptedAt, cutoff),
			),
		)
		.groupBy(sql`date(${practiceAttempts.attemptedAt}, 'unixepoch')`)
		.orderBy(sql`date(${practiceAttempts.attemptedAt}, 'unixepoch')`);

	return results.map((r) => ({
		date: r.date,
		avgResponseTimeMs: Math.round(r.avgResponseTimeMs ?? 0),
		attemptCount: r.attemptCount,
	}));
};

export const getAccuracyTrends = async (
	userId: number,
	days: number,
): Promise<AccuracyTrend[]> => {
	const cutoff = subDays(new Date(), days);

	const results = await db
		.select({
			date: sql<string>`date(${practiceAttempts.attemptedAt}, 'unixepoch')`.as("date"),
			totalAttempts: count().as("total"),
			correctAttempts: sql<number>`sum(case when ${practiceAttempts.isCorrect} = 1 then 1 else 0 end)`.as(
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
		accuracy: r.totalAttempts > 0 ? Math.round(((r.correctAttempts ?? 0) / r.totalAttempts) * 100) : 0,
	}));
};

export const getTimeInvested = async (userId: number): Promise<TimeInvested> => {
	const [result] = await db
		.select({
			totalSeconds: sql<number>`sum(${practiceSessions.completedAt} - ${practiceSessions.startedAt})`.as(
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

const getMasteryProgression = async (
	userId: number,
): Promise<MasterySnapshot[]> => {
	const masteredThresholdDays = 21;

	const results = await db
		.select({
			date: sql<string>`date(${vocabularySkills.lastReviewedAt}, 'unixepoch')`.as("date"),
			masteredCount: count().as("mastered_count"),
		})
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				gte(vocabularySkills.intervalDays, masteredThresholdDays),
				sql`${vocabularySkills.lastReviewedAt} IS NOT NULL`,
			),
		)
		.groupBy(sql`date(${vocabularySkills.lastReviewedAt}, 'unixepoch')`)
		.orderBy(sql`date(${vocabularySkills.lastReviewedAt}, 'unixepoch')`);

	let cumulative = 0;
	return results.map((r) => {
		cumulative += r.masteredCount;
		return {
			date: r.date,
			masteredCount: cumulative,
		};
	});
};
