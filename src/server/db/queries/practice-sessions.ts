import { and, eq } from "drizzle-orm";

import { nowIso } from "@/lib/time";

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

export const completeSession = async (userId: number, input: CompleteSessionInput) => {
	const { sessionId, ...patch } = input;
	const [session] = await db
		.update(practiceSessions)
		.set({
			...patch,
			completedAt: nowIso(),
		})
		.where(and(eq(practiceSessions.id, sessionId), eq(practiceSessions.userId, userId)))
		.returning();

	return session;
};

export const isSessionOwnedBy = async (sessionId: number, userId: number) => {
	const session = await db.query.practiceSessions.findFirst({
		where: { id: sessionId, userId },
		columns: { id: true },
	});
	return session !== undefined;
};

/**
 * Completed session rows for streak calculation (up to 365, newest first).
 * `completedAt` is non-null per the where clause.
 */
export const listCompletedPracticeSessionsForStreak = async (userId: number) => {
	return await db.query.practiceSessions.findMany({
		where: { userId, NOT: { completedAt: { isNull: true } } },
		orderBy: { completedAt: "desc" },
		limit: 365,
		columns: { completedAt: true },
	});
};
