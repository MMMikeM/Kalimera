import { db } from "../db";
import { tags, vocabularyTags, vocabulary } from "../db/schema";
import { sql } from "drizzle-orm";

async function main() {
  const [vocabCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(vocabulary);
  const [tagsCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(tags);
  const [vtCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(vocabularyTags);
  
  console.log("vocabulary count:", vocabCount.count);
  console.log("tags count:", tagsCount.count);
  console.log("vocabulary_tags count:", vtCount.count);
  
  process.exit(0);
}

main().catch(console.error);
