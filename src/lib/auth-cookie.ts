const AUTH_COOKIE_NAME = "auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface AuthSession {
	userId: number;
	username: string;
}

/**
 * Parse auth session from request cookies.
 * Returns null if no valid auth cookie exists.
 */
export function getAuthSession(request: Request): AuthSession | null {
	const cookieHeader = request.headers.get("Cookie");
	if (!cookieHeader) return null;

	const cookies = parseCookies(cookieHeader);
	const authValue = cookies[AUTH_COOKIE_NAME];
	if (!authValue) return null;

	try {
		const decoded = decodeURIComponent(authValue);
		const parsed = JSON.parse(decoded) as unknown;

		if (
			typeof parsed === "object" &&
			parsed !== null &&
			"userId" in parsed &&
			"username" in parsed &&
			typeof (parsed as AuthSession).userId === "number" &&
			typeof (parsed as AuthSession).username === "string"
		) {
			return parsed as AuthSession;
		}
	} catch {
		// Invalid cookie value
	}

	return null;
}

/**
 * Create Set-Cookie header value for auth session.
 */
export function createAuthCookie(session: AuthSession): string {
	const value = encodeURIComponent(JSON.stringify(session));
	const parts = [
		`${AUTH_COOKIE_NAME}=${value}`,
		`Path=/`,
		`Max-Age=${COOKIE_MAX_AGE}`,
		`HttpOnly`,
		`SameSite=Lax`,
	];

	// Only set Secure in production (HTTPS)
	if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
		parts.push("Secure");
	}

	return parts.join("; ");
}

/**
 * Create Set-Cookie header value to clear auth session.
 */
export function clearAuthCookie(): string {
	return `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

/**
 * Parse cookies from Cookie header string.
 */
function parseCookies(cookieHeader: string): Record<string, string> {
	const cookies: Record<string, string> = {};

	for (const pair of cookieHeader.split(";")) {
		const [key, ...valueParts] = pair.trim().split("=");
		if (key) {
			cookies[key] = valueParts.join("=");
		}
	}

	return cookies;
}
