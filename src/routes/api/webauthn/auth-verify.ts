// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import type { AuthenticationResponseJSON } from "@simplewebauthn/server";
import { createFileRoute } from "@tanstack/react-router";

import { createWebAuthnFromRequest } from "@/server/auth/auth";
import { createAuthCookie } from "@/server/auth/auth-cookie";
import { getUserById } from "@/server/db/queries/users";

interface AuthVerifyBody {
	response: AuthenticationResponseJSON;
	challenge: string;
}

export const Route = createFileRoute("/api/webauthn/auth-verify")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = (await request.json()) as AuthVerifyBody;
					const { response, challenge } = body;

					if (!response || !challenge) {
						return Response.json(
							{ error: "Missing required fields: response, challenge" },
							{ status: 400 },
						);
					}

					const webauthn = createWebAuthnFromRequest(request);

					const result = await webauthn.verifyAuthentication(response, challenge);
					const user = await getUserById(result.userId);
					const username = user?.username || "user";

					const cookie = createAuthCookie({ userId: result.userId, username });

					return Response.json({ ...result, username }, { headers: { "Set-Cookie": cookie } });
				} catch (error) {
					console.error("WebAuthn auth verify error:", error);
					const message = error instanceof Error ? error.message : "Authentication failed";
					return Response.json({ error: message }, { status: 400 });
				}
			},
		},
	},
});
