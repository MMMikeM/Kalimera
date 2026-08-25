import { describe, expect, it } from "vitest";

import { PLACEMENTS } from "./placement.data";

const CLITICS = new Set(["με", "σε", "τον", "την", "το", "μας", "σας", "τους", "τις", "τα"]);

const stripTonos = (word: string): string =>
	word
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.normalize("NFC")
		.toLowerCase();

const tokens = (greek: string): string[] => greek.trim().split(/\s+/).map(stripTonos);

const cliticIndex = (greek: string): number => tokens(greek).findIndex((t) => CLITICS.has(t));

describe("pronoun placement items", () => {
	it("has unique ids", () => {
		expect(new Set(PLACEMENTS.map((p) => p.id)).size).toBe(PLACEMENTS.length);
	});

	it("carries exactly one clitic per sentence", () => {
		for (const item of PLACEMENTS) {
			const found = tokens(item.greek).filter((t) => CLITICS.has(t));
			expect(found, item.greek).toHaveLength(1);
		}
	});

	// The drill's whole claim: the clitic hugs the verb, and only a command moves it.
	it("puts the clitic before the verb everywhere except commands", () => {
		for (const item of PLACEMENTS.filter((p) => p.category === "with-verb")) {
			const words = tokens(item.greek);
			expect(cliticIndex(item.greek), item.greek).toBeLessThan(words.length - 1);
		}
	});

	it("puts the clitic last after a command", () => {
		for (const item of PLACEMENTS.filter((p) => p.category === "after-command")) {
			const words = tokens(item.greek);
			expect(cliticIndex(item.greek), item.greek).toBe(words.length - 1);
		}
	});

	// Position must be the only decision: every word of the answer is handed over in
	// the prompt, so a wrong card cannot be a vocabulary or conjugation failure.
	it("supplies every word of the answer in the context", () => {
		for (const item of PLACEMENTS) {
			const given = new Set(item.context.split("·").map((p) => stripTonos(p.trim())));
			for (const word of tokens(item.greek)) {
				expect(given, `${item.greek} — "${word}" not in context`).toContain(word);
			}
		}
	});

	// A proparoxytone imperative only takes its second accent once an enclitic follows
	// it, so carrying that accent into the prompt would announce the answer.
	it("gives the bare verb in the context, without the enclitic's second accent", () => {
		for (const item of PLACEMENTS) {
			for (const word of item.context.split("·")) {
				const accents = word.normalize("NFD").match(/́/g) ?? [];
				expect(accents.length, `${item.id} — "${word.trim()}"`).toBeLessThan(2);
			}
		}
	});

	it("pairs each command with a statement using the same verb and pronoun", () => {
		const commands = PLACEMENTS.filter((p) => p.category === "after-command");
		expect(commands.length).toBeGreaterThan(0);
		for (const command of commands) {
			expect(PLACEMENTS.find((p) => p.id === command.pairId)?.category).toBe("with-verb");
		}
	});
});
