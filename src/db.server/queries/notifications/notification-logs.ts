import { and, eq, gte, lt } from "drizzle-orm";
import { createInsertSchema } from "drizzle-orm/zod";
import type z from "zod/v4";

import { fromEpochSeconds, nowInstant, toEpochSeconds, toInstant, toPlainDate, today } from "@/lib/time";

import { db } from "../../index";
import { notificationLogs, practiceSessions } from "../../schema";

const notificationLogInsertSchema = createInsertSchema(notificationLogs);
type NotificationLogInsert = z.infer<typeof notificationLogInsertSchema>;

export type TappedAction = "2min" | "body" | "snooze";

type LogNotificationSentInput = Pick<NotificationLogInsert, "userId" | "type">;

export const logNotificationSent = async (data: LogNotificationSentInput) => {
	await db.insert(notificationLogs).values({ ...data, sentAt: toEpochSeconds(nowInstant()) });
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
				.set({ tappedAction, tappedAt: toEpochSeconds(nowInstant()) })
				.where(eq(notificationLogs.id, recentLog.id));
		}
	});
};

/**
 * Whether the user has been ignoring notifications by practising before
 * them on >=5 of the last 7 sent days.
 */
export const userQualifiesForNotificationTaper = async (
	userId: number,
	notificationHourUtc: number,
) => {
	const sevenDaysAgo = toEpochSeconds(toInstant(today().subtract({ days: 7 })));

	const recentSends = await db.query.notificationLogs.findMany({
		where: { userId, sentAt: { gte: sevenDaysAgo } },
		orderBy: { sentAt: "asc" },
		columns: { sentAt: true },
	});

	if (recentSends.length < 5) return false;

	let practicedBeforeNotification = 0;

	for (const send of recentSends) {
		if (!send.sentAt) continue;

		const sentInstant = fromEpochSeconds(send.sentAt);
		const sendDay = toEpochSeconds(toInstant(toPlainDate(sentInstant)));
		const notificationTime = toEpochSeconds(
			toPlainDate(sentInstant).toZonedDateTime("UTC").with({ hour: notificationHourUtc }).toInstant(),
		);

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
