import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../index";
import { vocabulary, vocabularyTags, tags, verbDetails } from "../schema";

// ═══════════════════════════════════════════════════════════════════════════════
// VOCABULARY BY TAGS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch vocabulary items filtered by tag slugs.
 * Used by vocabulary/, phrases/, and other routes that need tagged vocab.
 */
export async function getVocabByTags(tagSlugs: readonly string[]) {
	return db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			wordType: vocabulary.wordType,
			metadata: vocabulary.metadata,
			tagSlug: tags.slug,
		})
		.from(vocabulary)
		.innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
		.innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
		.where(
			and(
				eq(vocabulary.status, "processed"),
				inArray(tags.slug, [...tagSlugs]),
			),
		)
		.orderBy(vocabulary.greekText);
}

/** Type for a single vocabulary item with tag */
export type VocabItem = Awaited<ReturnType<typeof getVocabByTags>>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// VERBS WITH PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all verbs with their conjugation patterns.
 */
export async function getVerbsWithPatterns() {
	return db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			pattern: verbDetails.conjugationFamily,
		})
		.from(vocabulary)
		.leftJoin(verbDetails, eq(verbDetails.vocabId, vocabulary.id))
		.where(
			and(eq(vocabulary.wordType, "verb"), eq(vocabulary.status, "processed")),
		);
}

/** Type for a verb with its conjugation pattern */
export type VerbWithPattern = Awaited<
	ReturnType<typeof getVerbsWithPatterns>
>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH VOCABULARY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all processed vocabulary with tags for search functionality.
 */
export async function searchVocabulary() {
	const results = await db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			type: vocabulary.wordType,
			family: verbDetails.conjugationFamily,
			tagNames: sql<string>`(
				SELECT group_concat(t.name, ', ')
				FROM vocabulary_tags vt
				JOIN tags t ON t.id = vt.tag_id
				WHERE vt.vocabulary_id = ${vocabulary.id}
			)`,
		})
		.from(vocabulary)
		.leftJoin(verbDetails, eq(verbDetails.vocabId, vocabulary.id))
		.where(eq(vocabulary.status, "processed"));

	return results.map((v) => ({
		id: v.id,
		greek: v.greek,
		english: v.english,
		type: v.type,
		family: v.family,
		tags: v.tagNames ? v.tagNames.split(", ") : [],
	}));
}

/** Type for a searchable vocabulary item */
export type SearchVocabItem = Awaited<
	ReturnType<typeof searchVocabulary>
>[number];
