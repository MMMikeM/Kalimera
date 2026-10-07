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
 * Marks draw the case, number and gender under runs of the text. `note` points a
 * form that breaks the table's pattern at the reason, by index into the table's
 * `notes`.
 */
export type GuideCell = string | { text: string; marks?: GuideMark[]; note?: number };

export interface GuideColumn {
	label: string;
	greek?: boolean;
	/** Colours the header and the column's forms; the guide's `key` says what it means. */
	tone?: GuideTone;
}

export interface GuideTable {
	columns: GuideColumn[];
	rows: GuideCell[][];
	/** Why the forms marked with a `note` break the pattern, shown under the table. */
	notes?: string[];
}

export interface GuideExample {
	greek: string;
	english: string;
	marks?: GuideMark[];
}

/**
 * English prose for a guide. A string is one paragraph; an array holds blocks in
 * order, where each string is a paragraph and each nested array is a bulleted
 * list. Greek runs inside are rendered as Greek automatically, and _word_ is
 * emphasised.
 */
export type GuideText = string | (string | string[])[];

/**
 * An exception, extension or side rule, kept apart from the section's core rule
 * so the rule stays readable on its own. Its examples illustrate it alone.
 */
export interface GuideDetail {
	label: string;
	text: GuideText;
	table?: GuideTable;
	examples?: GuideExample[];
}

export interface GuideSection {
	id: string;
	title: string;
	/**
	 * The core rule, readable by someone who lands on this section alone: it names
	 * what it teaches and defines the terms it uses.
	 */
	rule: GuideText;
	table?: GuideTable;
	/** Examples of the core rule. */
	examples?: GuideExample[];
	details?: GuideDetail[];
	/** A look-alike that lives elsewhere: `"<section>"` in this guide or `"<guide>/<section>"`. */
	confuse?: { text: GuideText; section: string };
	/** Colour of the section's header. Omit it and the section takes the next colour in its guide's cycle. */
	tone?: SectionTone;
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
 * Base-palette colour that identifies a guide. Any tone may sit beside the gender
 * marks: the marks are saturated and the tones pale, so saturation keeps them
 * apart, not hue.
 */
export type GuideTone = ColorScheme;

/**
 * A section's colour: a guide tone, or a gender's pale scale. A gender tone claims
 * the section is about that gender's nouns, so it is only for a section that
 * teaches one gender, where it repeats the colour of the marks inside.
 */
export type SectionTone = GuideTone | `gender-${Gender}`;

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
