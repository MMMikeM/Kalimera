import type { AuthenticationResponseJSON } from "@simplewebauthn/server";
import type { Route } from "./+types/auth-verify";
import { createWebAuthn } from "@/lib/auth";
import { getUserById } from "@/db.server/queries/practice";

interface AuthVerifyBody {
	response: AuthenticationResponseJSON;
	challenge: string;
}

export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as AuthVerifyBody;
		const { response, challenge } = body;

		if (!response || !challenge) {
			return Response.json(
				{ error: "Missing required fields: response, challenge" },
				{ status: 400 },
			);
		}

		const url = new URL(request.url);
		const webauthn = createWebAuthn({
			rpName: "Greek Learning",
			rpID: url.hostname,
			origin: url.origin,
		});

		const result = await webauthn.verifyAuthentication(response, challenge);

		const user = await getUserById(result.userId);

		return Response.json({
			...result,
			username: user?.username,
		});
	} catch (error) {
		console.error("WebAuthn auth verify error:", error);
		const message = error instanceof Error ? error.message : "Authentication failed";
		return Response.json({ error: message }, { status: 400 });
	}
};
