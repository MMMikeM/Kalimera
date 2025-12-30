import { Outlet, useLocation } from "react-router";
import { SectionHeading, NavTabs, type NavTab } from "@/components";
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

const VOCABULARY_TABS: NavTab[] = [
	{ id: "nouns", label: "Nouns", icon: <Package size={16} />, color: "ocean" },
	{ id: "verbs", label: "Verbs", icon: <Languages size={16} />, color: "honey" },
	{ id: "reference", label: "Reference", icon: <BookOpen size={16} />, color: "olive" },
];

export default function VocabularyLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "nouns";

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Vocabulary"
				subtitle="Essential Greek vocabulary organized by type"
				level="h2"
			/>

			<NavTabs
				tabs={VOCABULARY_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/explore/words/${tabId}`}
			/>

			<Outlet context={loaderData} />
		</div>
	);
}
