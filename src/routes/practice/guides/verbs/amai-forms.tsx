import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./amai-forms.data";

export const Route = createFileRoute("/practice/guides/verbs/amai-forms")({
	component: () => (
		<GuideDrill
			drillId="verbs-amai-forms"
			items={ITEMS}
			guide="verbs"
			section="amai-verbs"
			forwardDesc="An -άμαι verb and a person → its present or simple future form"
		/>
	),
});
