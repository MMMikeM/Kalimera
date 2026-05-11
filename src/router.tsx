import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import type { AuthSession } from "./server/auth/cookie";

export interface RouterContext {
	auth: AuthSession | null;
}

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		context: { auth: null } satisfies RouterContext,
		defaultNotFoundComponent: () => <p>Not found</p>,
		defaultStaleTime: Infinity,
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
