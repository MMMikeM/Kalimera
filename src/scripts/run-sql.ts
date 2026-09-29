import { readFileSync } from "node:fs";

import { connect } from "@tursodatabase/serverless";

import { splitSql } from "./split-sql";

const file = process.argv[2];
if (!file) {
	console.error("Usage: make sql <file.sql>");
	process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
	console.error("TURSO_DATABASE_URL is not set; is .env present?");
	process.exit(1);
}

const statements = splitSql(readFileSync(file, "utf8"));
if (statements.length === 0) {
	console.error(`${file} holds no statements.`);
	process.exit(1);
}

const connection = connect({ url, authToken: process.env.TURSO_AUTH_TOKEN });
console.log(`Running ${statements.length} statement(s) from ${file} against ${url}, in one transaction\n`);

try {
	await connection.execute("BEGIN IMMEDIATE");
	for (const [index, sql] of statements.entries()) {
		const result = await connection.execute(sql);
		console.log(`[${index + 1}] ${sql}`);
		if (result.columns.length > 0) {
			console.table(result.rows.map((row: Record<string, unknown>) =>
				Object.fromEntries(result.columns.map((column: string) => [column, row[column]])),
			));
		} else {
			console.log(`    ${result.rowsAffected} row(s) affected\n`);
		}
	}
	await connection.execute("COMMIT");
	console.log("Committed.");
} catch (error) {
	await connection.execute("ROLLBACK").catch(() => {});
	console.error("Rolled back; nothing was changed.\n", error);
	process.exitCode = 1;
} finally {
	await connection.close();
}
