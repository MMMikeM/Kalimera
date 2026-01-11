import { AsyncLocalStorage } from "node:async_hooks";
import { type Client, createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/web";
import { relations } from "./relations";

// Helper to create a typed db instance
const createTypedDb = (client: Client) => drizzle({ client, relations });

type DbClient = ReturnType<typeof createTypedDb>;

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
	return createTypedDb(client);
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
	return createTypedDb(client);
};

// Proxy that lazily resolves to the correct db instance
// The explicit handler typing ensures db.query is properly typed
const dbHandler: ProxyHandler<DbClient> = {
	get(_, prop: keyof DbClient) {
		return getDb()[prop];
	},
};

export const db: DbClient = new Proxy({} as DbClient, dbHandler);
