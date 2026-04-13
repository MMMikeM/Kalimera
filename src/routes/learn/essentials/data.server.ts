import { hasNumericValue, hasTimeRange } from "@/db.server/metadata";
import { getVocabBySlug } from "@/db.server/queries/vocabulary-sections";

export async function getEssentialsData() {
	const tags = await getVocabBySlug("reference", ["noun", "adverb", "adjective"]);
	const reference = Object.fromEntries(
		tags.map(t => [t.slug, t.vocabularyTags.map(vt => vt.vocabulary).filter(v => v !== null)])
	);

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
