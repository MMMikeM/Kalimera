/**
 * Push notification orchestration (VAPID send + copy). Database access lives in
 * `@/db.server/queries/push-cron` and `@/db.server/queries/push-notifications`.
 */
import {
	type PushPayload,
	type PushSubscriptionData,
	sendPushNotification,
	type VapidConfig,
} from "@mmmike/web-push/send";
import { differenceInDays, endOfDay, format, parseISO, startOfDay, subDays } from "date-fns";

import {
	deletePushSubscriptionsByEndpoints,
	getDueVocabularyCountByUserId,
	getDueVocabularyCountForUserIds,
	getPushSubscriptionsForUserIds,
	getUserIdsPracticedInRange,
	listPracticeSessionsSinceForUsers,
	listPushSubscriptionsForCron,
	userQualifiesForNotificationTaper,
	type PushSubscriptionCronRow,
} from "@/db.server/queries/push-cron";
import {
	getPushSubscriptionByUserId,
	logNotificationSent,
	setTaperOfferPending,
} from "@/db.server/queries/push-notifications";

interface NotificationResult {
	sent: number;
	failed: number;
	invalidSubscriptions: string[];
}

const toPushPayload = (sub: PushSubscriptionCronRow): PushSubscriptionData => ({
	endpoint: sub.endpoint,
	keys: { p256dh: sub.p256dh, auth: sub.auth },
});

/** Distinct local calendar days per user, most recent first (max `maxDays` entries each). */
const distinctPracticeDaysDesc = (
	rows: { userId: number; startedAt: Date }[],
	maxDays: number,
): Map<number, string[]> => {
	const byUser = new Map<number, string[]>();
	const seen = new Map<number, Set<string>>();

	for (const row of rows) {
		const day = format(row.startedAt, "yyyy-MM-dd");
		let daysSeen = seen.get(row.userId);
		if (!daysSeen) {
			daysSeen = new Set();
			seen.set(row.userId, daysSeen);
		}
		if (daysSeen.has(day)) continue;
		daysSeen.add(day);

		let list = byUser.get(row.userId);
		if (!list) {
			list = [];
			byUser.set(row.userId, list);
		}
		if (list.length >= maxDays) continue;
		list.push(day);
	}

	return byUser;
};

const utcCalendarDayIndex = (d: Date): number =>
	Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86_400_000);

/**
 * Send a push notification to a specific subscription
 */
export const sendNotification = async (
	subscription: PushSubscriptionData,
	title: string,
	body: string,
	vapid: VapidConfig,
	options: { url?: string; userId?: number } = {},
): Promise<boolean> => {
	try {
		return await sendPushNotification(
			subscription,
			{
				title,
				body,
				url: options.url,
				userId: options.userId,
				quickSessionUrl: "/practice/speed?size=quick",
			} as PushPayload & { userId?: number; quickSessionUrl?: string },
			vapid,
			{ ttl: 86400 },
		);
	} catch (error) {
		console.error("Push notification failed:", error);
		return false;
	}
};

/**
 * Get VAPID config from environment
 */
export const getVapidConfig = (env: {
	VAPID_PUBLIC_KEY?: string;
	VAPID_PRIVATE_KEY?: string;
	VAPID_SUBJECT?: string;
}): VapidConfig | null => {
	if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY || !env.VAPID_SUBJECT) {
		console.warn("VAPID keys not configured");
		return null;
	}
	return {
		publicKey: env.VAPID_PUBLIC_KEY,
		privateKey: env.VAPID_PRIVATE_KEY,
		subject: env.VAPID_SUBJECT,
	};
};

/**
 * Send daily practice reminders to users who haven't practiced today
 */
export const sendPracticeReminders = async (vapid: VapidConfig): Promise<NotificationResult> => {
	const result: NotificationResult = {
		sent: 0,
		failed: 0,
		invalidSubscriptions: [],
	};

	const now = new Date();
	const subscriptions = await listPushSubscriptionsForCron();

	if (subscriptions.length === 0) {
		console.log("No push subscriptions found");
		return result;
	}

	for (const sub of subscriptions) {
		if (!sub.userId) continue;

		if (sub.snoozedUntil && sub.snoozedUntil > now) {
			continue;
		}

		// TODO: Add "practiced today" check to skip users who already practiced
		const success = await sendNotification(
			toPushPayload(sub),
			"Quick 2-minute review?",
			"Your review queue is ready.",
			vapid,
			{ url: "/practice", userId: sub.userId },
		);

		if (success) {
			result.sent++;
			await logNotificationSent({ userId: sub.userId, type: "practice_reminder" });
		} else {
			result.failed++;
			result.invalidSubscriptions.push(sub.endpoint);
		}
	}

	await deletePushSubscriptionsByEndpoints(result.invalidSubscriptions);
	return result;
};

/**
 * Send notifications for vocabulary items due for review
 */
export const sendReviewDueNotifications = async (
	vapid: VapidConfig,
): Promise<NotificationResult> => {
	const result: NotificationResult = {
		sent: 0,
		failed: 0,
		invalidSubscriptions: [],
	};

	const now = new Date();
	const dueByUser = await getDueVocabularyCountByUserId(now);
	const userIds = [...dueByUser.keys()];

	if (userIds.length === 0) {
		console.log("No users with due reviews");
		return result;
	}

	const subscriptions = await getPushSubscriptionsForUserIds(userIds);

	for (const sub of subscriptions) {
		if (!sub.userId) continue;

		if (sub.snoozedUntil && sub.snoozedUntil > now) {
			continue;
		}

		const count = dueByUser.get(sub.userId) ?? 0;
		if (count === 0) continue;

		const success = await sendNotification(
			toPushPayload(sub),
			`${count} word${count > 1 ? "s" : ""} ready for review!`,
			"Spaced repetition works best with timely reviews.",
			vapid,
			{ url: "/practice/review", userId: sub.userId },
		);

		if (success) {
			result.sent++;
			await logNotificationSent({ userId: sub.userId, type: "review_due" });
		} else {
			result.failed++;
			result.invalidSubscriptions.push(sub.endpoint);
		}
	}

	await deletePushSubscriptionsByEndpoints(result.invalidSubscriptions);
	return result;
};

type NotificationCopy = {
	title: string;
	body: (dueCount: number, streak: number) => string;
};

const STREAK_WARNING_COPY: NotificationCopy[] = [
	{
		title: "Quick 2-minute review?",
		body: (dueCount) =>
			dueCount > 0 ? `${dueCount} items in your queue.` : "Your Greek is waiting.",
	},
	{
		title: "Items due for review.",
		body: (dueCount) =>
			dueCount > 0
				? `${dueCount} word${dueCount > 1 ? "s" : ""} ready — takes about ${Math.max(2, Math.ceil(dueCount * 0.25))} min.`
				: "A few minutes keeps the memory sharp.",
	},
	{
		title: "You've been consistent.",
		body: (_, streak) =>
			streak > 1 ? `${streak} days of practice. Keep the momentum.` : "Your review queue is ready.",
	},
	{
		title: "The aorist is waiting.",
		body: (dueCount) =>
			dueCount > 0
				? `${dueCount} items — the tense in every Greek news headline.`
				: "A quick session keeps it sharp.",
	},
];

export const selectCopy = (
	userId: number,
	dueCount: number,
	streak: number,
): { title: string; body: string } => {
	const dayIndex = utcCalendarDayIndex(new Date());
	const copy = STREAK_WARNING_COPY[(userId + dayIndex) % STREAK_WARNING_COPY.length];
	if (!copy) return { title: "Your Greek is waiting.", body: "Quick review?" };
	return { title: copy.title, body: copy.body(dueCount, streak) };
};

/**
 * Send streak warning notifications to users who haven't practiced today
 * but have an active streak from yesterday
 */
export const sendStreakWarningNotifications = async (
	vapid: VapidConfig,
): Promise<NotificationResult> => {
	const result: NotificationResult = {
		sent: 0,
		failed: 0,
		invalidSubscriptions: [],
	};

	const now = new Date();
	const yesterday = format(subDays(now, 1), "yyyy-MM-dd");

	const subscriptions = await listPushSubscriptionsForCron();
	if (subscriptions.length === 0) {
		console.log("No push subscriptions for streak warnings");
		return result;
	}

	const activeSubs = subscriptions.filter(
		(s) => s.userId && (!s.snoozedUntil || s.snoozedUntil <= now),
	) as (PushSubscriptionCronRow & { userId: number })[];

	if (activeSubs.length === 0) {
		return result;
	}

	const candidateIds = activeSubs.map((s) => s.userId);
	const todayStart = startOfDay(now);
	const todayEnd = endOfDay(now);
	const practicedToday = await getUserIdsPracticedInRange(candidateIds, todayStart, todayEnd);

	const streakCandidates = activeSubs.filter((s) => !practicedToday.has(s.userId));
	if (streakCandidates.length === 0) {
		return result;
	}

	const streakUserIds = streakCandidates.map((s) => s.userId);
	const dueByUser = await getDueVocabularyCountForUserIds(now, streakUserIds);
	const sessionRows = await listPracticeSessionsSinceForUsers(streakUserIds, subDays(now, 45));
	const datesByUser = distinctPracticeDaysDesc(sessionRows, 30);

	for (const sub of streakCandidates) {
		const dates = datesByUser.get(sub.userId) ?? [];
		if (dates.length === 0) continue;

		const firstDate = dates[0];
		if (!firstDate || firstDate !== yesterday) continue;

		let streak = 1;
		for (let i = 1; i < dates.length; i++) {
			const prevDateStr = dates[i - 1];
			const currDateStr = dates[i];
			if (!prevDateStr || !currDateStr) break;

			const prevDate = parseISO(prevDateStr);
			const currDate = parseISO(currDateStr);
			const diffDays = differenceInDays(prevDate, currDate);

			if (diffDays === 1) {
				streak++;
			} else {
				break;
			}
		}

		if (streak === 0) continue;

		const dueCount = dueByUser.get(sub.userId) ?? 0;
		const { title, body } = selectCopy(sub.userId, dueCount, streak);

		const success = await sendNotification(toPushPayload(sub), title, body, vapid, {
			url: "/",
			userId: sub.userId,
		});

		if (success) {
			result.sent++;
			await logNotificationSent({ userId: sub.userId, type: "streak_warning" });

			const offerTaper = await userQualifiesForNotificationTaper(sub.userId, 20);
			if (offerTaper) {
				const modeRow = await getPushSubscriptionByUserId(sub.userId);
				if (modeRow?.notificationMode === "adaptive") {
					await setTaperOfferPending(sub.userId, true);
				}
			}
		} else {
			result.failed++;
			result.invalidSubscriptions.push(sub.endpoint);
		}
	}

	await deletePushSubscriptionsByEndpoints(result.invalidSubscriptions);
	return result;
};
