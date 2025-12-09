import { useOutletContext } from "react-router";
import { Users, FileText, Zap, BookOpen, Clock } from "lucide-react";
import type { Route } from "./+types/$tab";
import { TabHero } from "@/components";
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
				<TabHero
					title="Master the pronouns"
					greekPhrase="με, σε, τον, την..."
					colorScheme="ocean"
					icon={<Users size={18} />}
				>
					Pronouns are the most frequent words in any language. Get these right
					and you're halfway to fluency!
				</TabHero>
				<PronounDrill />
				<PracticeStrategy />
			</div>
		);
	}

	if (tab === "articles") {
		return (
			<div className="space-y-4">
				<TabHero
					title="Match articles to nouns"
					greekPhrase="ο, η, το → τον, την, το"
					colorScheme="olive"
					icon={<FileText size={18} />}
				>
					Greek articles change based on gender, case, and number. Practice
					recognizing the patterns!
				</TabHero>
				<ArticleDrill />
				<PracticeStrategy />
			</div>
		);
	}

	if (tab === "verbs") {
		return (
			<div className="space-y-4">
				<TabHero
					title="Conjugate with confidence"
					greekPhrase="κάνω, κάνεις, κάνει..."
					colorScheme="honey"
					icon={<Zap size={18} />}
				>
					Verb endings tell you who's doing the action. Learn the patterns and
					you can conjugate thousands of verbs!
				</TabHero>
				<VerbDrill />
				<PracticeStrategy />
			</div>
		);
	}

	// User-required drills
	if (tab === "vocabulary") {
		return (
			<div className="space-y-4">
				<TabHero
					title="Build your word bank"
					greekPhrase="Τι σημαίνει...;"
					colorScheme="terracotta"
					icon={<BookOpen size={18} />}
				>
					Learn new vocabulary with spaced repetition. Words you struggle with
					appear more often until they stick.
				</TabHero>
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
				<TabHero
					title="Review what you've learned"
					greekPhrase="Πάλι από την αρχή!"
					colorScheme="terracotta"
					icon={<Clock size={18} />}
				>
					Words scheduled for review based on your progress. Keeping up with
					reviews is the key to long-term retention!
				</TabHero>
				{userId ? <ReviewDrill items={reviewItems} /> : <UserRequiredMessage />}
			</div>
		);
	}

	// Should never reach here due to loader validation
	return null;
}
