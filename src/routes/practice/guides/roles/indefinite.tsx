import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./indefinite.data";

export const Route = createFileRoute("/practice/guides/roles/indefinite")({
	component: () => (
		<GuideDrill
			drillId="articles-indefinite"
			items={ITEMS}
			guide="roles"
			section="a-an"
			forwardDesc="A sentence with a gap before a noun → ένας, έναν, μια or ένα"
		/>
	),
});
