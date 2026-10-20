import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./plural-extra-syllable.data";

export const Route = createFileRoute("/practice/guides/noun-exceptions/plural-extra-syllable")({
	component: () => (
		<GuideDrill
			drillId="nouns-plural-extra-syllable"
			items={ITEMS}
			guide="noun-exceptions"
			section="extra-syllable"
			forwardDesc="A noun for one → its plural"
		/>
	),
});
