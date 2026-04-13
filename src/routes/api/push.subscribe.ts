import { upsertPushSubscription } from "@/db.server/queries/push-notifications";

import type { Route } from "./+types/push.subscribe";
import { withPushPost } from "./with-push-post";

/**
 * POST /api/push/subscribe
 * Save a push subscription for a user
 */
export const action = ({ request }: Route.ActionArgs) =>
	withPushPost(
		request,
		async (userId, body) => {
			const endpoint = typeof body?.endpoint === "string" ? body.endpoint : null;
			const keys =
				body?.keys && typeof body.keys === "object" ? (body.keys as Record<string, unknown>) : null;
			const p256dh = typeof keys?.p256dh === "string" ? keys.p256dh : null;
			const auth = typeof keys?.auth === "string" ? keys.auth : null;
			if (!endpoint || !p256dh || !auth) {
				return Response.json(
					{ error: "Missing required fields: userId, endpoint, keys.p256dh, keys.auth" },
					{ status: 400 },
				);
			}
			await upsertPushSubscription({ userId, endpoint, p256dh, auth });
			return Response.json({ success: true });
		},
		"Push subscribe error:",
		"Failed to save subscription",
	);
