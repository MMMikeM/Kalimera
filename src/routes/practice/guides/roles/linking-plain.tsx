import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./linking-plain.data";

export const Route = createFileRoute("/practice/guides/roles/linking-plain")({
	component: () => (
		<GuideDrill
			drillId="roles-linking-plain"
			items={ITEMS}
			guide="roles"
			section="linking"
			forwardDesc="A sentence with βλέπω, είμαι or γίνομαι and a gap → the noun in the form it needs"
		/>
	),
});
