import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-orm/zod";
import type z from "zod/v4";
import { db } from "../index";
import { users } from "../schema";

const userInsertSchema = createInsertSchema(users);
export type UserInsert = z.infer<typeof userInsertSchema>;

export const findUserByCode = async (code: string) => {
	return await db.query.users.findFirst({ where: { code: code.toLowerCase() } });
};

export const findUserByUsername = async (username: string) => {
	return await db.query.users.findFirst({
		where: { username: username.toLowerCase() },
	});
};

export const getUserById = async (userId: number) => {
	return await db.query.users.findFirst({ where: { id: userId } });
};

export const getAllUsers = async () => {
	return await db.query.users.findMany({ orderBy: { displayName: "asc" } });
};

export const createUser = async (data: Pick<UserInsert, "displayName" | "code">) => {
	const normalizedCode = data.code.toLowerCase();

	const existing = await findUserByCode(normalizedCode);
	if (existing) {
		throw new Error("A user with this code already exists");
	}

	const [newUser] = await db
		.insert(users)
		.values({ displayName: data.displayName, code: normalizedCode })
		.returning();

	return newUser;
};

export type CreateUserWithPasswordInput = Pick<UserInsert, "displayName" | "passwordHash"> & {
	username: string;
};

export const createUserWithPassword = async (data: CreateUserWithPasswordInput) => {
	const normalizedUsername = data.username.toLowerCase();

	const existing = await findUserByUsername(normalizedUsername);
	if (existing) {
		throw new Error("Username already taken");
	}

	const [newUser] = await db
		.insert(users)
		.values({
			username: normalizedUsername,
			displayName: data.displayName,
			passwordHash: data.passwordHash,
			code: normalizedUsername,
		})
		.returning();

	return newUser;
};

export const getUserPasswordHash = async (userId: number) => {
	const user = await db.query.users.findFirst({
		where: { id: userId },
		columns: { passwordHash: true },
	});
	return user?.passwordHash;
};

export const setUserPassword = async (userId: number, passwordHash: string, username?: string) => {
	const updateData: { passwordHash: string; username?: string } = {
		passwordHash,
	};
	if (username) {
		updateData.username = username.toLowerCase();
	}
	await db.update(users).set(updateData).where(eq(users.id, userId));
};
