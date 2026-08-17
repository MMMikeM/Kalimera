import { describe, expect, it } from "vitest";

import { declineAdjective } from "./adjective-declension";

const nomSingular = (lemma: string, pattern: Parameters<typeof declineAdjective>[1]) => {
	const forms = declineAdjective(lemma, pattern);
	const pick = (gender: "masculine" | "feminine" | "neuter") =>
		forms.find((f) => f.case === "nominative" && f.number === "singular" && f.gender === gender)!
			.form;
	return { m: pick("masculine"), f: pick("feminine"), n: pick("neuter") };
};

// Adjectives cited in the neuter (the colour words) must not lose a stem
// consonant: άσπρο strips one character, not the paradigm's two.

describe("adjectives cited in the neuter", () => {
	it.each([
		["άσπρο", { m: "άσπρος", f: "άσπρη", n: "άσπρο" }],
		["μαύρο", { m: "μαύρος", f: "μαύρη", n: "μαύρο" }],
		["κόκκινο", { m: "κόκκινος", f: "κόκκινη", n: "κόκκινο" }],
		["πράσινο", { m: "πράσινος", f: "πράσινη", n: "πράσινο" }],
		["κίτρινο", { m: "κίτρινος", f: "κίτρινη", n: "κίτρινο" }],
	])("%s keeps its full stem", (lemma, expected) => {
		expect(nomSingular(lemma, "os-i-o")).toEqual(expected);
	});

	it("χρυσό takes stressed endings — the stem carries no accent", () => {
		expect(nomSingular("χρυσό", "os-i-o")).toEqual({
			m: "χρυσός",
			f: "χρυσή",
			n: "χρυσό",
		});
	});

	it("γαλάζιο follows the -ιος pattern", () => {
		expect(nomSingular("γαλάζιο", "os-ia-o")).toEqual({
			m: "γαλάζιος",
			f: "γαλάζια",
			n: "γαλάζιο",
		});
	});
});

describe("adjectives cited in the masculine (regression guard)", () => {
	it("κόκκινος is unaffected", () => {
		expect(nomSingular("κόκκινος", "os-i-o")).toEqual({
			m: "κόκκινος",
			f: "κόκκινη",
			n: "κόκκινο",
		});
	});

	it("καλός keeps its stressed endings", () => {
		expect(nomSingular("καλός", "os-i-o")).toEqual({
			m: "καλός",
			f: "καλή",
			n: "καλό",
		});
	});
});
