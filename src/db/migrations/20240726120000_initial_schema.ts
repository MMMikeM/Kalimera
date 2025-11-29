import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	// Central vocabulary table
	await db.schema
		.createTable("vocabulary")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("greek_text", "varchar", (col) => col.notNull())
		.addColumn("english_translation", "varchar", (col) => col.notNull())
		.addColumn("pronunciation", "varchar")
		.addColumn("word_type", "varchar")
		.addColumn("category", "varchar")
		.addColumn("example_greek", "text")
		.addColumn("example_english", "text")
		.addColumn("status", "varchar", (col) =>
			col.notNull().defaultTo("unprocessed"),
		)
		.addColumn("difficulty_level", "integer", (col) =>
			col.notNull().defaultTo(0),
		)
		.addColumn("is_problem_word", "boolean", (col) =>
			col.notNull().defaultTo(false),
		)
		.addColumn("mistake_count", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("review_count", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("last_reviewed", "date")
		.addColumn("created_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	// Grammatical details for nouns
	await db.schema
		.createTable("noun_details")
		.addColumn("vocab_id", "integer", (col) =>
			col.primaryKey().references("vocabulary.id").onDelete("cascade"),
		)
		.addColumn("gender", "varchar", (col) => col.notNull())
		.addColumn("nominative_singular", "varchar", (col) => col.notNull())
		.addColumn("accusative_singular", "varchar")
		.addColumn("genitive_singular", "varchar")
		.addColumn("nominative_plural", "varchar")
		.addColumn("accusative_plural", "varchar")
		.addColumn("genitive_plural", "varchar")
		.addColumn("notes", "text")
		.execute();

	// Grammatical details for verbs
	await db.schema
		.createTable("verb_details")
		.addColumn("vocab_id", "integer", (col) =>
			col.primaryKey().references("vocabulary.id").onDelete("cascade"),
		)
		.addColumn("infinitive", "varchar", (col) => col.notNull())
		.addColumn("conjugation_family", "varchar", (col) => col.notNull())
		.addColumn("notes", "text")
		.execute();

	// Individual verb conjugations
	await db.schema
		.createTable("verb_conjugations")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("verb_details_id", "integer", (col) =>
			col.notNull().references("verb_details.vocab_id").onDelete("cascade"),
		)
		.addColumn("tense", "varchar", (col) => col.notNull())
		.addColumn("person", "varchar", (col) => col.notNull())
		.addColumn("form", "varchar", (col) => col.notNull())
		.execute();

	// Weak areas table
	await db.schema
		.createTable("weak_areas")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("area_type", "varchar", (col) => col.notNull())
		.addColumn("area_identifier", "varchar", (col) => col.notNull())
		.addColumn("mistake_count", "integer", (col) => col.notNull().defaultTo(1))
		.addColumn("last_mistake_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("needs_focus", "boolean", (col) => col.notNull().defaultTo(true))
		.execute();

	// Practice sessions
	await db.schema
		.createTable("practice_sessions")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("session_type", "varchar")
		.addColumn("category", "varchar")
		.addColumn("word_type_filter", "varchar")
		.addColumn("total_questions", "integer")
		.addColumn("correct_answers", "integer")
		.addColumn("focus_area", "varchar")
		.addColumn("started_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("completed_at", "timestamp")
		.execute();

	// Individual practice attempts
	await db.schema
		.createTable("practice_attempts")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("session_id", "integer", (col) =>
			col.references("practice_sessions.id").onDelete("cascade"),
		)
		.addColumn("vocabulary_id", "integer", (col) =>
			col.references("vocabulary.id").onDelete("cascade"),
		)
		.addColumn("question_text", "text", (col) => col.notNull())
		.addColumn("correct_answer", "text", (col) => col.notNull())
		.addColumn("user_answer", "text")
		.addColumn("is_correct", "boolean")
		.addColumn("time_taken", "integer")
		.addColumn("attempted_at", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	// Indexes for performance
	await db.schema
		.createIndex("idx_vocabulary_category")
		.on("vocabulary")
		.column("category")
		.execute();
	await db.schema
		.createIndex("idx_vocabulary_word_type")
		.on("vocabulary")
		.column("word_type")
		.execute();
	await db.schema
		.createIndex("idx_vocabulary_difficulty")
		.on("vocabulary")
		.column("difficulty_level")
		.execute();
	await db.schema
		.createIndex("idx_vocabulary_problems")
		.on("vocabulary")
		.column("is_problem_word")
		.where("is_problem_word", "=", true)
		.execute();

	// Note: Full-text search index setup might require raw SQL depending on complexity
	// For now, we'll use a standard GIN index.
	await db.executeQuery(
		sql`
    CREATE INDEX idx_vocabulary_search ON vocabulary USING gin(to_tsvector('simple', greek_text || ' ' || english_translation));
  `.compile(db),
	);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("practice_attempts").ifExists().execute();
	await db.schema.dropTable("practice_sessions").ifExists().execute();
	await db.schema.dropTable("weak_areas").ifExists().execute();
	await db.schema.dropTable("verb_conjugations").ifExists().execute();
	await db.schema.dropTable("verb_details").ifExists().execute();
	await db.schema.dropTable("noun_details").ifExists().execute();
	await db.schema.dropTable("vocabulary").ifExists().execute();
}
