import { redirect } from "@tanstack/react-router";
import { deleteCookie, setCookie } from "@tanstack/react-start/server";

import { getAuthSession, type AuthSession } from "./auth-cookie";

const AUTH_COOKIE = "auth";
const AUTH_MAX_AGE = 60 * 60 * 24 * 30;

export function requireAuth(): AuthSession {
	const auth = getAuthSession();
	if (!auth) throw redirect({ to: "/" });
	return auth;
}

export function setSessionCookie(userId: number, username: string) {
	setCookie(AUTH_COOKIE, JSON.stringify({ userId, username }), {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: AUTH_MAX_AGE,
		secure: process.env.NODE_ENV === "production",
	});
}

export function clearSessionCookie() {
	deleteCookie(AUTH_COOKIE);
}

export function getServerSession() {
	return getAuthSession();
}
