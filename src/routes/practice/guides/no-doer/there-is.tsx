import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./there-is.data";

export const Route = createFileRoute("/practice/guides/no-doer/there-is")({
	component: () => (
		<GuideDrill
			drillId="no-doer-there-is"
			items={ITEMS}
			guide="no-doer"
			section="there-is"
			forwardDesc="There is or there are, with the verb → υπάρχουν Άγγλοι or έχει Άγγλους"
		/>
	),
});
