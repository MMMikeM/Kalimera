import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./own.data";

export const Route = createFileRoute("/practice/guides/little-words/own")({
	component: () => (
		<GuideDrill
			drillId="pronouns-own-alone"
			items={ITEMS}
			guide="little-words"
			section="own-alone"
			forwardDesc="my own, mine, with the noun → δικός μου, δική μου or δικό μου"
		/>
	),
});
