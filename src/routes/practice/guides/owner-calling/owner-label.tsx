import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./owner-label.data";

export const Route = createFileRoute("/practice/guides/owner-calling/owner-label")({
	component: () => (
		<GuideDrill
			drillId="nouns-owner-label"
			items={ITEMS}
			guide="owner-calling"
			section="owner-label"
			forwardDesc="A label's two nouns → the label, with the Owner and no article"
		/>
	),
});
