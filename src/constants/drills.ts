import type { FileRoutesByTo } from "@/routeTree.gen";

export type DrillCategory =
	| "articles"
	| "nouns"
	| "adjectives"
	| "phrases"
	| "verbs"
	| "pronouns"
	| "blocks";

export type CaseRole = "doer" | "target" | "owner" | "mixed" | null;

/**
 * One drill, named once.
 *
 * The drill screen, its group's index page and the review queue all read this
 * entry. They used to each carry their own copy: 23 of 39 registry labels
 * disagreed with the drill's own title, 14 index titles disagreed again, and
 * nine drills were absent from the registry altogether, which silently dropped
 * them from review. A drill has one name because it has one entry.
 *
 * Entries live with the group they belong to (`practice/<group>/drills.data.ts`).
 * `drill-catalogue.data.ts` derives the by-id lookup from those owners.
 */
export interface DrillEntry {
	/** Matches the `drillId` the route passes to `<Drill>`; the key attempts are recorded under. */
	id: string;
	to: keyof FileRoutesByTo;
	title: string;
	/** Sample forms shown beneath the title in a drill list. */
	greek: string;
	minutes: number;
	category: DrillCategory;
	caseRole: CaseRole;
}

/** A drill list broken into labelled sections on its index page. */
export interface DrillPhase {
	phase: string;
	drills: DrillEntry[];
}

export const DRILL_CATEGORY_LABELS: Record<DrillCategory, string> = {
	articles: "Articles",
	nouns: "Nouns",
	adjectives: "Adjectives",
	phrases: "Phrases",
	verbs: "Verbs",
	pronouns: "Pronouns",
	blocks: "Building Blocks",
};
