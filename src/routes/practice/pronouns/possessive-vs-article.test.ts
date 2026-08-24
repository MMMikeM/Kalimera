import { describe, expect, it } from "vitest";

import { PHRASES, type Role } from "./possessive-vs-article.data";

const WEAK_PRONOUNS = new Set([
	"μου",
	"σου",
	"του",
	"της",
	"μας",
	"σας",
	"τους",
	"τις",
	"τον",
	"την",
	"με",
	"σε",
]);

const stripTonos = (word: string): string =>
	word.normalize("NFD").replace(/́/g, "").normalize("NFC");

const tokens = (greek: string): string[] => greek.split(" ").map(stripTonos);

const byRole = (role: Role) => PHRASES.filter((p) => p.dimension === role);

describe("possessive-vs-article phrases", () => {
	it("has unique ids", () => {
		expect(new Set(PHRASES.map((p) => p.id)).size).toBe(PHRASES.length);
	});

	it("balances the three roles", () => {
		for (const role of ["possessive", "article", "object"] as Role[]) {
			expect(byRole(role)).toHaveLength(8);
		}
	});

	// The drill teaches "the next word decides". If the data contradicts that rule
	// the drill teaches the wrong thing, so assert the rule holds for every item.
	it("puts the possessive last, after its noun", () => {
		for (const phrase of byRole("possessive")) {
			const words = tokens(phrase.greek);
			const last = words.at(-1)!;
			expect(WEAK_PRONOUNS.has(last), `${phrase.greek} ends in a weak pronoun`).toBe(true);
			expect(words.length).toBeGreaterThan(1);
		}
	});

	it("puts the genitive article between two nouns, never last", () => {
		for (const phrase of byRole("article")) {
			const words = tokens(phrase.greek);
			const marker = words.findIndex((w) => w === "του" || w === "της" || w === "των");
			expect(marker, `${phrase.greek} contains a genitive article`).toBeGreaterThan(0);
			expect(marker, `${phrase.greek} does not end on the article`).toBeLessThan(words.length - 1);
		}
	});

	it("puts the object pronoun first, before its verb", () => {
		for (const phrase of byRole("object")) {
			const first = tokens(phrase.greek)[0]!;
			expect(WEAK_PRONOUNS.has(first), `${phrase.greek} starts with a weak pronoun`).toBe(true);
		}
	});

	it("never labels των as a possessive", () => {
		for (const phrase of byRole("possessive")) {
			expect(tokens(phrase.greek)).not.toContain("των");
		}
	});
});
