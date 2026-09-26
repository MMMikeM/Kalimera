export type ThemePreference = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_THEME_COLOR = "#4A7C8F";
const DARK_THEME_COLOR = "#171717";

const isThemePreference = (value: unknown): value is ThemePreference =>
	value === "system" || value === "light" || value === "dark";

const themeColorFor = (dark: boolean) => (dark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);

/*
 * Runs inline in <head> before first paint so a dark-mode visitor never sees a
 * light flash. It also owns the system-change listener, which re-reads storage
 * so an explicit light/dark choice is never overridden by the OS.
 */
export const themeInitScript = `(function(){try{
var q=matchMedia(${JSON.stringify(DARK_QUERY)});
function apply(){
var p=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var d=p==="dark"||(p!=="light"&&q.matches);
document.documentElement.classList.toggle("dark",d);
var m=document.querySelector('meta[name="theme-color"]');
if(m)m.setAttribute("content",d?${JSON.stringify(DARK_THEME_COLOR)}:${JSON.stringify(LIGHT_THEME_COLOR)});
}
apply();
q.addEventListener("change",apply);
}catch(e){}})();`;

const listeners = new Set<() => void>();

export const subscribeThemePreference = (listener: () => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

export const readThemePreference = (): ThemePreference => {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return isThemePreference(stored) ? stored : "system";
	} catch {
		return "system";
	}
};

export const setThemePreference = (preference: ThemePreference) => {
	try {
		if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
		else localStorage.setItem(THEME_STORAGE_KEY, preference);
	} catch {
		// Storage can be unavailable (private mode); the choice still applies for this page.
	}

	const dark = preference === "dark" || (preference === "system" && matchMedia(DARK_QUERY).matches);
	const applyTheme = () => {
		document.documentElement.classList.toggle("dark", dark);
		document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColorFor(dark));
	};

	// Cross-fading softens a whole-screen luminance jump; reduced-motion users get the instant swap.
	const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!reduceMotion && "startViewTransition" in document) document.startViewTransition(applyTheme);
	else applyTheme();

	for (const listener of listeners) listener();
};
