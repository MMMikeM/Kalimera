import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { relations } from "@/server/db/relations";

export const createTestDb = () => {
	const client = createClient({ url: ":memory:" });
	const db = drizzle({ client, relations });
	return { db, client };
};

export type TestDb = ReturnType<typeof createTestDb>["db"];

const MIGRATIONS_DIR = resolve(new URL("../../drizzle", import.meta.url).pathname);

export const runMigrations = async (client: ReturnType<typeof createClient>) => {
	const dirs = readdirSync(MIGRATIONS_DIR)
		.filter((d) => /^\d{14}_/.test(d))
		.sort();

	for (const dir of dirs) {
		const sql = readFileSync(resolve(MIGRATIONS_DIR, dir, "migration.sql"), "utf8");
		for (const stmt of sql
			.split("--> statement-breakpoint")
			.map((s) => s.trim())
			.filter(Boolean)) {
			await client.execute(stmt);
		}
	}
};
