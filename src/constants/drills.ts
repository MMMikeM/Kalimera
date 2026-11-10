import type { CaseRoleName } from "@/constants/grammar-palette";
import type { StepRule } from "@/lib/step-progress";
import type { FileRoutesByTo } from "@/routeTree.gen";

export type DrillCategory =
	| "articles"
	| "nouns"
	| "adjectives"
	| "phrases"
	| "verbs"
	| "pronouns"
	| "blocks";

type CaseRole = CaseRoleName | "mixed" | null;

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

/** The stages a set of words goes through, from first sight to timed recall. */
export type SetStage = "meet" | "recognise" | "recall" | "recall-timed";

/** One step on a practice path: a whole drill, one filter category of it, or one stage of a set. */
export interface PathStep extends StepRule {
	/** The drill id, `<drill id>:<category>` or `<set id>:<stage>`; progress is recorded under it. */
	id: string;
	drill: DrillEntry;
	title: string;
	greek: string;
	category?: string;
	phase: string;
	set?: { id: string; stage: SetStage };
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
