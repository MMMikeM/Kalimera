import { db } from "../db.server";
import { tags, vocabularyTags, vocabulary } from "../db.server/schema";
import { sql } from "drizzle-orm";

async function main() {
  const [vocabCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(vocabulary);
  const [tagsCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(tags);
  const [vtCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(vocabularyTags);

  console.log("vocabulary count:", vocabCount?.count ?? 0);
  console.log("tags count:", tagsCount?.count ?? 0);
  console.log("vocabulary_tags count:", vtCount?.count ?? 0);

  process.exit(0);
}

main().catch(console.error);
