import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./likes.data";

export const Route = createFileRoute("/practice/guides/little-words/likes")({
	component: () => (
		<GuideDrill
			drillId="pronouns-likes"
			items={ITEMS}
			guide="little-words"
			section="likes"
			forwardDesc="Who likes what, in English → μου αρέσει or μου αρέσουν"
		/>
	),
});
