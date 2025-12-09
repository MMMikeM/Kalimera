import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import { AsyncLocalStorage } from "node:async_hooks";
import * as schema from "./schema";

type DbClient = ReturnType<typeof drizzle<typeof schema>>;

// AsyncLocalStorage to hold the db instance per request
const dbStorage = new AsyncLocalStorage<DbClient>();

// Set the db for the current async context (call from entry.worker.ts)
export const runWithDb = <T>(db: DbClient, fn: () => T): T => {
	return dbStorage.run(db, fn);
};

// Create a db instance from env vars (for Cloudflare Workers)
export const createDb = (env: {
	TURSO_DATABASE_URL: string;
	TURSO_AUTH_TOKEN?: string;
}): DbClient => {
	const client = createClient({
		url: env.TURSO_DATABASE_URL,
		authToken: env.TURSO_AUTH_TOKEN,
	});
	return drizzle(client, { schema });
};

// Get db from async context, falling back to process.env for local dev/scripts
const getDb = (): DbClient => {
	const contextDb = dbStorage.getStore();
	if (contextDb) return contextDb;

	// Fallback for local development and scripts (uses process.env)
	const url = process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080";
	const client = createClient({
		url,
		authToken: process.env.TURSO_AUTH_TOKEN,
	});
	return drizzle(client, { schema });
};

// Proxy that lazily resolves to the correct db instance
export const db = new Proxy({} as DbClient, {
	get(_, prop) {
		return getDb()[prop as keyof DbClient];
	},
});
