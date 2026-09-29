import type { GrammaticalCase } from "@/server/db/enums";

/**
 * The drawing behind a grammar mark: an end shape at each side of a line (one
 * line for one thing, two for more than one). The end shape names the case.
 *
 * Every value sits on the half-pixel grid, which is a whole pixel on a 2×
 * screen, so lines render as solid rows instead of anti-aliased smears. The two
 * lines of a pair mirror each other about the centre.
 */
export const MARK = {
	height: 9,
	centre: 4.5,
	triangle: 7,
	radius: 4.5,
	bar: 2.5,
	outline: 1.25,
	single: 2,
	pair: 1.5,
	/** Each line of a pair sits this far above or below the centre: 1.5–3.0 and 6.0–7.5. */
	pairOffset: 2.25,
	/** The vocative's dot hangs below the shared height, as an exclamation mark's does. */
	dotGap: 1.5,
	/** A mark never draws narrower than this, so the two ends of a short word never meet. */
	minWidth: 30,
} as const;

export type MarkEnd = "out" | "in" | "hold" | "call";

/** Doer sends out, Target takes in, Owner holds, and calling someone is an exclamation. */
export const END_FOR_CASE: Record<GrammaticalCase, MarkEnd> = {
	nominative: "out",
	accusative: "in",
	genitive: "hold",
	vocative: "call",
};

export interface MarkLine {
	/** Vertical centre of the line. */
	y: number;
	thickness: number;
	/** Where the line starts, measured in from the outer edge; it ends the same distance from the other edge. */
	inset: number;
}

const barEnd = MARK.centre + MARK.pairOffset + MARK.pair / 2;

/**
 * Each line runs in under its end shape, so no part of it stops short of the
 * shape's edge; the shape is drawn on top and hides the overlap.
 */
const insetFor = (end: MarkEnd, dy: number, thickness: number): number => {
	switch (end) {
		case "out":
			return MARK.triangle - 1;
		case "in":
			// The slope faces the line: start where it is furthest out along the line's thickness
			return Math.max(0, MARK.triangle * (1 - (Math.abs(dy) + thickness / 2) / MARK.centre));
		case "hold":
			return MARK.radius;
		case "call":
			return MARK.bar / 2;
	}
};

export const markLines = (end: MarkEnd, plural: boolean): MarkLine[] => {
	const thickness = plural ? MARK.pair : MARK.single;
	const offsets = plural ? [-MARK.pairOffset, MARK.pairOffset] : [0];
	return offsets.map((dy) => ({
		y: MARK.centre + dy,
		thickness,
		inset: insetFor(end, dy, thickness),
	}));
};

export type EndShape =
	| { kind: "polygon"; points: [number, number][] }
	| { kind: "circle"; cx: number; cy: number; r: number }
	| { kind: "rect"; x: number; y: number; width: number; height: number; rx: number };

/**
 * The left-hand end shape; the right-hand one is its mirror image. An outlined
 * shape is inset by half its stroke so it is exactly as tall as a filled one.
 */
export const endShapes = (end: MarkEnd, outlined: boolean): EndShape[] => {
	const i = outlined ? MARK.outline / 2 : 0;
	const { height: H, centre: c, triangle: T } = MARK;
	switch (end) {
		case "out":
			return [{ kind: "polygon", points: [[i * 1.6, c], [T - i, i], [T - i, H - i]] }];
		case "in":
			return [{ kind: "polygon", points: [[i, i], [T - i * 1.6, c], [i, H - i]] }];
		case "hold":
			return [{ kind: "circle", cx: MARK.radius, cy: c, r: MARK.radius - i }];
		case "call": {
			const width = MARK.bar - 2 * i;
			const rx = outlined ? 0.5 : MARK.bar / 3;
			return [
				{ kind: "rect", x: i, y: i, width, height: barEnd - i, rx },
				{ kind: "rect", x: i, y: barEnd + MARK.dotGap + i, width, height: width, rx },
			];
		}
	}
};
