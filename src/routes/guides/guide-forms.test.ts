import { describe, expect, it } from "vite-plus/test";

import {
	EMPHATIC_PRONOUNS,
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
	SUBJECT_PRONOUNS,
} from "@/constants/pronouns";
import { declineAdjective } from "@/lib/adjective-declension";
import { getArticleForWord } from "@/lib/greek-grammar";
import { declineNoun } from "@/lib/noun-declension";
import {
	type AdjectiveDeclensionPattern,
	type Gender,
	genders,
	type GrammaticalNumber,
	type NominalCase,
	type NounDeclensionPattern,
} from "@/server/db/enums";
import type { GuideCell, GuideTable } from "@/types/guide";

import { TAUGHT_IN } from "../learn/tables/taught-in.data";
import { findGuide, resolveSectionRef } from "./guides.data";

/** Where a guide table lives: a section's own table, or the table of one of its details. */
interface Where {
	guide: string;
	section: string;
	detail?: string;
}

const tableAt = ({ guide, section, detail }: Where): GuideTable => {
	const found = findGuide(guide)?.sections.find((s) => s.id === section);
	const table = detail ? found?.details?.find((d) => d.label === detail)?.table : found?.table;
	if (!table) throw new Error(`No table at ${guide}/${section}${detail ? ` (${detail})` : ""}`);
	return table;
};

const textOf = (cell: GuideCell) => (typeof cell === "string" ? cell : cell.text);

/** `undefined` skips a cell the generators do not own, such as a meaning column. */
type Expected = (string | undefined)[][];

const expectCells = (where: Where, expected: Expected) => {
	const rows = tableAt(where).rows.map((row) => row.map(textOf));
	expect(rows).toHaveLength(expected.length);
	expected.forEach((expectedRow, r) => {
		expectedRow.forEach((want, c) => {
			if (want !== undefined) expect(rows[r]?.[c], `row ${r}, column ${c}`).toBe(want);
		});
	});
};

const declinedNoun = (
	lemma: string,
	pattern: NounDeclensionPattern,
	grammaticalCase: NominalCase,
	number: GrammaticalNumber,
) => {
	const form = declineNoun(lemma, pattern).find((f) => f.case === grammaticalCase && f.number === number);
	if (!form) throw new Error(`${lemma} has no ${grammaticalCase} ${number}`);
	return form;
};

const nounForm = (...args: Parameters<typeof declinedNoun>): string => declinedNoun(...args).full;

const adjectiveForm = (
	lemma: string,
	pattern: AdjectiveDeclensionPattern,
	grammaticalCase: NominalCase,
	number: GrammaticalNumber,
	gender: Gender,
): string => {
	const form = declineAdjective(lemma, pattern).find(
		(f) => f.case === grammaticalCase && f.number === number && f.gender === gender,
	);
	if (!form) throw new Error(`${lemma} has no ${grammaticalCase} ${number} ${gender}`);
	return form.form;
};

interface Noun {
	lemma: string;
	pattern: NounDeclensionPattern;
}

const JOBS = [
	["Doer", "nominative"],
	["Target", "accusative"],
	["Owner", "genitive"],
] as const;

/** One column per noun, singular rows Doer, Target, Owner above plural rows Doers, Targets, Owners. */
const jobGrid = (nouns: Noun[]): Expected => [
	...JOBS.map(([label, c]) => [label, ...nouns.map((n) => nounForm(n.lemma, n.pattern, c, "singular"))]),
	...JOBS.map(([label, c]) => [`${label}s`, ...nouns.map((n) => nounForm(n.lemma, n.pattern, c, "plural"))]),
];

const GENDER_NOUNS: Record<Gender, Noun> = {
	masculine: { lemma: "σκύλος", pattern: "masc-os" },
	feminine: { lemma: "γάτα", pattern: "fem-a" },
	neuter: { lemma: "παιδί", pattern: "neut-i" },
};

describe("guide paradigms against the generators", () => {
	describe("articles", () => {
		const articleTables = [
			{ where: { guide: "roles", section: "articles" }, number: "singular", jobs: JOBS.slice(0, 2) },
			{ where: { guide: "roles", section: "plural" }, number: "plural", jobs: JOBS.slice(0, 2) },
		] as const;

		it.each(articleTables)("$where.section matches getArticleForWord", ({ where, number, jobs }) => {
			expectCells(
				where,
				jobs.map(([label, c]) => [
					label,
					...genders.map((g) => nounForm(GENDER_NOUNS[g].lemma, GENDER_NOUNS[g].pattern, c, number)),
				]),
			);
			for (const [r, [, c]] of jobs.entries()) {
				genders.forEach((gender, i) => {
					const [article = "", ...word] = textOf(tableAt(where).rows[r]![i + 1]!).split(" ");
					expect(article, `${gender} ${c} ${number}`).toBe(
						getArticleForWord(gender, number, c, word.join(" ")),
					);
				});
			}
		});

		it("roles/owner shows every article of its noun", () => {
			const noun = { lemma: "γιατρός", pattern: "masc-os" } as const;
			expectCells(
				{ guide: "roles", section: "owner" },
				JOBS.map(([label, c]) => [
					label,
					nounForm(noun.lemma, noun.pattern, c, "singular"),
					nounForm(noun.lemma, noun.pattern, c, "plural"),
				]),
			);
		});

		it("roles/target keeps the plain and Target forms of each noun", () => {
			const nouns: Noun[] = [
				{ lemma: "φίλος", pattern: "masc-os" },
				{ lemma: "Δευτέρα", pattern: "fem-a" },
				{ lemma: "πρωί", pattern: "neut-i" },
				{ lemma: "Ιούλιος", pattern: "masc-os" },
			];
			expectCells(
				{ guide: "roles", section: "target" },
				nouns.map((n) => [
					nounForm(n.lemma, n.pattern, "nominative", "singular"),
					nounForm(n.lemma, n.pattern, "accusative", "singular"),
				]),
			);
		});
	});

	describe("nouns", () => {
		it.each([
			[
				"nouns/families",
				[
					{ lemma: "φίλος", pattern: "masc-os" },
					{ lemma: "πατέρας", pattern: "masc-as" },
					{ lemma: "μαθητής", pattern: "masc-is" },
				],
			],
			[
				"nouns/families-a-i",
				[
					{ lemma: "γυναίκα", pattern: "fem-a" },
					{ lemma: "ζωή", pattern: "fem-i" },
				],
			],
			[
				"nouns/families-o-i",
				[
					{ lemma: "βιβλίο", pattern: "neut-o" },
					{ lemma: "παιδί", pattern: "neut-i" },
					{ lemma: "όνομα", pattern: "neut-ma" },
				],
			],
		] as [string, Noun[]][])("%s matches declineNoun", (ref, nouns) => {
			const [guide, section] = ref.split("/") as [string, string];
			expectCells({ guide, section }, jobGrid(nouns));
		});

		it("owner-calling/owner matches declineNoun", () => {
			const nouns: Noun[] = [
				{ lemma: "φίλος", pattern: "masc-os" },
				{ lemma: "πατέρας", pattern: "masc-as" },
				{ lemma: "γυναίκα", pattern: "fem-a" },
				{ lemma: "πόλη", pattern: "fem-i-archaic" },
				{ lemma: "παιδί", pattern: "neut-i" },
				{ lemma: "όνομα", pattern: "neut-ma" },
				{ lemma: "λάθος", pattern: "neut-os" },
			];
			expectCells(
				{ guide: "owner-calling", section: "owner" },
				nouns.map((n) => [
					nounForm(n.lemma, n.pattern, "nominative", "singular"),
					nounForm(n.lemma, n.pattern, "genitive", "singular"),
					nounForm(n.lemma, n.pattern, "genitive", "plural"),
				]),
			);
		});

		it("noun-exceptions plurals match declineNoun", () => {
			const pair = (lemma: string, pattern: NounDeclensionPattern) => [
				nounForm(lemma, pattern, "nominative", "singular"),
				nounForm(lemma, pattern, "nominative", "plural"),
			];
			expectCells({ guide: "noun-exceptions", section: "extra-syllable", detail: "Feminines in -η with a plural in -εις" }, [
				pair("πόλη", "fem-i-archaic"),
				pair("θέση", "fem-si"),
				pair("λέξη", "fem-ksi"),
			]);
		});
	});

	describe("adjectives", () => {
		it("agreement/adjectives matches declineAdjective beside declineNoun", () => {
			const phrase = (
				adjective: [string, AdjectiveDeclensionPattern],
				noun: Noun,
				gender: Gender,
				number: GrammaticalNumber,
			) =>
				`${adjectiveForm(adjective[0], adjective[1], "nominative", number, gender)} ${declinedNoun(noun.lemma, noun.pattern, "nominative", number).noun}`;
			const rows = [
				["masculine", ["καλός", "os-i-o"], { lemma: "φίλος", pattern: "masc-os" }],
				["feminine", ["μεγάλος", "os-i-o"], { lemma: "πόλη", pattern: "fem-i-archaic" }],
				["neuter", ["καλός", "os-i-o"], { lemma: "παιδί", pattern: "neut-i" }],
			] as [Gender, [string, AdjectiveDeclensionPattern], Noun][];
			expectCells(
				{ guide: "agreement", section: "adjectives" },
				rows.map(([gender, adjective, noun]) => [
					gender,
					phrase(adjective, noun, gender, "singular"),
					phrase(adjective, noun, gender, "plural"),
				]),
			);
		});

		it("agreement/adjectives -ης detail matches declineAdjective", () => {
			expectCells(
				{ guide: "agreement", section: "adjectives", detail: "Adjectives in -ης" },
				genders.map((g) => [
					g,
					adjectiveForm("θορυβώδης", "is-is-es", "nominative", "singular", g),
					adjectiveForm("θορυβώδης", "is-is-es", "nominative", "plural", g),
				]),
			);
		});

		it("agreement/adjective-jobs wraps declineAdjective and declineNoun in the article", () => {
			const columns = [
				["masculine", "καλός", { lemma: "φίλος", pattern: "masc-os" }],
				["feminine", "μεγάλος", { lemma: "πόλη", pattern: "fem-i-archaic" }],
				["neuter", "καλός", { lemma: "παιδί", pattern: "neut-i" }],
			] as [Gender, string, Noun][];
			expectCells(
				{ guide: "agreement", section: "adjective-jobs" },
				JOBS.map(([label, c]) => [
					label,
					...columns.map(([gender, lemma, noun]) => {
						const adjective = adjectiveForm(lemma, "os-i-o", c, "singular", gender);
						const word = declinedNoun(noun.lemma, noun.pattern, c, "singular").noun;
						return `${getArticleForWord(gender, "singular", c, adjective)} ${adjective} ${word}`;
					}),
				]),
			);
		});

		it("agreement/adjective-shapes matches declineAdjective", () => {
			const lemmas: [string, AdjectiveDeclensionPattern][] = [
				["ωραίος", "os-ia-o"],
				["παλιός", "os-ia-o"],
				["νέος", "os-ia-o"],
				["όγδοος", "os-i-o"],
				["βαρύς", "us-ia-u"],
				["μακρύς", "us-ia-u"],
			];
			expectCells(
				{ guide: "agreement", section: "adjective-shapes" },
				lemmas.map(([lemma, pattern]) =>
					genders.map((g) => adjectiveForm(lemma, pattern, "nominative", "singular", g)),
				),
			);
		});

		it("agreement/colours matches declineAdjective for the colour that agrees and those that do not", () => {
			const agreeing: [string, AdjectiveDeclensionPattern][] = [["κόκκινος", "os-i-o"]];
			const fixed: [string, AdjectiveDeclensionPattern][] = ["μπλε", "ροζ", "γκρι", "καφέ"].map((l) => [l, "indeclinable"]);
			expectCells(
				{ guide: "agreement", section: "colours" },
				[...agreeing, ...fixed].map(([lemma, pattern]) =>
					genders.map((g) => adjectiveForm(lemma, pattern, "nominative", "singular", g)),
				),
			);
		});
	});

	describe("pronouns", () => {
		const possessives = [
			...POSSESSIVE_PRONOUNS.slice(0, 4).map((p) => p.singular.greek),
			...POSSESSIVE_PRONOUNS.slice(0, 3).map((p) => p.plural.greek),
		];

		it("little-words/forms lists the possessive pronouns, after a noun and before a verb", () => {
			const rows = tableAt({ guide: "little-words", section: "forms" }).rows.map((row) => row.map(textOf));
			expect(rows.map((row) => row[0])).toEqual(possessives);
			rows.forEach((row, i) => {
				expect(row[1]).toBe(`το σπίτι ${possessives[i]}`);
				expect(row[2]?.split(" ")[0]).toBe(possessives[i]);
			});
		});

		it("little-words/objects opens with each object pronoun in paradigm order", () => {
			const objects = [
				...OBJECT_PRONOUNS.map((p) => p.singular.greek),
				...OBJECT_PRONOUNS.map((p) => p.plural.greek),
			];
			const rows = tableAt({ guide: "little-words", section: "objects" }).rows.map((row) => textOf(row[0]!));
			expect(rows.slice(0, objects.length).map((greek) => greek.split(" ")[0])).toEqual(objects);
		});

		it("little-words/long-forms pairs each Doer form with its long Target form", () => {
			const doers = SUBJECT_PRONOUNS.slice(0, 4).map((p) => p.singular.greek).concat(SUBJECT_PRONOUNS[0]!.plural.greek);
			const longs = EMPHATIC_PRONOUNS.slice(0, 4).map((p) => p.singular).concat(EMPHATIC_PRONOUNS[0]!.plural);
			const rows = tableAt({ guide: "little-words", section: "long-forms" }).rows.map((row) => row.map(textOf));
			expect(rows.map((row) => row[0])).toEqual(doers);
			rows.forEach((row, i) => {
				const word = row[1]?.split(" ").at(-1);
				expect([longs[i]!.greek, longs[i]!.alt], row[1]).toContain(word);
			});
		});
	});
});

describe("reference tables", () => {
	it.each(Object.entries(TAUGHT_IN))("links %s to a real guide section with its title", (_, ref) => {
		const found = resolveSectionRef(`${ref.guide}/${ref.section}`, findGuide(ref.guide)!);
		expect(found?.section.title).toBe(ref.title);
	});
});
