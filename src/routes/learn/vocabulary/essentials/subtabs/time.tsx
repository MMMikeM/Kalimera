import { Link } from "react-router";
import { Sun, Calendar, CalendarDays, ChevronLeft } from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

const DAY_ORDER = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];

const MONTH_ORDER = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
];

export function TimeSubtab({ data }: Props) {
	const sortedTimes = [...data.timesOfDay].sort((a, b) => {
		const aOrder = TIME_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.english.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const sortedDays = [...data.daysOfWeek].sort((a, b) => {
		const aOrder = DAY_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = DAY_ORDER.indexOf(b.english.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const sortedMonths = [...data.months].sort((a, b) => {
		const aOrder = MONTH_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = MONTH_ORDER.indexOf(b.english.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	return (
		<div className="space-y-6">
			<Link
				to="/learn/vocabulary/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			{/* Times of Day */}
			<Card
				variant="bordered"
				padding="lg"
				className="bg-honey-50 border-honey-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-honey-200">
						<Sun size={20} className="text-honey-text" />
					</div>
					<h3 className="text-lg font-bold text-honey-text">Times of Day</h3>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{sortedTimes.map((time) => (
						<div
							key={time.id}
							className="text-center p-3 bg-white rounded-lg border border-honey-200 shadow-sm"
						>
							<MonoText variant="greek" size="lg" className="block mb-1">
								{time.greek}
							</MonoText>
							<div className="text-stone-600 text-sm">{time.english}</div>
							{time.timeRange && (
								<div className="text-xs text-stone-500 mt-1">
									{time.timeRange}
								</div>
							)}
						</div>
					))}
				</div>

				<div className="mt-6 p-3 bg-honey-100 rounded-lg border border-honey-200">
					<p className="text-sm text-honey-text font-medium mb-1">
						Usage example
					</p>
					<p className="text-sm">
						<MonoText variant="greek">στις δύο το μεσημέρι</MonoText>
						<span className="text-stone-600 ml-2">
							(at two in the afternoon)
						</span>
					</p>
				</div>
			</Card>

			{/* Days of the Week */}
			{sortedDays.length > 0 && (
				<Card
					variant="bordered"
					padding="lg"
					className="bg-ocean-50 border-ocean-300"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 rounded-lg bg-ocean-200">
							<Calendar size={20} className="text-ocean-text" />
						</div>
						<div>
							<h3 className="text-lg font-bold text-ocean-text">
								Days of the Week
							</h3>
							<p className="text-sm text-stone-600">Οι μέρες της εβδομάδας</p>
						</div>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
						{sortedDays.map((day) => (
							<div
								key={day.id}
								className="text-center p-3 bg-white rounded-lg border border-ocean-200 shadow-sm"
							>
								<MonoText variant="greek" size="lg" className="block mb-1">
									{day.greek}
								</MonoText>
								<div className="text-stone-600 text-sm">{day.english}</div>
							</div>
						))}
					</div>

					<div className="mt-6 p-3 bg-ocean-100 rounded-lg border border-ocean-200">
						<p className="text-sm text-ocean-text font-medium mb-1">
							Usage example
						</p>
						<p className="text-sm">
							<MonoText variant="greek">την Τρίτη</MonoText>
							<span className="text-stone-600 ml-2">(on Tuesday)</span>
						</p>
					</div>
				</Card>
			)}

			{/* Months of the Year */}
			{sortedMonths.length > 0 && (
				<Card
					variant="bordered"
					padding="lg"
					className="bg-olive-50 border-olive-300"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 rounded-lg bg-olive-200">
							<CalendarDays size={20} className="text-olive-text" />
						</div>
						<div>
							<h3 className="text-lg font-bold text-olive-text">
								Months of the Year
							</h3>
							<p className="text-sm text-stone-600">Οι μήνες του χρόνου</p>
						</div>
					</div>

					<div className="grid grid-cols-3 md:grid-cols-4 gap-3">
						{sortedMonths.map((month) => (
							<div
								key={month.id}
								className="text-center p-3 bg-white rounded-lg border border-olive-200 shadow-sm"
							>
								<MonoText variant="greek" size="lg" className="block mb-1">
									{month.greek}
								</MonoText>
								<div className="text-stone-600 text-sm">{month.english}</div>
							</div>
						))}
					</div>

					<div className="mt-6 p-3 bg-olive-100 rounded-lg border border-olive-200">
						<p className="text-sm text-olive-text font-medium mb-1">
							Usage example
						</p>
						<p className="text-sm">
							<MonoText variant="greek">τον Ιούλιο</MonoText>
							<span className="text-stone-600 ml-2">(in July)</span>
						</p>
					</div>
				</Card>
			)}
		</div>
	);
}
