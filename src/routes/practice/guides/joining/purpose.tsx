import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./purpose.data";

export const Route = createFileRoute("/practice/guides/joining/purpose")({
	component: () => (
		<GuideDrill
			drillId="joining-purpose"
			items={ITEMS}
			guide="joining"
			section="purpose"
			forwardDesc="A Greek sentence with a gap → για να, για να μην or για"
		/>
	),
});
