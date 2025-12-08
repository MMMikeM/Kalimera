import { useOutletContext } from "react-router";
import type { Route } from "./+types/$tab";
import { PracticeStrategy, type PracticeLoaderData } from "./layout";
import PronounDrill from "./components/pronoun-drill";
import ArticleDrill from "./components/article-drill";
import VerbDrill from "./components/verb-drill";
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

	// Grammar drills (no user required)
	if (tab === "pronouns") {
		return (
			<div className="space-y-4">
				<PronounDrill />
				<PracticeStrategy />
			</div>
		);
	}

	if (tab === "articles") {
		return (
			<div className="space-y-4">
				<ArticleDrill />
				<PracticeStrategy />
			</div>
		);
	}

	if (tab === "verbs") {
		return (
			<div className="space-y-4">
				<VerbDrill />
				<PracticeStrategy />
			</div>
		);
	}

	// User-required drills
	if (tab === "vocabulary") {
		return (
			<div className="space-y-4">
				{userId ? (
					<VocabularyDrill items={newVocabItems} />
				) : (
					<UserRequiredMessage />
				)}
				<PracticeStrategy />
			</div>
		);
	}

	if (tab === "review") {
		return (
			<div className="space-y-4">
				{userId ? <ReviewDrill items={reviewItems} /> : <UserRequiredMessage />}
			</div>
		);
	}

	// Should never reach here due to loader validation
	return null;
}
