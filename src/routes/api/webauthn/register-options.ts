// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import { createWebAuthnFromRequest } from "@/server/auth";
import { getAuthSession } from "@/server/auth/session";

export const Route = createFileRoute("/api/webauthn/register-options")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const auth = await getAuthSession();
					if (!auth) return Response.json({ error: "Not signed in" }, { status: 401 });

					const webauthn = createWebAuthnFromRequest(request);

					const options = await webauthn.generateRegistrationOptions(auth.userId, auth.username);

					return Response.json(options);
				} catch (error) {
					console.error("WebAuthn register options error:", error);
					return Response.json(
						{ error: "Failed to generate registration options" },
						{ status: 500 },
					);
				}
			},
		},
	},
});
