import { type CefrLevel, cefrLevels } from "@/server/db/enums";

const levelIndex = (level: string | null): number =>
	(cefrLevels as readonly (string | null)[]).indexOf(level);

/** Whether a stored level is a real CEFR code. */
export const isCefrLevel = (level: string | null): level is CefrLevel => levelIndex(level) !== -1;

/**
 * Sort key for CEFR levels, easiest first. Anything that is not a CEFR code sorts
 * last: ordering on the raw string would put the rows stored as `"0"` ahead of
 * every A1 word, because "0" precedes "A" lexically.
 */
export const cefrRank = (level: string | null): number => {
	const index = levelIndex(level);
	return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

/** Pool covering the user's current level plus the next one (if any). C2 has no next level. */
export const adjacentCefrPool = (level: CefrLevel): CefrLevel[] => {
	const next = cefrLevels[cefrLevels.indexOf(level) + 1];
	return next ? [level, next] : [level];
};
