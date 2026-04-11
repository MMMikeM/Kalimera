import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import type { EssentialsLoaderData } from "../data.server";

interface Props {
	data: EssentialsLoaderData;
}

const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

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
		const aOrder = TIME_ORDER.indexOf(a.englishTranslation.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.englishTranslation.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const sortedDays = [...data.daysOfWeek].sort((a, b) => {
		const aOrder = DAY_ORDER.indexOf(a.englishTranslation.toLowerCase());
		const bOrder = DAY_ORDER.indexOf(b.englishTranslation.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const sortedMonths = [...data.months].sort((a, b) => {
		const aOrder = MONTH_ORDER.indexOf(a.englishTranslation.toLowerCase());
		const bOrder = MONTH_ORDER.indexOf(b.englishTranslation.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	return (
		<div className="space-y-6">
			<Link
				to="/learn/essentials"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"
			>
				<ChevronLeft size={16} />
				Essentials
			</Link>

			{/* Times of Day */}
			<ContentSection title="Times of Day" subtitle="Οι ώρες της ημέρας" colorScheme="honey">
				<div className="divide-y divide-stone-200/60">
					{sortedTimes.map((time) => (
						<div
							key={time.id}
							className="grid grid-cols-[3fr_2fr] items-center gap-x-3 px-3 py-2.5"
						>
							<MonoText variant="greek">{time.greekText}</MonoText>
							<div>
								<span className="text-sm text-stone-500">{time.englishTranslation}</span>
								{time.timeRange && (
									<span className="ml-1.5 text-xs text-stone-400">({time.timeRange})</span>
								)}
							</div>
						</div>
					))}
				</div>
				<div className="mx-3 mt-3 rounded-lg border border-honey-200 bg-honey-100 p-2.5">
					<p className="mb-2 text-sm font-medium text-honey-text">Pattern: το + time of day</p>
					<div className="space-y-2 text-sm">
						<div>
							<MonoText variant="greek">
								στις δύο <span className="font-semibold">το μεσημέρι</span>
							</MonoText>
							<div className="text-xs text-stone-500">at two in the afternoon</div>
						</div>
						<div>
							<MonoText variant="greek">
								στις οκτώ <span className="font-semibold">το βράδυ</span>
							</MonoText>
							<div className="text-xs text-stone-500">at eight in the evening</div>
						</div>
						<p className="border-t border-honey-200/50 pt-1.5 text-xs text-stone-500">
							<MonoText variant="greek" className="text-stone-700">
								το
							</MonoText>{" "}
							(neuter) — time periods are neuter nouns
						</p>
					</div>
				</div>
			</ContentSection>

			{/* Days of the Week */}
			{sortedDays.length > 0 && (
				<ContentSection
					title="Days of the Week"
					subtitle="Οι μέρες της εβδομάδας"
					colorScheme="ocean"
				>
					<div className="divide-y divide-stone-200/60">
						{sortedDays.map((day) => (
							<div
								key={day.id}
								className="grid grid-cols-[3fr_2fr] items-center gap-x-3 px-3 py-2.5"
							>
								<MonoText variant="greek">{day.greekText}</MonoText>
								<span className="text-sm text-stone-500">{day.englishTranslation}</span>
							</div>
						))}
					</div>
					<div className="mx-3 mt-3 rounded-lg border border-ocean-200 bg-ocean-100 p-2.5">
						<p className="mb-2 text-sm font-medium text-ocean-text">Days use feminine accusative</p>
						<div className="space-y-2 text-sm">
							<div>
								<MonoText variant="greek">
									<span className="font-semibold">την</span> Τρίτη
								</MonoText>
								<div className="text-xs text-stone-500">on Tuesday (specific)</div>
							</div>
							<div>
								<MonoText variant="greek">κάθε Τρίτη</MonoText>
								<div className="text-xs text-stone-500">every Tuesday (no article)</div>
							</div>
							<div>
								<MonoText variant="greek">
									<span className="font-semibold">την</span> περασμένη Τρίτη
								</MonoText>
								<div className="text-xs text-stone-500">last Tuesday</div>
							</div>
							<p className="border-t border-ocean-200/50 pt-1.5 text-xs text-stone-500">
								<MonoText variant="greek" className="text-stone-700">
									την
								</MonoText>{" "}
								= accusative of{" "}
								<MonoText variant="greek" className="text-stone-700">
									η
								</MonoText>{" "}
								(fem.)
							</p>
						</div>
					</div>
				</ContentSection>
			)}

			{/* Months of the Year */}
			{sortedMonths.length > 0 && (
				<ContentSection
					title="Months of the Year"
					subtitle="Οι μήνες του χρόνου"
					colorScheme="olive"
				>
					<div className="divide-y divide-stone-200/60">
						{sortedMonths.map((month) => (
							<div
								key={month.id}
								className="grid grid-cols-[3fr_2fr] items-center gap-x-3 px-3 py-2.5"
							>
								<MonoText variant="greek">{month.greekText}</MonoText>
								<span className="text-sm text-stone-500">{month.englishTranslation}</span>
							</div>
						))}
					</div>
					<div className="mx-3 mt-3 rounded-lg border border-olive-200 bg-olive-100 p-2.5">
						<p className="mb-2 text-sm font-medium text-olive-text">
							Months use masculine accusative
						</p>
						<div className="space-y-2 text-sm">
							<div>
								<MonoText variant="greek">
									<span className="font-semibold">τον</span> Ιούλιο
								</MonoText>
								<div className="text-xs text-stone-500">in July</div>
							</div>
							<div>
								<MonoText variant="greek">
									<span className="font-semibold">τον</span> περασμένο Μάρτιο
								</MonoText>
								<div className="text-xs text-stone-500">last March</div>
							</div>
							<div>
								<MonoText variant="greek">
									<span className="font-semibold">τον</span> επόμενο μήνα
								</MonoText>
								<div className="text-xs text-stone-500">next month</div>
							</div>
							<p className="border-t border-olive-200/50 pt-1.5 text-xs text-stone-500">
								<MonoText variant="greek" className="text-stone-700">
									τον
								</MonoText>{" "}
								= accusative of{" "}
								<MonoText variant="greek" className="text-stone-700">
									ο
								</MonoText>{" "}
								(masc.)
							</p>
						</div>
					</div>
				</ContentSection>
			)}
		</div>
	);
}
