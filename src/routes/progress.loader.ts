import { createServerFn } from "@tanstack/react-start";

import {
	getAccuracyTrends,
	getPracticeDatesForCalendar,
	getTimeInvested,
} from "@/db.server/queries/analytics/progress";
import { listCompletedPracticeSessionsForStreak } from "@/db.server/queries/practice-sessions";
import { getSkillStats } from "@/db.server/queries/vocabulary-skills";
import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { fromEpochSeconds } from "@/lib/time";
import { authMiddleware } from "@/middleware";

export const getProgressDataFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const userId = context.auth.userId;

		const [stats, calendarDates, accuracyTrends, timeInvested, completedSessions] =
			await Promise.all([
				getSkillStats(userId),
				getPracticeDatesForCalendar(userId, 3),
				getAccuracyTrends(userId, 30),
				getTimeInvested(userId),
				listCompletedPracticeSessionsForStreak(userId),
			]);
		const completedDates = completedSessions.map((s) => fromEpochSeconds(s.completedAt!));

		const accuracyData = accuracyTrends.map((d) => ({
			date: d.date,
			accuracy: d.accuracy / 100,
		}));

		return {
			userId,
			currentStreak: streakLengthFromCompletedSessionDates(completedDates),
			practiceDates: calendarDates.map((d) => d.date),
			accuracyData,
			timeInvested,
			masteredCount: Number(stats.itemsMastered),
		};
	});
