/**
 * Minimal seeder for integration tests — verbs + test user.
 * Avoids importing lesson files which use @/types path aliases that Vitest
 * doesn't resolve correctly in deep transitive imports.
 */
import { users } from "../server/db/schema-auth";
import { FULL_VERB_CONJUGATIONS } from "../scripts/seed-data/vocabulary/verb-conjugations";
import { VERB_ITEMS } from "../scripts/seed-data/vocabulary/verbs";
import { batchInsertVocab } from "../scripts/seed-pipeline";
import type { TestDb } from "./db";

export const seedTestUser = async (db: TestDb, userId = 1) => {
	await db
		.insert(users)
		.values({ id: userId, code: "test", displayName: "Test User" })
		.onConflictDoNothing();
};

export const seedTestVerbs = async (db: TestDb) => {
	// Only seed verbs that appear in FULL_VERB_CONJUGATIONS so every pool ID
	// is guaranteed to produce at least one question (no conjugation-less verbs).
	const conjugatedLemmas = new Set(FULL_VERB_CONJUGATIONS.map((v) => v.lemma));
	const vocabItems = VERB_ITEMS.filter((v) => conjugatedLemmas.has(v.vocab.greekText)).map(
		(v) => v.vocab,
	);
	await batchInsertVocab(db, vocabItems);
};
