import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./colours.data";

export const Route = createFileRoute("/practice/guides/agreement/colours")({
	component: () => (
		<GuideDrill
			drillId="adjectives-colours"
			items={ITEMS}
			guide="agreement"
			section="colours"
			forwardDesc="A colour and a noun → the colour in the noun's form"
		/>
	),
});
