const AUTH_STORAGE_KEY = "greek-authenticated-user";

export interface AuthUser {
	userId: number;
	username: string;
}

/**
 * Store auth in localStorage for backward compatibility.
 * Primary auth is now via HTTP-only cookie, but we keep localStorage
 * in sync during the migration period.
 */
export function setStoredAuth(user: AuthUser): void {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}
