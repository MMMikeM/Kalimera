import { snoozePushSubscription } from "@/db.server/queries/push-notifications";

import type { Route } from "./+types/push.snooze";
import { withPushPost } from "./with-push-post";

/**
 * POST /api/push/snooze
 * Mark a user's notifications as snoozed until end of UTC day.
 * The cron job skips sending to snoozed users.
 */
export const action = ({ request }: Route.ActionArgs) =>
	withPushPost(
		request,
		async (userId) => {
			await snoozePushSubscription(userId);
			return Response.json({ success: true });
		},
		"Push snooze error:",
		"Failed to snooze",
	);
