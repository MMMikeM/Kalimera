import { eq } from "drizzle-orm";

import { nowInstant, toEpochSeconds } from "@/lib/time";

import { db } from "../index";
import { authChallenges, type ChallengeType } from "../schema";

const CHALLENGE_TTL_MS = 5 * 60 * 1000;

export const createChallenge = async (challenge: string, type: ChallengeType, userId?: number) => {
	const [record] = await db
		.insert(authChallenges)
		.values({
			challenge,
			type,
			userId: userId ?? null,
			expiresAt: toEpochSeconds(nowInstant().add({ milliseconds: CHALLENGE_TTL_MS })),
		})
		.returning();
	return record;
};

export const findChallenge = async (challenge: string, type: ChallengeType) => {
	return await db.query.authChallenges.findFirst({
		where: { challenge, type, expiresAt: { gte: toEpochSeconds(nowInstant()) } },
	});
};

export const deleteChallenge = async (challenge: string) => {
	await db.delete(authChallenges).where(eq(authChallenges.challenge, challenge));
};
