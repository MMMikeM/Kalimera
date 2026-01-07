import { useState } from "react";
import { ChevronLeft, ChevronRight, Snowflake } from "lucide-react";
import {
	format,
	parseISO,
	isSameDay,
	startOfDay,
	subDays,
	addMonths,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	getDay,
	isAfter,
	getDate,
} from "date-fns";
import { cn } from "@/lib/utils";

export interface StreakCalendarProps {
	practiceDates: string[];
	freezeDates?: string[];
	currentStreak: number;
	className?: string;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatMonthYear = (date: Date) => format(date, "MMMM yyyy");

const getMonthDays = (year: number, month: number) => {
	const monthDate = new Date(year, month, 1);
	const firstDay = startOfMonth(monthDate);
	const lastDay = endOfMonth(monthDate);
	const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

	const startDayOfWeek = getDay(firstDay);
	const mondayOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

	for (let i = mondayOffset - 1; i >= 0; i--) {
		days.push({ date: subDays(firstDay, i + 1), isCurrentMonth: false });
	}

	const currentMonthDays = eachDayOfInterval({ start: firstDay, end: lastDay });
	for (const date of currentMonthDays) {
		days.push({ date, isCurrentMonth: true });
	}

	const remainingDays = 42 - days.length;
	const nextMonthStart = addMonths(firstDay, 1);
	for (let i = 0; i < remainingDays; i++) {
		days.push({ date: new Date(nextMonthStart.getFullYear(), nextMonthStart.getMonth(), i + 1), isCurrentMonth: false });
	}

	return days;
};

const getStreakDates = (currentStreak: number, practiceDates: string[]) => {
	if (currentStreak === 0 || practiceDates.length === 0) return new Set<string>();

	const sortedDates = [...practiceDates].sort().reverse();
	const streakSet = new Set<string>();
	const today = startOfDay(new Date());

	const firstDate = sortedDates[0];
	if (!firstDate) return streakSet;

	let checkDate = today;
	const mostRecentPractice = startOfDay(parseISO(firstDate));

	if (!isSameDay(mostRecentPractice, today)) {
		const yesterday = subDays(today, 1);
		if (!isSameDay(mostRecentPractice, yesterday)) {
			return streakSet;
		}
		checkDate = yesterday;
	}

	for (let i = 0; i < currentStreak; i++) {
		const dateStr = format(checkDate, "yyyy-MM-dd");
		if (practiceDates.includes(dateStr)) {
			streakSet.add(dateStr);
		}
		checkDate = subDays(checkDate, 1);
	}

	return streakSet;
};

export const StreakCalendar = ({
	practiceDates,
	freezeDates = [],
	currentStreak,
	className,
}: StreakCalendarProps) => {
	const [viewDate, setViewDate] = useState(() => new Date());
	const today = startOfDay(new Date());

	const practiceSet = new Set(practiceDates);
	const freezeSet = new Set(freezeDates);
	const streakDates = getStreakDates(currentStreak, practiceDates);

	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();
	const days = getMonthDays(year, month);

	const navigateMonth = (delta: number) => {
		setViewDate((prev) => addMonths(prev, delta));
	};

	const goToToday = () => setViewDate(new Date());

	const isToday = (date: Date) => isSameDay(date, today);
	const isFuture = (date: Date) => isAfter(date, today);

	const getDayStatus = (date: Date, isCurrentMonth: boolean) => {
		if (!isCurrentMonth || isFuture(date)) return "inactive";
		const dateStr = format(date, "yyyy-MM-dd");
		if (freezeSet.has(dateStr)) return "freeze";
		if (streakDates.has(dateStr)) return "streak";
		if (practiceSet.has(dateStr)) return "practiced";
		return "missed";
	};

	return (
		<div className={cn("select-none", className)}>
			<div className="flex items-center justify-between mb-4">
				<button
					type="button"
					onClick={() => navigateMonth(-1)}
					className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600 transition-colors"
					aria-label="Previous month"
				>
					<ChevronLeft className="size-5" />
				</button>

				<button
					type="button"
					onClick={goToToday}
					className="text-sm font-medium text-navy-text hover:text-terracotta transition-colors"
				>
					{formatMonthYear(viewDate)}
				</button>

				<button
					type="button"
					onClick={() => navigateMonth(1)}
					className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600 transition-colors"
					aria-label="Next month"
				>
					<ChevronRight className="size-5" />
				</button>
			</div>

			<div className="grid grid-cols-7 gap-1 mb-2">
				{DAYS_OF_WEEK.map((day) => (
					<div
						key={day}
						className="text-xs font-medium text-stone-400 text-center py-1"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{days.map(({ date, isCurrentMonth }, _idx) => {
					const status = getDayStatus(date, isCurrentMonth);
					const dateStr = format(date, "yyyy-MM-dd");

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
							{status === "freeze" ? (
								<Snowflake className="size-4 text-ocean-400" />
							) : (
								getDate(date)
							)}
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

			<div className="flex items-center justify-center gap-4 mt-4 text-xs text-stone-500">
				<div className="flex items-center gap-1.5">
					<span className="size-3 rounded bg-olive-400" />
					<span>Current streak</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="size-3 rounded bg-olive-100 border border-olive-200" />
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
