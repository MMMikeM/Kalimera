const AUTH_STORAGE_KEY = "greek-authenticated-user";

export interface AuthUser {
	userId: number;
	username: string;
}

export function getStoredAuth(): AuthUser | null {
	if (typeof window === "undefined") return null;

	try {
		const stored = localStorage.getItem(AUTH_STORAGE_KEY);
		if (!stored) return null;
		return JSON.parse(stored) as AuthUser;
	} catch {
		return null;
	}
}

export function setStoredAuth(user: AuthUser): void {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredAuth(): void {
	localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Store auth and redirect to home.
 * Uses full page reload to ensure Root remounts and reads fresh auth state.
 */
export function loginAndRedirect(user: AuthUser): void {
	setStoredAuth(user);
	window.location.href = "/";
}
