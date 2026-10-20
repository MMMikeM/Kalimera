import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./feminine-shapes.data";

export const Route = createFileRoute("/practice/guides/agreement/feminine-shapes")({
	component: () => (
		<GuideDrill
			drillId="adjectives-feminine-shapes"
			items={ITEMS}
			guide="agreement"
			section="adjective-shapes"
			forwardDesc="An adjective and a feminine noun → the adjective's feminine"
		/>
	),
});
