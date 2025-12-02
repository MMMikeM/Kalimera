import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import * as schema from "./schema";

export type CloudflareEnv = {
	TURSO_DATABASE_URL: string;
	TURSO_AUTH_TOKEN?: string;
};

export const createDb = (env: CloudflareEnv) => {
	const client = createClient({
		url: env.TURSO_DATABASE_URL,
		authToken: env.TURSO_AUTH_TOKEN,
	});
	return drizzle(client, { schema });
};
