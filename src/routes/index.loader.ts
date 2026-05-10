import { createServerFn } from "@tanstack/react-start";

import { getPushSubscriptionByUserId } from "@/db.server/queries/notifications/push-subscriptions";
import {
	getLastPracticeDate,
	listCompletedPracticeSessionsForStreak,
} from "@/db.server/queries/practice-sessions";
import { getUserById } from "@/db.server/queries/users";
import { getItemsDueTomorrow, getSkillStats } from "@/db.server/queries/vocabulary-skills";
import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { calculateDaysUntilNextFreeze, getFreezeStatus } from "@/lib/streak";
import { diffInDays, fromEpochSeconds, mondayBasedDayOfWeek, toPlainDate, today } from "@/lib/time";
import { requireAuth } from "@/lib/auth-session.server";

type Stats = {
	streak: number;
	itemsMastered: number;
	dueCount: number;
	totalLearned: number;
	newAvailable: number;
};

export const getDashboardDataFn = createServerFn({ method: "GET" })
	.handler(async () => {
		const { userId } = requireAuth();

		const [rawStats, user, itemsDueTomorrow, lastPracticeDate, completedSessions] =
			await Promise.all([
				getSkillStats(userId),
				getUserById(userId),
				getItemsDueTomorrow(userId),
				getLastPracticeDate(userId),
				listCompletedPracticeSessionsForStreak(userId),
			]);
		const completedDates = completedSessions.flatMap((s) =>
			s.completedAt ? [fromEpochSeconds(s.completedAt)] : [],
		);

		const todayDate = today();
		const daysSinceLastPractice = lastPracticeDate
			? diffInDays(todayDate, toPlainDate(lastPracticeDate))
			: null;

		const stats: Stats = {
			streak: streakLengthFromCompletedSessionDates(completedDates),
			itemsMastered: Number(rawStats.itemsMastered),
			dueCount: Number(rawStats.dueCount),
			totalLearned: Number(rawStats.totalLearned),
			newAvailable: Number(rawStats.newAvailable),
		};

		const mondayOffset = mondayBasedDayOfWeek(todayDate);

		// TODO: Query actual practice history for the week
		// For now, mock based on streak
		const weekData = Array.from({ length: 7 }, (_, i) => ({
			practiced: i < mondayOffset && i < stats.streak,
		}));

		const todayPracticed = stats.streak > 0 && mondayOffset <= stats.streak;

		const freezeStatus = user ? getFreezeStatus(user) : { status: "none" as const, freezeCount: 0 };
		const daysUntilNextFreeze = user ? calculateDaysUntilNextFreeze(stats.streak, user) : 7;

		const pushSub = await getPushSubscriptionByUserId(userId);

		return {
			userId,
			stats,
			weekData,
			todayPracticed,
			freezeStatus,
			daysUntilNextFreeze: daysUntilNextFreeze as number | null,
			itemsDueTomorrow,
			daysSinceLastPractice,
			taperOfferPending: pushSub?.taperOfferPending ?? false,
		};
	});

export type DashboardData = Awaited<ReturnType<typeof getDashboardDataFn>>;
