import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./standing-alone.data";

export const Route = createFileRoute("/practice/guides/agreement/standing-alone")({
	component: () => (
		<GuideDrill
			drillId="adjectives-standing-alone"
			items={ITEMS}
			guide="agreement"
			section="adjective-alone"
			forwardDesc="A noun and an adjective → θέλω with the article and adjective alone"
		/>
	),
});
