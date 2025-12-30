import { eq, inArray } from "drizzle-orm";
import { db } from "../index";
import type { DisplaySection } from "../enums";
import { vocabulary, vocabularyTags, tags, tagSections } from "../schema";

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
		.where(inArray(tags.slug, [...tagSlugs]))
		.orderBy(vocabulary.greekText);
}

// ═══════════════════════════════════════════════════════════════════════════════
// VOCABULARY BY SECTION (using tag_sections lookup table)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch vocabulary items for a specific UI section (nouns, verbs, phrases, reference).
 * Uses the tag_sections lookup table to determine which tags belong to which section.
 */
export async function getVocabBySection(section: DisplaySection) {
	return db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			wordType: vocabulary.wordType,
			metadata: vocabulary.metadata,
			tagSlug: tags.slug,
			tagName: tags.name,
			displayOrder: tagSections.displayOrder,
		})
		.from(vocabulary)
		.innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
		.innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
		.innerJoin(tagSections, eq(tagSections.tagId, tags.id))
		.where(eq(tagSections.section, section))
		.orderBy(tagSections.displayOrder, vocabulary.greekText);
}

/** Type for a vocabulary item with section info */
export type VocabItemWithSection = Awaited<ReturnType<typeof getVocabBySection>>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// VERBS WITH PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all verbs with their conjugation patterns using RQB v2.
 */
export async function getVerbsWithPatterns() {
	const results = await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		with: { verbDetails: true },
	});

	return results.map((v) => ({
		id: v.id,
		greek: v.greekText,
		english: v.englishTranslation,
		pattern: v.verbDetails?.conjugationFamily ?? null,
	}));
}

/** Type for a verb with its conjugation pattern */
export type VerbWithPattern = Awaited<
	ReturnType<typeof getVerbsWithPatterns>
>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH VOCABULARY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all processed vocabulary with tags for search functionality using RQB v2.
 */
export async function searchVocabulary() {
	const results = await db.query.vocabulary.findMany({
		with: {
			verbDetails: true,
			vocabularyTags: {
				with: { tag: true },
			},
		},
	});

	return results.map((v) => ({
		id: v.id,
		greek: v.greekText,
		english: v.englishTranslation,
		type: v.wordType,
		family: v.verbDetails?.conjugationFamily ?? null,
		tags: v.vocabularyTags.map((vt) => vt.tag?.name).filter(Boolean) as string[],
	}));
}

/** Type for a searchable vocabulary item */
export type SearchVocabItem = Awaited<
	ReturnType<typeof searchVocabulary>
>[number];
