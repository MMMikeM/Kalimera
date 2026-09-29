import { describe, expect, it } from "vite-plus/test";

import { END_FOR_CASE, MARK, type MarkEnd, endShapes, markLines } from "./grammar-mark-geometry";

const ENDS: MarkEnd[] = ["out", "in", "hold", "call"];
const onHalfPixelGrid = (v: number) => Number.isInteger(v * 2);

describe("grammar mark geometry", () => {
	it("gives every case its own end shape", () => {
		expect(new Set(Object.values(END_FOR_CASE)).size).toBe(4);
	});

	it("mirrors the two lines of a pair about the centre", () => {
		for (const end of ENDS) {
			const [top, bottom] = markLines(end, true);
			expect(MARK.centre - top!.y).toBe(bottom!.y - MARK.centre);
		}
	});

	// Edges off the half-pixel grid anti-alias into soft rows on a 2× screen, and a
	// pair whose two lines blur differently looks lopsided.
	it("puts every line edge on the half-pixel grid", () => {
		for (const end of ENDS) {
			for (const plural of [false, true]) {
				for (const line of markLines(end, plural)) {
					expect(onHalfPixelGrid(line.y - line.thickness / 2), `${end} ${plural}`).toBe(true);
					expect(onHalfPixelGrid(line.y + line.thickness / 2), `${end} ${plural}`).toBe(true);
				}
			}
		}
	});

	it("keeps every line inside the shared height", () => {
		for (const end of ENDS) {
			for (const line of markLines(end, true)) {
				expect(line.y - line.thickness / 2).toBeGreaterThanOrEqual(0);
				expect(line.y + line.thickness / 2).toBeLessThanOrEqual(MARK.height);
			}
		}
	});

	it("starts each line under its end shape, so none stops short", () => {
		for (const end of ENDS) {
			const shapes = endShapes(end, false);
			const shapeWidth = Math.max(
				...shapes.map((s) =>
					s.kind === "polygon" ? Math.max(...s.points.map(([x]) => x)) : s.kind === "circle" ? s.cx + s.r : s.x + s.width,
				),
			);
			for (const plural of [false, true]) {
				for (const line of markLines(end, plural)) {
					expect(line.inset, `${end} ${plural}`).toBeLessThan(shapeWidth);
				}
			}
		}
	});

	it("draws filled and outlined shapes to the same height", () => {
		for (const end of ["out", "in", "hold"] as const) {
			const extent = (outlined: boolean) =>
				endShapes(end, outlined).map((s) =>
					s.kind === "polygon"
						? Math.max(...s.points.map(([, y]) => y)) - Math.min(...s.points.map(([, y]) => y)) + (outlined ? MARK.outline : 0)
						: s.kind === "circle"
							? 2 * s.r + (outlined ? MARK.outline : 0)
							: s.height,
				)[0];
			expect(extent(true)).toBeCloseTo(MARK.height);
			expect(extent(false)).toBeCloseTo(MARK.height);
		}
	});

	it("stops the vocative bar at the lower plural line and hangs its dot below", () => {
		const [bar, dot] = endShapes("call", false);
		const [, lower] = markLines("call", true);
		expect(bar?.kind === "rect" && bar.y + bar.height).toBe(lower!.y + lower!.thickness / 2);
		expect(dot?.kind === "rect" && dot.y + dot.height).toBeGreaterThan(MARK.height);
	});

	it("leaves room between the two ends of the narrowest mark", () => {
		for (const end of ENDS) {
			for (const line of markLines(end, true)) {
				expect(MARK.minWidth - 2 * line.inset).toBeGreaterThan(10);
			}
		}
	});
});
