import { asc, eq, sql } from "drizzle-orm";

import { db } from "../index";
import { tags, vocabulary, vocabularyTags } from "../schema";

type VocabSection = "nouns" | "verbs" | "phrases" | "reference";

async function fetchVocabularyBySection(section: VocabSection) {
	return await db
		.select()
		.from(tags)
		.innerJoin(vocabularyTags, eq(vocabularyTags.tagId, tags.id))
		.innerJoin(vocabulary, eq(vocabulary.id, vocabularyTags.vocabularyId))
		.where(eq(tags.section, section))
		.orderBy(
			asc(tags.sectionDisplayOrder),
			sql`case when ${vocabularyTags.displayOrder} is null then 1 else 0 end`,
			asc(vocabularyTags.displayOrder),
			asc(vocabulary.greekText),
		);
}

export async function fetchNouns() {
	return fetchVocabularyBySection("nouns");
}

export async function fetchPhrases() {
	return fetchVocabularyBySection("phrases");
}

export async function fetchVerbsBySection() {
	return fetchVocabularyBySection("verbs");
}

export async function fetchReference() {
	return fetchVocabularyBySection("reference");
}
