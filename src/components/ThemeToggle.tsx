import { useId, useState, useSyncExternalStore } from "react";

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

const LABEL: Record<ThemePreference, string> = {
	system: "Theme: match system",
	light: "Theme: light",
	dark: "Theme: dark",
};

// How far each body sits below its risen position; 13 puts it fully under the horizon.
const SUN_DROP: Record<ThemePreference, number> = { light: 0, system: 6, dark: 13 };
const MOON_DROP: Record<ThemePreference, number> = { light: 13, system: 13, dark: 0 };

export function ThemeToggle({ size = 18 }: { size?: number }) {
	const preference = useSyncExternalStore(
		subscribeThemePreference,
		readThemePreference,
		() => "system" as const,
	);
	// Hydration swaps the server's "system" icon for the stored one; only a click should animate.
	const [hasToggled, setHasToggled] = useState(false);
	const skyClipId = `sky-${useId().replace(/[^\w-]/g, "")}`;

	const bodyClass = hasToggled
		? "transition-transform duration-500 ease-in-out motion-reduce:transition-none"
		: undefined;

	return (
		<button
			type="button"
			onClick={() => {
				setHasToggled(true);
				setThemePreference(NEXT[preference]);
			}}
			aria-label={LABEL[preference]}
			title={LABEL[preference]}
			className="theme-toggle flex items-center justify-center rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700"
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<clipPath id={skyClipId}>
					<rect width="24" height="16" />
				</clipPath>
				<g clipPath={`url(#${skyClipId})`}>
					<g className={bodyClass} style={{ transform: `translateY(${SUN_DROP[preference]}px)` }}>
						<circle cx="12" cy="10" r="3.5" />
						<path d="M12 3v1.5M5 10h1.5M17.5 10H19M7.05 5.05l1.06 1.06M16.95 5.05l-1.06 1.06" />
					</g>
					<g className={bodyClass} style={{ transform: `translateY(${MOON_DROP[preference]}px)` }}>
						<path d="M14.5 5.2a5 5 0 1 0 2.3 6.3 4 4 0 0 1-2.3-6.3Z" />
					</g>
				</g>
				<path d="M2 17.5c1.67 0 1.67-1 3.33-1s1.67 1 3.34 1 1.66-1 3.33-1 1.67 1 3.33 1 1.67-1 3.34-1 1.66 1 3.33 1" />
				<path d="M6.67 21c1.33 0 1.33-.8 2.67-.8s1.33.8 2.66.8 1.34-.8 2.67-.8 1.33.8 2.67.8" />
			</svg>
		</button>
	);
}
