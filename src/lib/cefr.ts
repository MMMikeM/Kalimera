import type { CefrLevel } from "@/server/db/enums";

/** Adjacent-up CEFR mapping. C2 has no next level. */
export const NEXT_LEVEL: Partial<Record<CefrLevel, CefrLevel>> = {
	A1: "A2",
	A2: "B1",
	B1: "B2",
	B2: "C1",
	C1: "C2",
};

/** Pool covering the user's current level plus the next one (if any). */
export const adjacentCefrPool = (level: CefrLevel): CefrLevel[] => {
	const next = NEXT_LEVEL[level];
	return next ? [level, next] : [level];
};
