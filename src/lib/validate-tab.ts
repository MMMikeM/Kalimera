/**
 * Validates a tab parameter against a list of known tabs.
 * Throws a 404 Response if the tab is not in the list.
 */
export function validateTab<T extends string>(tab: string, validTabs: readonly T[]): T {
	if (!validTabs.includes(tab as T)) {
		throw new Response("Not Found", { status: 404 });
	}
	return tab as T;
}
