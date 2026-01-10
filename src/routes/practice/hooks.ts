const USER_STORAGE_KEY = "greek-practice-user";

const getCurrentUserId = (): number | null => {
	if (typeof window === "undefined") return null;
	const stored = localStorage.getItem(USER_STORAGE_KEY);
	return stored ? parseInt(stored, 10) : null;
};

export const useCurrentUserId = (): number | null => {
	return getCurrentUserId();
};
