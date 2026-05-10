// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/errors")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const { message, stack, url, userAgent, timestamp } = body as {
						message?: string;
						stack?: string;
						url?: string;
						userAgent?: string;
						timestamp?: string;
					};

					// Log to console (appears in Cloudflare Worker logs)
					console.error("[CLIENT ERROR]", {
						message,
						stack,
						url,
						userAgent,
						timestamp,
					});

					return new Response(JSON.stringify({ logged: true }), {
						status: 200,
						headers: { "Content-Type": "application/json" },
					});
				} catch (e) {
					console.error("[ERROR LOGGING FAILED]", e);
					return new Response(JSON.stringify({ logged: false }), {
						status: 500,
						headers: { "Content-Type": "application/json" },
					});
				}
			},
		},
	},
});
