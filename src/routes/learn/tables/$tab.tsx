import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BackLink } from "@/components/BackLink";
import { groupNounsByPattern } from "@/lib/noun-paradigm-groups";
import { pageTitle } from "@/lib/page-title";
import { getNounsForPatternTables } from "@/server/db/queries/noun-paradigms";

import { TABLES_TABS, TablesNav } from "./components/tables-nav";
import { AdjectivesTab } from "./tabs/adjectives";
import { ArticlesTab } from "./tabs/articles";
import { NounsTab } from "./tabs/nouns";
import { PronounsTab } from "./tabs/pronouns";

const loadNouns = createServerFn().handler(async () => ({
	byPattern: groupNounsByPattern(await getNounsForPatternTables()),
}));

export type NounsData = Awaited<ReturnType<typeof loadNouns>>;

const VALID_TABS = ["pronouns", "articles", "nouns", "adjectives"] as const;
type TabId = (typeof VALID_TABS)[number];

export const Route = createFileRoute("/learn/tables/$tab")({
	loader: async ({ params: { tab } }) => {
		if (!VALID_TABS.includes(tab as TabId)) throw notFound();

		const nouns = tab === "nouns" ? await loadNouns() : null;

		return { tab: tab as TabId, nouns };
	},
	head: ({ params }) => ({
		meta: [
			{ title: pageTitle(TABLES_TABS.find((t) => t.id === params.tab)?.label ?? "Tables") },
		],
	}),
	component: TabRoute,
});

function TabRoute() {
	const { tab, nouns } = Route.useLoaderData();

	const renderTab = () => {
		switch (tab) {
			case "pronouns":
				return <PronounsTab />;
			case "articles":
				return <ArticlesTab />;
			case "nouns":
				return <NounsTab data={nouns} />;
			case "adjectives":
				return <AdjectivesTab />;
			default:
				return null;
		}
	};

	return (
		<div className="space-y-4">
			<BackLink to="/learn">Learn</BackLink>
			<TablesNav activeTab={tab} />
			{renderTab()}
		</div>
	);
}
