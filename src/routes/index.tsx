import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "@/components/LandingPage";
import { FreezeIndicator } from "@/components/FreezeIndicator";
import { getDashboardDataFn } from "@/server/fns";

import { AllCaughtUpCTA } from "./components/AllCaughtUpCTA";
import { DailyPhrase } from "./components/DailyPhrase";
import { FirstTimeUserCTA } from "./components/FirstTimeUserCTA";
import {
	LapsedUserCTA,
	LAPSED_DAYS_THRESHOLD,
	LAPSED_QUEUE_THRESHOLD,
} from "./components/LapsedUserCTA";
import { PracticeCTA } from "./components/PracticeCTA";
import { StatsSummary } from "./components/StatsSummary";
import { WeekStreak } from "./components/WeekStreak";

export const Route = createFileRoute("/")({
	loader: async ({ context }) => {
		if (!context.auth?.userId) return null;
		return getDashboardDataFn();
	},
	staleTime: 30_000,
	// TODO: action needs to be converted to a server function for TSR
	component: DashboardRoute,
});

function DashboardRoute() {
	const data = Route.useLoaderData();

	const handleTaperResponse = (_mode: "reduce" | "always") => {
		// Will be implemented as a server function
	};

	if (!data) {
		return <LandingPage />;
	}

	const {
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze,
		itemsDueTomorrow,
		daysSinceLastPractice,
		taperOfferPending,
	} = data;

	const isLapsedUser =
		daysSinceLastPractice !== null &&
		daysSinceLastPractice >= LAPSED_DAYS_THRESHOLD &&
		stats.dueCount >= LAPSED_QUEUE_THRESHOLD;

	const wasProtectedByFreeze = freezeStatus.status === "just_used";

	const renderCTA = () => {
		if (stats.totalLearned === 0) {
			return <FirstTimeUserCTA />;
		}
		if (stats.dueCount === 0) {
			return (
				<AllCaughtUpCTA newAvailable={stats.newAvailable} itemsDueTomorrow={itemsDueTomorrow} />
			);
		}
		if (isLapsedUser) {
			return (
				<LapsedUserCTA
					dueCount={stats.dueCount}
					daysSinceLastPractice={daysSinceLastPractice}
					streak={stats.streak}
					wasProtectedByFreeze={wasProtectedByFreeze}
				/>
			);
		}
		return <PracticeCTA dueCount={stats.dueCount} itemsDueTomorrow={itemsDueTomorrow} />;
	};

	return (
		<div className="space-y-6 pb-8">
			{/* Primary CTA Section */}
			<section>{renderCTA()}</section>

			{/* Taper offer — shown when user consistently practises before notification fires */}
			{taperOfferPending && (
				<section>
					<div className="rounded-md border border-stone-200 bg-amber-50 px-4 py-3 text-sm text-stone-600">
						<p>You've been practising before your reminder arrives. Want fewer nudges?</p>
						<div className="mt-2 flex gap-3">
							<button
								type="button"
								onClick={() => handleTaperResponse("reduce")}
								className="text-ocean-700 underline underline-offset-2"
							>
								Yes, reduce reminders
							</button>
							<span className="text-stone-400">·</span>
							<button
								type="button"
								onClick={() => handleTaperResponse("always")}
								className="text-stone-500 underline underline-offset-2"
							>
								I rely on these, keep them coming
							</button>
						</div>
					</div>
				</section>
			)}

			{/* Daily Phrase */}
			<section>
				<DailyPhrase />
			</section>

			{/* Week View + Freeze Status */}
			<section className="space-y-3">
				<WeekStreak weekData={weekData} todayPracticed={todayPracticed} />
				<FreezeIndicator
					freezeCount={freezeStatus.freezeCount}
					status={freezeStatus.status}
					hoursUntilRecovery={freezeStatus.hoursUntilRecovery}
					daysUntilNextEarn={daysUntilNextFreeze ?? undefined}
					protectedDate={freezeStatus.protectedDate}
				/>
				{stats.streak === 1 && freezeStatus.freezeCount === 0 && (
					<p className="text-center text-xs text-stone-500">
						Day 1! Practice for 7 days to earn a streak freeze.
					</p>
				)}
			</section>

			{/* Stats Summary */}
			{stats.totalLearned > 0 && (
				<section>
					<StatsSummary itemsMastered={stats.itemsMastered} totalLearned={stats.totalLearned} />
				</section>
			)}
		</div>
	);
}
