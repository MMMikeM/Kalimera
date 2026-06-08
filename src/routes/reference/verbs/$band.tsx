import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type React from "react";

import { cn } from "@/lib/utils";

import {
	FutureNaSection,
	PastTenseSection,
	PresentTenseSection,
} from "../components/verbs-section";

const VERB_BANDS = [
	{ id: "present", label: "Present" },
	{ id: "past", label: "Past" },
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
	component: VerbBand,
});

const BandNav: React.FC<{ active: Band }> = ({ active }) => (
	<div className="flex w-full items-center gap-1 rounded-lg bg-muted p-1">
		{VERB_BANDS.map((band) => (
			<Link
				key={band.id}
				to="/reference/verbs/$band"
				params={{ band: band.id }}
				className={cn(
					"flex flex-1 items-center justify-center rounded-md border-b-2 border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
					active === band.id
						? "border-b-stone-400 bg-white text-foreground shadow-sm"
						: "text-stone-600 hover:text-foreground",
				)}
			>
				{band.label}
			</Link>
		))}
	</div>
);

function VerbBand() {
	const { band } = Route.useLoaderData();

	return (
		<div className="space-y-8">
			<BandNav active={band} />

			{band === "present" && <PresentTenseSection />}
			{band === "past" && <PastTenseSection />}
			{band === "future" && <FutureNaSection />}
		</div>
	);
}
