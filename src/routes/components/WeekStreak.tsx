import { Check } from "lucide-react";

import { mondayBasedDayOfWeek, today } from "@/lib/time";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export const WeekStreak = ({
	weekData,
	todayPracticed,
}: {
	weekData: { practiced: boolean }[];
	todayPracticed: boolean;
}) => {
	const mondayOffset = mondayBasedDayOfWeek(today());

	return (
		<div className="rounded-2xl border border-stone-200 bg-white p-5">
			<p className="mb-3 text-sm font-medium text-stone-600">This Week</p>
			<div className="flex justify-between gap-2">
				{DAYS.map((day, i) => {
					const isToday = i === mondayOffset;
					const isPast = i < mondayOffset;
					const didPractice = weekData[i]?.practiced ?? false;

					let className =
						"w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ";

					if (isPast && didPractice) {
						className += "bg-olive-400 text-white";
					} else if (isPast && !didPractice) {
						className += "bg-stone-200 text-stone-400";
					} else if (isToday && todayPracticed) {
						className += "bg-terracotta text-white";
					} else if (isToday && !todayPracticed) {
						className += "border-2 border-terracotta text-terracotta animate-pulse";
					} else {
						className += "border border-stone-200 text-stone-300";
					}

					const dayKey = `day-${i}`;
					return (
						<div key={dayKey} className="flex flex-col items-center gap-1.5">
							<span className="text-xs text-stone-400">{day}</span>
							<div className={className}>
								{(isPast || (isToday && todayPracticed)) && didPractice ? (
									<Check className="h-4 w-4" />
								) : isToday && !todayPracticed ? (
									<span className="h-2 w-2 rounded-full bg-current" />
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
