// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import {
	type TappedAction,
	logNotificationTap,
} from "@/server/db/queries/notifications/notification-logs";

import { withPushPost } from "@/server/with-push-post";

const VALID_TAPPED_ACTIONS: TappedAction[] = ["2min", "body", "snooze"];

export const Route = createFileRoute("/api/push/log-tap")({
	server: {
		handlers: {
			/**
			 * POST /api/push/log-tap
			 * Record that a user tapped a notification action button or the notification body.
			 */
			POST: ({ request }) =>
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
				),
		},
	},
});
