import { createServerFn } from "@tanstack/react-start";

import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { fromISOString } from "@/lib/time";
import { requireAuth } from "@/server/auth/session";
import {
	getAccuracyTrends,
	getPracticeDatesForCalendar,
	getTimeInvested,
} from "@/server/db/queries/analytics/progress";
import { listCompletedPracticeSessionsForStreak } from "@/server/db/queries/practice-sessions";
import { getReviewStats } from "@/server/db/queries/vocab-reviews";

export const getProgressDataFn = createServerFn({ method: "GET" }).handler(async () => {
	const { userId } = await requireAuth();

	const [stats, calendarDates, accuracyTrends, timeInvested, completedSessions] = await Promise.all(
		[
			getReviewStats(userId),
			getPracticeDatesForCalendar(userId, 3),
			getAccuracyTrends(userId, 30),
			getTimeInvested(userId),
			listCompletedPracticeSessionsForStreak(userId),
		],
	);
	const completedDates = completedSessions.map((s) => fromISOString(s.completedAt!));

	return {
		userId,
		currentStreak: streakLengthFromCompletedSessionDates(completedDates),
		practiceDates: calendarDates.map((d) => d.date),
		accuracyData: accuracyTrends.map(({ date, accuracy }) => ({ date, accuracy })),
		timeInvested,
		masteredCount: stats.itemsMastered,
	};
});
