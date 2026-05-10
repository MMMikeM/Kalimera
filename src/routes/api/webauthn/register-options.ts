// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import { createWebAuthnFromRequest } from "@/lib/auth";

interface RegisterOptionsBody {
	userId: number;
	username: string;
}

export const Route = createFileRoute("/api/webauthn/register-options")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = (await request.json()) as RegisterOptionsBody;
					const { userId, username } = body;

					if (!userId || !username) {
						return Response.json(
							{ error: "Missing required fields: userId, username" },
							{ status: 400 },
						);
					}

					const webauthn = createWebAuthnFromRequest(request);

					const options = await webauthn.generateRegistrationOptions(userId, username);

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
