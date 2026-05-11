// Side-effect import to enable TanStack Start server route type augmentations
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

import { createWebAuthnFromRequest } from "@/server/auth/auth";
import { userHasPasskey } from "@/server/db/queries/passkeys";
import { findUserByUsername } from "@/server/db/queries/users";

interface AuthOptionsBody {
	username?: string;
}

export const Route = createFileRoute("/api/webauthn/auth-options")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = (await request.json()) as AuthOptionsBody;
					const { username } = body;

					let userId: number | undefined;

					if (username) {
						const user = await findUserByUsername(username);
						if (!user) {
							return Response.json({ error: "User not found" }, { status: 404 });
						}

						const hasPasskey = await userHasPasskey(user.id);
						if (!hasPasskey) {
							return Response.json(
								{ error: "No passkey registered for this user" },
								{ status: 400 },
							);
						}

						userId = user.id;
					}

					const webauthn = createWebAuthnFromRequest(request);

					const options = await webauthn.generateAuthenticationOptions(userId);

					return Response.json(options);
				} catch (error) {
					console.error("WebAuthn auth options error:", error);
					return Response.json(
						{ error: "Failed to generate authentication options" },
						{ status: 500 },
					);
				}
			},
		},
	},
});
