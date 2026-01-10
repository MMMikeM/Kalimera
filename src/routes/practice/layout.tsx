import { useState, useEffect } from "react";
import { Clock, Zap } from "lucide-react";
import {
	Outlet,
	useSearchParams,
	useRevalidator,
	useLocation,
} from "react-router";
import type { Route } from "./+types/layout";
import {
	getItemsDueForReview,
	getNewVocabularyItems,
	getPracticeStats,
	getUserById,
	actionHandlers,
	type ActionIntent,
	type VocabItemWithSkill,
	type PracticeStats,
} from "./data.server";
import { NavTabs } from "@/components/NavTabs";
import type { NavTab } from "@/components/NavTabs";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

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
	const url = new URL(request.url);
	const userIdParam = url.searchParams.get("userId");
	const userId = userIdParam ? parseInt(userIdParam, 10) : null;
	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 100) : 20;

	let reviewItems: VocabItemWithSkill[] = [];
	let newVocabItems: VocabItemWithSkill[] = [];
	let stats: PracticeStats | null = null;
	let userName: string | null = null;

	if (userId) {
		const [user, reviews, newItems, practiceStats] = await Promise.all([
			getUserById(userId),
			getItemsDueForReview(userId, "recognition", limit),
			getNewVocabularyItems(userId, 20),
			getPracticeStats(userId),
		]);
		userName = user?.displayName ?? null;
		reviewItems = reviews;
		newVocabItems = newItems;
		stats = practiceStats;
	}

	return { reviewItems, newVocabItems, stats, userId, userName };
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
	<div className="text-center py-12 bg-muted rounded-xl border border-border">
		<div className="text-5xl mb-4">?</div>
		<h3 className="text-xl font-semibold text-foreground mb-2">
			Select a user
		</h3>
		<p className="text-muted-foreground">
			Choose a user from the dropdown above to start practicing.
		</p>
	</div>
);

const PRACTICE_TABS: NavTab[] = [
	{ id: "speed", label: "Speed Drill", icon: <Zap size={16} />, color: "terracotta" },
	{ id: "review", label: "Review", icon: <Clock size={16} />, color: "ocean" },
];

export default function PracticeLayout({ loaderData }: Route.ComponentProps) {
	const { stats } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const revalidator = useRevalidator();
	const location = useLocation();
	const [isInitialized, setIsInitialized] = useState(false);

	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "speed";

	// On mount, sync authenticated user to URL params
	useEffect(() => {
		const stored = localStorage.getItem(AUTH_STORAGE_KEY);
		const urlUserId = searchParams.get("userId");

		if (stored) {
			try {
				const parsed = JSON.parse(stored) as { userId?: number };
				const userId = parsed.userId?.toString();
				if (userId && userId !== urlUserId) {
					setSearchParams({ userId });
					revalidator.revalidate();
				}
			} catch {
				// Invalid JSON, ignore
			}
		}
		setIsInitialized(true);
	}, [revalidator.revalidate, searchParams.get, setSearchParams]); // eslint-disable-line react-hooks/exhaustive-deps

	const buildTabUrl = (tabId: string) => {
		const userId = searchParams.get("userId");
		const base = `/practice/${tabId}`;
		return userId ? `${base}?userId=${userId}` : base;
	};

	// Show loading state while syncing user
	if (!isInitialized) {
		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between gap-4">
					<NavTabs
						tabs={PRACTICE_TABS}
						activeTab={activeTab}
						buildUrl={buildTabUrl}
					/>
				</div>
				<div className="text-center py-8 text-stone-500">Loading...</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<NavTabs
				tabs={PRACTICE_TABS.map((tab) =>
					tab.id === "review" && stats?.dueCount
						? { ...tab, badge: stats.dueCount }
						: tab
				)}
				activeTab={activeTab}
				buildUrl={buildTabUrl}
			/>

			{/* Drill content */}
			<Outlet context={loaderData} />
		</div>
	);
}
