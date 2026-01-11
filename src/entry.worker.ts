/// <reference types="@cloudflare/workers-types" />
import { createRequestHandler } from "react-router";
import { createDb, runWithDb } from "./db.server";

type CloudflareEnv = {
	TURSO_DATABASE_URL: string;
	TURSO_AUTH_TOKEN?: string;
	// Push notification VAPID keys
	VAPID_PUBLIC_KEY?: string;
	VAPID_PRIVATE_KEY?: string;
	VAPID_SUBJECT?: string;
};

declare module "react-router" {
	interface AppLoadContext {
		db: ReturnType<typeof createDb>;
		cloudflare: {
			env: CloudflareEnv;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(
		request: Request,
		env: CloudflareEnv,
		ctx: ExecutionContext,
	): Promise<Response> {
		const db = createDb(env);
		return runWithDb(db, () =>
			requestHandler(request, {
				db,
				cloudflare: { env, ctx },
			}),
		);
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

		// Determine which cron triggered based on the schedule
		// "0 9 * * *" = Daily at 9am UTC (practice reminder)
		// "0 */6 * * *" = Every 6 hours (review due)
		// "0 20 * * *" = Daily at 8pm UTC (streak warning)
		const hour = new Date(event.scheduledTime).getUTCHours();
		const isNineAm = hour === 9;

		if (isNineAm && event.cron === "0 9 * * *") {
			console.log("Running daily practice reminder...");
			const result = await sendPracticeReminders(db, vapid);
			console.log(
				`Practice reminders: sent=${result.sent}, failed=${result.failed}`,
			);
		}

		if (event.cron === "0 */6 * * *") {
			console.log("Checking for due reviews...");
			const result = await sendReviewDueNotifications(db, vapid);
			console.log(
				`Review notifications: sent=${result.sent}, failed=${result.failed}`,
			);
		}

		if (event.cron === "0 20 * * *") {
			console.log("Running streak warning notifications...");
			const result = await sendStreakWarningNotifications(db, vapid);
			console.log(
				`Streak warnings: sent=${result.sent}, failed=${result.failed}`,
			);
		}
	},
};
