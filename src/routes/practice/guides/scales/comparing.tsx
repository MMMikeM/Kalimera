import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./comparing.data";

export const Route = createFileRoute("/practice/guides/scales/comparing")({
	component: () => (
		<GuideDrill
			drillId="scales-comparing"
			items={ITEMS}
			guide="scales"
			section="comparing"
			forwardDesc="An adjective and an English comparison → the Greek with πιο, από or the article"
		/>
	),
});
