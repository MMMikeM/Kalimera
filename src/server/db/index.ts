import "@tanstack/react-start/server-only";
import { createServerOnlyFn } from "@tanstack/react-start";
import { connect } from "@tursodatabase/serverless";
import { drizzle } from "drizzle-orm/tursodatabase-serverless";

import { relations } from "./relations";
import { withReadRetry } from "./retry";

const getDb = createServerOnlyFn(() => {
	if (!process.env.TURSO_DATABASE_URL) throw new Error("Env vars missing");

	console.log("[db] connecting to", process.env.TURSO_DATABASE_URL);

	const client = connect({
		url: process.env.TURSO_DATABASE_URL,
		authToken: process.env.TURSO_AUTH_TOKEN,
	});

	return drizzle({ client: withReadRetry(client), relations });
});

export const db = getDb();
