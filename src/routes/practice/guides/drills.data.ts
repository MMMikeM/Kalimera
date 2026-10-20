import type { DrillEntry } from "@/constants/drills";

import { AGREEMENT_DRILLS } from "./agreement/drills.data";
import { FUTURE_COMMANDS_DRILLS } from "./future-commands/drills.data";
import { GENDER_DRILLS } from "./gender/drills.data";
import { JOINING_DRILLS } from "./joining/drills.data";
import { LITTLE_WORDS_DRILLS } from "./little-words/drills.data";
import { NO_DOER_DRILLS } from "./no-doer/drills.data";
import { NOUN_EXCEPTIONS_DRILLS } from "./noun-exceptions/drills.data";
import { OWNER_CALLING_DRILLS } from "./owner-calling/drills.data";
import { PLACE_DRILLS } from "./place/drills.data";
import { ROLES_DRILLS } from "./roles/drills.data";
import { SCALES_DRILLS } from "./scales/drills.data";
import { VERBS_DRILLS } from "./verbs/drills.data";

/**
 * Drills that practise one guide section each, keyed by guide slug. Titles for the
 * index come from the guides themselves, so this file stays free of guide content.
 */
export const GUIDE_DRILLS: Record<string, DrillEntry[]> = {
	roles: ROLES_DRILLS,
	gender: GENDER_DRILLS,
	"noun-exceptions": NOUN_EXCEPTIONS_DRILLS,
	agreement: AGREEMENT_DRILLS,
	"owner-calling": OWNER_CALLING_DRILLS,
	verbs: VERBS_DRILLS,
	"future-commands": FUTURE_COMMANDS_DRILLS,
	"little-words": LITTLE_WORDS_DRILLS,
	place: PLACE_DRILLS,
	scales: SCALES_DRILLS,
	joining: JOINING_DRILLS,
	"no-doer": NO_DOER_DRILLS,
};
