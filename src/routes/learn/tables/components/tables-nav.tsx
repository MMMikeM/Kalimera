import type React from "react";

import { type NavTab, NavTabs } from "@/components/NavTabs";

export const REFERENCE_TABS: NavTab[] = [
	{ id: "articles", label: "Articles", color: "olive" },
	{ id: "nouns", label: "Nouns", color: "olive" },
	{ id: "pronouns", label: "Pronouns", color: "ocean" },
	{ id: "adjectives", label: "Adjectives", color: "honey" },
	{ id: "verbs", label: "Verbs", color: "ocean" },
];

export const ReferenceNav: React.FC<{ activeTab: string }> = ({ activeTab }) => (
	<NavTabs
		tabs={REFERENCE_TABS}
		activeTab={activeTab}
		buildUrl={(tabId) => `/reference/${tabId}`}
	/>
);
