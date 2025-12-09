/// <reference types="@cloudflare/workers-types" />
import { createRequestHandler } from "react-router";
import { createDb, runWithDb } from "./db";

type CloudflareEnv = {
	TURSO_DATABASE_URL: string;
	TURSO_AUTH_TOKEN?: string;
};

declare module "react-router" {
	interface AppLoadContext {
		db: ReturnType<typeof createDb>;
		cloudflare: {
			env: CloudflareEnv;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE
);

export default {
	async fetch(
		request: Request,
		env: CloudflareEnv,
		ctx: ExecutionContext
	): Promise<Response> {
		const db = createDb(env);
		return runWithDb(db, () =>
			requestHandler(request, {
				db,
				cloudflare: { env, ctx },
			})
		);
	},
};
