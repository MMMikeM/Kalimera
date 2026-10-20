import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./polite-you.data";

export const Route = createFileRoute("/practice/guides/little-words/polite-you")({
	component: () => (
		<GuideDrill
			drillId="pronouns-polite-you"
			items={ITEMS}
			guide="little-words"
			section="polite"
			forwardDesc="A friendly phrase → its polite form"
		/>
	),
});
