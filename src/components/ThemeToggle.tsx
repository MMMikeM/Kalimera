import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import {
	type ThemePreference,
	readThemePreference,
	setThemePreference,
	subscribeThemePreference,
} from "@/lib/theme";

const NEXT: Record<ThemePreference, ThemePreference> = {
	system: "light",
	light: "dark",
	dark: "system",
};

const ICON = { system: Monitor, light: Sun, dark: Moon } as const;

const LABEL: Record<ThemePreference, string> = {
	system: "Theme: match system",
	light: "Theme: light",
	dark: "Theme: dark",
};

export function ThemeToggle({ size = 18 }: { size?: number }) {
	const preference = useSyncExternalStore(
		subscribeThemePreference,
		readThemePreference,
		() => "system" as const,
	);
	const Icon = ICON[preference];

	return (
		<button
			type="button"
			onClick={() => setThemePreference(NEXT[preference])}
			aria-label={LABEL[preference]}
			title={LABEL[preference]}
			className="flex items-center justify-center rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700"
		>
			<Icon size={size} strokeWidth={1.5} />
		</button>
	);
}
