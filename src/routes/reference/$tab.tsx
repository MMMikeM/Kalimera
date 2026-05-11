import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { type NavTab, NavTabs } from "@/components/NavTabs";
import { getVocabBySlug } from "@/server/db/queries/vocabulary";
import type { Vocabulary } from "@/server/db/types";

import { AdjectivesTab } from "./tabs/adjectives";
import { CasesTab } from "./tabs/cases";
import { NounsTab } from "./tabs/nouns";
import { ArticlesTab } from "./tabs/nouns-articles";
import { PatternsTab } from "./tabs/patterns";
import { PrepositionsTab } from "./tabs/prepositions";
import { PronounsTab } from "./tabs/pronouns";
import { VerbsTab } from "./tabs/verbs";

export type PatternItem = Vocabulary;

const loadPatterns = createServerFn().handler(async () => {
	const [phraseTags, verbTags] = await Promise.all([
		getVocabBySlug("phrases", ["phrase"]),
		getVocabBySlug("verbs", ["verb"]),
	]);

	const toSlugMap = (tags: typeof phraseTags): Record<string, Vocabulary[]> =>
		Object.fromEntries(
			tags.map((t) => [
				t.slug,
				t.vocabularyTags.map((vt) => vt.vocabulary).filter((v): v is Vocabulary => v !== null),
			]),
		);

	const phrases = toSlugMap(phraseTags);
	const verbs = toSlugMap(verbTags);

	return {
		likesConstruction: {
			singular: verbs["likes-singular"] ?? [],
			plural: verbs["likes-plural"] ?? [],
		},
		nameConstruction: phrases["name-construction"] ?? [],
	};
});

export type PatternsData = Awaited<ReturnType<typeof loadPatterns>>;
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

export const Route = createFileRoute("/reference/$tab")({
	loader: async ({ params: { tab } }) => {
		if (!VALID_TABS.includes(tab as TabId)) {
			throw new Response("Not Found", { status: 404 });
		}

		// Only load patterns data when on patterns tab
		const patterns = tab === "patterns" ? await loadPatterns() : null;

		return { tab: tab as TabId, patterns };
	},
	component: TabRoute,
});

function TabRoute() {
	const { tab, patterns } = Route.useLoaderData();

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
			<NavTabs tabs={REFERENCE_TABS} activeTab={tab} buildUrl={(tabId) => `/reference/${tabId}`} />
			{renderTab()}
		</div>
	);
}
