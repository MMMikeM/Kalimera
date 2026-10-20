import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./pairs.data";

export const Route = createFileRoute("/practice/guides/gender/pairs")({
	component: () => (
		<GuideDrill
			drillId="nouns-gender-pairs"
			items={ITEMS}
			guide="gender"
			section="gender-pairs"
			forwardDesc="A masculine word for a person → the feminine, with η"
		/>
	),
});
