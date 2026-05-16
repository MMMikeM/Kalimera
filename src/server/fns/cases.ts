import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { adjacentCefrPool } from "@/lib/cefr";
import type { DrillQuestion } from "@/lib/drill/generate-questions";
import { requireAuth } from "@/server/auth/session";
import type { CefrLevel } from "@/server/db/enums";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import { getVocabularyWithNominalForms } from "@/server/db/queries/nominal-forms";
import { ensureUserProgress } from "@/server/db/queries/user-progress";

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
	_limit: number,
): Promise<DrillQuestion[]> {
	const progress = await ensureUserProgress(userId);
	const currentCefrLevel = progress.currentCefrLevel as CefrLevel;

	const pool = await getDrillVocabPool({
		userId,
		drillId,
		wordType,
		cefrPool: adjacentCefrPool(currentCefrLevel),
	});

	if (pool.length === 0) return [];

	const rows = await getVocabularyWithNominalForms(wordType, pool);
	const idOrder = new Map(pool.map((id, i) => [id, i]));
	rows.sort((a, b) => (idOrder.get(a.id) ?? 999) - (idOrder.get(b.id) ?? 999));

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

	return questions;
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
