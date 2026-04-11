import { differenceInDays, format, parseISO, subDays } from "date-fns";

/**
 * Consecutive local calendar days with at least one completed practice session,
 * counting only if the most recent practice day is today or yesterday (relative to `now`).
 */
export function streakLengthFromCompletedSessionDates(
	completedAts: Date[],
	now: Date = new Date(),
): number {
	if (completedAts.length === 0) return 0;

	const uniqueDates = new Set<string>();
	for (const at of completedAts) {
		uniqueDates.add(format(at, "yyyy-MM-dd"));
	}

	const sortedDates = Array.from(uniqueDates).sort().reverse();
	if (sortedDates.length === 0) return 0;

	const today = format(now, "yyyy-MM-dd");
	const yesterday = format(subDays(now, 1), "yyyy-MM-dd");
	const firstDate = sortedDates[0];

	if (!firstDate || (firstDate !== today && firstDate !== yesterday)) {
		return 0;
	}

	let streak = 1;
	for (let i = 1; i < sortedDates.length; i++) {
		const prevDateStr = sortedDates[i - 1];
		const currDateStr = sortedDates[i];
		if (!prevDateStr || !currDateStr) break;

		const prevDate = parseISO(prevDateStr);
		const currDate = parseISO(currDateStr);
		const diffDays = differenceInDays(prevDate, currDate);

		if (diffDays === 1) {
			streak++;
		} else {
			break;
		}
	}

	return streak;
}
