import {
	getVocabBySection,
	type VocabItemWithSection,
} from "@/db.server/queries/vocabulary";

export type PatternItem = VocabItemWithSection;

function groupByTag<T extends { tagSlug: string }>(
	items: T[],
): Record<string, T[]> {
	const result: Record<string, T[]> = {};
	for (const item of items) {
		const key = item.tagSlug;
		if (!(key in result)) result[key] = [];
		result[key]?.push(item);
	}
	return result;
}

export async function getPatternsData() {
	const [phrasesData, verbsData] = await Promise.all([
		getVocabBySection("phrases"),
		getVocabBySection("verbs"),
	]);

	const phrases = groupByTag(phrasesData);
	const verbs = groupByTag(verbsData);

	return {
		likesConstruction: {
			singular: verbs["likes-singular"] ?? [],
			plural: verbs["likes-plural"] ?? [],
		},
		nameConstruction: phrases["name-construction"] ?? [],
	};
}

export type PatternsData = Awaited<ReturnType<typeof getPatternsData>>;
