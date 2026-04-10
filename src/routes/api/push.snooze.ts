import { snoozePushSubscription } from "@/db.server/queries/push-notifications";
import type { Route } from "./+types/push.snooze";

/**
 * POST /api/push/snooze
 * Mark a user's notifications as snoozed until end of UTC day.
 * The cron job skips sending to snoozed users.
 */
export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as Record<string, unknown>;
		const userId = typeof body?.userId === "number" ? body.userId : null;

		if (!userId) {
			return Response.json({ error: "Missing userId" }, { status: 400 });
		}

		await snoozePushSubscription(userId);

		return Response.json({ success: true });
	} catch (error) {
		console.error("Push snooze error:", error);
		return Response.json({ error: "Failed to snooze" }, { status: 500 });
	}
};
