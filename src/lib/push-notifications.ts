/**
 * Push notification sending utilities for Cloudflare Workers
 */
import {
	type PushPayload,
	type PushSubscriptionData,
	sendPushNotification,
	type VapidConfig,
} from "@mmmike/web-push/send";
import {
	differenceInDays,
	endOfDay,
	format,
	parseISO,
	startOfDay,
	subDays,
} from "date-fns";
import { and, eq, gte, isNotNull, lt, sql } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import {
	practiceSessions,
	pushSubscriptions,
	vocabularySkills,
} from "@/db.server/schema";

interface NotificationResult {
	sent: number;
	failed: number;
	invalidSubscriptions: string[];
}

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
			{ ttl: 86400 }, // 24 hours
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
export const sendPracticeReminders = async (
	db: LibSQLDatabase<Record<string, unknown>>,
	vapid: VapidConfig,
): Promise<NotificationResult> => {
	const result: NotificationResult = {
		sent: 0,
		failed: 0,
		invalidSubscriptions: [],
	};

	// Get all push subscriptions with their user's last practice session
	const subscriptions = await db
		.select({
			endpoint: pushSubscriptions.endpoint,
			p256dh: pushSubscriptions.p256dh,
			auth: pushSubscriptions.auth,
			userId: pushSubscriptions.userId,
		})
		.from(pushSubscriptions)
		.all();

	if (subscriptions.length === 0) {
		console.log("No push subscriptions found");
		return result;
	}

	for (const sub of subscriptions) {
		if (!sub.userId) continue;

		// TODO: Add "practiced today" check to skip users who already practiced
		const subscription: PushSubscriptionData = {
			endpoint: sub.endpoint,
			keys: { p256dh: sub.p256dh, auth: sub.auth },
		};

		const success = await sendNotification(
			subscription,
			"Quick 2-minute review?",
			"Your review queue is ready.",
			vapid,
			{ url: "/practice", userId: sub.userId },
		);

		if (success) {
			result.sent++;
		} else {
			result.failed++;
			result.invalidSubscriptions.push(sub.endpoint);
		}
	}

	// Clean up invalid subscriptions
	for (const endpoint of result.invalidSubscriptions) {
		await db
			.delete(pushSubscriptions)
			.where(eq(pushSubscriptions.endpoint, endpoint));
	}

	return result;
};

/**
 * Send notifications for vocabulary items due for review
 */
export const sendReviewDueNotifications = async (
	db: LibSQLDatabase<Record<string, unknown>>,
	vapid: VapidConfig,
): Promise<NotificationResult> => {
	const result: NotificationResult = {
		sent: 0,
		failed: 0,
		invalidSubscriptions: [],
	};

	const now = new Date();

	// Get users with items due for review who have push subscriptions
	const usersWithDueItems = await db
		.selectDistinct({ userId: vocabularySkills.userId })
		.from(vocabularySkills)
		.where(
			and(
				isNotNull(vocabularySkills.nextReviewAt),
				lt(vocabularySkills.nextReviewAt, now),
			),
		)
		.all();

	if (usersWithDueItems.length === 0) {
		console.log("No users with due reviews");
		return result;
	}

	const userIds = usersWithDueItems.map((u) => u.userId);

	// Get subscriptions for these users
	const subscriptions = await db
		.select({
			endpoint: pushSubscriptions.endpoint,
			p256dh: pushSubscriptions.p256dh,
			auth: pushSubscriptions.auth,
			userId: pushSubscriptions.userId,
		})
		.from(pushSubscriptions)
		.all();

	// Filter to users with due items
	const relevantSubs = subscriptions.filter(
		(s) => s.userId && userIds.includes(s.userId),
	);

	for (const sub of relevantSubs) {
		if (!sub.userId) continue;

		// Count due items for this user
		const dueCount = await db
			.select({ count: vocabularySkills.userId })
			.from(vocabularySkills)
			.where(
				and(
					eq(vocabularySkills.userId, sub.userId),
					isNotNull(vocabularySkills.nextReviewAt),
					lt(vocabularySkills.nextReviewAt, now),
				),
			)
			.all();

		const count = dueCount.length;
		if (count === 0) continue;

		const subscription: PushSubscriptionData = {
			endpoint: sub.endpoint,
			keys: { p256dh: sub.p256dh, auth: sub.auth },
		};

		const success = await sendNotification(
			subscription,
			`${count} word${count > 1 ? "s" : ""} ready for review!`,
			"Spaced repetition works best with timely reviews.",
			vapid,
			{ url: "/practice/review", userId: sub.userId },
		);

		if (success) {
			result.sent++;
		} else {
			result.failed++;
			result.invalidSubscriptions.push(sub.endpoint);
		}
	}

	// Clean up invalid subscriptions
	for (const endpoint of result.invalidSubscriptions) {
		await db
			.delete(pushSubscriptions)
			.where(eq(pushSubscriptions.endpoint, endpoint));
	}

	return result;
};

type NotificationCopy = {
	title: string;
	body: (dueCount: number, streak: number) => string;
};

const STREAK_WARNING_COPY: NotificationCopy[] = [
	{
		// Bounded commitment (Urgency)
		title: "Quick 2-minute review?",
		body: (dueCount) =>
			dueCount > 0 ? `${dueCount} items in your queue.` : "Your Greek is waiting.",
	},
	{
		// Content preview (Interest)
		title: "Items due for review.",
		body: (dueCount) =>
			dueCount > 0
				? `${dueCount} word${dueCount > 1 ? "s" : ""} ready — takes about ${Math.max(2, Math.ceil(dueCount * 0.25))} min.`
				: "A few minutes keeps the memory sharp.",
	},
	{
		// Competence callback (Confidence)
		title: "You've been consistent.",
		body: (_, streak) =>
			streak > 1
				? `${streak} days of practice. Keep the momentum.`
				: "Your review queue is ready.",
	},
	{
		// Domain bridge (Passion)
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
	// Deterministic per-user per-day rotation (UTC day boundary) — different users get
	// different copy types on the same day, cycling through all four variants over 4 days.
	const dayIndex = Math.floor(Date.now() / 86_400_000);
	const copy =
		STREAK_WARNING_COPY[(userId + dayIndex) % STREAK_WARNING_COPY.length];
	if (!copy) return { title: "Your Greek is waiting.", body: "Quick review?" };
	return { title: copy.title, body: copy.body(dueCount, streak) };
};

/**
 * Send streak warning notifications to users who haven't practiced today
 * but have an active streak from yesterday
 */
export const sendStreakWarningNotifications = async (
	db: LibSQLDatabase<Record<string, unknown>>,
	vapid: VapidConfig,
): Promise<NotificationResult> => {
	const result: NotificationResult = {
		sent: 0,
		failed: 0,
		invalidSubscriptions: [],
	};

	const now = new Date();
	const yesterday = format(subDays(now, 1), "yyyy-MM-dd");

	// Get users with push subscriptions
	const subscriptions = await db
		.select({
			endpoint: pushSubscriptions.endpoint,
			p256dh: pushSubscriptions.p256dh,
			auth: pushSubscriptions.auth,
			userId: pushSubscriptions.userId,
		})
		.from(pushSubscriptions)
		.all();

	if (subscriptions.length === 0) {
		console.log("No push subscriptions for streak warnings");
		return result;
	}

	for (const sub of subscriptions) {
		if (!sub.userId) continue;

		// Check if user practiced today
		const todayStart = startOfDay(now);
		const todayEnd = endOfDay(now);

		const [practicedToday] = await db
			.select({ count: sql<number>`count(*)` })
			.from(practiceSessions)
			.where(
				and(
					eq(practiceSessions.userId, sub.userId),
					gte(practiceSessions.startedAt, todayStart),
					lt(practiceSessions.startedAt, todayEnd),
				),
			);

		if ((practicedToday?.count ?? 0) > 0) {
			continue; // Already practiced today
		}

		// Calculate current streak (days ending yesterday or today)
		const practiceDates = await db
			.selectDistinct({
				date: sql<string>`date(${practiceSessions.startedAt})`,
			})
			.from(practiceSessions)
			.where(eq(practiceSessions.userId, sub.userId))
			.orderBy(sql`date(${practiceSessions.startedAt}) DESC`)
			.limit(30);

		const dates = practiceDates.map((d) => d.date);
		if (dates.length === 0) continue;

		// Calculate streak from yesterday backward
		const firstDate = dates[0];
		if (!firstDate || firstDate !== yesterday) continue; // No recent practice

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

		// Get due count for more compelling message
		const [dueResult] = await db
			.select({ count: sql<number>`count(*)` })
			.from(vocabularySkills)
			.where(
				and(
					eq(vocabularySkills.userId, sub.userId),
					isNotNull(vocabularySkills.nextReviewAt),
					lt(vocabularySkills.nextReviewAt, new Date()),
				),
			);

		const dueCount = dueResult?.count ?? 0;

		const subscription: PushSubscriptionData = {
			endpoint: sub.endpoint,
			keys: { p256dh: sub.p256dh, auth: sub.auth },
		};

		const { title, body } = selectCopy(sub.userId, dueCount, streak);

		const success = await sendNotification(
			subscription,
			title,
			body,
			vapid,
			{ url: "/", userId: sub.userId },
		);

		if (success) {
			result.sent++;
		} else {
			result.failed++;
			result.invalidSubscriptions.push(sub.endpoint);
		}
	}

	// Clean up invalid subscriptions
	for (const endpoint of result.invalidSubscriptions) {
		await db
			.delete(pushSubscriptions)
			.where(eq(pushSubscriptions.endpoint, endpoint));
	}

	return result;
};
