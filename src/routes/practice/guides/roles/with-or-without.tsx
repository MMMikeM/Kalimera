import { createFileRoute } from "@tanstack/react-router";

import { GuideChoiceDrill } from "../components/guide-drill";
import { ITEMS, OPTIONS } from "./with-or-without.data";

export const Route = createFileRoute("/practice/guides/roles/with-or-without")({
	component: () => (
		<GuideChoiceDrill
			drillId="articles-with-or-without"
			items={ITEMS}
			options={OPTIONS}
			guide="roles"
			section="when-article"
			forwardDesc="A sentence with a gap → the article, or — for none"
		/>
	),
});
