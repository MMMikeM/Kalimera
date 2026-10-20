import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./small-big.data";

export const Route = createFileRoute("/practice/guides/gender/small-big")({
	component: () => (
		<GuideDrill
			drillId="nouns-small-big"
			items={ITEMS}
			guide="gender"
			section="small-big"
			forwardDesc="A noun and small or big → the new noun with its article"
		/>
	),
});
