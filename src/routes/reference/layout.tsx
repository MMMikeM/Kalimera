import { Outlet, useLocation } from "react-router";
import { NavTabs, type NavTab } from "@/components/NavTabs";

export function meta() {
	return [
		{ title: "Quick Reference - Greek Grammar Lookup" },
		{
			name: "description",
			content: "Grammar lookup - find what you need fast",
		},
	];
}

const REFERENCE_TABS: NavTab[] = [
	{ id: "cases-pronouns", label: "Cases & Pronouns", shortLabel: "Pro", color: "ocean" },
	{ id: "nouns-articles", label: "Nouns & Articles", shortLabel: "Noun", color: "olive" },
	{ id: "adjectives", label: "Adjectives", shortLabel: "Adj", color: "honey" },
	{ id: "prepositions", label: "Prepositions", shortLabel: "Prep", color: "terracotta" },
	{ id: "verbs", label: "Verbs", shortLabel: "Verb", color: "ocean" },
];

export default function QuickReferenceLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "cases-pronouns";

	return (
		<div className="space-y-4">
			<NavTabs
				tabs={REFERENCE_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/reference/${tabId}`}
			/>

			<Outlet />
		</div>
	);
}
