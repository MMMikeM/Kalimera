import { type NavTab, NavTabs } from "@/components/NavTabs";
import type { Route } from "./+types/$tab";
import { getPatternsData } from "./data.server";
import { AdjectivesTab } from "./tabs/adjectives";
import { ArticlesTab } from "./tabs/nouns-articles";
import { CasesTab } from "./tabs/cases";
import { NounsTab } from "./tabs/nouns";
import { PatternsTab } from "./tabs/patterns";
import { PrepositionsTab } from "./tabs/prepositions";
import { PronounsTab } from "./tabs/pronouns";
import { VerbsTab } from "./tabs/verbs";

const VALID_TABS = [
	"cases",
	"pronouns",
	"articles",
	"nouns",
	"adjectives",
	"prepositions",
	"verbs",
	"patterns",
] as const;
type TabId = (typeof VALID_TABS)[number];

const REFERENCE_TABS: NavTab[] = [
	{ id: "cases", label: "Cases", color: "ocean" },
	{ id: "pronouns", label: "Pronouns", color: "ocean" },
	{ id: "articles", label: "Articles", color: "olive" },
	{ id: "nouns", label: "Nouns", color: "olive" },
	{ id: "adjectives", label: "Adjectives", color: "honey" },
	{ id: "prepositions", label: "Prepositions", color: "terracotta" },
	{ id: "verbs", label: "Verbs", color: "ocean" },
	{ id: "patterns", label: "Patterns", color: "honey" },
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
				return <ArticlesTab />;
			case "nouns":
				return <NounsTab />;
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
