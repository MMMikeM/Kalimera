import { validateTab } from "@/lib/validate-tab";

import type { Route } from "./+types/$tab";
import { ArrivingTab } from "./tabs/arriving";
import { FoodTab } from "./tabs/food";
import { RequestsTab } from "./tabs/requests";
import { SmalltalkTab } from "./tabs/smalltalk";

const VALID_TABS = ["arriving", "food", "smalltalk", "requests"] as const;

export function loader({ params }: Route.LoaderArgs) {
	return { tab: validateTab(params.tab as string, VALID_TABS) };
}

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "arriving":
			return <ArrivingTab />;
		case "food":
			return <FoodTab />;
		case "smalltalk":
			return <SmalltalkTab />;
		case "requests":
			return <RequestsTab />;
		default:
			return null;
	}
}
