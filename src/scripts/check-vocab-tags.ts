import { db } from "../db";
import { tags, vocabularyTags, vocabulary } from "../db/schema";
import { sql, eq, inArray } from "drizzle-orm";

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
  // Check which of our target tags actually exist
  const existingTags = await db
    .select({ slug: tags.slug, id: tags.id })
    .from(tags)
    .where(inArray(tags.slug, VOCABULARY_TAGS));
  
  console.log("Target tags that exist:", existingTags.map(t => t.slug));
  
  // Check vocabulary_tags for those tag IDs
  const tagIds = existingTags.map(t => t.id);
  const vocabTagCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(vocabularyTags)
    .where(inArray(vocabularyTags.tagId, tagIds));
  
  console.log("vocabulary_tags entries for target tags:", vocabTagCount[0]?.count);
  
  // Check total vocabulary_tags
  const totalVocabTags = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(vocabularyTags);
  console.log("Total vocabulary_tags entries:", totalVocabTags[0]?.count);
  
  // Check total vocabulary with processed status
  const totalVocab = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(vocabulary)
    .where(eq(vocabulary.status, "processed"));
  console.log("Total processed vocabulary:", totalVocab[0]?.count);
  
  // Sample some vocabulary_tags to see what tags they have
  const sample = await db
    .select({
      vocabId: vocabularyTags.vocabularyId,
      tagSlug: tags.slug,
    })
    .from(vocabularyTags)
    .innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
    .limit(20);
  
  console.log("Sample vocabulary_tags (first 20):", sample);
  
  process.exit(0);
}

main().catch(console.error);
