import { createServerFn } from "@tanstack/react-start";

import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { calculateDaysUntilNextFreeze, getFreezeStatus } from "@/lib/streak";
import { diffInDays, fromISOString, mondayBasedDayOfWeek, toPlainDate, today } from "@/lib/time";
import { requireAuth } from "@/server/auth/session";
import { getSchemaRust, RUST_THRESHOLD_VALUE } from "@/server/db/queries/analytics/drill-stats";
import { getPushSubscriptionByUserId } from "@/server/db/queries/notifications/push-subscriptions";
import {
	getLastPracticeDate,
	listCompletedPracticeSessionsForStreak,
} from "@/server/db/queries/practice-sessions";
import { getUserById } from "@/server/db/queries/users";
import { getReviewStats } from "@/server/db/queries/vocab-reviews";

type Stats = {
	streak: number;
	itemsMastered: number;
	totalLearned: number;
	newAvailable: number;
};

export const getDashboardDataFn = createServerFn({ method: "GET" }).handler(async () => {
	const { userId } = requireAuth();

	const [rawStats, user, lastPracticeDate, completedSessions, rustyDrills] = await Promise.all([
		getReviewStats(userId),
		getUserById(userId),
		getLastPracticeDate(userId),
		listCompletedPracticeSessionsForStreak(userId),
		getSchemaRust(userId),
	]);
	const completedDates = completedSessions.flatMap((s) =>
		s.completedAt ? [fromISOString(s.completedAt)] : [],
	);

	const todayDate = today();
	const daysSinceLastPractice = lastPracticeDate
		? diffInDays(todayDate, toPlainDate(lastPracticeDate))
		: null;

	const stats: Stats = {
		streak: streakLengthFromCompletedSessionDates(completedDates),
		itemsMastered: Number(rawStats.itemsMastered),
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

	// Top rusty drills for dashboard CTA
	const notablyRusty = rustyDrills.filter((d) => d.rustScore > RUST_THRESHOLD_VALUE);

	return {
		userId,
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze: daysUntilNextFreeze as number | null,
		daysSinceLastPractice,
		taperOfferPending: pushSub?.taperOfferPending ?? false,
		rustyDrills: notablyRusty,
		rustyDrillCount: notablyRusty.length,
	};
});
