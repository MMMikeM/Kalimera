import { createFileRoute } from "@tanstack/react-router";

import { FreezeIndicator } from "@/components/FreezeIndicator";
import { LandingPage } from "@/components/LandingPage";
import { getDashboardDataFn } from "@/server/fns/dashboard";

import { AllCaughtUpCTA } from "./components/AllCaughtUpCta";
import { FirstTimeUserCTA } from "./components/FirstTimeUserCta";
import {
	LapsedUserCTA,
	LAPSED_DAYS_THRESHOLD,
	LAPSED_QUEUE_THRESHOLD,
} from "./components/LapsedUserCta";
import { RustyDrillsCta } from "./components/RustyDrillsCta";
import { StatsSummary } from "./components/StatsSummary";
import { WeekStreak } from "./components/WeekStreak";

export const Route = createFileRoute("/")({
	loader: async ({ context }) => {
		if (!context.auth?.userId) return null;
		return getDashboardDataFn();
	},
	staleTime: 30_000,
	component: DashboardRoute,
});

function DashboardRoute() {
	const data = Route.useLoaderData();

	if (!data) {
		return <LandingPage />;
	}

	const {
		stats,
		weekData,
		todayPracticed,
		freezeStatus,
		daysUntilNextFreeze,
		daysSinceLastPractice,
		rustyDrills,
		rustyDrillCount,
	} = data;

	const isLapsedUser =
		daysSinceLastPractice !== null &&
		daysSinceLastPractice >= LAPSED_DAYS_THRESHOLD &&
		rustyDrillCount >= LAPSED_QUEUE_THRESHOLD;

	const wasProtectedByFreeze = freezeStatus.status === "just_used";

	const renderCTA = () => {
		if (stats.totalLearned === 0) {
			return <FirstTimeUserCTA />;
		}
		if (rustyDrillCount === 0) {
			return <AllCaughtUpCTA newAvailable={stats.newAvailable} />;
		}
		if (isLapsedUser) {
			return (
				<LapsedUserCTA
					rustyDrillCount={rustyDrillCount}
					daysSinceLastPractice={daysSinceLastPractice}
					streak={stats.streak}
					wasProtectedByFreeze={wasProtectedByFreeze}
				/>
			);
		}
		return <RustyDrillsCta rustyDrills={rustyDrills} />;
	};

	return (
		<div className="space-y-6 pb-8">
			{/* Primary CTA Section */}
			<section>{renderCTA()}</section>

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
