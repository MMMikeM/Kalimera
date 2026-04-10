import { upsertPushSubscription } from "@/db.server/queries/push-notifications";
import type { Route } from "./+types/push.subscribe";

/**
 * POST /api/push/subscribe
 * Save a push subscription for a user
 */
export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as Record<string, unknown>;
		const userId = typeof body?.userId === "number" ? body.userId : null;
		const endpoint = typeof body?.endpoint === "string" ? body.endpoint : null;
		const keys =
			body?.keys && typeof body.keys === "object" ? (body.keys as Record<string, unknown>) : null;
		const p256dh = typeof keys?.p256dh === "string" ? keys.p256dh : null;
		const auth = typeof keys?.auth === "string" ? keys.auth : null;

		if (!userId || !endpoint || !p256dh || !auth) {
			return Response.json(
				{
					error: "Missing required fields: userId, endpoint, keys.p256dh, keys.auth",
				},
				{ status: 400 },
			);
		}

		await upsertPushSubscription({ userId, endpoint, p256dh, auth });

		return Response.json({ success: true });
	} catch (error) {
		console.error("Push subscribe error:", error);
		return Response.json({ error: "Failed to save subscription" }, { status: 500 });
	}
};
