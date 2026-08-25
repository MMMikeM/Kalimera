import { describe, expect, it } from "vitest";

import { HOMOGRAPH_FORMS, HOMOGRAPH_ROWS } from "./homographs";

describe("article / pronoun homographs", () => {
	it("covers every form the two paradigms share", () => {
		expect(new Set(HOMOGRAPH_ROWS.map((r) => r.form))).toEqual(new Set(HOMOGRAPH_FORMS));
	});

	// The columns are the rule: article before a noun, pronoun before a verb,
	// possessive after a noun. An example in the wrong column teaches the inverse.
	it("starts the article and object examples with the form itself", () => {
		for (const row of HOMOGRAPH_ROWS) {
			expect(row.article.split(" ")[0], row.form).toBe(row.form);
			expect(row.object.split(" ")[0], row.form).toBe(row.form);
		}
	});

	it("ends the possessive examples with the form itself", () => {
		for (const row of HOMOGRAPH_ROWS.filter((r) => r.possessive)) {
			expect(row.possessive!.split(" ").at(-1), row.form).toBe(row.form);
		}
	});
});
