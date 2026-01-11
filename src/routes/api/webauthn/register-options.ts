import { createWebAuthn } from "@/lib/auth";
import type { Route } from "./+types/register-options";

interface RegisterOptionsBody {
	userId: number;
	username: string;
}

export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		const body = (await request.json()) as RegisterOptionsBody;
		const { userId, username } = body;

		if (!userId || !username) {
			return Response.json(
				{ error: "Missing required fields: userId, username" },
				{ status: 400 },
			);
		}

		const url = new URL(request.url);
		const webauthn = createWebAuthn({
			rpName: "Greek Learning",
			rpID: url.hostname,
			origin: url.origin,
		});

		const options = await webauthn.generateRegistrationOptions(
			userId,
			username,
		);

		return Response.json(options);
	} catch (error) {
		console.error("WebAuthn register options error:", error);
		return Response.json(
			{ error: "Failed to generate registration options" },
			{ status: 500 },
		);
	}
};
