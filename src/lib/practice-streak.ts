import { Temporal } from "@js-temporal/polyfill";

import { diffInDays, nowInstant, parsePlainDate, toPlainDate } from "@/lib/time";


/**
 * Consecutive local calendar days with at least one completed practice session,
 * counting only if the most recent practice day is today or yesterday (relative to `now`).
 */
export function streakLengthFromCompletedSessionDates(
	completedAts: Temporal.Instant[],
	now: Temporal.Instant = nowInstant(),
): number {
	if (completedAts.length === 0) return 0;

	const nowDate = toPlainDate(now);
	const uniqueDates = new Set<string>();
	for (const at of completedAts) {
		uniqueDates.add(toPlainDate(at).toString());
	}

	const sortedDates = Array.from(uniqueDates).sort().reverse();
	if (sortedDates.length === 0) return 0;

	const todayStr = nowDate.toString();
	const yesterdayStr = nowDate.subtract({ days: 1 }).toString();
	const firstDate = sortedDates[0];

	if (!firstDate || (firstDate !== todayStr && firstDate !== yesterdayStr)) {
		return 0;
	}

	let streak = 1;
	for (let i = 1; i < sortedDates.length; i++) {
		const prevDateStr = sortedDates[i - 1];
		const currDateStr = sortedDates[i];
		if (!prevDateStr || !currDateStr) break;

		const diff = diffInDays(parsePlainDate(prevDateStr), parsePlainDate(currDateStr));
		if (diff === 1) {
			streak++;
		} else {
			break;
		}
	}

	return streak;
}
