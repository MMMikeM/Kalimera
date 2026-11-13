import type React from "react";

import { type NavTab, NavTabs } from "@/components/NavTabs";

export const TABLES_TABS: NavTab[] = [
	{ id: "articles", label: "Articles", color: "olive" },
	{ id: "nouns", label: "Nouns", color: "olive" },
	{ id: "pronouns", label: "Pronouns", color: "ocean" },
	{ id: "adjectives", label: "Adjectives", color: "honey" },
	{ id: "verbs", label: "Verbs", color: "ocean" },
];

export const TablesNav: React.FC<{ activeTab: string }> = ({ activeTab }) => (
	<NavTabs
		tabs={TABLES_TABS}
		activeTab={activeTab}
		buildUrl={(tabId) => `/learn/tables/${tabId}`}
	/>
);
