import type { getVocabBySlug } from "@/server/db/queries/vocabulary";

type TagRows = Awaited<ReturnType<typeof getVocabBySlug>>;
type TaggedVocab = NonNullable<TagRows[number]["vocabularyTags"][number]["vocabulary"]>;

/** Keys each tag's vocabulary by slug, dropping rows the word-type filter nulled. */
export const groupVocabByTag = (tags: TagRows): Record<string, TaggedVocab[]> =>
	Object.fromEntries(
		tags.map((t) => [
			t.slug,
			t.vocabularyTags.map((vt) => vt.vocabulary).filter((v) => v !== null),
		]),
	);
