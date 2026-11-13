import { createFileRoute, notFound } from "@tanstack/react-router";

import { NavTabs } from "@/components/NavTabs";
import { pageTitle } from "@/lib/page-title";

import { getReferenceVerbsFn } from "@/server/fns/reference-verbs";

import { bandLemmas, isVerbBand, VERB_BANDS, VerbBandTables } from "../components/verbs-section";

export const Route = createFileRoute("/reference/verbs/$band")({
	loader: async ({ params: { band } }) => {
		if (!isVerbBand(band)) {
			throw notFound();
		}
		const verbs = await getReferenceVerbsFn({ data: { lemmas: bandLemmas(band) } });
		return { band, verbs };
	},
	head: ({ params }) => ({
		meta: [
			{
				title: pageTitle(
					`Verbs: ${VERB_BANDS.find((b) => b.id === params.band)?.label ?? "Reference"}`,
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
			<NavTabs tabs={VERB_BANDS} activeTab={band} buildUrl={(id) => `/reference/verbs/${id}`} />

			<VerbBandTables band={band} verbs={verbs} />
		</div>
	);
}
