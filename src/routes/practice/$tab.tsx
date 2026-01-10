import { redirect } from "react-router";
import type { Route } from "./+types/$tab";
import { VocabularyTab } from "./tabs/vocabulary";
import { ReviewTab } from "./tabs/review";

export { action } from "./layout";

const LEGACY_TABS = ["pronouns", "articles", "verbs", "nouns"] as const;
const VALID_TABS = ["vocabulary", "review"] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (LEGACY_TABS.includes(tab as (typeof LEGACY_TABS)[number])) {
		throw redirect("/practice/speed");
	}

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "vocabulary":
			return <VocabularyTab />;
		case "review":
			return <ReviewTab />;
		default:
			return null;
	}
}
