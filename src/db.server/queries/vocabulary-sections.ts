import { asc, eq, sql } from "drizzle-orm";

import { db } from "../index";
import { tags, vocabulary, vocabularyTags } from "../schema";

export async function fetchNouns() {
	return await db
		.select()
		.from(tags)
		.innerJoin(vocabularyTags, eq(vocabularyTags.tagId, tags.id))
		.innerJoin(vocabulary, eq(vocabulary.id, vocabularyTags.vocabularyId))
		.where(eq(tags.section, "nouns"))
		.orderBy(
			asc(tags.sectionDisplayOrder),
			sql`case when ${vocabularyTags.displayOrder} is null then 1 else 0 end`,
			asc(vocabularyTags.displayOrder),
			asc(vocabulary.greekText),
		);
}

export async function fetchPhrases() {
	return await db
		.select()
		.from(tags)
		.innerJoin(vocabularyTags, eq(vocabularyTags.tagId, tags.id))
		.innerJoin(vocabulary, eq(vocabulary.id, vocabularyTags.vocabularyId))
		.where(eq(tags.section, "phrases"))
		.orderBy(
			asc(tags.sectionDisplayOrder),
			sql`case when ${vocabularyTags.displayOrder} is null then 1 else 0 end`,
			asc(vocabularyTags.displayOrder),
			asc(vocabulary.greekText),
		);
}

export async function fetchVerbsBySection() {
	return await db
		.select()
		.from(tags)
		.innerJoin(vocabularyTags, eq(vocabularyTags.tagId, tags.id))
		.innerJoin(vocabulary, eq(vocabulary.id, vocabularyTags.vocabularyId))
		.where(eq(tags.section, "verbs"))
		.orderBy(
			asc(tags.sectionDisplayOrder),
			sql`case when ${vocabularyTags.displayOrder} is null then 1 else 0 end`,
			asc(vocabularyTags.displayOrder),
			asc(vocabulary.greekText),
		);
}

export async function fetchReference() {
	return await db
		.select()
		.from(tags)
		.innerJoin(vocabularyTags, eq(vocabularyTags.tagId, tags.id))
		.innerJoin(vocabulary, eq(vocabulary.id, vocabularyTags.vocabularyId))
		.where(eq(tags.section, "reference"))
		.orderBy(
			asc(tags.sectionDisplayOrder),
			sql`case when ${vocabularyTags.displayOrder} is null then 1 else 0 end`,
			asc(vocabularyTags.displayOrder),
			asc(vocabulary.greekText),
		);
}
