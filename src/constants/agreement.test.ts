import { describe, expect, it } from "vite-plus/test";

import { stripTonos } from "@/lib/greek-letters";

import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "./agreement";

// The Nouns reference page states these as rules, so every paradigm has to obey
// them. A new pattern that breaks one means the page needs rewording, not an
// exception here.

const word = (paradigm: AgreementParadigm, number: "singular" | "plural", caseKey: string) => {
	const forms = number === "singular" ? paradigm.forms : paradigm.pluralForms;
	const full = forms.find((f) => f.case === caseKey)?.full ?? "";
	return full.split(" ").at(-1)?.replace("!", "") ?? "";
};

const ofGender = (gender: AgreementParadigm["gender"]) =>
	AGREEMENT_PARADIGMS.filter((p) => p.gender === gender);

describe("noun rules the reference page states", () => {
	it.each(ofGender("masculine"))("$id drops the -ς for the Target", (p) => {
		const doer = word(p, "singular", "nom");
		expect(doer.endsWith("ς")).toBe(true);
		expect(stripTonos(word(p, "singular", "acc"))).toBe(stripTonos(doer.slice(0, -1)));
	});

	it.each(ofGender("feminine"))("$id adds a -ς for the Owner", (p) => {
		expect(stripTonos(word(p, "singular", "gen"))).toBe(`${stripTonos(word(p, "singular", "nom"))}ς`);
	});

	it.each(ofGender("neuter"))("$id keeps the Doer form for the Target", (p) => {
		expect(word(p, "singular", "acc")).toBe(word(p, "singular", "nom"));
		expect(word(p, "plural", "acc")).toBe(word(p, "plural", "nom"));
	});

	it.each(AGREEMENT_PARADIGMS)("$id ends its plural Owner in -ων", (p) => {
		expect(stripTonos(word(p, "plural", "gen")).endsWith("ων")).toBe(true);
	});

	it.each(AGREEMENT_PARADIGMS.filter((p) => p.id !== "masc-os"))(
		"$id matches its plural Doer and Target",
		(p) => {
			expect(word(p, "plural", "acc")).toBe(word(p, "plural", "nom"));
		},
	);

	it.each(AGREEMENT_PARADIGMS.filter((p) => p.id !== "masc-os"))(
		"$id calls with the Target form",
		(p) => {
			expect(word(p, "singular", "voc")).toBe(word(p, "singular", "acc"));
		},
	);

	it("masc-os is the exception to both: οι φίλοι / τους φίλους, and φίλε", () => {
		const friend = AGREEMENT_PARADIGMS.find((p) => p.id === "masc-os");
		if (!friend) throw new Error("masc-os is missing");
		expect(word(friend, "plural", "acc")).not.toBe(word(friend, "plural", "nom"));
		expect(word(friend, "singular", "voc").endsWith("ε")).toBe(true);
	});
});

describe("ending data the page splits words by", () => {
	const allForms = AGREEMENT_PARADIGMS.flatMap((p) =>
		[...p.forms, ...p.pluralForms]
			.filter((f) => f.case !== "voc")
			.map((f) => ({ id: p.id, full: f.full, ending: f.ending })),
	);

	it.each(allForms)("$full ends in $ending, ignoring stress", ({ full, ending }) => {
		const bare = stripTonos(full.split(" ").at(-1) ?? "");
		expect(bare.endsWith(stripTonos(ending.replace(/^-/, "")))).toBe(true);
	});
});
