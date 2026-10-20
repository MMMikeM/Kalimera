import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./se-article.data";

export const Route = createFileRoute("/practice/guides/place/se-article")({
	component: () => (
		<GuideDrill
			drillId="place-se-article"
			items={ITEMS}
			guide="place"
			section="se-contractions"
			forwardDesc="σε and a noun → the two joined, or σε left whole"
		/>
	),
});
