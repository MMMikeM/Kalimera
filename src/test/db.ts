import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/tursodatabase/database";

import { relations } from "@/server/db/relations";

/** In-memory database for integration tests, same driver family as production. */
export const createTestDb = () => {
	const db = drizzle({ connection: ":memory:", relations });
	return { db };
};

export type TestDb = ReturnType<typeof createTestDb>["db"];

const MIGRATIONS_DIR = resolve(new URL("../../drizzle", import.meta.url).pathname);

export const runMigrations = async (db: TestDb) => {
	const dirs = readdirSync(MIGRATIONS_DIR)
		.filter((d) => /^\d{14}_/.test(d))
		.sort();

	for (const dir of dirs) {
		const migration = readFileSync(resolve(MIGRATIONS_DIR, dir, "migration.sql"), "utf8");
		for (const stmt of migration
			.split("--> statement-breakpoint")
			.map((s) => s.trim())
			.filter(Boolean)) {
			await db.run(sql.raw(stmt));
		}
	}
};
