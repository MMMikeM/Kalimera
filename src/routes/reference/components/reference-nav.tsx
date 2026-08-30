import type React from "react";

import { type NavTab, NavTabs } from "@/components/NavTabs";

const REFERENCE_TABS: NavTab[] = [
	// Articles precede pronouns: the Cases tab teaches case recognition off the
	// article, so it is a prerequisite for the tab before it, not a later lookup.
	{ id: "cases", label: "Cases", color: "ocean" },
	{ id: "articles", label: "Articles", color: "olive" },
	{ id: "nouns", label: "Nouns", color: "olive" },
	{ id: "pronouns", label: "Pronouns", color: "ocean" },
	{ id: "adjectives", label: "Adjectives", color: "honey" },
	{ id: "prepositions", label: "Prepositions", color: "terracotta" },
	{ id: "verbs", label: "Verbs", color: "ocean" },
	{ id: "patterns", label: "Patterns", color: "honey" },
];

export const ReferenceNav: React.FC<{ activeTab: string }> = ({ activeTab }) => (
	<NavTabs
		tabs={REFERENCE_TABS}
		activeTab={activeTab}
		buildUrl={(tabId) => `/reference/${tabId}`}
	/>
);
