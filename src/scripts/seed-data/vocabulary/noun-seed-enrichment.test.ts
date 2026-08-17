import { describe, expect, it } from "vitest";

import { enrichNoun, inferDeclensionPattern } from "./noun-seed-enrichment";

describe("inferDeclensionPattern", () => {
	it.each([
		["ερώτηση", "fem-si"],
		["κατάσταση", "fem-si"],
		["απόδειξη", "fem-ksi"],
		["άνοιξη", "fem-ksi"],
		["έναρξη", "fem-ksi"],
		["άποψη", "fem-psi"],
	])("routes %s to %s", (lemma, pattern) => {
		expect(inferDeclensionPattern(lemma, "feminine")).toBe(pattern);
	});

	it("leaves plain -η feminines on fem-i", () => {
		expect(inferDeclensionPattern("ζωή", "feminine")).toBe("fem-i");
		expect(inferDeclensionPattern("βροχή", "feminine")).toBe("fem-i");
	});
});

describe("enrichNoun", () => {
	const forms = (lemma: string) =>
		Object.fromEntries(
			Object.entries(enrichNoun({ lemma, gender: "feminine", english: "x" }).nominalForms).map(
				([key, cell]) => [key, (cell as { form: string }).form],
			),
		);

	it("keeps ξ across the -ξη paradigm", () => {
		expect(forms("απόδειξη")).toMatchObject({
			nominative_singular: "απόδειξη",
			genitive_singular: "απόδειξης",
			nominative_plural: "αποδείξεις",
			genitive_plural: "αποδείξεων",
		});
	});

	it("keeps ψ across the -ψη paradigm", () => {
		expect(forms("άποψη")).toMatchObject({
			nominative_singular: "άποψη",
			genitive_singular: "άποψης",
			nominative_plural: "απόψεις",
		});
	});
});
