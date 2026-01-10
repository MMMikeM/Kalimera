const AUTH_STORAGE_KEY = "greek-authenticated-user";

export interface AuthUser {
	userId: number;
	username: string;
}

export function setStoredAuth(user: AuthUser): void {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

/**
 * Store auth and redirect to home.
 * Uses full page reload to ensure Root remounts and reads fresh auth state.
 * Uses setTimeout to let React finish its current render cycle before navigating,
 * preventing race conditions with form library state updates.
 */
export function loginAndRedirect(user: AuthUser): void {
	setStoredAuth(user);
	setTimeout(() => {
		window.location.href = "/";
	}, 0);
}
