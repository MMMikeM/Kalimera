import { ArrowLeft, Calendar, Clock, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { AccuracyTrend } from "@/components/AccuracyTrend";
import { Card } from "@/components/Card";
import { StreakCalendar } from "@/components/StreakCalendar";
import { getPracticeStats } from "@/db.server/queries/practice";
import {
	getAccuracyTrends,
	getPracticeDatesForCalendar,
	getTimeInvested,
} from "@/db.server/queries/progress";
import { getAuthSession } from "@/lib/auth-cookie";
import type { Route } from "./+types/progress";

export function meta() {
	return [
		{ title: "Progress - Kalimera" },
		{ name: "description", content: "Track your Greek learning progress" },
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const auth = getAuthSession(request);
	const userId = auth?.userId ?? null;

	if (!userId) {
		return {
			userId: null,
			currentStreak: 0,
			practiceDates: [] as string[],
			accuracyData: [] as Array<{ date: string; accuracy: number }>,
			timeInvested: { totalMinutes: 0, sessionCount: 0 },
			masteredCount: 0,
		};
	}

	const [stats, calendarDates, accuracyTrends, timeInvested] = await Promise.all([
		getPracticeStats(userId),
		getPracticeDatesForCalendar(userId, 3),
		getAccuracyTrends(userId, 30),
		getTimeInvested(userId),
	]);

	const accuracyData = accuracyTrends.map((d) => ({
		date: d.date,
		accuracy: d.accuracy / 100,
	}));

	return {
		userId,
		currentStreak: stats.streak,
		practiceDates: calendarDates.map((d) => d.date),
		accuracyData,
		timeInvested,
		masteredCount: Number(stats.itemsMastered),
	};
}

const formatMinutes = (minutes: number): string => {
	if (minutes < 60) return `${minutes} min`;
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export default function ProgressPage({ loaderData }: Route.ComponentProps) {
	const { userId, currentStreak, practiceDates, accuracyData, timeInvested, masteredCount } =
		loaderData;

	if (!userId) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<span className="font-serif text-2xl text-terracotta">καλημέρα</span>
			</div>
		);
	}

	const avgAccuracy =
		accuracyData.length > 0
			? Math.round(
					(accuracyData.reduce((sum, d) => sum + d.accuracy, 0) / accuracyData.length) * 100,
				)
			: 0;

	return (
		<div className="mx-auto max-w-2xl">
			<Link
				to="/"
				className="mb-4 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700"
			>
				<ArrowLeft size={14} />
				<span>Back</span>
			</Link>

			<h1 className="mb-1 font-serif text-2xl text-terracotta">Your Progress</h1>
			<p className="mb-6 text-sm text-stone-600">Track your Greek learning journey</p>

			{/* Summary Stats */}
			<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<Card className="p-4 text-center">
					<div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10">
						<TrendingUp size={20} className="text-terracotta" />
					</div>
					<p className="font-serif text-2xl text-stone-800">{currentStreak}</p>
					<p className="text-xs text-stone-500">Day Streak</p>
				</Card>

				<Card className="p-4 text-center">
					<div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-olive/10">
						<Target size={20} className="text-olive" />
					</div>
					<p className="font-serif text-2xl text-stone-800">{avgAccuracy}%</p>
					<p className="text-xs text-stone-500">Avg Accuracy</p>
				</Card>

				<Card className="p-4 text-center">
					<div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10">
						<Clock size={20} className="text-ocean" />
					</div>
					<p className="font-serif text-2xl text-stone-800">
						{formatMinutes(timeInvested.totalMinutes)}
					</p>
					<p className="text-xs text-stone-500">Time Invested</p>
				</Card>

				<Card className="p-4 text-center">
					<div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-honey/10">
						<Calendar size={20} className="text-honey-text" />
					</div>
					<p className="font-serif text-2xl text-stone-800">{masteredCount}</p>
					<p className="text-xs text-stone-500">Words Mastered</p>
				</Card>
			</div>

			{/* Streak Calendar */}
			<Card className="mb-6 p-6">
				<h2 className="mb-4 text-lg font-medium text-stone-800">Practice Calendar</h2>
				<StreakCalendar practiceDates={practiceDates} currentStreak={currentStreak} />
			</Card>

			{/* Accuracy Trend */}
			{accuracyData.length > 0 && (
				<Card className="mb-6 p-6">
					<h2 className="mb-4 text-lg font-medium text-stone-800">
						Accuracy Trend (7-day Rolling Average)
					</h2>
					<AccuracyTrend data={accuracyData} />
				</Card>
			)}

			{/* Empty State */}
			{accuracyData.length === 0 && (
				<Card className="p-8 text-center">
					<p className="mb-4 text-stone-500">Start practising to see your accuracy trends here.</p>
					<Link
						to="/practice"
						className="inline-flex items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark"
					>
						Start Practice →
					</Link>
				</Card>
			)}
		</div>
	);
}
