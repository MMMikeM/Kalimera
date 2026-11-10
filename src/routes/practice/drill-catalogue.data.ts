import type { DrillEntry, PathStep } from "@/constants/drills";

import { BLOCK_DRILLS } from "./blocks/drills.data";
import { QUESTION_WORD_PHASES } from "./blocks/question-words/drills.data";
import { CASE_PHASES } from "./cases/drills.data";
import { GUIDE_DRILLS } from "./guides/drills.data";
import { PRONOUN_DRILLS } from "./pronouns/drills.data";
import { VERB_PATH, VERB_PHASES } from "./verbs/drills.data";

const uniqueById = (drills: DrillEntry[]) =>
	drills.filter((drill, i) => drills.findIndex((other) => other.id === drill.id) === i);

/** Each practice group's drills, in the order its index page lists them. */
export const GROUP_DRILLS = {
	cases: uniqueById(CASE_PHASES.flatMap((p) => p.drills)),
	pronouns: PRONOUN_DRILLS,
	verbs: uniqueById(VERB_PHASES.flatMap((p) => p.drills)),
	blocks: [...BLOCK_DRILLS, ...QUESTION_WORD_PHASES.flatMap((p) => p.drills)],
	guides: Object.values(GUIDE_DRILLS).flat(),
} satisfies Record<string, DrillEntry[]>;

export type DrillGroup = keyof typeof GROUP_DRILLS;

/**
 * Every practice drill, keyed by the id attempts are recorded under. Derived,
 * never authored: a drill listed on its index page cannot be missing here.
 */
export const DRILL_REGISTRY: Record<string, DrillEntry> = Object.fromEntries(
	Object.values(GROUP_DRILLS)
		.flat()
		.map((drill) => [drill.id, drill]),
);

/** The drill's one name, for the screen that runs it. */
export const drillTitle = (drillId: string): string | undefined => DRILL_REGISTRY[drillId]?.title;

const PATHS: readonly PathStep[][] = [VERB_PATH];

/** The step with this id and the path it belongs to. */
export const findStep = (stepId: string) => {
	for (const path of PATHS) {
		const step = path.find((s) => s.id === stepId);
		if (step) return { step, path };
	}
	return undefined;
};
