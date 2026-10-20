import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./before-after.data";

export const Route = createFileRoute("/practice/guides/joining/before-after")({
	component: () => (
		<GuideDrill
			drillId="joining-before-after"
			items={ITEMS}
			guide="joining"
			section="before"
			forwardDesc="A Greek sentence with a gap → πριν, πριν από, μετά or αφού"
		/>
	),
});
