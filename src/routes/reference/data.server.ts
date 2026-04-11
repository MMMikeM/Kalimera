import { fetchPhrases, fetchVerbsBySection } from "@/db.server/queries/vocabulary-sections";
import type { Vocabulary } from "@/db.server/types";

export type PatternItem = Vocabulary;

export async function getPatternsData() {
	const [phraseRows, verbRows] = await Promise.all([fetchPhrases(), fetchVerbsBySection()]);

	// Group each by tag slug
	const groupBySlug = (rows: any[]) => {
		const grouped: Record<string, any[]> = {};
		for (const row of rows) {
			const slug = row.tags.slug;
			const items = grouped[slug] ?? [];
			items.push(row.vocabulary);
			grouped[slug] = items;
		}
		return grouped;
	};

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
