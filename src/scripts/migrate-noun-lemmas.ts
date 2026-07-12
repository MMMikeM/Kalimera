/**
 * One-off migration: strip leading article from noun greekText rows.
 *
 * Before: greekText = "η νύχτα"  (article baked in at seed time)
 * After:  greekText = "νύχτα"    (bare lemma; article derived from noun_details.gender)
 *
 * Handles the case where a bare-lemma row already exists in the DB:
 * the article-prefixed duplicate is deleted (bare form is canonical).
 * Cascade FKs (noun_details, nominal_forms, vocabulary_tags, vocab_progress
 * etc.) are all ON DELETE CASCADE, so related rows follow the delete cleanly.
 *
 * Idempotent: re-running is a no-op once lemmas are bare.
 */

import { sql } from "drizzle-orm";

import type { Db } from "../server/db/types";

export async function migrateNounLemmas(db: Db) {
	console.log("Migrating noun greekText: stripping leading articles...");

	const allNouns = await db.query.vocabulary.findMany({
		where: { wordType: "noun" },
		columns: { id: true, greekText: true },
	});

	const withArticle = allNouns.filter((v) => v.greekText.includes(" "));
	const alreadyBare = new Map(
		allNouns.filter((v) => !v.greekText.includes(" ")).map((v) => [v.greekText, v.id]),
	);

	console.log(`Total nouns: ${allNouns.length}`);
	console.log(`With article prefix: ${withArticle.length}`);
	console.log(`Already bare: ${alreadyBare.size}`);

	if (withArticle.length === 0) {
		console.log("Nothing to do — all noun rows already have bare lemmas.");
		return;
	}

	// Find collisions:
	// 1. Article-prefixed rows whose bare form already exists as a bare row
	// 2. Article-prefixed rows that share a bare form with ANOTHER article-prefixed row
	const seenBareForms = new Map<string, number>(); // bareForm → first id that claims it
	const toDelete: { id: number; greekText: string; bareForm: string; reason: string }[] = [];
	const safe: { id: number; greekText: string; bareForm: string }[] = [];

	for (const row of withArticle) {
		const bareForm = row.greekText.split(" ").slice(1).join(" ");

		if (alreadyBare.has(bareForm)) {
			const bareId = alreadyBare.get(bareForm);
			toDelete.push({ id: row.id, greekText: row.greekText, bareForm, reason: `bare row id=${bareId} already exists` });
		} else if (seenBareForms.has(bareForm)) {
			const firstId = seenBareForms.get(bareForm);
			toDelete.push({ id: row.id, greekText: row.greekText, bareForm, reason: `duplicate of id=${firstId}` });
		} else {
			seenBareForms.set(bareForm, row.id);
			safe.push({ id: row.id, greekText: row.greekText, bareForm });
		}
	}

	if (toDelete.length > 0) {
		console.log(`\nCollisions to delete (${toDelete.length}):`);
		for (const c of toDelete) {
			console.log(`  DELETE id=${c.id} "${c.greekText}" → "${c.bareForm}" (${c.reason})`);
		}
		const deleteIds = toDelete.map((c) => c.id);
		await db.run(
			sql`DELETE FROM vocabulary WHERE id IN (${sql.raw(deleteIds.join(","))})`,
		);
		console.log(`Deleted ${toDelete.length} duplicate rows.`);
	}

	console.log(`\nSample of rows to update (first 5):`);
	for (const row of safe.slice(0, 5)) {
		console.log(`  id=${row.id}: "${row.greekText}" → "${row.bareForm}"`);
	}

	// Bulk UPDATE the remainder
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
