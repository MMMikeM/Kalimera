import { createFileRoute, notFound } from "@tanstack/react-router";

import { NavTabs } from "@/components/NavTabs";
import { pageTitle } from "@/lib/page-title";

import { getVerbTablesFn } from "@/server/fns/verb-tables";

import { bandLemmas, isVerbBand, VERB_BANDS, VerbBandTables } from "../components/verb-tables";

export const Route = createFileRoute("/learn/tables/verbs/$band")({
	loader: async ({ params: { band } }) => {
		if (!isVerbBand(band)) {
			throw notFound();
		}
		const verbs = await getVerbTablesFn({ data: { lemmas: bandLemmas(band) } });
		return { band, verbs };
	},
	head: ({ params }) => ({
		meta: [
			{
				title: pageTitle(
					`Verbs: ${VERB_BANDS.find((b) => b.id === params.band)?.label ?? "Tables"}`,
				),
			},
		],
	}),
	component: VerbBand,
});

function VerbBand() {
	const { band, verbs } = Route.useLoaderData();

	return (
		<div className="space-y-8">
			<NavTabs tabs={VERB_BANDS} activeTab={band} buildUrl={(id) => `/learn/tables/verbs/${id}`} />

			<VerbBandTables band={band} verbs={verbs} />
		</div>
	);
}
