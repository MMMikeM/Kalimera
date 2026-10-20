import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./command-aspect.data";

export const Route = createFileRoute("/practice/guides/future-commands/command-aspect")({
	component: () => (
		<GuideDrill
			drillId="verbs-imperative-aspect"
			items={ITEMS}
			guide="future-commands"
			section="command-aspect"
			forwardDesc="An English command, once or as a habit → the Greek command to match"
		/>
	),
});
