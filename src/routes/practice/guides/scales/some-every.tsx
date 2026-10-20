import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./some-every.data";

export const Route = createFileRoute("/practice/guides/scales/some-every")({
	component: () => (
		<GuideDrill
			drillId="scales-some-every"
			items={ITEMS}
			guide="scales"
			section="some-every"
			forwardDesc="A sentence with some, no or every in English → the Greek word for the gap"
		/>
	),
});
