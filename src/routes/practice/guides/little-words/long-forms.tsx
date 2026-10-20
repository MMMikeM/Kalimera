import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./long-forms.data";

export const Route = createFileRoute("/practice/guides/little-words/long-forms")({
	component: () => (
		<GuideDrill
			drillId="pronouns-long-forms"
			items={ITEMS}
			guide="little-words"
			section="long-forms"
			forwardDesc="A preposition and a person → για μένα, με σένα"
		/>
	),
});
