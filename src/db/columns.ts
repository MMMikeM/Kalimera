import { sql } from "drizzle-orm";
import type { AnySQLiteColumn, SQLiteColumn } from "drizzle-orm/sqlite-core";
import { integer, real, text } from "drizzle-orm/sqlite-core";

// Primary key
const pk = (name = "id") => integer(name).primaryKey({ autoIncrement: true });

// Strings
const string = (name: string) => text(name).notNull();
const nullableString = (name: string) => text(name);

// Enums
const oneOf = <T extends readonly [string, ...string[]]>(name: string, options: T) =>
	text(name, { enum: options }).notNull();

const nullableOneOf = <T extends readonly [string, ...string[]]>(name: string, options: T) =>
	text(name, { enum: options });

// Numbers
const int = (name: string) => integer(name).notNull();
const nullableInt = (name: string) => integer(name);
const decimal = (name: string) => real(name).notNull();
const nullableDecimal = (name: string) => real(name);

// Booleans (SQLite stores as 0/1)
const bool = (name: string) => integer(name, { mode: "boolean" }).notNull();
const nullableBool = (name: string) => integer(name, { mode: "boolean" });

// Timestamps
const timestamp = (name: string) => integer(name, { mode: "timestamp" }).notNull();
const nullableTimestamp = (name: string) => integer(name, { mode: "timestamp" });
const createdAt = (name = "created_at") => timestamp(name).default(sql`(unixepoch())`);
const updatedAt = (name = "updated_at") => nullableTimestamp(name).$onUpdate(() => new Date());

// JSON
const json = <T>(name: string) => text(name, { mode: "json" }).$type<T>();

// Foreign keys
const cascadeFk = (
	name: string,
	ref: SQLiteColumn | (() => AnySQLiteColumn),
) => {
	const refThunk = typeof ref === "function" ? ref : () => ref;
	return integer(name)
		.notNull()
		.references(refThunk, { onDelete: "cascade" });
};

const nullableFk = (
	name: string,
	ref: SQLiteColumn | (() => AnySQLiteColumn),
) => {
	const refThunk = typeof ref === "function" ? ref : () => ref;
	return integer(name).references(refThunk, { onDelete: "set null" });
};

export {
	pk,
	string,
	nullableString,
	oneOf,
	nullableOneOf,
	int,
	nullableInt,
	decimal,
	nullableDecimal,
	bool,
	nullableBool,
	timestamp,
	nullableTimestamp,
	createdAt,
	updatedAt,
	json,
	cascadeFk,
	nullableFk,
};
