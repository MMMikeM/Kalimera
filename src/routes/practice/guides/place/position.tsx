import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./position.data";

export const Route = createFileRoute("/practice/guides/place/position")({
	component: () => (
		<GuideDrill
			drillId="place-position"
			items={ITEMS}
			guide="place"
			section="position"
			forwardDesc="A position in English → the Greek with σε or από"
		/>
	),
});
