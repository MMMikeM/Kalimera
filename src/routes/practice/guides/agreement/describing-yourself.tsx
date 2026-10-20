import { createFileRoute } from "@tanstack/react-router";

import { GuideDrill } from "../components/guide-drill";
import { ITEMS } from "./describing-yourself.data";

export const Route = createFileRoute("/practice/guides/agreement/describing-yourself")({
	component: () => (
		<GuideDrill
			drillId="adjectives-describing-yourself"
			items={ITEMS}
			guide="agreement"
			section="describing-yourself"
			forwardDesc="A state and who is speaking → είμαι with the -μένος word"
		/>
	),
});
