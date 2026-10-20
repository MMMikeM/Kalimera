import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./double-negative.data";

export const Route = createFileRoute("/practice/guides/scales/double-negative")({
	component: () => (
		<GuideDrill
			drillId="scales-double-negative"
			items={ITEMS}
			guide="scales"
			section="negatives"
			forwardDesc="An English sentence with nothing, nowhere, no one or never → the Greek, δεν included"
		/>
	),
});
