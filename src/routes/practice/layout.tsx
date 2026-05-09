import { Outlet, redirect } from "react-router";

import { userIdContext } from "@/lib/auth-context";
import { getAuthSession } from "@/lib/auth-cookie";

import type { Route } from "./+types/layout";
import {
	type ActionIntent,
	actionHandlers,
	getDrillStats,
	getItemsDueForReview,
	getNewVocabularyItems,
	getPracticeStats,
	getUserById,
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

export const middleware: Route.MiddlewareFunction[] = [
	async ({ request, context }, next) => {
		const auth = getAuthSession(request);
		if (!auth?.userId) throw redirect("/");
		context.set(userIdContext, auth.userId);
		return next();
	},
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const userId = context.get(userIdContext);

	const url = new URL(request.url);
	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 100) : 20;

	const [user, reviews, newItems, practiceStats, drills] = await Promise.all([
		getUserById(userId),
		getItemsDueForReview(userId, "recognition", limit),
		getNewVocabularyItems(userId, 20),
		getPracticeStats(userId),
		getDrillStats(userId),
	]);

	return {
		reviewItems: reviews.map((r) => ({
			id: r.vocabularyId,
			greekText: r.vocabulary?.greekText ?? "",
			englishTranslation: r.vocabulary?.englishTranslation ?? "",
		})),
		newVocabItems: newItems,
		stats: practiceStats,
		userId,
		userName: user?.displayName ?? null,
		drillStats: drills,
	};
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

export default function PracticeLayout({ loaderData }: Route.ComponentProps) {
	return <Outlet context={loaderData} />;
}
