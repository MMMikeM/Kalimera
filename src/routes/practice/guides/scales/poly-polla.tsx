import { createFileRoute } from "@tanstack/react-router";

import { GuideChoiceDrill } from "../components/guide-drill";
import { ITEMS, OPTIONS } from "./poly-polla.data";

export const Route = createFileRoute("/practice/guides/scales/poly-polla")({
	component: () => (
		<GuideChoiceDrill
			drillId="scales-poly-polla"
			items={ITEMS}
			options={OPTIONS}
			guide="scales"
			section="poly-polla"
			forwardDesc="A sentence with a gap → πολύ, or the form that matches the noun"
		/>
	),
});
