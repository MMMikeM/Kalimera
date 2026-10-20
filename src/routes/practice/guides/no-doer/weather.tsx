import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./weather.data";

export const Route = createFileRoute("/practice/guides/no-doer/weather")({
	component: () => (
		<GuideDrill
			drillId="no-doer-weather"
			items={ITEMS}
			guide="no-doer"
			section="weather"
			forwardDesc="The weather in English → κάνει κρύο, βρέχει, έχει ήλιο"
		/>
	),
});
