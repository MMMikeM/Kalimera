import type React from "react";

import { type NavTab, NavTabs } from "@/components/NavTabs";

export const REFERENCE_TABS: NavTab[] = [
	{ id: "cases", label: "Cases", color: "ocean" },
	{ id: "pronouns", label: "Pronouns", color: "ocean" },
	{ id: "articles", label: "Articles", color: "olive" },
	{ id: "nouns", label: "Nouns", color: "olive" },
	{ id: "adjectives", label: "Adjectives", color: "honey" },
	{ id: "prepositions", label: "Prepositions", color: "terracotta" },
	{ id: "verbs", label: "Verbs", color: "ocean" },
	{ id: "patterns", label: "Patterns", color: "honey" },
];

export const ReferenceNav: React.FC<{ activeTab: string }> = ({ activeTab }) => (
	<NavTabs tabs={REFERENCE_TABS} activeTab={activeTab} buildUrl={(tabId) => `/reference/${tabId}`} />
);
