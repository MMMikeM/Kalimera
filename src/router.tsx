import { createRouter } from "@tanstack/react-router";

import { NotFound, RouteError } from "./components/StatusPage";
import { routeTree } from "./routeTree.gen";
import type { AuthSession } from "./server/auth/session";

export interface RouterContext {
	auth: AuthSession | null;
}

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		context: { auth: null } satisfies RouterContext,
		defaultErrorComponent: RouteError,
		defaultNotFoundComponent: NotFound,
		defaultStaleTime: Infinity,
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
