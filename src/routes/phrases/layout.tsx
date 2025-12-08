import { Outlet, useLocation, Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components";
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

const TABS = [
	{ id: "survival", label: "Survival", shortLabel: "Survival", icon: Sparkles },
	{
		id: "responses",
		label: "Responses",
		shortLabel: "Respond",
		icon: MessageCircle,
	},
	{ id: "requests", label: "Requests", shortLabel: "Ask", icon: Hand },
	{ id: "opinions", label: "Opinions", shortLabel: "Express", icon: Heart },
	{ id: "connectors", label: "Connectors", shortLabel: "Connect", icon: Link2 },
	{ id: "time", label: "Time", shortLabel: "Time", icon: Clock },
	{
		id: "constructions",
		label: "Patterns",
		shortLabel: "Patterns",
		icon: Blocks,
	},
] as const;

export default function PhrasesLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "survival";

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Phrases"
				subtitle="Essential expressions for natural Greek conversation"
				level="h2"
			/>

			<Tabs value={activeTab}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.id}
							value={tab.id}
							asChild
							className="gap-1.5"
						>
							<Link to={`/phrases/${tab.id}`}>
								<tab.icon size={16} />
								<span className="hidden sm:inline">{tab.label}</span>
								<span className="sm:hidden">{tab.shortLabel}</span>
							</Link>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Outlet context={loaderData} />
		</div>
	);
}
