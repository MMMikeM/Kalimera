import { findUserByUsername, userHasPasskey } from "@/db.server/queries/auth";
import { createWebAuthn } from "@/lib/auth";
import type { Route } from "./+types/auth-options";

interface AuthOptionsBody {
	username?: string;
}

export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

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

		const url = new URL(request.url);
		const webauthn = createWebAuthn({
			rpName: "Greek Learning",
			rpID: url.hostname,
			origin: url.origin,
		});

		const options = await webauthn.generateAuthenticationOptions(userId);

		return Response.json(options);
	} catch (error) {
		console.error("WebAuthn auth options error:", error);
		return Response.json(
			{ error: "Failed to generate authentication options" },
			{ status: 500 },
		);
	}
};
