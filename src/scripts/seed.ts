import { sql } from "drizzle-orm";

import { tags, vocabularyTags } from "../server/db/schema";
import type { Db, NewAdjectiveDetails } from "../server/db/types";
import type { NewNominalForm, NewVocabularyTag } from "../server/db/types";
import {
	CONTENT_TAGS,
	LESSON_SEED_CATEGORIES,
	LESSON_TAGS,
	VOCAB_SEED_CATEGORIES,
} from "./seed-data";
import { seedOpposites } from "./seed-opposites";
import {
	BATCH_SIZE,
	type NounDetailRecord,
	type SeedAccumulators,
	type VerbDetailRecord,
	type VocabWithTags,
	batchInsertAdjectiveDetails,
	batchInsertNounDetails,
	batchInsertVerbDetails,
	batchUpsertNominalForms,
	runSeedCategory,
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
	console.log(`Upserted ${insertedTags.length} tags.`);

	console.log("Updated tag section metadata.\n");

	const vocabTagLinks: NewVocabularyTag[] = [];
	const tagDisplayOrderById = new Map<number, number>();
	const allNounDetails: NounDetailRecord[] = [];
	const allAdjectiveDetails: NewAdjectiveDetails[] = [];
	const allNominalForms: NewNominalForm[] = [];

	const ctx: SeedAccumulators = {
		tagMap: new Map(insertedTags.map((t) => [t.slug, t.id])),
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
		allAdjectiveDetails,
		allNominalForms,
	};

	const run = (categoryName: string, items: VocabWithTags[]) =>
		runSeedCategory(db, categoryName, items, ctx);

	const allVerbDetails: VerbDetailRecord[] = [];

	const categories = [...VOCAB_SEED_CATEGORIES, ...LESSON_SEED_CATEGORIES];
	for (const { name, items } of categories) {
		allVerbDetails.push(...(await run(name, items)));
	}

	console.log(`\nInserting ${allNounDetails.length} noun details...`);
	await batchInsertNounDetails(db, allNounDetails);

	console.log(`\nInserting ${allAdjectiveDetails.length} adjective details...`);
	await batchInsertAdjectiveDetails(db, allAdjectiveDetails);

	console.log(`\nUpserting ${allNominalForms.length} nominal forms...`);
	await batchUpsertNominalForms(db, allNominalForms);

	console.log(`\nInserting ${allVerbDetails.length} verb details...`);
	await batchInsertVerbDetails(db, allVerbDetails);

	console.log("Creating vocabulary-tag associations...");
	if (vocabTagLinks.length > 0) {
		const uniqueLinks = new Map<string, NewVocabularyTag>();
		for (const link of vocabTagLinks) {
			const key = `${link.vocabularyId}-${link.tagId}`;
			if (!uniqueLinks.has(key)) {
				uniqueLinks.set(key, link);
			}
		}

		const linksArray = Array.from(uniqueLinks.values());

		for (let i = 0; i < linksArray.length; i += BATCH_SIZE) {
			const batch = linksArray.slice(i, i + BATCH_SIZE);
			await db
				.insert(vocabularyTags)
				.values(batch)
				.onConflictDoUpdate({
					target: [vocabularyTags.vocabularyId, vocabularyTags.tagId],
					set: { displayOrder: sql`excluded.display_order` },
				});
		}
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
