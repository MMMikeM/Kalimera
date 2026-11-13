import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { groupNounsByPattern } from "@/lib/noun-paradigm-groups";
import { pageTitle } from "@/lib/page-title";
import { getNounsForParadigmReference } from "@/server/db/queries/noun-paradigms";

import { REFERENCE_TABS, ReferenceNav } from "./components/reference-nav";
import { AdjectivesTab } from "./tabs/adjectives";
import { ArticlesTab } from "./tabs/nouns-articles";
import { NounsTab } from "./tabs/nouns";
import { PronounsTab } from "./tabs/pronouns";

const loadNouns = createServerFn().handler(async () => ({
	byPattern: groupNounsByPattern(await getNounsForParadigmReference()),
}));

export type NounsData = Awaited<ReturnType<typeof loadNouns>>;

const VALID_TABS = ["pronouns", "articles", "nouns", "adjectives"] as const;
type TabId = (typeof VALID_TABS)[number];

/** Tabs whose tables went to the guides; the old links keep working. */
const MOVED_TO_GUIDES = {
	cases: { guide: "roles" },
	prepositions: { guide: "place" },
	patterns: { guide: "little-words", hash: "likes" },
} as const;

export const Route = createFileRoute("/reference/$tab")({
	loader: async ({ params: { tab } }) => {
		if (tab in MOVED_TO_GUIDES) {
			const { guide, ...rest } = MOVED_TO_GUIDES[tab as keyof typeof MOVED_TO_GUIDES];
			throw redirect({ to: "/guides/$guide", params: { guide }, ...rest });
		}
		if (!VALID_TABS.includes(tab as TabId)) throw notFound();

		const nouns = tab === "nouns" ? await loadNouns() : null;

		return { tab: tab as TabId, nouns };
	},
	head: ({ params }) => ({
		meta: [
			{ title: pageTitle(REFERENCE_TABS.find((t) => t.id === params.tab)?.label ?? "Reference") },
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
			<ReferenceNav activeTab={tab} />
			{renderTab()}
		</div>
	);
}
