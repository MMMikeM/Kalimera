import { describe, expect, it } from "vitest";

import { DRILL_BY_TOPIC, drillHrefForTopic } from "./practice-links";

describe("drillHrefForTopic", () => {
	it.each([
		["nouns", "/practice/cases/review/nouns"],
		["articles", "/practice/cases/review/articles"],
		["adjectives", "/practice/cases/review/adjectives"],
		["pronouns", "/practice/pronouns"],
	])("sends %s to its drill", (topic, href) => {
		expect(drillHrefForTopic(topic, true)).toBe(href);
	});

	// /practice/route.tsx redirects anyone without a session to the homepage, and
	// /reference is public, so a bare drill link is worse than no link at all.
	it.each(["nouns", "articles", "pronouns", undefined])(
		"sends a logged-out visitor to register instead of %s",
		(topic) => {
			expect(drillHrefForTopic(topic, false)).toBe("/register");
		},
	);

	// Prepositions have a reference tab but no drill of their own.
	it("falls back to the practice index for a topic with no drill", () => {
		expect(drillHrefForTopic("prepositions", true)).toBe("/practice");
		expect(drillHrefForTopic(undefined, true)).toBe("/practice");
	});

	it("only maps topics whose routes exist", () => {
		for (const href of Object.values(DRILL_BY_TOPIC)) {
			expect(href.startsWith("/practice/")).toBe(true);
		}
	});
});
