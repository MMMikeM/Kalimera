import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { typedKeys } from "@/lib/object";
import { requireAuth } from "@/server/auth/session";

import type { ConjugationDrill } from "./verbs.server";
import {
	getTenseLadderQuestions,
	getTenseRecognitionQuestions,
	getVerbConjugationQuestions,
} from "./verbs.server";

/** Conjugation drills differ only in tense, question id prefix and kind. */
const CONJUGATION_DRILLS = {
	"verbs-present": { tense: "present", idPrefix: "db-verb-", kind: "conjugation" },
	"verbs-vocabulary-sg1": { tense: "present", idPrefix: "db-verb-sg1-", kind: "vocabulary" },
	"verbs-aorist-conjugation": { tense: "aorist", idPrefix: "db-verb-aorist-", kind: "conjugation" },
	"verbs-aorist-sg1": { tense: "aorist", idPrefix: "db-verb-aor-sg1-", kind: "vocabulary" },
	"verbs-future-conjugation": { tense: "future", idPrefix: "db-verb-future-", kind: "conjugation" },
	"verbs-future-sg1": { tense: "future", idPrefix: "db-verb-fut-sg1-", kind: "vocabulary" },
} as const satisfies Record<string, ConjugationDrill>;

export const getVerbDrillQuestionsFn = createServerFn({ method: "GET" })
	.validator(
		z.object({
			drillId: z.enum([
				...typedKeys(CONJUGATION_DRILLS),
				"verbs-tense-ladder",
				"verbs-tense-recognition",
			]),
			limit: z.number(),
		}),
	)
	.handler(async ({ data: { drillId, limit } }) => {
		const { userId } = await requireAuth();
		switch (drillId) {
			case "verbs-tense-ladder":
				return getTenseLadderQuestions(userId, limit);
			case "verbs-tense-recognition":
				return getTenseRecognitionQuestions(userId, limit);
			default:
				return getVerbConjugationQuestions(userId, drillId, limit, CONJUGATION_DRILLS[drillId]);
		}
	});
