/**
 * Quick SQL query runner against the configured DB (production by default).
 *
 * Usage:
 *   pnpm query "SELECT greek_text, frequency_rank FROM vocabulary WHERE word_type = 'verb' LIMIT 10"
 *   pnpm query "SELECT COUNT(*) FROM practice_attempts"
 */

import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
	console.error("Error: TURSO_DATABASE_URL not set (run with --env-file=.env or set it)");
	process.exit(1);
}

const sqlArg = process.argv[2];

if (!sqlArg) {
	console.error('Usage: pnpm query "<SQL>"');
	process.exit(1);
}

const client = createClient({ url, authToken });
const result = await client.execute(sqlArg);
client.close();

if (result.rows.length === 0) {
	console.log("(no rows)");
} else {
	console.table(result.rows);
}
