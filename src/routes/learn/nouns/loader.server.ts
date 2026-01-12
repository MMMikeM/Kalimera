import {
	getVocabBySection,
	type VocabItemWithSection,
} from "@/db.server/queries/vocabulary";

export type VocabItem = VocabItemWithSection;

type Gender = "masculine" | "feminine" | "neuter";

export type NounWithGender = VocabItem & { gender: Gender };

const detectGender = (greek: string): Gender => {
	const trimmed = greek.trim().toLowerCase();
	if (trimmed.startsWith("ο ") || trimmed.startsWith("οι "))
		return "masculine";
	if (trimmed.startsWith("η ") || trimmed.startsWith("οι ")) return "feminine";
	return "neuter";
};

const parseNoun = (item: VocabItem): NounWithGender => ({
	...item,
	gender: detectGender(item.greek),
});

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

export type CategoryData = {
	title: string;
	nouns: NounWithGender[];
	total: number;
};

type CategoryKey = "people" | "shopping" | "household" | "vehicles" | "summer";

export type CategoriesMap = Record<CategoryKey, CategoryData>;

export async function loader() {
	const nounsData = await getVocabBySection("nouns");
	const nouns = groupByTag(nounsData);

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

export type NounsLoaderData = Awaited<ReturnType<typeof loader>>;
