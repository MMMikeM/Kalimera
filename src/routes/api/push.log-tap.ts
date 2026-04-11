import { logNotificationTap, type TappedAction } from "@/db.server/queries/push-notifications";

import type { Route } from "./+types/push.log-tap";

const VALID_TAPPED_ACTIONS: TappedAction[] = ["2min", "body", "snooze"];

/**
 * POST /api/push/log-tap
 * Record that a user tapped a notification action button or the notification body.
 */
export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as Record<string, unknown>;
		const userId = typeof body?.userId === "number" ? body.userId : null;
		const tappedAction =
			typeof body?.tappedAction === "string" &&
			VALID_TAPPED_ACTIONS.includes(body.tappedAction as TappedAction)
				? (body.tappedAction as TappedAction)
				: null;

		if (!userId || !tappedAction) {
			return Response.json({ error: "Missing userId or tappedAction" }, { status: 400 });
		}

		await logNotificationTap(userId, tappedAction);

		return Response.json({ success: true });
	} catch (error) {
		console.error("Push log-tap error:", error);
		return Response.json({ error: "Failed to log tap" }, { status: 500 });
	}
};
