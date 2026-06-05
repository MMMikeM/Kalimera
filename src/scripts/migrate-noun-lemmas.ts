/**
 * One-off migration: strip leading article from noun greekText rows.
 *
 * Before: greekText = "η νύχτα"  (article baked in at seed time)
 * After:  greekText = "νύχτα"    (bare lemma; article derived from noun_details.gender)
 *
 * Idempotent: bare lemmas have no space-separated first token to strip, so
 * re-running after the initial pass is a safe no-op (SQL LIKE '%  %' guard).
 *
 * Run against local before applying to prod:
 *   pnpm tsx src/scripts/migrate-noun-lemmas.ts
 */

import { sql } from "drizzle-orm";

import type { db as ProdDb } from "../server/db";

type Db = typeof ProdDb;

export async function migrateNounLemmas(db: Db) {
	console.log("Migrating noun greekText: stripping leading articles...");

	// Preview what will change
	const preview = await db.query.vocabulary.findMany({
		where: { wordType: "noun" },
		columns: { id: true, greekText: true },
	});

	const affected = preview.filter((v) => v.greekText.includes(" "));
	console.log(`Rows to update: ${affected.length} / ${preview.length} nouns`);

	if (affected.length === 0) {
		console.log("Nothing to do — all noun rows already have bare lemmas.");
		return;
	}

	// Show a sample
	console.log("\nSample (first 5):");
	for (const row of affected.slice(0, 5)) {
		const bare = row.greekText.split(" ").slice(1).join(" ");
		console.log(`  ${row.id}: "${row.greekText}" → "${bare}"`);
	}

	// Single UPDATE — strip everything up to and including the first space
	const result = await db.run(
		sql`UPDATE vocabulary SET greek_text = substr(greek_text, instr(greek_text, ' ') + 1) WHERE word_type = 'noun' AND greek_text LIKE '% %'`,
	);

	console.log(`\nUpdated ${result.rowsAffected} rows.`);
	console.log("Migration complete.");
}

// Standalone runner
if (import.meta.url === `file://${process.argv[1]}`) {
	import("../server/db").then(({ db }) =>
		migrateNounLemmas(db)
			.then(() => process.exit(0))
			.catch((err) => {
				console.error("Migration failed:", err);
				process.exit(1);
			}),
	);
}
