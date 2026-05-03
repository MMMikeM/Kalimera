import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-orm/zod";
import { z } from "zod/v4";

import { authenticatorTransports } from "../enums";
import { db } from "../index";
import { passkeys } from "../schema";

export const findPasskeysByUserId = async (userId: number) => {
	return await db.query.passkeys.findMany({ where: { userId } });
};

export const findPasskeyByCredentialId = async (credentialId: string) => {
	return await db.query.passkeys.findFirst({ where: { credentialId } });
};

const passkeyInsertSchema = createInsertSchema(passkeys, {
	transports: z.array(z.enum(authenticatorTransports)).nullable().optional(),
});

type PasskeyInsert = z.infer<typeof passkeyInsertSchema>;

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

export const userHasPasskey = async (userId: number) => {
	const count = await db.$count(passkeys, eq(passkeys.userId, userId));
	return count > 0;
};
