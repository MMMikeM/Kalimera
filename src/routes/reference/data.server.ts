import { fetchSectionVocabularyByTagSlug } from "@/db.server/queries/vocabulary";
import type { Vocabulary } from "@/db.server/types";

export type PatternItem = Vocabulary;

export async function getPatternsData() {
	const [phrases, verbs] = await Promise.all([
		fetchSectionVocabularyByTagSlug("phrases"),
		fetchSectionVocabularyByTagSlug("verbs"),
	]);

	return {
		likesConstruction: {
			singular: verbs["likes-singular"] ?? [],
			plural: verbs["likes-plural"] ?? [],
		},
		nameConstruction: phrases["name-construction"] ?? [],
	};
}

export type PatternsData = Awaited<ReturnType<typeof getPatternsData>>;
