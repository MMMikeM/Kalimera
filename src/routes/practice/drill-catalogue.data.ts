import type { DrillEntry } from "@/constants/drills";

import { BLOCK_DRILLS } from "./blocks/drills.data";
import { QUESTION_WORD_PHASES } from "./blocks/question-words/drills.data";
import { CASE_PHASES } from "./cases/drills.data";
import { PRONOUN_DRILLS } from "./pronouns/drills.data";
import { VERB_PHASES } from "./verbs/drills.data";

/**
 * Every practice drill, keyed by the id attempts are recorded under. Derived,
 * never authored: a drill listed on its index page cannot be missing here.
 */
const ALL: DrillEntry[] = [
	...CASE_PHASES.flatMap((p) => p.drills),
	...VERB_PHASES.flatMap((p) => p.drills),
	...PRONOUN_DRILLS,
	...BLOCK_DRILLS,
	...QUESTION_WORD_PHASES.flatMap((p) => p.drills),
];

export const DRILL_REGISTRY: Record<string, DrillEntry> = Object.fromEntries(
	ALL.map((drill) => [drill.id, drill]),
);

/** The drill's one name, for the screen that runs it. */
export const drillTitle = (drillId: string): string | undefined => DRILL_REGISTRY[drillId]?.title;
