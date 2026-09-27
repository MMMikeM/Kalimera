import { describe, expect, it } from "vite-plus/test";

import { CASE_ROLES, CASE_TRIGGERS } from "./recognition";

describe("case examples", () => {
	const examples = [
		...CASE_ROLES.map((role) => role.example),
		...CASE_TRIGGERS.flatMap((trigger) => trigger.examples),
	];

	it.each(examples)("marks words that occur in $greek, in order", ({ greek, marked }) => {
		let cursor = 0;
		for (const span of typeof marked === "string" ? [marked] : marked) {
			const start = greek.indexOf(span, cursor);
			expect(start, span).toBeGreaterThanOrEqual(0);
			cursor = start + span.length;
		}
	});
});
