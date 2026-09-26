import { sql } from "drizzle-orm";

import { tags, vocabularyTags } from "../server/db/schema";
import type { Db, NewVocabularyTag } from "../server/db/types";
import {
	CONTENT_TAGS,
	LESSON_SEED_CATEGORIES,
	LESSON_TAGS,
	VOCAB_SEED_CATEGORIES,
} from "./seed-data";
import { seedOpposites } from "./seed-opposites";
import {
	type SeedAccumulators,
	batchInsertAdjectiveDetails,
	batchInsertNounDetails,
	batchInsertVerbDetails,
	batchUpsertNominalForms,
	inBatches,
	seedCategory,
} from "./seed-pipeline";
import { seedVerbConjugations } from "./seed-verb-conjugations";

export async function seed(db: Db) {
	console.log("Seeding database (additive mode with batching)...\n");

	// Upsert all tags (content tags + lesson tags)
	console.log("Upserting tags...");
	const allTags = [...Object.values(CONTENT_TAGS), ...Object.values(LESSON_TAGS)];
	const tagValues = allTags.map((tag) => ({
		slug: tag.slug,
		name: tag.name,
		section: "section" in tag ? tag.section : null,
		sectionDisplayOrder: "displayOrder" in tag ? tag.displayOrder : null,
	}));

	const insertedTags = await db
		.insert(tags)
		.values(tagValues)
		.onConflictDoUpdate({
			target: tags.slug,
			set: {
				name: sql`excluded.name`,
				section: sql`excluded.section`,
				sectionDisplayOrder: sql`excluded.section_display_order`,
			},
		})
		.returning();
	console.log(`Upserted ${insertedTags.length} tags.\n`);

	const ctx: SeedAccumulators = {
		tagMap: new Map(insertedTags.map((t) => [t.slug, t.id])),
		vocabTagLinks: [],
		tagDisplayOrderById: new Map(),
		allNounDetails: [],
		allAdjectiveDetails: [],
		allNominalForms: [],
		allVerbDetails: [],
	};

	for (const { name, items } of [...VOCAB_SEED_CATEGORIES, ...LESSON_SEED_CATEGORIES]) {
		await seedCategory(db, name, items, ctx);
	}

	console.log(`\nInserting ${ctx.allNounDetails.length} noun details...`);
	await batchInsertNounDetails(db, ctx.allNounDetails);

	console.log(`\nInserting ${ctx.allAdjectiveDetails.length} adjective details...`);
	await batchInsertAdjectiveDetails(db, ctx.allAdjectiveDetails);

	console.log(`\nUpserting ${ctx.allNominalForms.length} nominal forms...`);
	await batchUpsertNominalForms(db, ctx.allNominalForms);

	console.log(`\nInserting ${ctx.allVerbDetails.length} verb details...`);
	await batchInsertVerbDetails(db, ctx.allVerbDetails);

	console.log("Creating vocabulary-tag associations...");
	if (ctx.vocabTagLinks.length > 0) {
		const uniqueLinks = new Map<string, NewVocabularyTag>();
		for (const link of ctx.vocabTagLinks) {
			const key = `${link.vocabularyId}-${link.tagId}`;
			if (!uniqueLinks.has(key)) {
				uniqueLinks.set(key, link);
			}
		}

		const linksArray = Array.from(uniqueLinks.values());

		await inBatches(linksArray, (batch) =>
			db
				.insert(vocabularyTags)
				.values(batch)
				.onConflictDoUpdate({
					target: [vocabularyTags.vocabularyId, vocabularyTags.tagId],
					set: { displayOrder: sql`excluded.display_order` },
				}),
		);
		console.log(`Processed ${linksArray.length} vocabulary-tag associations.`);
	}

	console.log("\nVocabulary seed complete.\n");

	await seedVerbConjugations(db);

	await seedOpposites(db);

	console.log("\nAll seeding complete.");
}

// Standalone runner
import("../server/db").then(({ db }) =>
	seed(db)
		.then(() => process.exit(0))
		.catch((err) => {
			console.error("Seeding failed:", err);
			process.exit(1);
		}),
);
