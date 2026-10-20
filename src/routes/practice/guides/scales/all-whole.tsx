import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./all-whole.data";

export const Route = createFileRoute("/practice/guides/scales/all-whole")({
	component: () => (
		<GuideDrill
			drillId="scales-all-whole"
			items={ITEMS}
			guide="scales"
			section="all-whole"
			forwardDesc="A noun and an English phrase with all or the whole → όλος, matching, before the article"
		/>
	),
});
