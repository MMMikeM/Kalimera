// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";
import { createFileRoute } from "@tanstack/react-router";

import { createWebAuthnFromRequest } from "@/lib/auth";

interface RegisterVerifyBody {
	userId: number;
	response: RegistrationResponseJSON;
	challenge: string;
}

export const Route = createFileRoute("/api/webauthn/register-verify")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = (await request.json()) as RegisterVerifyBody;
					const { userId, response, challenge } = body;

					if (!userId || !response || !challenge) {
						return Response.json(
							{ error: "Missing required fields: userId, response, challenge" },
							{ status: 400 },
						);
					}

					const webauthn = createWebAuthnFromRequest(request);

					const result = await webauthn.verifyRegistration(userId, response, challenge);

					return Response.json(result);
				} catch (error) {
					console.error("WebAuthn register verify error:", error);
					const message = error instanceof Error ? error.message : "Verification failed";
					return Response.json({ error: message }, { status: 400 });
				}
			},
		},
	},
});
