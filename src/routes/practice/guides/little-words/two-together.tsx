import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./two-together.data";

export const Route = createFileRoute("/practice/guides/little-words/two-together")({
	component: () => (
		<GuideDrill
			drillId="pronouns-two-together"
			items={ITEMS}
			guide="little-words"
			section="where-it-goes"
			forwardDesc="A sentence and its words → both short words before the verb, person first"
		/>
	),
});
