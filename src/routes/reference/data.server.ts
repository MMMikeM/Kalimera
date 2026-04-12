import { fetchPhrases, fetchVerbsBySection } from "@/db.server/queries/vocabulary-sections";
import type { Vocabulary } from "@/db.server/types";
import { groupBySlug } from "@/lib/group-by-slug";

export type PatternItem = Vocabulary;

export async function getPatternsData() {
	const [phraseRows, verbRows] = await Promise.all([fetchPhrases(), fetchVerbsBySection()]);

	const phrases = groupBySlug(phraseRows);
	const verbs = groupBySlug(verbRows);

	return {
		likesConstruction: {
			singular: verbs["likes-singular"] ?? [],
			plural: verbs["likes-plural"] ?? [],
		},
		nameConstruction: phrases["name-construction"] ?? [],
	};
}

export type PatternsData = Awaited<ReturnType<typeof getPatternsData>>;
