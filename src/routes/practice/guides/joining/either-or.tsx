import { createFileRoute } from "@tanstack/react-router";

import { GuideChoiceDrill } from "../components/guide-drill";
import { ITEMS, OPTIONS } from "./either-or.data";

export const Route = createFileRoute("/practice/guides/joining/either-or")({
	component: () => (
		<GuideChoiceDrill
			drillId="joining-either-or"
			items={ITEMS}
			options={OPTIONS}
			guide="joining"
			section="either-or"
			forwardDesc="A sentence with a gap → ή (or) or η (the)"
		/>
	),
});
