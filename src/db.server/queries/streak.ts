import { differenceInHours } from "date-fns";
import type { User } from "../types";

const getHoursSince = (date: Date): number => differenceInHours(new Date(), date);

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export const STREAK_CONFIG = {
	DAYS_TO_EARN_FREEZE: 7,
	MAX_FREEZES: 3,
	RECOVERY_HOURS: 24,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type FreezeStatus = {
	status: "available" | "recovering" | "none" | "just_used";
	freezeCount: number;
	hoursUntilRecovery?: number;
	protectedDate?: string;
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const getFreezeStatus = (user: User): FreezeStatus => {
	const { freezeCount, lastFreezeUsedAt, freezeUsedForDate } = user;

	if (freezeCount === 0) {
		return { status: "none", freezeCount: 0 };
	}

	if (!lastFreezeUsedAt) {
		return { status: "available", freezeCount };
	}

	const hoursSinceLastUse = getHoursSince(lastFreezeUsedAt);

	if (hoursSinceLastUse < STREAK_CONFIG.RECOVERY_HOURS) {
		return {
			status: freezeUsedForDate ? "just_used" : "recovering",
			freezeCount,
			hoursUntilRecovery: Math.ceil(STREAK_CONFIG.RECOVERY_HOURS - hoursSinceLastUse),
			protectedDate: freezeUsedForDate ?? undefined,
		};
	}

	return { status: "available", freezeCount };
};

export const calculateDaysUntilNextFreeze = (
	currentStreak: number,
	user: User,
): number | null => {
	if (user.freezeCount >= STREAK_CONFIG.MAX_FREEZES) {
		return null;
	}

	const daysIntoCurrentCycle = currentStreak % STREAK_CONFIG.DAYS_TO_EARN_FREEZE;
	return STREAK_CONFIG.DAYS_TO_EARN_FREEZE - daysIntoCurrentCycle;
};
