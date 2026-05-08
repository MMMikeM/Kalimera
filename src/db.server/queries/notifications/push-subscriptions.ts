import { eq, inArray } from "drizzle-orm";

import { endOfDayUTC, toEpochSeconds, today } from "@/lib/time";
import { createInsertSchema } from "drizzle-orm/zod";
import type z from "zod/v4";

import { db } from "../../index";
import { pushSubscriptions } from "../../schema";

const pushSubscriptionInsertSchema = createInsertSchema(pushSubscriptions);
type PushSubscriptionInsert = z.infer<typeof pushSubscriptionInsertSchema>;

export type PushSubscriptionCronRow = Pick<
	typeof pushSubscriptions.$inferSelect,
	"endpoint" | "p256dh" | "auth" | "userId" | "snoozedUntil"
>;

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

type UpsertPushSubscriptionInput = Pick<
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
	await db
		.update(pushSubscriptions)
		.set({ snoozedUntil: toEpochSeconds(endOfDayUTC(today())) })
		.where(eq(pushSubscriptions.userId, userId));
};

const SUBSCRIPTION_CRON_COLUMNS = {
	endpoint: true,
	p256dh: true,
	auth: true,
	userId: true,
	snoozedUntil: true,
} as const;

export const listPushSubscriptionsForCron = async () => {
	return await db.query.pushSubscriptions.findMany({
		columns: SUBSCRIPTION_CRON_COLUMNS,
	});
};

export const getPushSubscriptionsForUserIds = async (userIds: number[]) => {
	if (userIds.length === 0) return [];
	return await db.query.pushSubscriptions.findMany({
		where: { userId: { in: userIds } },
		columns: SUBSCRIPTION_CRON_COLUMNS,
	});
};

export const deletePushSubscriptionsByEndpoints = async (endpoints: string[]) => {
	if (endpoints.length === 0) return;
	await db.delete(pushSubscriptions).where(inArray(pushSubscriptions.endpoint, endpoints));
};
