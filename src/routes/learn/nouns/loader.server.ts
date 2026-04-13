import { getVocabBySlug } from "@/db.server/queries/vocabulary-sections";
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
	const tags = await getVocabBySlug("nouns", ["noun"]);
	const bySlug = Object.fromEntries(
		tags.map(t => [t.slug, t.vocabularyTags.map(vt => vt.vocabulary).filter(v => v !== null)])
	);

	const buildCategory = (title: string, tagKey: string): CategoryData => {
		const items = (bySlug[tagKey] ?? []).map(parseNoun);
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
