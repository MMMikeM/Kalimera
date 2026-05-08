/// <reference types="@cloudflare/workers-types" />
import { createRequestHandler, RouterContextProvider } from "react-router";

import { cloudflareContext, type CloudflareEnv } from "./lib/cloudflare-context";
import { createDb, runWithDb } from "./db.server";

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request: Request, env: CloudflareEnv, ctx: ExecutionContext): Promise<Response> {
		const db = createDb(env);
		const context = new RouterContextProvider();
		context.set(cloudflareContext, { env, ctx });
		return runWithDb(db, () => requestHandler(request, context));
	},

	async scheduled(
		event: ScheduledEvent,
		env: CloudflareEnv,
		_ctx: ExecutionContext,
	): Promise<void> {
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
				console.log("Running daily practice reminder...");
				const result = await sendPracticeReminders(vapid);
				console.log(`Practice reminders: sent=${result.sent}, failed=${result.failed}`);
			}

			if (event.cron === "0 */6 * * *") {
				console.log("Checking for due reviews...");
				const result = await sendReviewDueNotifications(vapid);
				console.log(`Review notifications: sent=${result.sent}, failed=${result.failed}`);
			}

			if (event.cron === "0 20 * * *") {
				console.log("Running streak warning notifications...");
				const result = await sendStreakWarningNotifications(vapid);
				console.log(`Streak warnings: sent=${result.sent}, failed=${result.failed}`);
			}
		});
	},
};
