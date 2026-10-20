import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./quantity.data";

export const Route = createFileRoute("/practice/guides/scales/quantity")({
	component: () => (
		<GuideDrill
			drillId="scales-quantity"
			items={ITEMS}
			guide="scales"
			section="quantity"
			forwardDesc="A noun and a there is sentence in English → the Greek, quantity word matching"
		/>
	),
});
