import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-orm/zod";
import { z } from "zod/v4";

import { authenticatorTransports } from "../enums";
import { db } from "../index";
import { authChallenges, type ChallengeType, passkeys } from "../schema";

// ═══════════════════════════════════════════════════════════════════════════════
// PASSKEY QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const findPasskeysByUserId = async (userId: number) => {
	return await db.query.passkeys.findMany({ where: { userId } });
};

export const findPasskeyByCredentialId = async (credentialId: string) => {
	return await db.query.passkeys.findFirst({ where: { credentialId } });
};

const passkeyInsertSchema = createInsertSchema(passkeys, {
	transports: z.array(z.enum(authenticatorTransports)).nullable().optional(),
});

export type PasskeyInsert = z.infer<typeof passkeyInsertSchema>;
export const createPasskey = async (data: PasskeyInsert) => {
	const [passkey] = await db.insert(passkeys).values(data).returning();
	return passkey;
};

export const updatePasskeyCounter = async (credentialId: string, counter: number) => {
	await db
		.update(passkeys)
		.set({ counter, lastUsedAt: new Date() })
		.where(eq(passkeys.credentialId, credentialId));
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHALLENGE QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

const CHALLENGE_TTL_MS = 5 * 60 * 1000; // 5 minutes

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

// ═══════════════════════════════════════════════════════════════════════════════
// USER AUTH HELPERS (passkeys)
// ═══════════════════════════════════════════════════════════════════════════════

export const userHasPasskey = async (userId: number) => {
	const count = await db.$count(passkeys, eq(passkeys.userId, userId));
	return count > 0;
};
