// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";
import { createFileRoute } from "@tanstack/react-router";

import { createWebAuthnFromRequest } from "@/server/auth";
import { getAuthSession } from "@/server/auth/session";

interface RegisterVerifyBody {
	response: RegistrationResponseJSON;
	challenge: string;
}

export const Route = createFileRoute("/api/webauthn/register-verify")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const auth = await getAuthSession();
					if (!auth) return Response.json({ error: "Not signed in" }, { status: 401 });

					const body = (await request.json()) as RegisterVerifyBody;
					const { response, challenge } = body;

					if (!response || !challenge) {
						return Response.json(
							{ error: "Missing required fields: response, challenge" },
							{ status: 400 },
						);
					}

					const webauthn = createWebAuthnFromRequest(request);

					const result = await webauthn.verifyRegistration(auth.userId, response, challenge);

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
