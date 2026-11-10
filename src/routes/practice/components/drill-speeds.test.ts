import { describe, expect, it } from "vite-plus/test";

import { SPEEDS, stepSpeed } from "./drill-speeds";

describe("stepSpeed", () => {
	it("waits for the answer on a gate and runs every other step at Relaxed", () => {
		expect(stepSpeed({ gate: true })).toBe("untimed");
		expect(stepSpeed({})).toBe("relaxed");
	});

	it("keeps untimed out of the speed picker", () => {
		expect(SPEEDS.map((s) => s.id)).toEqual(["fast", "medium", "relaxed"]);
	});
});
