import type { Route } from "./+types/$tab";
import { ArrivingTab } from "./tabs/arriving";
import { FoodTab } from "./tabs/food";
import { RequestsTab } from "./tabs/requests";
import { SmalltalkTab } from "./tabs/smalltalk";

const VALID_TABS = ["arriving", "food", "smalltalk", "requests"] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
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
