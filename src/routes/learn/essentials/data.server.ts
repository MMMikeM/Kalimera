import { hasNumericValue, hasTimeRange } from "@/db.server/metadata";
import { fetchSectionVocabularyByTagSlug } from "@/db.server/queries/vocabulary";

export async function getEssentialsData() {
	const reference = await fetchSectionVocabularyByTagSlug("reference");

	return {
		timesOfDay: (reference["time-of-day"] ?? []).map((t) => ({
			...t,
			timeRange: hasTimeRange(t.metadata) ? t.metadata.timeRange : undefined,
		})),
		daysOfWeek: reference["days-of-week"] ?? [],
		months: reference.months ?? [],
		numbers: (reference.number ?? [])
			.map((n) => ({
				...n,
				numericValue: hasNumericValue(n.metadata) ? n.metadata.numericValue : undefined,
			}))
			.sort((a, b) => (a.numericValue ?? 0) - (b.numericValue ?? 0)),
		colors: reference.color ?? [],
		frequencyAdverbs: reference.frequency ?? [],
		positionAdverbs: reference.position ?? [],
	};
}

export type EssentialsLoaderData = Awaited<ReturnType<typeof getEssentialsData>>;
