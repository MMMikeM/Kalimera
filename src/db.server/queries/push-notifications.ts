import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-orm/zod";
import type z from "zod/v4";

import { db } from "../index";
import { notificationLogs, pushSubscriptions } from "../schema";

const pushSubscriptionInsertSchema = createInsertSchema(pushSubscriptions);
export type PushSubscriptionInsert = z.infer<typeof pushSubscriptionInsertSchema>;

const notificationLogInsertSchema = createInsertSchema(notificationLogs);
type NotificationLogInsert = z.infer<typeof notificationLogInsertSchema>;

/** One row per user is not enforced; updates apply to all rows for this user. Newest row is representative. */
export const getPushSubscriptionByUserId = async (userId: number) => {
	return await db.query.pushSubscriptions.findFirst({
		where: { userId },
		orderBy: { createdAt: "desc" },
		columns: {
			notificationMode: true,
			taperOfferPending: true,
		},
	});
};

export const setNotificationMode = async (userId: number, mode: "adaptive" | "always") => {
	await db
		.update(pushSubscriptions)
		.set({ notificationMode: mode, taperOfferPending: false })
		.where(eq(pushSubscriptions.userId, userId));
};

export const setTaperOfferPending = async (userId: number, pending: boolean) => {
	await db
		.update(pushSubscriptions)
		.set({ taperOfferPending: pending })
		.where(eq(pushSubscriptions.userId, userId));
};
export type TappedAction = "2min" | "body" | "snooze";

export type UpsertPushSubscriptionInput = Pick<
	PushSubscriptionInsert,
	"userId" | "endpoint" | "p256dh" | "auth"
>;

export const upsertPushSubscription = async (data: UpsertPushSubscriptionInput) => {
	await db
		.insert(pushSubscriptions)
		.values(data)
		.onConflictDoUpdate({
			target: pushSubscriptions.endpoint,
			set: { userId: data.userId, p256dh: data.p256dh, auth: data.auth },
		});
};

export const deletePushSubscription = async (endpoint: string) => {
	await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
};

export const snoozePushSubscription = async (userId: number) => {
	const endOfToday = new Date();
	endOfToday.setUTCHours(23, 59, 59, 999);

	await db
		.update(pushSubscriptions)
		.set({ snoozedUntil: endOfToday })
		.where(eq(pushSubscriptions.userId, userId));
};

export type LogNotificationSentInput = Pick<NotificationLogInsert, "userId" | "type">;

export const logNotificationSent = async (data: LogNotificationSentInput) => {
	await db.insert(notificationLogs).values({ ...data, sentAt: new Date() });
};

export const logNotificationTap = async (userId: number, tappedAction: TappedAction) => {
	await db.transaction(async (tx) => {
		const recentLog = await tx.query.notificationLogs.findFirst({
			where: { userId, tappedAction: { isNull: true } },
			orderBy: { sentAt: "asc" },
			columns: { id: true },
		});

		if (recentLog) {
			await tx
				.update(notificationLogs)
				.set({ tappedAction, tappedAt: new Date() })
				.where(eq(notificationLogs.id, recentLog.id));
		}
	});
};
