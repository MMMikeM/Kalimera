import { createRouter } from "@tanstack/react-router";

import type { AuthSession } from "./lib/auth-cookie";
import { routeTree } from "./routeTree.gen";

export interface RouterContext {
	auth: AuthSession | null;
}

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		context: { auth: null } satisfies RouterContext,
		defaultNotFoundComponent: () => <p>Not found</p>,
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
