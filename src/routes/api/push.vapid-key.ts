import type { Route } from "./+types/push.vapid-key";

/**
 * GET /api/push/vapid-key
 * Return the VAPID public key for client-side push subscription
 */
export const loader = async ({ context }: Route.LoaderArgs) => {
	const vapidPublicKey =
		context?.cloudflare?.env?.VAPID_PUBLIC_KEY ?? process.env.VAPID_PUBLIC_KEY;

	if (!vapidPublicKey) {
		return Response.json(
			{ error: "Push notifications not configured" },
			{ status: 503 },
		);
	}

	return Response.json({ vapidPublicKey });
};
