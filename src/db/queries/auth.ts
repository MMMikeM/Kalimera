import { and, eq, lt } from "drizzle-orm";
import { db } from "../index";
import {
	authChallenges,
	passkeys,
	users,
	type AuthenticatorTransport,
	type ChallengeType,
} from "../schema";

// ═══════════════════════════════════════════════════════════════════════════════
// PASSKEY QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const findPasskeysByUserId = async (userId: number) => {
	return db.select().from(passkeys).where(eq(passkeys.userId, userId));
};

export const findPasskeyByCredentialId = async (credentialId: string) => {
	const [passkey] = await db
		.select()
		.from(passkeys)
		.where(eq(passkeys.credentialId, credentialId));
	return passkey;
};

export type NewPasskey = {
	userId: number;
	credentialId: string;
	publicKey: string;
	counter: number;
	transports: AuthenticatorTransport[] | null;
	deviceType?: string | null;
	backedUp?: boolean | null;
	name?: string | null;
};

export const createPasskey = async (data: NewPasskey) => {
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

export const createChallenge = async (
	challenge: string,
	type: ChallengeType,
	userId?: number,
) => {
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

	// Opportunistically clean up a few expired challenges
	await db
		.delete(authChallenges)
		.where(and(eq(authChallenges.type, type), lt(authChallenges.expiresAt, now)));

	// Find the valid challenge
	const [record] = await db
		.select()
		.from(authChallenges)
		.where(and(eq(authChallenges.challenge, challenge), eq(authChallenges.type, type)));

	// Return null if expired
	if (record && record.expiresAt < now) {
		return null;
	}

	return record;
};

export const deleteChallenge = async (challenge: string) => {
	await db.delete(authChallenges).where(eq(authChallenges.challenge, challenge));
};

// ═══════════════════════════════════════════════════════════════════════════════
// USER AUTH QUERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const findUserByUsername = async (username: string) => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.username, username.toLowerCase()));
	return user;
};

export const createUserWithPassword = async (
	username: string,
	displayName: string,
	passwordHash: string,
) => {
	const normalizedUsername = username.toLowerCase();

	const existing = await findUserByUsername(normalizedUsername);
	if (existing) {
		throw new Error("Username already taken");
	}

	const [newUser] = await db
		.insert(users)
		.values({
			username: normalizedUsername,
			displayName,
			passwordHash,
			code: normalizedUsername, // Use username as code for backwards compat
		})
		.returning();

	return newUser;
};

export const getUserPasswordHash = async (userId: number) => {
	const [user] = await db
		.select({ passwordHash: users.passwordHash })
		.from(users)
		.where(eq(users.id, userId));
	return user?.passwordHash;
};

export const userHasPasskey = async (userId: number) => {
	const [passkey] = await db
		.select({ id: passkeys.id })
		.from(passkeys)
		.where(eq(passkeys.userId, userId))
		.limit(1);
	return !!passkey;
};

export const userHasPassword = async (userId: number) => {
	const [user] = await db
		.select({ passwordHash: users.passwordHash })
		.from(users)
		.where(eq(users.id, userId));
	return !!user?.passwordHash;
};
