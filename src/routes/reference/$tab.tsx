import type { Route } from "./+types/$tab";
import { NavTabs, type NavTab } from "@/components/NavTabs";
import { CasesTab } from "./tabs/cases";
import { PronounsTab } from "./tabs/pronouns";
import { NounsArticlesTab } from "./tabs/nouns-articles";
import { AdjectivesTab } from "./tabs/adjectives";
import { PrepositionsTab } from "./tabs/prepositions";
import { VerbsTab } from "./tabs/verbs";
import { PatternsTab } from "./tabs/patterns";
import { getPatternsData } from "./data.server";

const VALID_TABS = [
	"cases",
	"pronouns",
	"articles",
	"adjectives",
	"prepositions",
	"verbs",
	"patterns",
] as const;
type TabId = (typeof VALID_TABS)[number];

const REFERENCE_TABS: NavTab[] = [
	{ id: "cases", label: "Cases", shortLabel: "Case", color: "ocean" },
	{ id: "pronouns", label: "Pronouns", shortLabel: "Pro", color: "ocean" },
	{ id: "articles", label: "Articles", shortLabel: "Art", color: "olive" },
	{ id: "adjectives", label: "Adjectives", shortLabel: "Adj", color: "honey" },
	{ id: "prepositions", label: "Prepositions", shortLabel: "Prep", color: "terracotta" },
	{ id: "verbs", label: "Verbs", shortLabel: "Verb", color: "ocean" },
	{ id: "patterns", label: "Patterns", shortLabel: "Pat", color: "honey" },
];

export async function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;
	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	// Only load patterns data when on patterns tab
	const patterns = tab === "patterns" ? await getPatternsData() : null;

	return { tab: tab as TabId, patterns };
}

export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab, patterns } = loaderData;

	const renderTab = () => {
		switch (tab) {
			case "cases":
				return <CasesTab />;
			case "pronouns":
				return <PronounsTab />;
			case "articles":
				return <NounsArticlesTab />;
			case "adjectives":
				return <AdjectivesTab />;
			case "prepositions":
				return <PrepositionsTab />;
			case "verbs":
				return <VerbsTab />;
			case "patterns":
				return patterns ? <PatternsTab data={patterns} /> : null;
			default:
				return null;
		}
	};

	return (
		<div className="space-y-4">
			<NavTabs
				tabs={REFERENCE_TABS}
				activeTab={tab}
				buildUrl={(tabId) => `/reference/${tabId}`}
			/>
			{renderTab()}
		</div>
	);
}
