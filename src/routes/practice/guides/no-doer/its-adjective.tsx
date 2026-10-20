import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./its-adjective.data";

export const Route = createFileRoute("/practice/guides/no-doer/its-adjective")({
	component: () => (
		<GuideDrill
			drillId="no-doer-its-adjective"
			items={ITEMS}
			guide="no-doer"
			section="its-hard"
			forwardDesc="A reaction in English → είναι δύσκολο"
		/>
	),
});
