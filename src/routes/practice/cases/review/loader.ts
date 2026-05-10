import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { CefrLevel } from "@/db.server/enums";
import { getDrillVocabPoolWithFallback } from "@/db.server/queries/drill-pool";
import { getVocabularyWithNominalForms } from "@/db.server/queries/nominal-forms";
import { ensureUserProgress } from "@/db.server/queries/user-progress";
import { adjacentCefrPool } from "@/lib/cefr";
import type { DrillQuestion } from "@/lib/drill/generate-questions";
import { shuffle } from "@/lib/shuffle";
import { requireAuth } from "@/lib/auth-session.server";

const CASE_LABEL: Record<string, string> = {
	nominative: "Doer",
	accusative: "Target",
	genitive: "Owner",
};

const NUMBER_LABEL: Record<string, string> = {
	singular: "sg",
	plural: "pl",
};

/** Build mixed-case review questions from nominal_forms.
 * Forward direction: English (with case + gender hint) → type the Greek phrase.
 * Vocab pool is rolling: top-N unmastered lemmas at the user's CEFR band. */
async function getNominalReviewQuestionsImpl(
	userId: number,
	wordType: "noun" | "adjective",
	drillId: string,
	limit: number,
): Promise<DrillQuestion[]> {
	const progress = await ensureUserProgress(userId);
	const currentCefrLevel = progress.currentCefrLevel as CefrLevel;

	const pool = await getDrillVocabPoolWithFallback({
		userId,
		drillId,
		wordType,
		cefrPool: adjacentCefrPool(currentCefrLevel),
	});

	if (pool.vocabularyIds.length === 0) return [];

	const rows = await getVocabularyWithNominalForms(wordType, pool.vocabularyIds);

	const questions: DrillQuestion[] = [];
	for (const vocab of rows) {
		for (const form of vocab.nominalForms) {
			const caseHint = CASE_LABEL[form.grammaticalCase] ?? form.grammaticalCase;
			const numberHint = NUMBER_LABEL[form.number] ?? form.number;
			const genderHint = form.gender ? `, ${form.gender.charAt(0)}` : "";
			const greekFull = form.article ? `${form.article} ${form.form}` : form.form;
			questions.push({
				id: `nominal-${wordType}-${vocab.id}-${caseHint}-${numberHint}-${form.gender ?? "x"}`,
				prompt: `${vocab.englishTranslation} (${caseHint}, ${numberHint}${genderHint})`,
				correctGreek: greekFull,
				timeLimit: 5000,
				vocabularyId: vocab.id,
			});
		}
	}

	return shuffle(questions).slice(0, limit);
}

export const getNominalReviewQuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			wordType: z.enum(["noun", "adjective"]),
			drillId: z.string(),
			limit: z.number(),
		}),
	)
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getNominalReviewQuestionsImpl(userId, data.wordType, data.drillId, data.limit);
	});
