import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { loginSchema, passwordSetupSchema, registerSchema } from "@/lib/validators/auth";
import { clearSessionCookie, getServerSession, setSessionCookie } from "@/server/auth/session";
import { verifyPassword, hashPassword } from "@/server/auth/password";
import {
	createUserWithPassword,
	findUserByUsername,
	getUserPasswordHash,
	setUserPassword,
} from "@/server/db/queries/users";

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator(loginSchema)
	.handler(async ({ data }) => {
		const { username: identifier, password } = data;

		let user = await findUserByUsername(identifier);
		if (!user) return { success: false as const, error: "User not found" };

		const passwordHash = await getUserPasswordHash(user.id);

		if (!passwordHash) {
			return {
				success: false as const,
				needsPasswordSetup: true as const,
				userId: user.id,
				userCode: user.code,
				displayName: user.displayName,
			};
		}

		if (!password) return { success: false as const, error: "Please enter your password" };

		const isValid = await verifyPassword(passwordHash, password);
		if (!isValid) return { success: false as const, error: "Invalid password" };

		setSessionCookie(user.id, user.username || user.code);
		throw redirect({ to: "/" });
	});

export const setupPasswordFn = createServerFn({ method: "POST" })
	.inputValidator(passwordSetupSchema)
	.handler(async ({ data }) => {
		const { newPassword, userId, username } = data;
		const hash = await hashPassword(newPassword);
		await setUserPassword(Number(userId), hash, username);
		setSessionCookie(Number(userId), username.toLowerCase());
		throw redirect({ to: "/" });
	});

export const registerFn = createServerFn({ method: "POST" })
	.inputValidator(registerSchema)
	.handler(async ({ data }) => {
		const { username, displayName, password } = data;

		const existingUser = await findUserByUsername(username);
		if (existingUser) return { success: false as const, error: "Username already taken" };

		const passwordHash = await hashPassword(password);
		const newUser = await createUserWithPassword({ username, displayName, passwordHash });
		if (!newUser) return { success: false as const, error: "Failed to create account" };

		const finalUsername = newUser.username ?? username;
		setSessionCookie(newUser.id, finalUsername);
		return { success: true as const, userId: newUser.id, username: finalUsername };
	});

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	clearSessionCookie();
	throw redirect({ to: "/" });
});

export const getServerAuthFn = createServerFn().handler(() => getServerSession());
