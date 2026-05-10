import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { getAuthSession } from "@/lib/auth-cookie";

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
	const auth = getAuthSession(request);
	if (!auth) throw redirect({ to: "/" });
	return next({ context: { auth } });
});
