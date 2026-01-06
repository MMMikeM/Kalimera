import { redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/$tab";
import type { PracticeLoaderData } from "./layout";
import type { FocusType } from "./speed-drill";
import SrsDrill from "./components/srs-drill";

export { action } from "./layout";

const FOCUS_REDIRECTS = {
	pronouns: "pronouns",
	articles: "articles",
	verbs: "verbs",
	nouns: "nouns",
} as const satisfies Record<string, FocusType>;

const VALID_TABS = ["vocabulary", "review"] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params, request }: Route.LoaderArgs) {
	const tab = params.tab as string;
	const url = new URL(request.url);
	const userId = url.searchParams.get("userId");

	if (tab in FOCUS_REDIRECTS) {
		const focusType = FOCUS_REDIRECTS[tab as keyof typeof FOCUS_REDIRECTS];
		const redirectParams = new URLSearchParams();
		redirectParams.set("focus", focusType);
		if (userId) redirectParams.set("userId", userId);
		throw redirect(`/practice/speed?${redirectParams.toString()}`);
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
	const { reviewItems, newVocabItems, userId } = context;

	if (!userId) {
		return <UserRequiredMessage />;
	}

	if (tab === "vocabulary") {
		return <SrsDrill variant="vocabulary" items={newVocabItems} />;
	}

	if (tab === "review") {
		return <SrsDrill variant="review" items={reviewItems} />;
	}

	return null;
}
