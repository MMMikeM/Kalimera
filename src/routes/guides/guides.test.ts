import { describe, expect, it } from "vite-plus/test";

import { DRILL_REGISTRY } from "@/routes/practice/drill-catalogue.data";
import { countLessons, getLessonNotes } from "@/server/fns/guides.server";
import type { GuideCell, GuideSection } from "@/types/guide";

import { GUIDES, resolveSectionRef, sectionExamples, sectionTables } from "./guides.data";

describe("guides", () => {
	it("gives every guide and every section within it a unique id", () => {
		const slugs = GUIDES.map((g) => g.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const guide of GUIDES) {
			const ids = guide.sections.map((s) => s.id);
			expect(new Set(ids).size, guide.slug).toBe(ids.length);
		}
	});

	it("points every practice link at a drill that exists", () => {
		const unknown = GUIDES.flatMap((g) =>
			g.sections.flatMap((s) =>
				s.drills.filter((id) => !DRILL_REGISTRY[id]).map((id) => `${g.slug}/${s.id}: ${id}`),
			),
		);
		expect(unknown).toEqual([]);
	});

	it("drops a planned drill once a real drill takes its id", () => {
		const built = GUIDES.flatMap((g) =>
			g.sections.flatMap((s) =>
				(s.plannedDrills ?? []).filter((d) => DRILL_REGISTRY[d.id]).map((d) => `${g.slug}/${s.id}: ${d.id}`),
			),
		);
		expect(built).toEqual([]);
	});

	it("gives every planned drill a unique id", () => {
		const ids = GUIDES.flatMap((g) => g.sections.flatMap((s) => (s.plannedDrills ?? []).map((d) => d.id)));
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("points every don't-confuse box at a real section", () => {
		const broken = GUIDES.flatMap((g) =>
			g.sections
				.filter((s) => s.confuse && !resolveSectionRef(s.confuse.section, g))
				.map((s) => `${g.slug}/${s.id} → ${s.confuse?.section}`),
		);
		expect(broken).toEqual([]);
	});

	// A mark whose text is missing from its Greek is dropped without a trace
	it("finds every mark's text in its Greek, in order", () => {
		const lost: string[] = [];
		const check = (where: string, text: string, marks: { text: string }[] = []) => {
			let cursor = 0;
			for (const m of marks) {
				const at = text.indexOf(m.text, cursor);
				if (at === -1) lost.push(`${where}: "${m.text}" in "${text}"`);
				else cursor = at + m.text.length;
			}
		};
		for (const g of GUIDES) {
			for (const s of g.sections) {
				for (const e of sectionExamples(s)) check(`${g.slug}/${s.id}`, e.greek, e.marks);
				for (const row of sectionTables(s).flatMap((t) => t.rows)) {
					for (const cell of row) if (typeof cell !== "string") check(`${g.slug}/${s.id}`, cell.text, cell.marks);
				}
			}
		}
		expect(lost).toEqual([]);
	});

	it("gives every detail within a section a unique label", () => {
		const repeated = GUIDES.flatMap((g) =>
			g.sections
				.filter((s) => {
					const labels = (s.details ?? []).map((d) => d.label);
					return new Set(labels).size !== labels.length;
				})
				.map((s) => `${g.slug}/${s.id}`),
		);
		expect(repeated).toEqual([]);
	});

	const textsOf = (s: GuideSection) =>
		[s.rule, ...(s.details ?? []).map((d) => d.text), ...(s.confuse ? [s.confuse.text] : [])].flatMap((t) =>
			typeof t === "string" ? [t] : t.flat(),
		);

	// An unmatched _ renders literally instead of as emphasis
	it("pairs every emphasis marker in guide text", () => {
		const odd = GUIDES.flatMap((g) =>
			g.sections.flatMap((s) =>
				textsOf(s)
					.filter((text) => (text.match(/_/g) ?? []).length % 2 !== 0)
					.map(() => `${g.slug}/${s.id}`),
			),
		);
		expect(odd).toEqual([]);
	});

	// Paragraphs and lists are array structure; a newline inside a string would render as a space
	it("keeps newlines out of guide text", () => {
		const broken = GUIDES.flatMap((g) =>
			g.sections.filter((s) => textsOf(s).some((text) => text.includes("\n"))).map((s) => `${g.slug}/${s.id}`),
		);
		expect(broken).toEqual([]);
	});

	// A note marks a form that breaks the table's pattern and says why; marked
	// too often it stops standing out.
	describe("table notes", () => {
		const tables = GUIDES.flatMap((g) =>
			g.sections.flatMap((s) =>
				sectionTables(s).map((table) => {
					const noteOf = (cell: GuideCell) => (typeof cell === "string" ? undefined : cell.note);
					const used = table.rows.flat().map(noteOf).filter((n) => n !== undefined);
					return { at: `${g.slug}/${s.id}`, notes: table.notes ?? [], used };
				}),
			),
		);

		it("points every marked form at a note that exists", () => {
			expect(tables.filter((t) => t.used.some((n) => n < 0 || n >= t.notes.length)).map((t) => t.at)).toEqual([]);
		});

		it("uses every note", () => {
			expect(tables.filter((t) => t.notes.some((_, i) => !t.used.includes(i))).map((t) => t.at)).toEqual([]);
		});

		it("marks at most three forms in a table", () => {
			expect(tables.filter((t) => t.used.length > 3).map((t) => t.at)).toEqual([]);
		});
	});

	it("gives a section either one table or several captioned ones", () => {
		const wrong = GUIDES.flatMap((g) =>
			g.sections
				.filter((s) => (s.table && s.tables) || s.tables?.some((t) => !t.caption))
				.map((s) => `${g.slug}/${s.id}`),
		);
		expect(wrong).toEqual([]);
	});

	it("gives every table row one cell per column", () => {
		const ragged = GUIDES.flatMap((g) =>
			g.sections
				.filter((s) => sectionTables(s).some((t) => t.rows.some((row) => row.length !== t.columns.length)))
				.map((s) => `${g.slug}/${s.id}`),
		);
		expect(ragged).toEqual([]);
	});
});

describe("lesson grammar notes", () => {
	// A glob that matches nothing returns {} rather than failing, which would
	// quietly empty every "From lessons" line.
	it("reads every dated lesson file", () => {
		expect(countLessons()).toBeGreaterThanOrEqual(51);
		expect(getLessonNotes().length).toBeGreaterThanOrEqual(119);
	});

	// A note with nowhere to live is how lesson material turned into a pile.
	it("sends every note to a guide section, a word entry, or Essentials", () => {
		const homeless = getLessonNotes()
			.filter((note) => note.section !== "word" && note.section !== "essentials")
			.filter((note) => {
				const [guideSlug] = note.section.split("/");
				const guide = GUIDES.find((g) => g.slug === guideSlug);
				return !guide || !resolveSectionRef(note.section, guide);
			})
			.map((note) => `${note.date}: ${note.section}`);
		expect(homeless).toEqual([]);
	});
});
