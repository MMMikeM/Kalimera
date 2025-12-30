import type { Route } from "./+types/push.subscribe";
import { db } from "@/db";
import { pushSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

interface SubscribeBody {
	userId: number;
	endpoint: string;
	keys: {
		p256dh: string;
		auth: string;
	};
}

/**
 * POST /api/push/subscribe
 * Save a push subscription for a user
 */
export const action = async ({ request, context }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as SubscribeBody;
		const { userId, endpoint, keys } = body;

		if (!userId || !endpoint || !keys?.p256dh || !keys?.auth) {
			return Response.json(
				{ error: "Missing required fields: userId, endpoint, keys.p256dh, keys.auth" },
				{ status: 400 },
			);
		}

		const database = context?.db ?? db;

		// Upsert: Update if endpoint exists, insert if not
		const existing = await database
			.select()
			.from(pushSubscriptions)
			.where(eq(pushSubscriptions.endpoint, endpoint))
			.get();

		if (existing) {
			// Update existing subscription (might have new keys)
			await database
				.update(pushSubscriptions)
				.set({
					userId,
					p256dh: keys.p256dh,
					auth: keys.auth,
				})
				.where(eq(pushSubscriptions.endpoint, endpoint));
		} else {
			// Insert new subscription
			await database.insert(pushSubscriptions).values({
				userId,
				endpoint,
				p256dh: keys.p256dh,
				auth: keys.auth,
			});
		}

		return Response.json({ success: true });
	} catch (error) {
		console.error("Push subscribe error:", error);
		return Response.json(
			{ error: "Failed to save subscription" },
			{ status: 500 },
		);
	}
};
