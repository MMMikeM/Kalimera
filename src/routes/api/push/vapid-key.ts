import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/push/vapid-key")({
	loader: async () => {
		const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;

		if (!vapidPublicKey) {
			return Response.json({ error: "Push notifications not configured" }, { status: 503 });
		}

		return Response.json({ vapidPublicKey });
	},
});
