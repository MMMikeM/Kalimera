import { beforeAll, describe, expect, it, vi } from "vitest";

import { tags, vocabulary, vocabularyTags } from "@/server/db/schema-language";
import { createTestDb, runMigrations } from "@/test/db";

let testDbInstance: ReturnType<typeof createTestDb>["db"];

vi.mock("@/server/db", () => ({
	get db() {
		return testDbInstance;
	},
}));

// The Patterns tab reads the likes construction out of the *verbs* tag section,
// but every item tagged there is a full phrase (μου αρέσει ο καφές). Filtering
// the nested vocabulary to wordType "verb" nulls all of them and the card
// renders two empty columns — which is what production was doing.

beforeAll(async () => {
	const { db, client } = createTestDb();
	testDbInstance = db;
	await runMigrations(client);

	const [singular, plural] = await db
		.insert(tags)
		.values([
			{ slug: "likes-singular", name: "Likes (singular)", section: "verbs" },
			{ slug: "likes-plural", name: "Likes (plural)", section: "verbs" },
		])
		.returning();

	const inserted = await db
		.insert(vocabulary)
		.values([
			{ greekText: "μου αρέσει ο καφές", englishTranslation: "I like coffee", wordType: "phrase" },
			{ greekText: "μου αρέσουν οι γάτες", englishTranslation: "I like cats", wordType: "phrase" },
		])
		.returning();

	await db.insert(vocabularyTags).values([
		{ vocabularyId: inserted[0]!.id, tagId: singular!.id },
		{ vocabularyId: inserted[1]!.id, tagId: plural!.id },
	]);
}, 60_000);

describe("patterns tab data", () => {
	it("resolves phrase-typed items tagged in the verbs section", async () => {
		const { getVocabBySlug } = await import("@/server/db/queries/vocabulary");
		const { PATTERN_VERB_WORD_TYPES } = await import("./$tab");

		const tagRows = await getVocabBySlug("verbs", [...PATTERN_VERB_WORD_TYPES]);
		const bySlug = Object.fromEntries(
			tagRows.map((t) => [t.slug, t.vocabularyTags.map((vt) => vt.vocabulary).filter(Boolean)]),
		);

		expect(bySlug["likes-singular"]).toHaveLength(1);
		expect(bySlug["likes-plural"]).toHaveLength(1);
	});

	it("filtering to verbs alone loses them — the bug this guards", async () => {
		const { getVocabBySlug } = await import("@/server/db/queries/vocabulary");

		const tagRows = await getVocabBySlug("verbs", ["verb"]);
		const resolved = tagRows.flatMap((t) =>
			t.vocabularyTags.map((vt) => vt.vocabulary).filter(Boolean),
		);

		expect(resolved).toHaveLength(0);
	});
});
