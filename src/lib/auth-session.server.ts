import { deleteCookie, getRequest, setCookie } from "@tanstack/react-start/server";

import { getAuthSession } from "./auth-cookie";

const AUTH_COOKIE = "auth";
const AUTH_MAX_AGE = 60 * 60 * 24 * 30;

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
	return getAuthSession(getRequest());
}
