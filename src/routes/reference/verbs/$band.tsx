import { createFileRoute, notFound } from "@tanstack/react-router";

import { NavTabs } from "@/components/NavTabs";
import { pageTitle } from "@/lib/page-title";

import {
	FutureNaSection,
	PastContinuousSection,
	PastTenseSection,
	PresentTenseSection,
} from "../components/verbs-section";

const VERB_BANDS = [
	{ id: "present", label: "Present" },
	{ id: "past", label: "Past" },
	{ id: "past-continuous", label: "Continuous past" },
	{ id: "future", label: "Future & να" },
] as const;

type Band = (typeof VERB_BANDS)[number]["id"];

const isBand = (value: string): value is Band => VERB_BANDS.some((band) => band.id === value);

export const Route = createFileRoute("/reference/verbs/$band")({
	loader: ({ params: { band } }) => {
		if (!isBand(band)) {
			throw notFound();
		}
		return { band };
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
	const { band } = Route.useLoaderData();

	return (
		<div className="space-y-8">
			<NavTabs tabs={VERB_BANDS} activeTab={band} buildUrl={(id) => `/reference/verbs/${id}`} />

			{band === "present" && <PresentTenseSection />}
			{band === "past" && <PastTenseSection />}
			{band === "past-continuous" && <PastContinuousSection />}
			{band === "future" && <FutureNaSection />}
		</div>
	);
}
