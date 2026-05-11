/**
 * Handles the common boilerplate for POST-only push notification endpoints:
 * method check, JSON parse, userId extraction, error boundary.
 */
export async function withPushPost(
	request: Request,
	handler: (userId: number, body: Record<string, unknown>) => Promise<Response>,
	errorLabel: string,
	failMessage: string,
): Promise<Response> {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}
	try {
		const body = (await request.json()) as Record<string, unknown>;
		const userId = typeof body?.userId === "number" ? body.userId : null;
		if (!userId) {
			return Response.json({ error: "Missing userId" }, { status: 400 });
		}
		return await handler(userId, body);
	} catch (error) {
		console.error(errorLabel, error);
		return Response.json({ error: failMessage }, { status: 500 });
	}
}
