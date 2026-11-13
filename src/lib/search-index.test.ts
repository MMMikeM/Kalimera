import { describe, expect, it } from "vite-plus/test";

import fixture from "./search-index.fixture.json";
import { type SearchWireItem, buildSearchIndex } from "./search-index";

// A slice of the production vocabulary: every item the queries below can reach,
// as the server sends it.
const index = buildSearchIndex(fixture as SearchWireItem[]);

const firstGreek = (query: string) => {
	const { words, phrases } = index.search(query);
	return (words[0] ?? phrases[0])?.entry.greek;
};

describe("search finds a word however it was typed", () => {
	it.each([
		["πας", "πάω"],
		["φέρνεις", "φέρνω"],
		["πήγα", "πάω"],
		["είπα", "λέω"],
		["ήρθα", "έρχομαι"],
		["σπιτιού", "το σπίτι"],
		["γυναίκες", "η γυναίκα"],
		["τον καφέ", "ο καφές"],
		["kalimera", "Καλημέρα"],
		["καλημέρα", "Καλημέρα"],
		["efxaristw", "ευχαριστώ"],
		["fernw", "φέρνω"],
		["kafes", "ο καφές"],
		["pao", "πάω"],
		["pou", "πού;"],
		["the key", "το κλειδί"],
		["the house", "το σπίτι"],
		["a coffee", "ο καφές"],
		["to go", "πάω"],
		["go", "πάω"],
		["do", "κάνω"],
	])("%s finds %s first", (query, expected) => {
		expect(firstGreek(query)).toBe(expected);
	});

	it("puts both δουλεύω and δουλειά ahead of everything else for work", () => {
		const top = index.search("work").words.slice(0, 2).map((h) => h.entry.greek);
		expect(top.sort()).toEqual(["δουλεύω", "η δουλειά"]);
	});

	it("finds the past-tense phrase for went", () => {
		expect(index.search("went").phrases[0]?.entry.greek).toBe("πήγα");
	});

	it("finds the phrases that teach like", () => {
		expect(index.search("like").phrases[0]?.entry.greek).toContain("αρέσει");
	});

	it("does not reach words through the tags they carry", () => {
		const { words, phrases } = index.search("past");
		const greek = [...words, ...phrases].map((h) => h.entry.greek);
		expect(greek).not.toContain("σήμερα");
		expect(greek).not.toContain("εχθές");
	});
});

describe("what a hit says about why it matched", () => {
	it("names the form and what it means in plain English", () => {
		expect(index.search("πας").words[0]?.matchedForm).toEqual({ greek: "πας", note: "you go" });
		expect(index.search("πήγα").words[0]?.matchedForm?.note).toBe("past, I");
		expect(index.search("τον καφέ").words[0]?.matchedForm).toEqual({
			greek: "τον καφέ",
			note: "Target",
		});
	});

	it("says nothing when the dictionary word itself matched", () => {
		expect(index.search("fernw").words[0]?.matchedForm).toBeUndefined();
	});

	it("gives a verb its past and future", () => {
		expect(index.search("go").words[0]?.entry.principalParts).toEqual({
			past: "πήγα",
			future: "θα πάω",
		});
	});

	it("carries the page a row opens", () => {
		expect(index.search("kafes").words[0]?.entry.link?.to).toBe("/learn/nouns/$subject");
		expect(index.search("pao").words[0]?.entry.link).toEqual({
			to: "/learn/verbs/$verbId",
			params: { verbId: expect.any(String) },
		});
		expect(index.search("καλημέρα").phrases[0]?.entry.link?.to).toBe("/learn/phrases/$tab");
	});
});

describe("typo correction", () => {
	it("stays silent when something matched literally", () => {
		expect(index.search("kafes").corrected).toBeUndefined();
	});

	it("reports the query it searched when nothing matched", () => {
		expect(index.search("brought").corrected).toBeDefined();
	});

	it("returns nothing for a single character", () => {
		expect(index.search("a")).toEqual({ words: [], phrases: [] });
	});
});

describe("known gaps", () => {
	it.fails("keys: English plurals are not folded, so only a sentence matches", () => {
		expect(firstGreek("keys")).toBe("το κλειδί");
	});

	it.fails("be: είμαι is glossed 'I am', which never contains 'be'", () => {
		expect(firstGreek("be")).toBe("είμαι");
	});

	it.fails("brought: verbs carry no English past-tense glosses", () => {
		expect(firstGreek("brought")).toBe("φέρνω");
	});

	it.fails("how are you: Τι κάνεις; is not in the vocabulary table", () => {
		expect(firstGreek("how are you")).toBe("Τι κάνεις;");
	});

	it.fails("ti kaneis: the plain greeting is not in the vocabulary table", () => {
		expect(firstGreek("ti kaneis")).toBe("Τι κάνεις;");
	});
});
