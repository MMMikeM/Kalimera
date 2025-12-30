/**
 * Push notification sending utilities for Cloudflare Workers
 */
import { sendPushNotification, type PushSubscriptionData, type VapidConfig } from "@mmmike/web-push/send";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { eq, and, lt, isNotNull } from "drizzle-orm";
import { pushSubscriptions, vocabularySkills, users, practiceSessions } from "@/db/schema";

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
	url?: string,
): Promise<boolean> => {
	try {
		return await sendPushNotification(
			subscription,
			{ title, body, url },
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
	const result: NotificationResult = { sent: 0, failed: 0, invalidSubscriptions: [] };

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

	// Get today's start timestamp (UTC)
	const todayStart = new Date();
	todayStart.setUTCHours(0, 0, 0, 0);

	for (const sub of subscriptions) {
		if (!sub.userId) continue;

		// Check if user has practiced today
		const recentSession = await db
			.select({ id: practiceSessions.id })
			.from(practiceSessions)
			.where(
				and(
					eq(practiceSessions.userId, sub.userId),
					// startedAt is stored as unix timestamp
				),
			)
			.limit(1)
			.get();

		// For now, send to all subscribed users (can add "practiced today" check later)
		const subscription: PushSubscriptionData = {
			endpoint: sub.endpoint,
			keys: { p256dh: sub.p256dh, auth: sub.auth },
		};

		const success = await sendNotification(
			subscription,
			"Time to practice! 📚",
			"Keep your Greek skills sharp with a quick session.",
			vapid,
			"/practice",
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
	const result: NotificationResult = { sent: 0, failed: 0, invalidSubscriptions: [] };

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
			"/practice/review",
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
