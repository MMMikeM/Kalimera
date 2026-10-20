import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./would-like.data";

export const Route = createFileRoute("/practice/guides/no-doer/would-like")({
	component: () => (
		<GuideDrill
			drillId="no-doer-would-like"
			items={ITEMS}
			guide="no-doer"
			section="wish"
			forwardDesc="A request in English → θα ήθελα έναν καφέ"
		/>
	),
});
