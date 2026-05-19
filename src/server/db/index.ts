import "@tanstack/react-start/server-only";
import { createClient } from "@libsql/client/web";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/libsql/web";

import { relations } from "./relations";

const getDb = createServerOnlyFn(() => {
	if (!process.env.TURSO_DATABASE_URL) throw new Error("Env vars missing");

	const client = createClient({
		url: process.env.TURSO_DATABASE_URL,
		authToken: process.env.TURSO_AUTH_TOKEN,
	});

	return drizzle({ client, relations, logger: false });
});

export const db = getDb();
