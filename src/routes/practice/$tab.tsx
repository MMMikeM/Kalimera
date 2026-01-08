import { redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/$tab";
import type { PracticeLoaderData } from "./layout";
import SrsDrill from "./components/srs-drill";

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

const UserRequiredMessage = () => (
	<div className="text-center py-12 bg-muted rounded-xl border border-border">
		<div className="text-5xl mb-4">?</div>
		<h3 className="text-xl font-semibold text-foreground mb-2">
			Select a user
		</h3>
		<p className="text-muted-foreground">
			Choose a user from the dropdown above to start practicing.
		</p>
	</div>
);

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;
	const context = useOutletContext<PracticeLoaderData>();
	const { reviewItems, newVocabItems, userId, stats } = context;

	if (!userId) {
		return <UserRequiredMessage />;
	}

	if (tab === "vocabulary") {
		return <SrsDrill variant="vocabulary" items={newVocabItems} streakDays={stats?.streak} />;
	}

	if (tab === "review") {
		return <SrsDrill variant="review" items={reviewItems} streakDays={stats?.streak} />;
	}

	return null;
}
