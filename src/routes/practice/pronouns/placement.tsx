import { createFileRoute } from "@tanstack/react-router";

import { Drill } from "../components/engines/drill";
import { PLACEMENTS, PLACEMENT_CATEGORIES } from "./placement.data";

export const Route = createFileRoute("/practice/pronouns/placement")({
	component: CliticPlacementDrill,
});

function CliticPlacementDrill() {
	return (
		<Drill
			drillId="pronouns-placement"
			items={PLACEMENTS}
			title="Pronoun placement"
			subtitle="17 sentences / timed"
			sessionSize={20}
			colorTheme="terracotta"
			forwardLabel="Put it in order"
			forwardDesc="The words are given — only the order is yours"
			forwardOnly
			categories={PLACEMENT_CATEGORIES}
			referenceHref="/reference/pronouns#clitic-placement"
			referenceLabel="Reference: pronoun placement →"
		/>
	);
}
