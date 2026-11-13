interface TaggedRow {
	wordType: string;
	vocabularyTags: { tag: { slug: string } | null }[];
}

const LESSON_TAG_PREFIX = "lesson-";

/**
 * Phrases seeded from the tutoring lessons are private, and many carry no tag
 * at all, so a phrase is public only when a non-lesson tag vouches for it.
 */
export const isPublicRow = (row: TaggedRow): boolean =>
	row.wordType !== "phrase" ||
	row.vocabularyTags.some(({ tag }) => tag !== null && !tag.slug.startsWith(LESSON_TAG_PREFIX));
