import "@tanstack/react-start/server-only";
import { redirect } from "@tanstack/react-router";
import {
	clearSession,
	getCookie,
	getSession,
	updateSession,
	type SessionConfig,
} from "@tanstack/react-start/server";

export interface AuthSession {
	userId: number;
	username: string;
}

const SESSION_NAME = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
const MIN_SECRET_LENGTH = 32;

const getSessionConfig = (): SessionConfig => {
	const password = process.env.SESSION_SECRET;
	if (!password || password.length < MIN_SECRET_LENGTH) {
		throw new Error(
			`SESSION_SECRET must be set to a random string of at least ${MIN_SECRET_LENGTH} characters`,
		);
	}
	return {
		name: SESSION_NAME,
		password,
		maxAge: SESSION_MAX_AGE,
		sessionHeader: false,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			secure: process.env.NODE_ENV === "production",
		},
	};
};

export async function getAuthSession(): Promise<AuthSession | null> {
	const config = getSessionConfig();
	// Opening a session without a cookie would issue an empty one to every anonymous visitor.
	if (!getCookie(SESSION_NAME)) return null;

	const { data } = await getSession<Partial<AuthSession>>(config);
	if (typeof data.userId !== "number" || typeof data.username !== "string") return null;
	return { userId: data.userId, username: data.username };
}

export async function requireAuth(): Promise<AuthSession> {
	const auth = await getAuthSession();
	if (!auth) throw redirect({ to: "/" });
	return auth;
}

export async function setAuthSession(auth: AuthSession) {
	await updateSession<Partial<AuthSession>>(getSessionConfig(), {
		userId: auth.userId,
		username: auth.username,
	});
}

export async function clearAuthSession() {
	await clearSession(getSessionConfig());
}
