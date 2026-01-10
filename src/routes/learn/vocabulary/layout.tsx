import { Link, Outlet, useLocation } from "react-router";
import { NavTabs } from "@/components/NavTabs";
import type { NavTab } from "@/components/NavTabs";
import { Package, Languages, BookOpen, ChevronLeft } from "lucide-react";
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
	{ id: "essentials", label: "Essentials", icon: <BookOpen size={16} />, color: "olive" },
];

export default function VocabularyLayout({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[2] || "nouns";

	return (
		<div className="space-y-4">
			<div className="flex items-center">
				<Link
					to="/learn"
					className="flex items-center gap-1 text-stone-600 hover:text-stone-800 transition-colors"
				>
					<ChevronLeft size={20} />
					<span className="font-medium">Words</span>
				</Link>
			</div>

			<NavTabs
				tabs={VOCABULARY_TABS}
				activeTab={activeTab}
				buildUrl={(tabId) => `/learn/vocabulary/${tabId}`}
			/>

			<Outlet context={loaderData} />
		</div>
	);
}
