import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./from-ending.data";

export const Route = createFileRoute("/practice/guides/gender/from-ending")({
	component: () => (
		<GuideDrill
			drillId="nouns-gender-from-ending"
			items={ITEMS}
			guide="gender"
			section="gender-families"
			forwardDesc="A noun without its article → ο, η, το or τα"
		/>
	),
});
