/// <reference types="@cloudflare/workers-types" />
import { Temporal } from "@js-temporal/polyfill";

import { createDb, runWithDb } from "./db.server";
import type { CloudflareEnv } from "./types/cloudflare";

type FetchFn = (req: Request, env: unknown, ctx: unknown) => Promise<Response>;
let cachedFetch: FetchFn | null = null;

async function getFetch(): Promise<FetchFn> {
	if (cachedFetch) return cachedFetch;
	const mod = await import("@tanstack/react-start/server");
	cachedFetch = mod.createStartHandler(mod.defaultStreamHandler) as FetchFn;
	return cachedFetch;
}

if (import.meta.hot) {
	import.meta.hot.accept(() => {
		cachedFetch = null;
	});
}

export default {
	async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
		const fn = await getFetch();
		return fn(request, env, ctx);
	},

	scheduled: async (
		event: ScheduledEvent,
		env: CloudflareEnv,
		_ctx: ExecutionContext,
	): Promise<void> => {
		const {
			sendPracticeReminders,
			sendReviewDueNotifications,
			sendStreakWarningNotifications,
			getVapidConfig,
		} = await import("./lib/push-notifications");

		const db = createDb(env);
		const vapid = getVapidConfig(env);

		if (!vapid) {
			console.error("VAPID keys not configured, skipping notifications");
			return;
		}

		await runWithDb(db, async () => {
			const hour = Temporal.Instant.fromEpochMilliseconds(event.scheduledTime).toZonedDateTimeISO(
				"UTC",
			).hour;
			const isNineAm = hour === 9;

			if (isNineAm && event.cron === "0 9 * * *") {
				const result = await sendPracticeReminders(vapid);
				console.log(`Practice reminders: sent=${result.sent}, failed=${result.failed}`);
			}

			if (event.cron === "0 */6 * * *") {
				const result = await sendReviewDueNotifications(vapid);
				console.log(`Review notifications: sent=${result.sent}, failed=${result.failed}`);
			}

			if (event.cron === "0 20 * * *") {
				const result = await sendStreakWarningNotifications(vapid);
				console.log(`Streak warnings: sent=${result.sent}, failed=${result.failed}`);
			}
		});
	},
};
