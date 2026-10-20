import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./but-so-also.data";

export const Route = createFileRoute("/practice/guides/joining/but-so-also")({
	component: () => (
		<GuideDrill
			drillId="joining-but-so-also"
			items={ITEMS}
			guide="joining"
			section="but-so-also"
			forwardDesc="A Greek sentence with a gap → αλλά, όμως, λοιπόν or επίσης"
		/>
	),
});
