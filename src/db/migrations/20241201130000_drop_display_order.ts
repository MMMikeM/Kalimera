import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
	await db.schema.alterTable("tags").dropColumn("display_order").execute();

	await db.schema
		.alterTable("vocabulary_tags")
		.dropColumn("display_order")
		.execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
	await db.schema
		.alterTable("tags")
		.addColumn("display_order", "integer", (col) => col.defaultTo(0))
		.execute();

	await db.schema
		.alterTable("vocabulary_tags")
		.addColumn("display_order", "integer", (col) => col.defaultTo(0))
		.execute();
};
