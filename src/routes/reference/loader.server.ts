import { getVocabBySlug } from "@/db.server/queries/vocabulary-sections";
import type { Vocabulary } from "@/db.server/types";

export type PatternItem = Vocabulary;

export async function loader() {
	const [phraseTags, verbTags] = await Promise.all([
		getVocabBySlug("phrases", ["phrase"]),
		getVocabBySlug("verbs", ["verb"]),
	]);

	const toSlugMap = (tags: typeof phraseTags) =>
		Object.fromEntries(
			tags.map(t => [
				t.slug,
				t.vocabularyTags
					.map(vt => vt.vocabulary)
					.filter((v): v is Vocabulary => v !== null),
			])
		);

	const phrases = toSlugMap(phraseTags);
	const verbs = toSlugMap(verbTags);

	return {
		likesConstruction: {
			singular: verbs["likes-singular"] ?? [],
			plural: verbs["likes-plural"] ?? [],
		},
		nameConstruction: phrases["name-construction"] ?? [],
	};
}

export type PatternsData = Awaited<ReturnType<typeof loader>>;
