import { describe, expect, it } from "vite-plus/test";

import type { ConjugationFamily } from "@/lib/greek-grammar";
import { generateConjugations } from "@/scripts/generate-conjugations";
import { personNumbers, type VerbTense } from "@/server/db/enums";
import type { GuideCell, GuideTable } from "@/types/guide";

import { findGuide } from "./guides.data";

type Tense = Exclude<VerbTense, "past_continuous">;

const cellText = (cell: GuideCell | undefined) => (typeof cell === "string" ? cell : cell?.text);

const guideTable = (guideSlug: string, sectionId: string): GuideTable => {
	const table = findGuide(guideSlug)?.sections.find((s) => s.id === sectionId)?.table;
	if (!table) throw new Error(`${guideSlug}/${sectionId} has no table`);
	return table;
};

/** The six forms in the column whose first row is `firstForm`. */
const guideColumn = (table: GuideTable, firstForm: string) => {
	const col = table.rows[0]?.findIndex((cell) => cellText(cell) === firstForm) ?? -1;
	if (col === -1) throw new Error(`no column starts with ${firstForm}`);
	return table.rows.map((row) => cellText(row[col]));
};

const generated = (
	lemma: string,
	aoristStem: string,
	family: ConjugationFamily,
	tense: Tense,
): string[] => {
	const forms = generateConjugations(lemma, aoristStem, family).find((c) => c.tense === tense)!
		.forms;
	return personNumbers.map((p) => forms[p]);
};

interface ParadigmCase {
	name: string;
	guide: string;
	section: string;
	tense: Tense;
	/** The form that opens the guide's column: the I form of the tense. */
	firstForm: string;
	lemma: string;
	aoristStem: string;
	family: ConjugationFamily;
}

const PARADIGMS: ParadigmCase[] = [
	{ name: "γράφω present", guide: "verbs", section: "present", tense: "present", firstForm: "γράφω", lemma: "γράφω", aoristStem: "γραψ", family: "-ω" },
	{ name: "μιλάω present", guide: "verbs", section: "present", tense: "present", firstForm: "μιλάω", lemma: "μιλάω", aoristStem: "μιλησ", family: "-άω" },
	{ name: "μπορώ present", guide: "verbs", section: "o-verbs", tense: "present", firstForm: "μπορώ", lemma: "μπορώ", aoristStem: "μπορεσ", family: "-ώ" },
	{ name: "οδηγώ present", guide: "verbs", section: "o-verbs", tense: "present", firstForm: "οδηγώ", lemma: "οδηγώ", aoristStem: "οδηγησ", family: "-ώ" },
	{ name: "θυμάμαι present", guide: "verbs", section: "amai-verbs", tense: "present", firstForm: "θυμάμαι", lemma: "θυμάμαι", aoristStem: "θυμ", family: "-άμαι" },
	{ name: "θυμάμαι future", guide: "verbs", section: "amai-verbs", tense: "future", firstForm: "θα θυμηθώ", lemma: "θυμάμαι", aoristStem: "θυμ", family: "-άμαι" },
	{ name: "δουλεύω simple past", guide: "past", section: "past-endings", tense: "aorist", firstForm: "δούλεψα", lemma: "δουλεύω", aoristStem: "δουλεψ", family: "-ω" },
	{ name: "γράφω simple past", guide: "past", section: "past-endings", tense: "aorist", firstForm: "έγραψα", lemma: "γράφω", aoristStem: "γραψ", family: "-ω" },
];

describe("guide verb paradigms match the generator", () => {
	for (const c of PARADIGMS) {
		it(c.name, () => {
			const table = guideTable(c.guide, c.section);
			expect(guideColumn(table, c.firstForm)).toEqual(
				generated(c.lemma, c.aoristStem, c.family, c.tense),
			);
		});
	}
});

describe("guide stem table matches the generator", () => {
	const STEMS: Array<[string, string, ConjugationFamily]> = [
		["ακούω", "ακουσ", "-ω"],
		["μιλάω", "μιλησ", "-άω"],
		["δοκιμάζω", "δοκιμασ", "-ω"],
		["πληρώνω", "πληρωσ", "-ω"],
		["δουλεύω", "δουλεψ", "-ω"],
		["γράφω", "γραψ", "-ω"],
		["κόβω", "κοψ", "-ω"],
		["τρέχω", "τρεξ", "-ω"],
		["ανοίγω", "ανοιξ", "-ω"],
		["ψάχνω", "ψαξ", "-ω"],
	];

	it("gives the I form of the simple past for every regular verb in it", () => {
		const rows = guideTable("past", "past-shapes").rows;
		for (const [lemma, stem, family] of STEMS) {
			const row = rows.find((r) => cellText(r[0]) === lemma);
			expect(row, lemma).toBeDefined();
			expect(cellText(row![1]), lemma).toBe(generated(lemma, stem, family, "aorist")[0]);
		}
	});
});
