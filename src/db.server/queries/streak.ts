import { eq, sql } from "drizzle-orm";
import { differenceInHours } from "date-fns";
import { db } from "../index";
import { users } from "../schema";
import type { User } from "../types";

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

const canUseFreeze = (user: User, targetDate: string): boolean => {
	const { freezeCount, lastFreezeUsedAt, freezeUsedForDate } = user;

	if (freezeCount <= 0) {
		return false;
	}

	if (freezeUsedForDate === targetDate) {
		return false;
	}

	if (lastFreezeUsedAt) {
		const hoursSinceLastUse = getHoursSince(lastFreezeUsedAt);
		if (hoursSinceLastUse < STREAK_CONFIG.RECOVERY_HOURS) {
			return false;
		}
	}

	return true;
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

// ═══════════════════════════════════════════════════════════════════════════════
// MUTATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const activateFreeze = async (
	userId: number,
	protectedDate: string,
): Promise<void> => {
	await db
		.update(users)
		.set({
			freezeCount: sql`freeze_count - 1`,
			lastFreezeUsedAt: new Date(),
			freezeUsedForDate: protectedDate,
		} as never)
		.where(eq(users.id, userId));
};

const checkAndAwardFreeze = async (
	userId: number,
	currentStreak: number,
): Promise<{ awarded: boolean; newFreezeCount?: number }> => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.id, userId));

	if (!user) {
		return { awarded: false };
	}

	if (user.freezeCount >= STREAK_CONFIG.MAX_FREEZES) {
		return { awarded: false };
	}

	const freezeEarnThreshold =
		Math.floor(currentStreak / STREAK_CONFIG.DAYS_TO_EARN_FREEZE) * STREAK_CONFIG.DAYS_TO_EARN_FREEZE;

	if (freezeEarnThreshold === 0) {
		return { awarded: false };
	}

	if (user.consecutiveDaysAtEarn >= freezeEarnThreshold) {
		return { awarded: false };
	}

	const newFreezeCount = Math.min(
		user.freezeCount + 1,
		STREAK_CONFIG.MAX_FREEZES,
	);

	await db
		.update(users)
		.set({
			freezeCount: newFreezeCount,
			consecutiveDaysAtEarn: freezeEarnThreshold,
		})
		.where(eq(users.id, userId));

	return { awarded: true, newFreezeCount };
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const getHoursSince = (date: Date): number => differenceInHours(new Date(), date);
