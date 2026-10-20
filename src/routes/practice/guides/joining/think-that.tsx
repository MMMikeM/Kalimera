import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./think-that.data";

export const Route = createFileRoute("/practice/guides/joining/think-that")({
	component: () => (
		<GuideDrill
			drillId="joining-think-that"
			items={ITEMS}
			guide="joining"
			section="thinking"
			forwardDesc="A Greek sentence with a gap → νομίζω ότι, ίσως or μήπως"
		/>
	),
});
