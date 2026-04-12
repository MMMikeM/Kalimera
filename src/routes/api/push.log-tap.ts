import { logNotificationTap, type TappedAction } from "@/db.server/queries/push-notifications";

import type { Route } from "./+types/push.log-tap";
import { withPushPost } from "./with-push-post";

const VALID_TAPPED_ACTIONS: TappedAction[] = ["2min", "body", "snooze"];

/**
 * POST /api/push/log-tap
 * Record that a user tapped a notification action button or the notification body.
 */
export const action = ({ request }: Route.ActionArgs) =>
	withPushPost(
		request,
		async (userId, body) => {
			const tappedAction =
				typeof body?.tappedAction === "string" &&
				VALID_TAPPED_ACTIONS.includes(body.tappedAction as TappedAction)
					? (body.tappedAction as TappedAction)
					: null;
			if (!tappedAction) {
				return Response.json({ error: "Missing userId or tappedAction" }, { status: 400 });
			}
			await logNotificationTap(userId, tappedAction);
			return Response.json({ success: true });
		},
		"Push log-tap error:",
		"Failed to log tap",
	);
