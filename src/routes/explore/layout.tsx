import { Outlet, useLocation } from "react-router";
import { MessageCircle, Quote, BookOpen } from "lucide-react";
import { NavTabs, type NavTab } from "@/components";

export function meta() {
	return [
		{ title: "Explore - Greek Learning" },
		{
			name: "description",
			content: "Browse conversations, phrases, and vocabulary",
		},
	];
}

const EXPLORE_TABS: NavTab[] = [
	{
		id: "conversations",
		label: "Conversations",
		shortLabel: "Convos",
		icon: <MessageCircle size={16} />,
		color: "olive",
	},
	{
		id: "phrases",
		label: "Phrases",
		shortLabel: "Phrases",
		icon: <Quote size={16} />,
		color: "ocean",
	},
	{
		id: "words",
		label: "Vocabulary",
		shortLabel: "Words",
		icon: <BookOpen size={16} />,
		color: "honey",
	},
];

export default function ExploreLayout() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "conversations";

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-stone-800">Explore</h2>
				<p className="text-stone-600 mt-1">
					Browse Greek content by topic
				</p>
			</div>

			<NavTabs
				tabs={EXPLORE_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => {
					const defaults: Record<string, string> = {
						conversations: "arriving",
						phrases: "survival",
						words: "nouns",
					};
					return `/explore/${tabId}/${defaults[tabId] || ""}`;
				}}
			/>

			<Outlet />
		</div>
	);
}
