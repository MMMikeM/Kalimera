import { sql } from "drizzle-orm";
import { db } from "../db.server";
import { tags } from "../db.server/schema";

async function main() {
	const tagCounts = await db
		.select({
			slug: tags.slug,
			name: tags.name,
			count: sql<number>`(SELECT COUNT(*) FROM vocabulary_tags WHERE tag_id = ${tags.id})`,
		})
		.from(tags)
		.orderBy(tags.slug);

	console.log("Tag counts:");
	for (const t of tagCounts) {
		console.log(`  ${t.slug}: ${t.count} (${t.name})`);
	}

	process.exit(0);
}

main().catch(console.error);
