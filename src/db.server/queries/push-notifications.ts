import { and, eq, isNull } from "drizzle-orm";
import { db } from "../index";
import { notificationLogs, pushSubscriptions } from "../schema";

export type NotificationType =
	| "streak_warning"
	| "practice_reminder"
	| "review_due";

export const getPushSubscriptionByUserId = async (userId: number) => {
	return db
		.select({
			notificationMode: pushSubscriptions.notificationMode,
			taperOfferPending: pushSubscriptions.taperOfferPending,
		})
		.from(pushSubscriptions)
		.where(eq(pushSubscriptions.userId, userId))
		.get();
};

export const setNotificationMode = async (
	userId: number,
	mode: "adaptive" | "always",
) => {
	await db
		.update(pushSubscriptions)
		.set({ notificationMode: mode, taperOfferPending: false })
		.where(eq(pushSubscriptions.userId, userId));
};

export const setTaperOfferPending = async (
	userId: number,
	pending: boolean,
) => {
	await db
		.update(pushSubscriptions)
		.set({ taperOfferPending: pending })
		.where(eq(pushSubscriptions.userId, userId));
};
export type TappedAction = "2min" | "body" | "snooze";

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH SUBSCRIPTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const upsertPushSubscription = async (params: {
	userId: number;
	endpoint: string;
	p256dh: string;
	auth: string;
}) => {
	await db
		.insert(pushSubscriptions)
		.values(params)
		.onConflictDoUpdate({
			target: pushSubscriptions.endpoint,
			set: { userId: params.userId, p256dh: params.p256dh, auth: params.auth },
		});
};

export const deletePushSubscription = async (endpoint: string) => {
	await db
		.delete(pushSubscriptions)
		.where(eq(pushSubscriptions.endpoint, endpoint));
};

export const snoozePushSubscription = async (userId: number) => {
	const endOfToday = new Date();
	endOfToday.setUTCHours(23, 59, 59, 999);

	await db
		.update(pushSubscriptions)
		.set({ snoozedUntil: endOfToday })
		.where(eq(pushSubscriptions.userId, userId));
};

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATION LOGS
// ═══════════════════════════════════════════════════════════════════════════════

export const logNotificationSent = async (
	userId: number,
	type: NotificationType,
) => {
	await db
		.insert(notificationLogs)
		.values({ userId, sentAt: new Date(), type });
};

export const logNotificationTap = async (
	userId: number,
	tappedAction: TappedAction,
) => {
	const recentLog = await db
		.select({ id: notificationLogs.id })
		.from(notificationLogs)
		.where(
			and(
				eq(notificationLogs.userId, userId),
				isNull(notificationLogs.tappedAction),
			),
		)
		.orderBy(notificationLogs.sentAt)
		.limit(1)
		.get();

	if (recentLog) {
		await db
			.update(notificationLogs)
			.set({ tappedAction, tappedAt: new Date() })
			.where(eq(notificationLogs.id, recentLog.id));
	}
};
