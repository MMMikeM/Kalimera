import type { RegistrationResponseJSON } from "@simplewebauthn/server";
import type { Route } from "./+types/register-verify";
import { createWebAuthn } from "@/lib/auth";

interface RegisterVerifyBody {
	userId: number;
	response: RegistrationResponseJSON;
	challenge: string;
}

export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as RegisterVerifyBody;
		const { userId, response, challenge } = body;

		if (!userId || !response || !challenge) {
			return Response.json(
				{ error: "Missing required fields: userId, response, challenge" },
				{ status: 400 },
			);
		}

		const url = new URL(request.url);
		const webauthn = createWebAuthn({
			rpName: "Greek Learning",
			rpID: url.hostname,
			origin: url.origin,
		});

		const result = await webauthn.verifyRegistration(userId, response, challenge);

		return Response.json(result);
	} catch (error) {
		console.error("WebAuthn register verify error:", error);
		const message = error instanceof Error ? error.message : "Verification failed";
		return Response.json({ error: message }, { status: 400 });
	}
};
