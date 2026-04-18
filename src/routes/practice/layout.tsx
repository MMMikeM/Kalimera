import { Clock, Dumbbell } from "lucide-react";
import { Outlet, useLocation } from "react-router";

import type { NavTab } from "@/components/NavTabs";
import { NavTabs } from "@/components/NavTabs";
import { getAuthSession } from "@/lib/auth-cookie";

import type { Route } from "./+types/layout";
import {
	type ActionIntent,
	actionHandlers,
	type DrillStat,
	getDrillStats,
	getItemsDueForReview,
	getNewVocabularyItems,
	getPracticeStats,
	getUserById,
	type PracticeStats,
	type VocabItemWithSkill,
} from "./loader.server";

export function meta() {
	return [
		{ title: "Practice - Greek Learning" },
		{
			name: "description",
			content: "Interactive drills for Greek grammar and vocabulary",
		},
	];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
	const auth = getAuthSession(request);
	const userId = auth?.userId ?? null;

	const url = new URL(request.url);
	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 100) : 20;

	let reviewItems: VocabItemWithSkill[] = [];
	let newVocabItems: VocabItemWithSkill[] = [];
	let stats: PracticeStats | null = null;
	let userName: string | null = null;
	let drillStats: DrillStat[] = [];

	if (userId) {
		const [user, reviews, newItems, practiceStats, drills] = await Promise.all([
			getUserById(userId),
			getItemsDueForReview(userId, "recognition", limit),
			getNewVocabularyItems(userId, 20),
			getPracticeStats(userId),
			getDrillStats(userId),
		]);
		userName = user?.displayName ?? null;
		reviewItems = reviews.map((r) => ({
			id: r.vocabularyId,
			greekText: r.vocabulary?.greekText ?? "",
			englishTranslation: r.vocabulary?.englishTranslation ?? "",
		}));
		newVocabItems = newItems;
		stats = practiceStats;
		drillStats = drills;
	}

	return { reviewItems, newVocabItems, stats, userId, userName, drillStats };
};

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const intent = formData.get("intent") as string | null;

	if (!intent || !(intent in actionHandlers)) {
		return { success: false, error: "Unknown action" };
	}

	return actionHandlers[intent as ActionIntent](formData);
};

export type PracticeLoaderData = Awaited<ReturnType<typeof loader>>;

export const UserRequiredMessage = () => (
	<div className="rounded-xl border border-border bg-muted py-12 text-center">
		<div className="mb-4 text-5xl">?</div>
		<h3 className="mb-2 text-xl font-semibold text-foreground">Select a user</h3>
		<p className="text-muted-foreground">
			Choose a user from the dropdown above to start practicing.
		</p>
	</div>
);

const PRACTICE_TABS: NavTab[] = [
	{
		id: "practice",
		label: "Practice",
		icon: <Dumbbell size={16} />,
		color: "terracotta",
	},
	{ id: "review", label: "Review", icon: <Clock size={16} />, color: "ocean" },
];

export default function PracticeLayout({ loaderData }: Route.ComponentProps) {
	const { stats } = loaderData;
	const location = useLocation();

	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] === "review" ? "review" : "practice";

	return (
		<div className="space-y-6">
			<NavTabs
				className="mx-auto max-w-md"
				tabs={PRACTICE_TABS.map((tab) =>
					tab.id === "review" && stats?.dueCount ? { ...tab, badge: stats.dueCount } : tab,
				)}
				activeTab={activeTab}
				buildUrl={(tabId) => (tabId === "practice" ? "/practice" : `/practice/${tabId}`)}
			/>

			<Outlet context={loaderData} />
		</div>
	);
}
