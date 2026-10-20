import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./for-from-with.data";

export const Route = createFileRoute("/practice/guides/place/for-from-with")({
	component: () => (
		<GuideDrill
			drillId="place-for-from-with"
			items={ITEMS}
			guide="place"
			section="purpose"
			forwardDesc="A sentence with a gap → για, από or με"
		/>
	),
});
