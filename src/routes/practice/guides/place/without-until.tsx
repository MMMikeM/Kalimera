import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./without-until.data";

export const Route = createFileRoute("/practice/guides/place/without-until")({
	component: () => (
		<GuideDrill
			drillId="place-without-until"
			items={ITEMS}
			guide="place"
			section="without-until"
			forwardDesc="An English phrase → the Greek with χωρίς, μέχρι, προς, σαν or μετά από"
		/>
	),
});
