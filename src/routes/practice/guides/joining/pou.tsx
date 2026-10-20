import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./pou.data";

export const Route = createFileRoute("/practice/guides/joining/pou")({
	component: () => (
		<GuideDrill
			drillId="joining-pou"
			items={ITEMS}
			guide="joining"
			section="pou"
			forwardDesc="An English phrase with who, which or that → the Greek, joined with που"
		/>
	),
});
