import {
	ChevronLeft,
	Clock,
	Hand,
	Heart,
	Link2,
	MessageCircle,
	Sparkles,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import type { NavTab } from "@/components/NavTabs";
import { NavTabs } from "@/components/NavTabs";
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
	{
		id: "survival",
		label: "Survival",
		icon: <Sparkles size={16} />,
		color: "terracotta",
	},
	{
		id: "responses",
		label: "Responses",
		icon: <MessageCircle size={16} />,
		color: "ocean",
	},
	{
		id: "requests",
		label: "Requests",
		icon: <Hand size={16} />,
		color: "olive",
	},
	{
		id: "opinions",
		label: "Opinions",
		icon: <Heart size={16} />,
		color: "terracotta",
	},
	{
		id: "connectors",
		label: "Connectors",
		icon: <Link2 size={16} />,
		color: "honey",
	},
	{ id: "time", label: "Time", icon: <Clock size={16} />, color: "ocean" },
];

export default function PhrasesLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "survival";

	return (
		<div className="space-y-4">
			<div className="flex items-center">
				<Link
					to="/learn"
					className="flex items-center gap-1 text-stone-600 hover:text-stone-800 transition-colors"
				>
					<ChevronLeft size={20} />
					<span className="font-medium">Phrases</span>
				</Link>
			</div>

			<NavTabs
				tabs={PHRASES_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/learn/phrases/${tabId}`}
			/>

			<Outlet context={loaderData} />
		</div>
	);
}
