import { Temporal } from "@js-temporal/polyfill";
import { ChevronLeft, ChevronRight, Snowflake } from "lucide-react";
import { useState } from "react";

import {
	eachDayOfMonth,
	formatMonthYear,
	mondayBasedDayOfWeek,
	today,
} from "@/lib/time";
import { cn } from "@/lib/utils";

interface StreakCalendarProps {
	practiceDates: string[];
	freezeDates?: string[];
	currentStreak: number;
	className?: string;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getMonthDays = (viewDate: Temporal.PlainDate) => {
	const firstDay = viewDate.with({ day: 1 });
	const lastDay = viewDate.with({ day: viewDate.daysInMonth });
	const days: Array<{ date: Temporal.PlainDate; isCurrentMonth: boolean }> = [];

	// Monday-based offset: Mon=0 … Sun=6
	const mondayOffset = mondayBasedDayOfWeek(firstDay);
	for (let i = mondayOffset - 1; i >= 0; i--) {
		days.push({ date: firstDay.subtract({ days: i + 1 }), isCurrentMonth: false });
	}

	for (const date of eachDayOfMonth(viewDate)) {
		days.push({ date, isCurrentMonth: true });
	}

	const remainingDays = 42 - days.length;
	for (let i = 0; i < remainingDays; i++) {
		days.push({ date: lastDay.add({ days: i + 1 }), isCurrentMonth: false });
	}

	return days;
};

const getStreakDates = (currentStreak: number, practiceDates: string[]) => {
	if (currentStreak === 0 || practiceDates.length === 0) return new Set<string>();

	const sortedDates = [...practiceDates].sort().reverse();
	const streakSet = new Set<string>();
	const todayDate = today();

	const firstDate = sortedDates[0];
	if (!firstDate) return streakSet;

	let checkDate = todayDate;
	const mostRecentPractice = Temporal.PlainDate.from(firstDate);

	if (Temporal.PlainDate.compare(mostRecentPractice, todayDate) !== 0) {
		const yesterday = todayDate.subtract({ days: 1 });
		if (Temporal.PlainDate.compare(mostRecentPractice, yesterday) !== 0) {
			return streakSet;
		}
		checkDate = yesterday;
	}

	for (let i = 0; i < currentStreak; i++) {
		const dateStr = checkDate.toString();
		if (practiceDates.includes(dateStr)) {
			streakSet.add(dateStr);
		}
		checkDate = checkDate.subtract({ days: 1 });
	}

	return streakSet;
};

export const StreakCalendar = ({
	practiceDates,
	freezeDates = [],
	currentStreak,
	className,
}: StreakCalendarProps) => {
	const [viewDate, setViewDate] = useState<Temporal.PlainDate>(() => today());
	const todayDate = today();

	const practiceSet = new Set(practiceDates);
	const freezeSet = new Set(freezeDates);
	const streakDates = getStreakDates(currentStreak, practiceDates);

	const days = getMonthDays(viewDate);

	const navigateMonth = (delta: number) => {
		setViewDate((prev) => prev.add({ months: delta }));
	};

	const goToToday = () => setViewDate(today());

	const isToday = (date: Temporal.PlainDate) => Temporal.PlainDate.compare(date, todayDate) === 0;
	const isFuture = (date: Temporal.PlainDate) => Temporal.PlainDate.compare(date, todayDate) > 0;

	const getDayStatus = (date: Temporal.PlainDate, isCurrentMonth: boolean) => {
		if (!isCurrentMonth || isFuture(date)) return "inactive";
		const dateStr = date.toString();
		if (freezeSet.has(dateStr)) return "freeze";
		if (streakDates.has(dateStr)) return "streak";
		if (practiceSet.has(dateStr)) return "practiced";
		return "missed";
	};

	return (
		<div className={cn("select-none", className)}>
			<div className="mb-4 flex items-center justify-between">
				<button
					type="button"
					onClick={() => navigateMonth(-1)}
					className="rounded-md p-1.5 text-stone-600 transition-colors hover:bg-stone-100"
					aria-label="Previous month"
				>
					<ChevronLeft className="size-5" />
				</button>

				<button
					type="button"
					onClick={goToToday}
					className="text-sm font-medium text-navy-text transition-colors hover:text-terracotta"
				>
					{formatMonthYear(viewDate)}
				</button>

				<button
					type="button"
					onClick={() => navigateMonth(1)}
					className="rounded-md p-1.5 text-stone-600 transition-colors hover:bg-stone-100"
					aria-label="Next month"
				>
					<ChevronRight className="size-5" />
				</button>
			</div>

			<div className="mb-2 grid grid-cols-7 gap-1">
				{DAYS_OF_WEEK.map((day) => (
					<div key={day} className="py-1 text-center text-xs font-medium text-stone-400">
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{days.map(({ date, isCurrentMonth }) => {
					const status = getDayStatus(date, isCurrentMonth);
					const dateStr = date.toString();

					return (
						<div
							key={dateStr}
							className={cn(
								"relative aspect-square flex items-center justify-center rounded-md text-sm transition-colors",
								!isCurrentMonth && "text-stone-300",
								isCurrentMonth && status === "inactive" && "text-stone-300",
								isCurrentMonth && status === "missed" && "text-stone-400",
								isCurrentMonth && status === "practiced" && "bg-olive-100 text-olive-text",
								isCurrentMonth && status === "streak" && "bg-olive-400 text-white font-medium",
								isCurrentMonth && status === "freeze" && "bg-ocean-100 text-ocean-text",
								isToday(date) && isCurrentMonth && "ring-2 ring-terracotta ring-offset-1",
							)}
						>
							{status === "freeze" ? <Snowflake className="size-4 text-ocean-400" /> : date.day}
							{(status === "practiced" || status === "streak") && (
								<span
									className={cn(
										"absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full",
										status === "streak" ? "bg-white/70" : "bg-olive-400",
									)}
								/>
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-500">
				<div className="flex items-center gap-1.5">
					<span className="size-3 rounded bg-olive-400" />
					<span>Current streak</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="size-3 rounded border border-olive-200 bg-olive-100" />
					<span>Practised</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Snowflake className="size-3 text-ocean-400" />
					<span>Freeze</span>
				</div>
			</div>
		</div>
	);
};
