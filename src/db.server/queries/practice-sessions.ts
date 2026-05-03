import { and, eq, gte, inArray, lt } from "drizzle-orm";

import { db } from "../index";
import { practiceSessions } from "../schema";
import type { NewPracticeSession, PracticeSession } from "../types";

export type PracticeSessionInsert = NewPracticeSession;

type CompleteSessionInput = Pick<PracticeSession, "totalQuestions" | "correctAnswers"> & {
	sessionId: number;
};

export const startSession = async (data: PracticeSessionInsert) => {
	const [session] = await db.insert(practiceSessions).values(data).returning();
	return session;
};

export const completeSession = async (input: CompleteSessionInput) => {
	const { sessionId, ...patch } = input;
	const [session] = await db
		.update(practiceSessions)
		.set({
			...patch,
			completedAt: new Date(),
		})
		.where(eq(practiceSessions.id, sessionId))
		.returning();

	return session;
};

export const getLastPracticeDate = async (userId: number): Promise<Date | null> => {
	const result = await db.query.practiceSessions.findFirst({
		where: { userId, NOT: { completedAt: { isNull: true } } },
		orderBy: { completedAt: "desc" },
		columns: { completedAt: true },
	});

	return result?.completedAt ? new Date(result.completedAt) : null;
};

/**
 * Completed session timestamps for streak calculation (up to 365 rows, newest first in DB order).
 */
export async function getCompletedPracticeAtDatesForStreak(userId: number): Promise<Date[]> {
	const sessions = await db.query.practiceSessions.findMany({
		where: { userId, NOT: { completedAt: { isNull: true } } },
		orderBy: { completedAt: "desc" },
		limit: 365,
		columns: { completedAt: true },
	});

	return sessions
		.map((s) => s.completedAt)
		.filter((d): d is NonNullable<typeof d> => d != null)
		.map((d) => new Date(d));
}

export const getUserIdsPracticedInRange = async (
	userIds: number[],
	rangeStart: Date,
	rangeEnd: Date,
) => {
	if (userIds.length === 0) return new Set<number>();

	const rows = await db
		.selectDistinct({ userId: practiceSessions.userId })
		.from(practiceSessions)
		.where(
			and(
				inArray(practiceSessions.userId, userIds),
				gte(practiceSessions.startedAt, rangeStart),
				lt(practiceSessions.startedAt, rangeEnd),
			),
		);

	return new Set(rows.map((r) => r.userId));
};

export const listPracticeSessionsSinceForUsers = async (userIds: number[], since: Date) => {
	if (userIds.length === 0) return [];

	return await db.query.practiceSessions.findMany({
		where: {
			userId: { in: userIds },
			startedAt: { gte: since },
		},
		columns: { userId: true, startedAt: true },
		orderBy: { startedAt: "desc" },
	});
};
