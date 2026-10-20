import { createFileRoute } from "@tanstack/react-router";

import { GuideChoiceDrill } from "../components/guide-drill";
import { ITEMS, OPTIONS } from "./adjective-or-verb.data";

export const Route = createFileRoute("/practice/guides/agreement/adjective-or-verb")({
	component: () => (
		<GuideChoiceDrill
			drillId="adjective-or-verb"
			items={ITEMS}
			options={OPTIONS}
			guide="agreement"
			section="adjective-or-verb"
			forwardDesc="A sentence with a gap → the spelling it needs"
		/>
	),
});
