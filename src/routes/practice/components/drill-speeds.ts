export const SPEEDS = [
	{ id: "fast", label: "Fast · 4s", timeLimit: 4000 },
	{ id: "medium", label: "Medium · 6s", timeLimit: 6000 },
	{ id: "relaxed", label: "Relaxed · 8s", timeLimit: 8000 },
] as const satisfies { id: SpeedId; label: string; timeLimit: number }[];

export const SPEEDMAP = {
	fast: { label: "Fast · 4s", timeLimit: 4000 },
	medium: { label: "Medium · 6s", timeLimit: 6000 },
	relaxed: { label: "Relaxed · 8s", timeLimit: 8000 },
} as const satisfies Record<SpeedId, { label: string; timeLimit: number }>;

export type SpeedId = "fast" | "medium" | "relaxed";

export const MEDIUM_SPEED_MS = 6000;
