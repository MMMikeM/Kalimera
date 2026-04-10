import { deletePushSubscription } from "@/db.server/queries/push-notifications";
import type { Route } from "./+types/push.unsubscribe";

/**
 * POST /api/push/unsubscribe
 * Remove a push subscription
 */
export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

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
};
