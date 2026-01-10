import { hasNumericValue, hasTimeRange } from "@/db.server/metadata";
import { getVocabBySection } from "@/db.server/queries/vocabulary";

export async function getEssentialsData() {
	const referenceData = await getVocabBySection("reference");

	const groupByTag = <T extends { tagSlug: string }>(
		items: T[],
	): Record<string, T[]> => {
		const result: Record<string, T[]> = {};
		for (const item of items) {
			const key = item.tagSlug;
			if (!(key in result)) result[key] = [];
			result[key]?.push(item);
		}
		return result;
	};

	const reference = groupByTag(referenceData);

	return {
		timesOfDay: (reference["time-of-day"] ?? []).map((t) => ({
			...t,
			timeRange: hasTimeRange(t.metadata) ? t.metadata.timeRange : undefined,
		})),
		numbers: (reference.number ?? [])
			.map((n) => ({
				...n,
				numericValue: hasNumericValue(n.metadata)
					? n.metadata.numericValue
					: undefined,
			}))
			.sort((a, b) => (a.numericValue ?? 0) - (b.numericValue ?? 0)),
		colors: reference.color ?? [],
		frequencyAdverbs: reference.frequency ?? [],
		positionAdverbs: reference.position ?? [],
	};
}

export type EssentialsLoaderData = Awaited<ReturnType<typeof getEssentialsData>>;
