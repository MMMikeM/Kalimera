import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./calling.data";

export const Route = createFileRoute("/practice/guides/owner-calling/calling")({
	component: () => (
		<GuideDrill
			drillId="nouns-calling"
			items={ITEMS}
			guide="owner-calling"
			section="calling"
			forwardDesc="A noun with its article → the calling form, no article"
		/>
	),
});
