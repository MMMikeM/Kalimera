import { BookOpen, GitBranch, MessageSquare, Users } from "lucide-react";
import { Outlet, useLocation, Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function meta() {
	return [
		{ title: "Quick Reference - Greek Grammar Lookup" },
		{ name: "description", content: "Grammar lookup - find what you need fast" },
	];
}

const TABS = [
	{
		id: "cases-pronouns",
		label: "Cases & Pronouns",
		shortLabel: "Pronouns",
		icon: <Users size={16} />,
	},
	{
		id: "nouns-articles",
		label: "Nouns & Articles",
		shortLabel: "Nouns",
		icon: <BookOpen size={16} />,
	},
	{
		id: "prepositions",
		label: "Prepositions",
		shortLabel: "Preps",
		icon: <GitBranch size={16} />,
	},
	{
		id: "verbs",
		label: "Verbs",
		shortLabel: "Verbs",
		icon: <MessageSquare size={16} />,
	},
] as const;

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

			<Tabs value={activeTab}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id} asChild className="gap-1.5">
							<Link to={`/quick-reference/${tab.id}`}>
								{tab.icon}
								<span className="hidden sm:inline">{tab.label}</span>
								<span className="sm:hidden">{tab.shortLabel}</span>
							</Link>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Outlet />
		</div>
	);
}
