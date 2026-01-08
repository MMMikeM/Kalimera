import { Link } from "react-router";
import { ArrowLeft, Clock, Target, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/Card";
import { StreakCalendar } from "@/components/StreakCalendar";
import { AccuracyTrend } from "@/components/AccuracyTrend";
import { getPracticeStats } from "@/db.server/queries/practice";
import {
	getPracticeDatesForCalendar,
	getAccuracyTrends,
	getTimeInvested,
} from "@/db.server/queries/progress";

type LoaderData = {
	currentStreak: number;
	practiceDates: string[];
	accuracyData: Array<{ date: string; accuracy: number }>;
	timeInvested: { totalMinutes: number; sessionCount: number };
	masteredCount: number;
};

export function meta() {
	return [
		{ title: "Progress - Kalimera" },
		{ name: "description", content: "Track your Greek learning progress" },
	];
}

export async function loader(): Promise<LoaderData> {
	const userId = 1;

	const [stats, calendarDates, accuracyTrends, timeInvested] =
		await Promise.all([
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

export default function ProgressPage({
	loaderData,
}: {
	loaderData: LoaderData;
}) {
	const {
		currentStreak,
		practiceDates,
		accuracyData,
		timeInvested,
		masteredCount,
	} = loaderData;

	const avgAccuracy =
		accuracyData.length > 0
			? Math.round(
					(accuracyData.reduce((sum, d) => sum + d.accuracy, 0) /
						accuracyData.length) *
						100,
				)
			: 0;

	return (
		<div className="max-w-2xl mx-auto">
			<Link
				to="/"
				className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-4"
			>
				<ArrowLeft size={14} />
				<span>Back</span>
			</Link>

			<h1 className="text-2xl font-serif text-terracotta mb-1">
				Your Progress
			</h1>
			<p className="text-stone-600 text-sm mb-6">Track your Greek learning journey</p>

			{/* Summary Stats */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
				<Card className="p-4 text-center">
					<div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-2">
						<TrendingUp size={20} className="text-terracotta" />
					</div>
					<p className="text-2xl font-serif text-stone-800">{currentStreak}</p>
					<p className="text-xs text-stone-500">Day Streak</p>
				</Card>

				<Card className="p-4 text-center">
					<div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-2">
						<Target size={20} className="text-olive" />
					</div>
					<p className="text-2xl font-serif text-stone-800">{avgAccuracy}%</p>
					<p className="text-xs text-stone-500">Avg Accuracy</p>
				</Card>

				<Card className="p-4 text-center">
					<div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-2">
						<Clock size={20} className="text-ocean" />
					</div>
					<p className="text-2xl font-serif text-stone-800">
						{formatMinutes(timeInvested.totalMinutes)}
					</p>
					<p className="text-xs text-stone-500">Time Invested</p>
				</Card>

				<Card className="p-4 text-center">
					<div className="w-10 h-10 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-2">
						<Calendar size={20} className="text-honey-text" />
					</div>
					<p className="text-2xl font-serif text-stone-800">{masteredCount}</p>
					<p className="text-xs text-stone-500">Words Mastered</p>
				</Card>
			</div>

			{/* Streak Calendar */}
			<Card className="p-6 mb-6">
				<h2 className="text-lg font-medium text-stone-800 mb-4">
					Practice Calendar
				</h2>
				<StreakCalendar
					practiceDates={practiceDates}
					currentStreak={currentStreak}
				/>
			</Card>

			{/* Accuracy Trend */}
			{accuracyData.length > 0 && (
				<Card className="p-6 mb-6">
					<h2 className="text-lg font-medium text-stone-800 mb-4">
						Accuracy Trend (7-day Rolling Average)
					</h2>
					<AccuracyTrend data={accuracyData} />
				</Card>
			)}

			{/* Empty State */}
			{accuracyData.length === 0 && (
				<Card className="p-8 text-center">
					<p className="text-stone-500 mb-4">
						Start practising to see your accuracy trends here.
					</p>
					<Link
						to="/practice"
						className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-medium"
					>
						Start Practice →
					</Link>
				</Card>
			)}
		</div>
	);
}
