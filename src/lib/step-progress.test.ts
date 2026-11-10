import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vite-plus/test";

import { NEW_STEP, type StepState, applySession, passMark, pickNextStep } from "./step-progress";

const day = (n: number) => Temporal.Instant.from(`2026-11-${String(n).padStart(2, "0")}T10:00:00Z`);
const PASS = { correct: 9, total: 10 };
const FAIL = { correct: 8, total: 10 };

const run = (sessions: Array<[Temporal.Instant, { correct: number; total: number }]>) =>
	sessions.reduce<{ state: StepState; outcome?: string }>(
		(acc, [at, score]) => applySession(acc.state, score, at),
		{ state: NEW_STEP },
	);

describe("applySession", () => {
	it("needs passes on two different days to tick a step off", () => {
		expect(run([[day(1), PASS]]).outcome).toBe("passed-once");
		expect(run([[day(1), PASS], [day(1), PASS]]).outcome).toBe("already-passed-today");
		expect(run([[day(1), PASS], [day(2), PASS]]).outcome).toBe("ticked");
	});

	it("passes at 90% exactly, with no rounding drift", () => {
		expect(passMark(6)).toBe(6);
		expect(passMark(30)).toBe(27);
		expect(run([[day(1), { correct: 27, total: 30 }]]).outcome).toBe("passed-once");
	});

	it("does not count a session under 90%", () => {
		expect(run([[day(1), FAIL]]).outcome).toBe("below-pass");
		expect(run([[day(1), { correct: 0, total: 0 }]]).outcome).toBe("below-pass");
	});

	it("widens the brush-up interval only when a brush-up is due", () => {
		const ticked = run([[day(1), PASS], [day(2), PASS]]);
		expect(ticked.state.nextBrushUpAt).toBe("2026-11-05T10:00:00Z");
		expect(applySession(ticked.state, PASS, day(3)).outcome).toBe("already-ticked");
		const brushed = applySession(ticked.state, PASS, day(5));
		expect(brushed.outcome).toBe("brushed-up");
		expect(brushed.state.nextBrushUpAt).toBe("2026-11-12T10:00:00Z");
	});

	it("un-ticks a step that slips, and one passing day later ticks it again", () => {
		const ticked = run([[day(1), PASS], [day(2), PASS]]);
		const slipped = applySession(ticked.state, FAIL, day(5));
		expect(slipped.outcome).toBe("slipped");
		expect(slipped.state.tickedAt).toBeNull();
		expect(applySession(slipped.state, PASS, day(5)).outcome).toBe("already-passed-today");
		expect(applySession(slipped.state, PASS, day(6)).outcome).toBe("ticked");
	});
});

describe("pickNextStep", () => {
	const ids = ["a", "b", "c"];

	it("starts at the first step", () => {
		expect(pickNextStep(ids, new Map(), day(1))).toEqual({ stepId: "a", status: "new" });
	});

	it("moves past a step already passed today, and comes back to it tomorrow", () => {
		const progress = new Map([["a", run([[day(1), PASS]]).state]]);
		expect(pickNextStep(ids, progress, day(1))?.stepId).toBe("b");
		expect(pickNextStep(ids, progress, day(2))).toEqual({ stepId: "a", status: "passed-once" });
	});

	it("puts a due brush-up before the current step", () => {
		const progress = new Map([["b", run([[day(1), PASS], [day(2), PASS]]).state]]);
		expect(pickNextStep(ids, progress, day(3))?.stepId).toBe("a");
		expect(pickNextStep(ids, progress, day(5))).toEqual({ stepId: "b", status: "brush-up-due" });
	});
});
