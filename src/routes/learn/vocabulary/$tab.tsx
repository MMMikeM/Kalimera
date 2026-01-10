import { Navigate } from "react-router";
import type { Route } from "./+types/$tab";
import { NounsTab } from "./tabs/nouns";
import { VerbsTab } from "./tabs/verbs";
import { EssentialsTab } from "./tabs/essentials";

const VALID_TABS = ["nouns", "verbs", "phrases", "essentials"] as const;
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
		case "nouns":
			return <NounsTab />;
		case "verbs":
			return <VerbsTab />;
		case "phrases":
			return <Navigate to="/learn/phrases" replace />;
		case "essentials":
			return <EssentialsTab />;
		default:
			return null;
	}
}
