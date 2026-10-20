import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./unchanging.data";

export const Route = createFileRoute("/practice/guides/noun-exceptions/unchanging")({
	component: () => (
		<GuideDrill
			drillId="nouns-unchanging"
			items={ITEMS}
			guide="noun-exceptions"
			section="never-change"
			forwardDesc="A borrowed noun and a phrase → the phrase, with the noun unchanged"
		/>
	),
});
