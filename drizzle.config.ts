import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: ["./src/db.server/schema.ts", "./src/db.server/relations.ts"],
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080",
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
});
