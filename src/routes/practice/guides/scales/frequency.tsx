import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./frequency.data";

export const Route = createFileRoute("/practice/guides/scales/frequency")({
	component: () => (
		<GuideDrill
			drillId="scales-frequency"
			items={ITEMS}
			guide="scales"
			section="frequency"
			forwardDesc="A sentence with how often in English → the Greek word for the gap"
		/>
	),
});
