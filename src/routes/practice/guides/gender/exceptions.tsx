import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./exceptions.data";

export const Route = createFileRoute("/practice/guides/gender/exceptions")({
	component: () => (
		<GuideDrill
			drillId="nouns-gender-exceptions"
			items={ITEMS}
			guide="gender"
			section="masculine-endings"
			forwardDesc="A noun without its article → ο, η or το"
		/>
	),
});
