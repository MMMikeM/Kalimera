import { db } from "../db.server";

async function main() {
	const tagCounts = await db.query.tags.findMany({
		orderBy: { slug: "asc" },
		with: {
			vocabularyTags: true,
		},
	});

	console.log("Tag counts:");
	for (const t of tagCounts) {
		console.log(`  ${t.slug}: ${t.vocabularyTags.length} (${t.name})`);
	}

	process.exit(0);
}

main().catch(console.error);
