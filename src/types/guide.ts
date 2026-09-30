/**
 * A guide gathers one area of Greek into a fixed run of sections, each ending in
 * practice. Lesson grammar notes point at a section by `"<guide>/<section>"`, so
 * a section id is a key other files depend on: rename it and the guard test
 * fails on every note that used it.
 */

import type { ColorScheme } from "@/lib/colors";
import type { Gender, GrammaticalCase } from "@/server/db/enums";

/** A run of Greek inside a cell or example that gets a grammar mark under it. */
export interface GuideMark {
	/** Must occur verbatim in the Greek it marks, after any earlier mark. */
	text: string;
	case: GrammaticalCase;
	gender?: Gender;
	plural?: boolean;
}

/**
 * A deviating form carries the most weight; the anchor is the form the rest
 * derive from. Marks draw the case, number and gender under runs of the text.
 */
export type GuideCell =
	| string
	| { text: string; weight?: "deviate" | "anchor"; marks?: GuideMark[] };

export interface GuideColumn {
	label: string;
	greek?: boolean;
	/** Colours the header and the column's forms; the guide's `key` says what it means. */
	tone?: GuideTone;
}

export interface GuideTable {
	columns: GuideColumn[];
	rows: GuideCell[][];
}

export interface GuideExample {
	greek: string;
	english: string;
	marks?: GuideMark[];
}

/**
 * An exception, extension or side rule, kept apart from the section's core rule
 * so the rule stays readable on its own. Its examples illustrate it alone.
 */
export interface GuideDetail {
	label: string;
	/** English prose, like `rule`. */
	text: string;
	examples?: GuideExample[];
}

export interface GuideSection {
	id: string;
	title: string;
	/**
	 * The core rule, readable by someone who lands on this section alone: it names
	 * what it teaches and defines the terms it uses. English prose; Greek runs
	 * inside it are rendered as Greek automatically.
	 */
	rule: string;
	table?: GuideTable;
	/** Examples of the core rule. */
	examples?: GuideExample[];
	details?: GuideDetail[];
	/** A look-alike that lives elsewhere: `"<section>"` in this guide or `"<guide>/<section>"`. */
	confuse?: { text: string; section: string };
	/** Colour of the section's header. Omit it and the section takes the next colour in its guide's cycle. */
	tone?: GuideTone;
	/** Drill ids from the practice catalogue; empty when no drill covers the section yet. */
	drills: string[];
	/** Practice this section needs that no drill covers yet. */
	plannedDrills?: PlannedDrill[];
}

/**
 * A drill that does not exist yet, kept beside the section it would practise.
 * Its id is the one the real drill will take; the guard test fails once a drill
 * with that id is in the catalogue, so building it forces the stub's removal.
 */
export interface PlannedDrill {
	id: string;
	title: string;
	/** Sample forms, as a drill list shows them. */
	greek: string;
	/** What a card asks and what counts as right. */
	tests: string;
}

export interface GuideReference {
	label: string;
	href: string;
}

/**
 * Base-palette colour that identifies a guide. A guide that shows gender marks
 * avoids navy, sunset and slate, which sit close to the masculine, feminine and
 * neuter mark colours and would read as a gender next to them.
 */
export type GuideTone = ColorScheme;

export interface Guide {
	slug: string;
	tone: GuideTone;
	title: string;
	greek: string;
	description: string;
	/** The whole guide in one sentence, shown above its contents. */
	idea: string;
	sections: GuideSection[];
	/** What the column colours mean on this guide, shown near the top. */
	key?: { label: string; tone: GuideTone }[];
	/** Full paradigm tables that still live on the reference pages. */
	reference: GuideReference[];
}
