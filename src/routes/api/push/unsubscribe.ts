// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import { deletePushSubscription } from "@/server/db/queries/notifications/push-subscriptions";

export const Route = createFileRoute("/api/push/unsubscribe")({
	server: {
		handlers: {
			/**
			 * POST /api/push/unsubscribe
			 * Remove a push subscription
			 */
			POST: async ({ request }) => {
				try {
					const body = (await request.json()) as Record<string, unknown>;
					const endpoint = typeof body?.endpoint === "string" ? body.endpoint : null;

					if (!endpoint) {
						return Response.json({ error: "Missing required field: endpoint" }, { status: 400 });
					}

					await deletePushSubscription(endpoint);

					return Response.json({ success: true });
				} catch (error) {
					console.error("Push unsubscribe error:", error);
					return Response.json({ error: "Failed to remove subscription" }, { status: 500 });
				}
			},
		},
	},
});
