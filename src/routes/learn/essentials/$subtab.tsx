import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { hasNumericValue, hasTimeRange } from "@/db.server/metadata";
import { getVocabBySlug } from "@/db.server/queries/vocabulary";

import { ColoursSubtab } from "./subtabs/colours";
import { FrequencySubtab } from "./subtabs/frequency";
import { NumbersSubtab } from "./subtabs/numbers";
import { PositionSubtab } from "./subtabs/position";
import { TimeSubtab } from "./subtabs/time";

const VALID_SUBTABS = ["numbers", "position", "time", "frequency", "colours"] as const;
type SubtabId = (typeof VALID_SUBTABS)[number];

const loader = createServerFn().handler(async () => {
	const tags = await getVocabBySlug("reference", ["noun", "adverb", "adjective"]);
	const reference = Object.fromEntries(
		tags.map((t) => [
			t.slug,
			t.vocabularyTags.map((vt) => vt.vocabulary).filter((v) => v !== null),
		]),
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
});

export type EssentialsLoaderData = Awaited<ReturnType<typeof loader>>;

export const Route = createFileRoute("/learn/essentials/$subtab")({
	loader: async ({ params }) => {
		const subtab = params.subtab as string;

		if (!VALID_SUBTABS.includes(subtab as SubtabId)) {
			throw new Response("Not Found", { status: 404 });
		}

		const essentialsData = await loader();
		return { subtab: subtab as SubtabId, essentialsData };
	},
	component: EssentialsSubtab,
});

function EssentialsSubtab() {
	const { subtab, essentialsData: data } = Route.useLoaderData();

	switch (subtab) {
		case "numbers":
			return <NumbersSubtab data={data} />;
		case "position":
			return <PositionSubtab data={data} />;
		case "time":
			return <TimeSubtab data={data} />;
		case "frequency":
			return <FrequencySubtab data={data} />;
		case "colours":
			return <ColoursSubtab data={data} />;
		default:
			return null;
	}
}
