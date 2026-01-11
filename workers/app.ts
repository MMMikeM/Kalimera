import { createRequestHandler } from "react-router";
import { type CloudflareEnv, createDb } from "../src/db/client.cloudflare";

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
	// @ts-expect-error - virtual module
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(
		request: Request,
		env: CloudflareEnv,
		ctx: ExecutionContext,
	): Promise<Response> {
		const db = createDb(env);
		return requestHandler(request, {
			db,
			cloudflare: { env, ctx },
		});
	},
} satisfies ExportedHandler<CloudflareEnv>;
