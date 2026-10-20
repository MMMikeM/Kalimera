import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./ochi-den.data";

export const Route = createFileRoute("/practice/guides/scales/ochi-den")({
	component: () => (
		<GuideDrill
			drillId="scales-ochi-den"
			items={ITEMS}
			guide="scales"
			section="not-words"
			forwardDesc="An English phrase with not → the Greek, with δεν or όχι"
		/>
	),
});
