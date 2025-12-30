import { Outlet, useLocation } from "react-router";
import { SectionHeading, NavTabs, type NavTab } from "@/components";
import {
	Sparkles,
	MessageCircle,
	Hand,
	Heart,
	Link2,
	Clock,
	Blocks,
} from "lucide-react";
import type { Route } from "./+types/layout";
import { getPhrasesData } from "./data.server";

export async function loader() {
	return getPhrasesData();
}

export function meta() {
	return [
		{ title: "Phrases - Greek Learning" },
		{
			name: "description",
			content: "Essential expressions for natural Greek conversation",
		},
	];
}

const PHRASES_TABS: NavTab[] = [
	{ id: "survival", label: "Survival", shortLabel: "Survival", icon: <Sparkles size={16} />, color: "terracotta" },
	{ id: "responses", label: "Responses", shortLabel: "Respond", icon: <MessageCircle size={16} />, color: "ocean" },
	{ id: "requests", label: "Requests", shortLabel: "Ask", icon: <Hand size={16} />, color: "olive" },
	{ id: "opinions", label: "Opinions", shortLabel: "Express", icon: <Heart size={16} />, color: "terracotta" },
	{ id: "connectors", label: "Connectors", shortLabel: "Connect", icon: <Link2 size={16} />, color: "honey" },
	{ id: "time", label: "Time", shortLabel: "Time", icon: <Clock size={16} />, color: "ocean" },
	{ id: "constructions", label: "Patterns", shortLabel: "Patterns", icon: <Blocks size={16} />, color: "olive" },
];

export default function PhrasesLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "survival";

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Phrases"
				subtitle="Essential expressions for natural Greek conversation"
				level="h2"
			/>

			<NavTabs
				tabs={PHRASES_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/explore/phrases/${tabId}`}
			/>

			<Outlet context={loaderData} />
		</div>
	);
}
