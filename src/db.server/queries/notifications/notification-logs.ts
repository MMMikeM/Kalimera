import { startOfDay, subDays } from "date-fns";
import { and, eq, gte, lt } from "drizzle-orm";
import { createInsertSchema } from "drizzle-orm/zod";
import type z from "zod/v4";

import { db } from "../../index";
import { notificationLogs, practiceSessions } from "../../schema";

const notificationLogInsertSchema = createInsertSchema(notificationLogs);
type NotificationLogInsert = z.infer<typeof notificationLogInsertSchema>;

export type TappedAction = "2min" | "body" | "snooze";

type LogNotificationSentInput = Pick<NotificationLogInsert, "userId" | "type">;

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

/**
 * Whether the user has been ignoring notifications by practising before
 * them on >=5 of the last 7 sent days. Cross-table read (notificationLogs +
 * practiceSessions) — lives here because it's "do they earn a taper" logic.
 */
export const userQualifiesForNotificationTaper = async (
	userId: number,
	notificationHourUtc: number,
) => {
	const sevenDaysAgo = subDays(new Date(), 7);

	const recentSends = await db.query.notificationLogs.findMany({
		where: { userId, sentAt: { gte: sevenDaysAgo } },
		orderBy: { sentAt: "asc" },
		columns: { sentAt: true },
	});

	if (recentSends.length < 5) return false;

	let practicedBeforeNotification = 0;

	for (const send of recentSends) {
		if (!send.sentAt) continue;

		const sendDay = startOfDay(send.sentAt);
		const notificationTime = new Date(sendDay);
		notificationTime.setUTCHours(notificationHourUtc, 0, 0, 0);

		const practicedBeforeCount = await db.$count(
			practiceSessions,
			and(
				eq(practiceSessions.userId, userId),
				gte(practiceSessions.startedAt, sendDay),
				lt(practiceSessions.startedAt, notificationTime),
			),
		);

		if (practicedBeforeCount > 0) {
			practicedBeforeNotification++;
		}
	}

	return practicedBeforeNotification >= 5;
};
