import { promises as fs } from "node:fs";
import * as path from "node:path";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./index.js";

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs,
		path,
		migrationFolder: path.join(import.meta.dirname, "migrations"),
	}),
});

const { error, results } = await migrator.migrateToLatest();

for (const result of results ?? []) {
	if (result.status === "Success") {
		console.log(`Migration "${result.migrationName}" executed successfully`);
	} else if (result.status === "Error") {
		console.error(`Migration "${result.migrationName}" failed`);
	}
}

if (error) {
	console.error("Migration failed:", error);
	process.exit(1);
}

await db.destroy();
console.log("Migrations complete");
