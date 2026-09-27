import { describe, expect, it } from "vite-plus/test";

import {
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
	PRONOUN_JOBS,
	SUBJECT_PRONOUNS,
} from "./pronouns";

describe("pronoun examples", () => {
	const examples = PRONOUN_JOBS.flatMap((job) => job.examples);

	it.each(examples)("marks words that occur in $greek", ({ greek, marked }) => {
		expect(greek).toContain(marked);
	});
});

describe("pronoun paradigms", () => {
	// The reference page lays all four side by side and reads them row by row.
	it("list the same persons in the same order", () => {
		const persons = (paradigm: typeof SUBJECT_PRONOUNS) => paradigm.map((row) => row.person);
		const doer = persons(SUBJECT_PRONOUNS);
		expect(persons(OBJECT_PRONOUNS)).toEqual(doer);
		expect(persons(POSSESSIVE_PRONOUNS)).toEqual(doer);
		expect(persons(EMPHATIC_PRONOUNS)).toEqual(doer);
	});
});
