import { startOfDay, subDays } from "date-fns";
import { and, count, eq, gte, inArray, isNotNull, lt } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

import { db } from "../index";
import { practiceSessions, pushSubscriptions, vocabularySkills } from "../schema";

export type PushSubscriptionCronRow = Pick<
	InferSelectModel<typeof pushSubscriptions>,
	"endpoint" | "p256dh" | "auth" | "userId" | "snoozedUntil"
>;

export const listPushSubscriptionsForCron = async () => {
	return await db.query.pushSubscriptions.findMany({
		columns: {
			endpoint: true,
			p256dh: true,
			auth: true,
			userId: true,
			snoozedUntil: true,
		},
	});
};

export const getPushSubscriptionsForUserIds = async (userIds: number[]) => {
	if (userIds.length === 0) return [];
	return await db.query.pushSubscriptions.findMany({
		where: { userId: { in: userIds } },
		columns: {
			endpoint: true,
			p256dh: true,
			auth: true,
			userId: true,
			snoozedUntil: true,
		},
	});
};

/**
 * Due `vocabulary_skills` rows aggregated per user. Uses the select builder because
 * `db.query.*.findMany` cannot express `GROUP BY user_id` + `COUNT(*)` — `extras` are
 * per returned row, not one grouped row per user. Consumers expect `Map<userId, dueCount>`.
 */
const dueVocabularyCountRows = async (now: Date, userIds?: number[]) => {
	const base = and(
		isNotNull(vocabularySkills.nextReviewAt),
		lt(vocabularySkills.nextReviewAt, now),
	);
	const where = userIds === undefined ? base : and(base, inArray(vocabularySkills.userId, userIds));

	return await db
		.select({
			userId: vocabularySkills.userId,
			dueCount: count().as("due_count"),
		})
		.from(vocabularySkills)
		.where(where)
		.groupBy(vocabularySkills.userId);
};

export const getDueVocabularyCountByUserId = async (now: Date) =>
	new Map((await dueVocabularyCountRows(now)).map((r) => [r.userId, r.dueCount]));

export const getDueVocabularyCountForUserIds = async (now: Date, userIds: number[]) => {
	if (userIds.length === 0) return new Map<number, number>();
	return new Map((await dueVocabularyCountRows(now, userIds)).map((r) => [r.userId, r.dueCount]));
};

export const deletePushSubscriptionsByEndpoints = async (endpoints: string[]) => {
	if (endpoints.length === 0) return;
	await db.delete(pushSubscriptions).where(inArray(pushSubscriptions.endpoint, endpoints));
};

export const getUserIdsPracticedInRange = async (
	userIds: number[],
	rangeStart: Date,
	rangeEnd: Date,
) => {
	if (userIds.length === 0) return new Set();

	const rows = await db
		.selectDistinct({ userId: practiceSessions.userId })
		.from(practiceSessions)
		.where(
			and(
				inArray(practiceSessions.userId, userIds),
				gte(practiceSessions.startedAt, rangeStart),
				lt(practiceSessions.startedAt, rangeEnd),
			),
		);

	return new Set(rows.map((r) => r.userId));
};

export const listPracticeSessionsSinceForUsers = async (userIds: number[], since: Date) => {
	if (userIds.length === 0) return [];

	return await db.query.practiceSessions.findMany({
		where: {
			userId: { in: userIds },
			startedAt: { gte: since },
		},
		columns: { userId: true, startedAt: true },
		orderBy: { startedAt: "desc" },
	});
};

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
