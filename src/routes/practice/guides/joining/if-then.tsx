import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./if-then.data";

export const Route = createFileRoute("/practice/guides/joining/if-then")({
	component: () => (
		<GuideDrill
			drillId="joining-if-then"
			items={ITEMS}
			guide="joining"
			section="if-then"
			forwardDesc="A Greek if-sentence with a gap → its if-part or then-part"
		/>
	),
});
