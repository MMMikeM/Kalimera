import { createFileRoute } from "@tanstack/react-router";

import { SectionIndex } from "@/components/SectionIndex";
import { pageTitle } from "@/lib/page-title";

import { GUIDE_TONE } from "./components/guide-tone";
import { GUIDES } from "./guides.data";

export const Route = createFileRoute("/guides/")({
	head: () => ({ meta: [{ title: pageTitle("Guides") }] }),
	component: GuidesIndex,
});

function GuidesIndex() {
	return (
		<SectionIndex
			title="Guides"
			lede="Greek grammar gathered by what you are trying to say, each part ending in practice"
			groups={[
				{
					title: "Guides",
					topics: GUIDES.map((guide) => ({
						id: guide.slug,
						label: guide.title,
						greek: guide.greek,
						description: guide.description,
						href: `/guides/${guide.slug}`,
						greekClass: GUIDE_TONE[guide.tone].accent,
					})),
				},
			]}
		/>
	);
}
