import { db } from "../db";
import { tags, vocabularyTags, vocabulary } from "../db/schema";
import { eq, and, inArray } from "drizzle-orm";

const VOCABULARY_TAGS = [
  "people",
  "time-of-day",
  "time-expression",
  "position",
  "expression",
  "command",
  "question",
  "likes-singular",
  "likes-plural",
  "shopping",
  "household",
  "color",
  "number",
  "transport-vehicle",
  "transport-action",
  "frequency",
  "summer",
];

async function main() {
  // Exact same query as the loader but without the status filter
  const withoutStatusFilter = await db
    .select({
      id: vocabulary.id,
      greek: vocabulary.greekText,
      english: vocabulary.englishTranslation,
      wordType: vocabulary.wordType,
      status: vocabulary.status,
      tagSlug: tags.slug,
    })
    .from(vocabulary)
    .innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
    .innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
    .where(inArray(tags.slug, VOCABULARY_TAGS))
    .limit(20);
  
  console.log("Without status filter (first 20):", withoutStatusFilter.length);
  console.log("Sample statuses:", [...new Set(withoutStatusFilter.map(v => v.status))]);
  console.log("Sample:", withoutStatusFilter.slice(0, 3));
  
  // Now with the status filter
  const withStatusFilter = await db
    .select({
      id: vocabulary.id,
      greek: vocabulary.greekText,
      tagSlug: tags.slug,
    })
    .from(vocabulary)
    .innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
    .innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
    .where(
      and(
        eq(vocabulary.status, "processed"),
        inArray(tags.slug, VOCABULARY_TAGS)
      )
    )
    .limit(20);
  
  console.log("\nWith status filter:", withStatusFilter.length);
  
  process.exit(0);
}

main().catch(console.error);
