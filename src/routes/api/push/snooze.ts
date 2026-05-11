// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import { snoozePushSubscription } from "@/server/db/queries/notifications/push-subscriptions";

import { withPushPost } from "@/server/with-push-post";

export const Route = createFileRoute("/api/push/snooze")({
	server: {
		handlers: {
			/**
			 * POST /api/push/snooze
			 * Mark a user's notifications as snoozed until end of UTC day.
			 * The cron job skips sending to snoozed users.
			 */
			POST: ({ request }) =>
				withPushPost(
					request,
					async (userId) => {
						await snoozePushSubscription(userId);
						return Response.json({ success: true });
					},
					"Push snooze error:",
					"Failed to snooze",
				),
		},
	},
});
