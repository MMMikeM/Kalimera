import { Outlet, useLocation, Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components";
import { Package, Languages, BookOpen } from "lucide-react";
import type { Route } from "./+types/layout";
import { getVocabularyData } from "./data.server";

export async function loader() {
	return getVocabularyData();
}

export function meta() {
	return [
		{ title: "Vocabulary - Greek Word Reference" },
		{
			name: "description",
			content: "Essential Greek vocabulary organized by type",
		},
	];
}

const TABS = [
	{ id: "nouns", label: "Nouns", icon: Package },
	{ id: "verbs", label: "Verbs", icon: Languages },
	{ id: "reference", label: "Reference", icon: BookOpen },
] as const;

export default function VocabularyLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "nouns";

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Vocabulary"
				subtitle="Essential Greek vocabulary organized by type"
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
							<Link to={`/vocabulary/${tab.id}`}>
								<tab.icon size={16} />
								<span>{tab.label}</span>
							</Link>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Outlet context={loaderData} />
		</div>
	);
}
