import "@tanstack/react-start/server-only";
import { createServerOnlyFn } from "@tanstack/react-start";
import { connect } from "@tursodatabase/serverless";
import { drizzle } from "drizzle-orm/tursodatabase-serverless";

import { relations } from "./relations";
import { withReadRetry } from "./retry";

const required = (name: string): string => {
	const value = process.env[name];
	if (!value) throw new Error(`${name} is not set`);
	return value;
};

const openConnection = createServerOnlyFn(() =>
	connect({
		url: required("TURSO_DATABASE_URL"),
		defaultQueryTimeout: 30_000,
		...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
	}),
);

export const db = drizzle({ client: withReadRetry(openConnection()), relations });

console.log("[db] connecting to", process.env.TURSO_DATABASE_URL);

/** Drizzle transaction client passed into multi-step mutations. */
export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

/**
 * Runs a transaction on a connection of its own, so statements from concurrent
 * requests sharing `db` can't land inside it. No read retry here: a retried read
 * opens a fresh session, which would run outside the transaction it belongs to.
 */
export const inTransaction = async <T>(run: (tx: DbTransaction) => Promise<T>) => {
	const connection = drizzle({ client: openConnection(), relations });
	try {
		return await connection.transaction(run);
	} finally {
		// The transaction has already committed or rolled back; a failed close must not report it as failed.
		await connection.$client
			.close()
			.catch((error) => console.warn("[db] closing a transaction connection failed:", error));
	}
};
