import { describe, expect, it } from "vitest";

import { deviatingPersons } from "./paradigm-deviation";

const EIMAI = {
	sg1: "είμαι",
	sg2: "είσαι",
	sg3: "είναι",
	pl1: "είμαστε",
	pl2: "είστε",
	pl3: "είναι",
};

const PAO = { sg1: "πάω", sg2: "πας", sg3: "πάει", pl1: "πάμε", pl2: "πάτε", pl3: "πάνε" };

const KANO_AORIST = {
	sg1: "έκανα",
	sg2: "έκανες",
	sg3: "έκανε",
	pl1: "κάναμε",
	pl2: "κάνατε",
	pl3: "έκαναν",
};

const VLEPO_AORIST = {
	sg1: "είδα",
	sg2: "είδες",
	sg3: "είδε",
	pl1: "είδαμε",
	pl2: "είδατε",
	pl3: "είδαν",
};

describe("deviatingPersons", () => {
	it("flags only the cells that walk away from the sg1 stem", () => {
		expect(deviatingPersons(KANO_AORIST)).toEqual(["pl1", "pl2"]);
	});

	it("returns nothing when the paradigm is internally consistent", () => {
		expect(deviatingPersons(VLEPO_AORIST)).toEqual([]);
	});

	it("returns persons in paradigm order, not insertion order", () => {
		const shuffled = { pl3: PAO.pl3, sg2: PAO.sg2, pl1: PAO.pl1, sg1: PAO.sg1, pl2: PAO.pl2 };
		expect(deviatingPersons(shuffled)).toEqual(["sg2", "pl1", "pl2", "pl3"]);
	});

	it("flags every person of a suppletive verb bar the anchor", () => {
		expect(deviatingPersons(EIMAI)).toEqual(["sg2", "sg3", "pl1", "pl2", "pl3"]);
	});

	it("ignores the θα particle when comparing future stems", () => {
		expect(
			deviatingPersons({ sg1: "θα πάω", sg2: "θα πας", sg3: "θα πάει" }),
		).toEqual(["sg2"]);
	});

	it("returns nothing without an sg1 anchor", () => {
		expect(deviatingPersons({ pl1: "κάναμε" })).toEqual([]);
	});
});
