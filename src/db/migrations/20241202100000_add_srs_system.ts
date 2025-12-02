import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	// 1. Add SRS fields to vocabulary table
	await db.schema
		.alterTable("vocabulary")
		.addColumn("next_review_at", "timestamp")
		.execute();

	await db.schema
		.alterTable("vocabulary")
		.addColumn("interval_days", "integer", (col) => col.defaultTo(1))
		.execute();

	await db.schema
		.alterTable("vocabulary")
		.addColumn("ease_factor", "numeric(3, 2)", (col) => col.defaultTo(2.5))
		.execute();

	// 2. Create vocabulary_skills table for recognition vs production tracking
	await db.schema
		.createTable("vocabulary_skills")
		.addColumn("vocabulary_id", "integer", (col) =>
			col.notNull().references("vocabulary.id").onDelete("cascade"),
		)
		.addColumn("skill_type", "varchar", (col) => col.notNull()) // 'recognition' | 'production'
		.addColumn("next_review_at", "timestamp")
		.addColumn("interval_days", "integer", (col) => col.defaultTo(1))
		.addColumn("ease_factor", "numeric(3, 2)", (col) => col.defaultTo(2.5))
		.addColumn("review_count", "integer", (col) => col.defaultTo(0))
		.addColumn("last_reviewed_at", "timestamp")
		.addPrimaryKeyConstraint("vocabulary_skills_pkey", [
			"vocabulary_id",
			"skill_type",
		])
		.execute();

	// Add check constraint for skill_type
	await db.executeQuery(
		sql`
		ALTER TABLE vocabulary_skills
		ADD CONSTRAINT vocabulary_skills_skill_type_check
		CHECK (skill_type IN ('recognition', 'production'))
		`.compile(db),
	);

	// 3. Create grammar_patterns table (move from TypeScript to DB)
	await db.schema
		.createTable("grammar_patterns")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("case_type", "varchar", (col) => col.notNull()) // accusative, genitive, nominative, vocative
		.addColumn("context", "varchar", (col) => col.notNull()) // directObjects, direction, timeExpressions, possession
		.addColumn("greek", "text", (col) => col.notNull())
		.addColumn("english", "text", (col) => col.notNull())
		.addColumn("explanation", "text")
		.addColumn("why_this_case", "text")
		// SRS fields for learning grammar patterns
		.addColumn("next_review_at", "timestamp")
		.addColumn("interval_days", "integer", (col) => col.defaultTo(1))
		.addColumn("ease_factor", "numeric(3, 2)", (col) => col.defaultTo(2.5))
		.addColumn("review_count", "integer", (col) => col.defaultTo(0))
		.addColumn("created_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	// Index for querying patterns by case type
	await db.schema
		.createIndex("idx_grammar_patterns_case")
		.on("grammar_patterns")
		.column("case_type")
		.execute();

	// Index for SRS queries (what's due for review)
	await db.schema
		.createIndex("idx_grammar_patterns_review")
		.on("grammar_patterns")
		.column("next_review_at")
		.execute();

	// 4. Create example_sentences table (multiple examples per word)
	await db.schema
		.createTable("example_sentences")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("vocabulary_id", "integer", (col) =>
			col.notNull().references("vocabulary.id").onDelete("cascade"),
		)
		.addColumn("greek_text", "text", (col) => col.notNull())
		.addColumn("english_text", "text", (col) => col.notNull())
		.addColumn("audio_url", "varchar")
		.addColumn("source", "varchar") // textbook, native speaker, conversation
		.addColumn("grammar_pattern_id", "integer", (col) =>
			col.references("grammar_patterns.id").onDelete("set null"),
		)
		.addColumn("created_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	// Index for looking up examples by vocabulary
	await db.schema
		.createIndex("idx_example_sentences_vocab")
		.on("example_sentences")
		.column("vocabulary_id")
		.execute();

	// 5. Add SRS index on vocabulary for review queries
	await db.schema
		.createIndex("idx_vocabulary_review")
		.on("vocabulary")
		.column("next_review_at")
		.execute();

	// Index on vocabulary_skills for review queries
	await db.schema
		.createIndex("idx_vocabulary_skills_review")
		.on("vocabulary_skills")
		.column("next_review_at")
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	// Drop indexes first
	await db.schema.dropIndex("idx_vocabulary_skills_review").ifExists().execute();
	await db.schema.dropIndex("idx_vocabulary_review").ifExists().execute();
	await db.schema.dropIndex("idx_example_sentences_vocab").ifExists().execute();
	await db.schema.dropIndex("idx_grammar_patterns_review").ifExists().execute();
	await db.schema.dropIndex("idx_grammar_patterns_case").ifExists().execute();

	// Drop tables
	await db.schema.dropTable("example_sentences").ifExists().execute();
	await db.schema.dropTable("grammar_patterns").ifExists().execute();
	await db.schema.dropTable("vocabulary_skills").ifExists().execute();

	// Remove columns from vocabulary
	await db.schema
		.alterTable("vocabulary")
		.dropColumn("ease_factor")
		.execute();

	await db.schema
		.alterTable("vocabulary")
		.dropColumn("interval_days")
		.execute();

	await db.schema
		.alterTable("vocabulary")
		.dropColumn("next_review_at")
		.execute();
}
