import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	// Tags table (supports built-in and user-created tags)
	await db.schema
		.createTable("tags")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("slug", "text", (col) => col.notNull().unique())
		.addColumn("name", "text", (col) => col.notNull())
		.addColumn("description", "text")
		.addColumn("is_system", "boolean", (col) => col.notNull().defaultTo(true))
		.addColumn("display_order", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("created_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	// Join table for vocabulary <-> tags (many-to-many)
	await db.schema
		.createTable("vocabulary_tags")
		.addColumn("vocabulary_id", "integer", (col) =>
			col.notNull().references("vocabulary.id").onDelete("cascade"),
		)
		.addColumn("tag_id", "integer", (col) =>
			col.notNull().references("tags.id").onDelete("cascade"),
		)
		.addColumn("display_order", "integer", (col) => col.notNull().defaultTo(0))
		.addPrimaryKeyConstraint("vocabulary_tags_pkey", [
			"vocabulary_id",
			"tag_id",
		])
		.execute();

	// Add new columns to vocabulary table
	await db.schema
		.alterTable("vocabulary")
		.addColumn("gender", "varchar")
		.execute();

	await db.schema
		.alterTable("vocabulary")
		.addColumn("metadata", "jsonb")
		.execute();

	// Indexes for performance
	await db.schema
		.createIndex("idx_vocabulary_tags_tag_id")
		.on("vocabulary_tags")
		.column("tag_id")
		.execute();

	await db.schema
		.createIndex("idx_vocabulary_tags_vocab_id")
		.on("vocabulary_tags")
		.column("vocabulary_id")
		.execute();

	await db.schema
		.createIndex("idx_tags_slug")
		.on("tags")
		.column("slug")
		.execute();

	await db.schema
		.createIndex("idx_tags_is_system")
		.on("tags")
		.column("is_system")
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	// Drop indexes first
	await db.schema.dropIndex("idx_tags_is_system").ifExists().execute();
	await db.schema.dropIndex("idx_tags_slug").ifExists().execute();
	await db.schema.dropIndex("idx_vocabulary_tags_vocab_id").ifExists().execute();
	await db.schema.dropIndex("idx_vocabulary_tags_tag_id").ifExists().execute();

	// Drop tables
	await db.schema.dropTable("vocabulary_tags").ifExists().execute();
	await db.schema.dropTable("tags").ifExists().execute();

	// Remove added columns from vocabulary
	await db.schema
		.alterTable("vocabulary")
		.dropColumn("gender")
		.execute();

	await db.schema
		.alterTable("vocabulary")
		.dropColumn("metadata")
		.execute();
}
