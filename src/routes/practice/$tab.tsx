import { useOutletContext } from "react-router";
import type { Route } from "./+types/$tab";
import { type PracticeLoaderData } from "./layout";

// Re-export action from layout so forms in child routes work
export { action } from "./layout";

// Production drills (typed input, English → Greek)
import PronounProductionDrill from "./components/pronoun-production-drill";
import ArticleProductionDrill from "./components/article-production-drill";
import VerbProductionDrill from "./components/verb-production-drill";
import VocabularyDrill from "./components/vocabulary-drill";
import ReviewDrill from "./components/review-drill";

const VALID_TABS = [
	"pronouns",
	"articles",
	"verbs",
	"vocabulary",
	"review",
] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

const UserRequiredMessage = () => (
	<div className="text-center py-12 bg-muted rounded-xl border border-border">
		<div className="text-5xl mb-4">👤</div>
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

	// Grammar drills (no user required) - Production mode (typed input)
	if (tab === "pronouns") {
		return <PronounProductionDrill />;
	}

	if (tab === "articles") {
		return <ArticleProductionDrill />;
	}

	if (tab === "verbs") {
		return <VerbProductionDrill />;
	}

	// User-required drills
	if (tab === "vocabulary") {
		return userId ? (
			<VocabularyDrill items={newVocabItems} />
		) : (
			<UserRequiredMessage />
		);
	}

	if (tab === "review") {
		return userId ? (
			<ReviewDrill items={reviewItems} />
		) : (
			<UserRequiredMessage />
		);
	}

	// Should never reach here due to loader validation
	return null;
}
