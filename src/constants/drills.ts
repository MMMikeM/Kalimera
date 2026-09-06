import type { CaseRoleName } from "@/constants/grammar-palette";
import type { FileRoutesByTo } from "@/routeTree.gen";

export type DrillCategory =
	| "articles"
	| "nouns"
	| "adjectives"
	| "phrases"
	| "verbs"
	| "pronouns"
	| "blocks";

export type CaseRole = CaseRoleName | "mixed" | null;

/**
 * One drill, named once — the drill screen, its group's index and the review
 * queue all read this entry. Entries live with their group in
 * `practice/<group>/drills.data.ts`; `drill-catalogue.data.ts` derives the lookup.
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
