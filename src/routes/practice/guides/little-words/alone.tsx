import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./alone.data";

export const Route = createFileRoute("/practice/guides/little-words/alone")({
	component: () => (
		<GuideDrill
			drillId="pronouns-alone"
			items={ITEMS}
			guide="little-words"
			section="alone"
			forwardDesc="by myself, with the verb → μόνος μου, μόνη μου or μόνοι μας"
		/>
	),
});
