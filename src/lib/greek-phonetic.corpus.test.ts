import { describe, expect, it } from "vitest";

import corpus from "@/lib/__fixtures__/pronunciation-corpus.json";
import { greekToPronunciation } from "@/lib/greek-phonetic";

/**
 * Regression harness for the transliteration pipeline.
 *
 * The fixture is every Greek string literal in the drill routes and seed data,
 * snapshotted against the implementation as it stood before the tokenizer
 * rewrite. Hand-written tests cover the cases someone thought of; this covers
 * the ones nobody did — which is where a regex→walk rewrite drifts silently.
 *
 * Regenerate ONLY with a deliberate, reviewed convention change:
 *   pnpm exec tsx scripts/harvest-greek-corpus.ts
 */
describe("pronunciation corpus", () => {
	const entries = Object.entries(corpus as Record<string, string>);

	it("has a populated fixture", () => {
		expect(entries.length).toBeGreaterThan(1000);
	});

	it("reproduces every snapshotted rendering", () => {
		const drifted = entries
			.filter(([greek, expected]) => greekToPronunciation(greek) !== expected)
			.map(([greek, expected]) => `${greek}\n  expected: ${expected}\n  actual:   ${greekToPronunciation(greek)}`);

		expect(drifted).toEqual([]);
	});
});
