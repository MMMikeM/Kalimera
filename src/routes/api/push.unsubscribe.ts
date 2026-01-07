import type { Route } from "./+types/push.unsubscribe";
import { db } from "@/db.server";
import { pushSubscriptions } from "@/db.server/schema";
import { eq } from "drizzle-orm";

interface UnsubscribeBody {
	endpoint: string;
}

/**
 * POST /api/push/unsubscribe
 * Remove a push subscription
 */
export const action = async ({ request, context }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as UnsubscribeBody;
		const { endpoint } = body;

		if (!endpoint) {
			return Response.json(
				{ error: "Missing required field: endpoint" },
				{ status: 400 },
			);
		}

		const database = context?.db ?? db;

		await database
			.delete(pushSubscriptions)
			.where(eq(pushSubscriptions.endpoint, endpoint));

		return Response.json({ success: true });
	} catch (error) {
		console.error("Push unsubscribe error:", error);
		return Response.json(
			{ error: "Failed to remove subscription" },
			{ status: 500 },
		);
	}
};
