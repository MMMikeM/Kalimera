import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./plural-only.data";

export const Route = createFileRoute("/practice/guides/noun-exceptions/plural-only")({
	component: () => (
		<GuideDrill
			drillId="nouns-plural-only"
			items={ITEMS}
			guide="noun-exceptions"
			section="plural-only"
			forwardDesc="English → the Greek noun, which is plural"
		/>
	),
});
