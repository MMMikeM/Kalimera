import { eq } from "drizzle-orm";

import { db } from "../index";
import { authChallenges, type ChallengeType } from "../schema";

const CHALLENGE_TTL_MS = 5 * 60 * 1000;

export const createChallenge = async (challenge: string, type: ChallengeType, userId?: number) => {
	const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);
	const [record] = await db
		.insert(authChallenges)
		.values({
			challenge,
			type,
			userId: userId ?? null,
			expiresAt,
		})
		.returning();
	return record;
};

export const findChallenge = async (challenge: string, type: ChallengeType) => {
	const now = new Date();
	return await db.query.authChallenges.findFirst({
		where: { challenge, type, expiresAt: { gte: now } },
	});
};

export const deleteChallenge = async (challenge: string) => {
	await db.delete(authChallenges).where(eq(authChallenges.challenge, challenge));
};
