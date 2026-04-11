import { fetchSectionVocabularyByTagSlug } from "@/db.server/queries/vocabulary";
import type { Vocabulary } from "@/db.server/types";

export type VocabItem = Vocabulary;

type Gender = "masculine" | "feminine" | "neuter";

export type NounWithGender = VocabItem & { gender: Gender };

const detectGender = (greek: string): Gender => {
	const trimmed = greek.trim().toLowerCase();
	if (trimmed.startsWith("ο ") || trimmed.startsWith("οι ")) return "masculine";
	if (trimmed.startsWith("η ") || trimmed.startsWith("οι ")) return "feminine";
	return "neuter";
};

const parseNoun = (item: VocabItem): NounWithGender => ({
	...item,
	gender: detectGender(item.greekText),
});

export type CategoryData = {
	title: string;
	nouns: NounWithGender[];
	total: number;
};

type CategoryKey = "people" | "shopping" | "household" | "vehicles" | "summer";

export type CategoriesMap = Record<CategoryKey, CategoryData>;

export async function loader() {
	const nouns = await fetchSectionVocabularyByTagSlug("nouns");

	const buildCategory = (title: string, tagKey: string): CategoryData => {
		const items = (nouns[tagKey] ?? []).map(parseNoun);
		return {
			title,
			nouns: items,
			total: items.length,
		};
	};

	const categories: CategoriesMap = {
		people: buildCategory("Family & People", "people"),
		shopping: buildCategory("Shopping & Groceries", "shopping"),
		household: buildCategory("Household & Home", "household"),
		vehicles: buildCategory("Transportation", "transport-vehicle"),
		summer: buildCategory("Summer & Beach", "summer"),
	};

	return { categories };
}
