import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./adjective-or-adverb.data";

export const Route = createFileRoute("/practice/guides/agreement/adjective-or-adverb")({
	component: () => (
		<GuideDrill
			drillId="adjective-or-adverb"
			items={ITEMS}
			guide="agreement"
			section="adverbs"
			forwardDesc="An adjective and a sentence with a gap → its matching form, or its adverb"
		/>
	),
});
