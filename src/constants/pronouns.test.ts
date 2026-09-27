import { describe, expect, it } from "vite-plus/test";

import {
	EMPHATIC_PRONOUN_EXAMPLES,
	OBJECT_PRONOUN_EXAMPLES,
	POSSESSIVE_PRONOUN_EXAMPLES,
} from "./pronouns";

describe("pronoun examples", () => {
	const examples = [
		...OBJECT_PRONOUN_EXAMPLES,
		...POSSESSIVE_PRONOUN_EXAMPLES,
		...EMPHATIC_PRONOUN_EXAMPLES,
	];

	it.each(examples)("marks words that occur in $greek", ({ greek, marked }) => {
		expect(greek).toContain(marked);
	});
});
