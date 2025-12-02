import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	// Remove any duplicate vocabulary entries (keep lowest ID to preserve FK relationships)
	await sql`
		DELETE FROM vocabulary v1
		USING vocabulary v2
		WHERE v1.greek_text = v2.greek_text
		  AND v1.id > v2.id
	`.execute(db);

	// Add unique constraint on greek_text for additive seeding
	await db.schema
		.alterTable("vocabulary")
		.addUniqueConstraint("vocabulary_greek_text_unique", ["greek_text"])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable("vocabulary")
		.dropConstraint("vocabulary_greek_text_unique")
		.execute();
}
