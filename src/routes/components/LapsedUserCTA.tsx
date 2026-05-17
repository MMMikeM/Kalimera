import { Link } from "@tanstack/react-router";

export const LAPSED_DAYS_THRESHOLD = 7;
export const LAPSED_QUEUE_THRESHOLD = 5;

export type LapsedUserCTAProps = {
	rustyDrillCount: number;
	daysSinceLastPractice: number;
	streak: number;
	wasProtectedByFreeze: boolean;
};

export const LapsedUserCTA = ({
	rustyDrillCount,
	daysSinceLastPractice,
	streak,
	wasProtectedByFreeze,
}: LapsedUserCTAProps) => {
	const getMessage = () => {
		if (wasProtectedByFreeze && streak > 0) {
			return {
				greeting: "Welcome back!",
				message: `Your freeze protected your ${streak}-day streak.`,
				emphasis: "Pick up where you left off.",
			};
		}
		if (streak === 0 && daysSinceLastPractice > 14) {
			return {
				greeting: "Ready for a fresh start?",
				message: "Your vocabulary is still here, waiting for you.",
				emphasis: "Let's ease back in.",
			};
		}
		return {
			greeting: "Welcome back!",
			message: `It's been ${daysSinceLastPractice} days.`,
			emphasis: "Your words are ready when you are.",
		};
	};

	const { greeting, message, emphasis } = getMessage();

	return (
		<div className="bg-linear-to-brrom-ocean-50 rounded-2xl border border-ocean-200 to-ocean-100 p-6">
			<p className="font-serif text-2xl text-ocean-text">{greeting}</p>
			<p className="mt-1 text-stone-600">{message}</p>
			<p className="mt-1 font-medium text-stone-700">{emphasis}</p>

			<Link
				to="/practice/review"
				className="mt-5 block rounded-xl bg-ocean py-3 text-center font-semibold text-white transition-colors hover:bg-ocean-dark"
			>
				See what needs practice
			</Link>

			<p className="mt-3 text-center text-sm text-stone-500">
				{rustyDrillCount} {rustyDrillCount === 1 ? "drill" : "drills"} to review
			</p>
		</div>
	);
};
