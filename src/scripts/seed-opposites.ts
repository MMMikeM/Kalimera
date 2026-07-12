import { inArray } from "drizzle-orm";

import { vocabulary, vocabularyOpposites } from "../server/db/schema";
import type { Db } from "../server/db/types";
import { OPPOSITE_PAIRS } from "./seed-data/vocabulary/opposites";

export async function seedOpposites(db: Db) {
	console.log("\nSeeding opposite pairs...");

	const lemmas = [...new Set(OPPOSITE_PAIRS.flatMap((p) => [p.a, p.b]))];
	const rows = await db
		.select({ id: vocabulary.id, greekText: vocabulary.greekText })
		.from(vocabulary)
		.where(inArray(vocabulary.greekText, lemmas));

	const idByLemma = new Map(rows.map((r) => [r.greekText, r.id]));

	const pairs: { wordAId: number; wordBId: number }[] = [];
	const missing: string[] = [];
	for (const { a, b } of OPPOSITE_PAIRS) {
		const aId = idByLemma.get(a);
		const bId = idByLemma.get(b);
		if (aId == null || bId == null) {
			if (aId == null) missing.push(a);
			if (bId == null) missing.push(b);
			continue;
		}
		// Table enforces wordAId < wordBId so each pair has one canonical row.
		pairs.push(aId < bId ? { wordAId: aId, wordBId: bId } : { wordAId: bId, wordBId: aId });
	}

	if (missing.length > 0) {
		console.warn(
			`  Warning: ${missing.length} lemma(s) not in vocabulary, skipped: ${missing.join(", ")}`,
		);
	}

	if (pairs.length > 0) {
		await db.insert(vocabularyOpposites).values(pairs).onConflictDoNothing();
	}

	console.log(`  → ${pairs.length} opposite pairs upserted.`);
}
