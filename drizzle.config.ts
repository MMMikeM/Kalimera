import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL ?? "file:./local.db";

/** A file: URL means local dev — passing the cloud token would send it to Turso instead. */
const isLocalFile = url.startsWith("file:");

export default defineConfig({
	schema: ["./src/server/db/schema.ts", "./src/server/db/relations.ts"],
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: isLocalFile ? { url } : { url, authToken: process.env.TURSO_AUTH_TOKEN },
});
