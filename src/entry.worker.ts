/// <reference types="@cloudflare/workers-types" />
import { createRequestHandler } from "react-router";
import { createDb, type CloudflareEnv } from "./db/client.cloudflare";

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
		return requestHandler(request, {
			db,
			cloudflare: { env, ctx },
		});
	},
};
