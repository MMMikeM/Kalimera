import "@tanstack/react-start/server-only";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/tursodatabase-serverless";

import { relations } from "./relations";
import { OneTripConnection, RetryingConnection } from "./connection";

const required = (name: string): string => {
	const value = process.env[name];
	if (!value) throw new Error(`${name} is not set`);
	return value;
};

const connectionConfig = createServerOnlyFn(() => ({
	url: required("TURSO_DATABASE_URL"),
	defaultQueryTimeout: 30_000,
	...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
}));

export const db = drizzle({ client: new RetryingConnection(connectionConfig()), relations });

console.log("[db] connecting to", process.env.TURSO_DATABASE_URL);

/** Drizzle transaction client passed into multi-step mutations. */
export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

/**
 * Runs a transaction on a connection of its own, so statements from concurrent
 * requests sharing `db` can't land inside it. No retry here: a retried statement
 * opens a fresh session, which would run outside the transaction it belongs to.
 */
export const inTransaction = async <T>(run: (tx: DbTransaction) => Promise<T>) => {
	const connection = drizzle({ client: new OneTripConnection(connectionConfig()), relations });
	try {
		return await connection.transaction(run);
	} finally {
		// The transaction has already committed or rolled back; a failed close must not report it as failed.
		await connection.$client
			.close()
			.catch((error) => console.warn("[db] closing a transaction connection failed:", error));
	}
};
