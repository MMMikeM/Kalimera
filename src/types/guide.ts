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

export interface GuideSection {
	id: string;
	title: string;
	/** English prose; Greek runs inside it are rendered as Greek automatically. */
	rule: string;
	table?: GuideTable;
	examples?: GuideExample[];
	/** A look-alike that lives elsewhere: `"<section>"` in this guide or `"<guide>/<section>"`. */
	confuse?: { text: string; section: string };
	/** Drill ids from the practice catalogue; empty when no drill covers the section yet. */
	drills: string[];
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
