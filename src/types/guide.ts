/**
 * A guide gathers one area of Greek into a fixed run of sections, each ending in
 * practice. Lesson grammar notes point at a section by `"<guide>/<section>"`, so
 * a section id is a key other files depend on: rename it and the guard test
 * fails on every note that used it.
 */

/** A deviating form carries the most weight; the anchor is the form the rest derive from. */
export type GuideCell = string | { text: string; weight: "deviate" | "anchor" };

export interface GuideColumn {
	label: string;
	greek?: boolean;
}

export interface GuideTable {
	columns: GuideColumn[];
	rows: GuideCell[][];
}

export interface GuideExample {
	greek: string;
	english: string;
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

export interface Guide {
	slug: string;
	title: string;
	greek: string;
	description: string;
	/** The whole guide in one sentence, shown above its contents. */
	idea: string;
	sections: GuideSection[];
	/** Full paradigm tables that still live on the reference pages. */
	reference: GuideReference[];
}

export interface GuideLessonSource {
	date: string;
	topic: string;
}
