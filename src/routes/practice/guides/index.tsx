import { createFileRoute } from "@tanstack/react-router";

import { GUIDES } from "@/routes/guides/guides.data";

import { DrillIndex } from "../components/drill-index";
import { GUIDE_DRILLS } from "./drills.data";

export const Route = createFileRoute("/practice/guides/")({
	component: GuideDrillsPage,
});

const PHASES = GUIDES.filter((guide) => GUIDE_DRILLS[guide.slug]?.length).map((guide) => ({
	phase: guide.title,
	drills: GUIDE_DRILLS[guide.slug] ?? [],
}));

function GuideDrillsPage() {
	return (
		<DrillIndex
			title="From the guides"
			subtitle="One drill per guide section, for the point that section teaches."
			phases={PHASES}
		/>
	);
}
