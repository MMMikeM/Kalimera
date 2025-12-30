import { BookOpen, GitBranch, MessageSquare, Sparkles, Users } from "lucide-react";
import { Outlet, useLocation } from "react-router";
import { NavTabs, type NavTab } from "@/components";

export function meta() {
	return [
		{ title: "Quick Reference - Greek Grammar Lookup" },
		{ name: "description", content: "Grammar lookup - find what you need fast" },
	];
}

const REFERENCE_TABS: NavTab[] = [
	{ id: "cases-pronouns", label: "Cases & Pronouns", shortLabel: "Pronouns", icon: <Users size={16} />, color: "ocean" },
	{ id: "nouns-articles", label: "Nouns & Articles", shortLabel: "Nouns", icon: <BookOpen size={16} />, color: "olive" },
	{ id: "adjectives", label: "Adjectives", shortLabel: "Adj", icon: <Sparkles size={16} />, color: "honey" },
	{ id: "prepositions", label: "Prepositions", shortLabel: "Preps", icon: <GitBranch size={16} />, color: "terracotta" },
	{ id: "verbs", label: "Verbs", shortLabel: "Verbs", icon: <MessageSquare size={16} />, color: "ocean" },
];

export default function QuickReferenceLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "cases-pronouns";

	return (
		<div className="space-y-6">
			<div className="mb-2">
				<h1 className="text-2xl font-bold text-stone-800">Quick Reference</h1>
				<p className="text-stone-600 mt-1">
					Grammar lookup - find what you need fast
				</p>
			</div>

			<NavTabs
				tabs={REFERENCE_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/quick-reference/${tabId}`}
			/>

			<Outlet />
		</div>
	);
}
