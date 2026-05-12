import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { adjacentCefrPool } from "@/lib/cefr";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import { requireAuth } from "@/server/auth/session";
import type { CefrLevel } from "@/server/db/enums";
import { getDrillVocabPoolWithFallback } from "@/server/db/queries/drill-pool";
import { getVocabularyWithNominalForms } from "@/server/db/queries/nominal-forms";
import { ensureUserProgress } from "@/server/db/queries/user-progress";

import type { SimpleListItem } from "../../routes/practice/components/engines/deck";

/** Build SimpleListItem[] for a single case drill (nominative / accusative / genitive).
 *  Pool is SRS-aware: nouns the user has been exposed to in their CEFR band. */
async function getNounDrillItemsImpl(
	userId: number,
	grammaticalCase: "nominative" | "accusative" | "genitive",
	drillId: string,
	{ stripArticleForReverse = false } = {},
): Promise<SimpleListItem[]> {
	const progress = await ensureUserProgress(userId);
	const currentCefrLevel = progress.currentCefrLevel as CefrLevel;

	const pool = await getDrillVocabPoolWithFallback({
		userId,
		drillId,
		wordType: "noun",
		cefrPool: adjacentCefrPool(currentCefrLevel),
	});

	if (pool.vocabularyIds.length === 0) return [];

	const rows = await getVocabularyWithNominalForms("noun", pool.vocabularyIds);

	const items: SimpleListItem[] = [];
	for (const vocab of rows) {
		const form = vocab.nominalForms.find(
			(f) => f.grammaticalCase === grammaticalCase && f.number === "singular",
		);
		if (!form) continue;

		const gender = vocab.nounDetails?.gender ?? "neuter";
		const greekFull = form.article ? `${form.article} ${form.form}` : form.form;

		items.push({
			id: `noun-${vocab.id}-${grammaticalCase}`,
			greek: greekFull,
			greeklish: greekToPhonetic(greekFull),
			english: vocab.englishTranslation,
			label: vocab.englishTranslation,
			category: gender,
			dimension: gender,
			reverseGreek: stripArticleForReverse ? form.form : greekFull,
		});
	}

	return items;
}

export const getNounDrillItemsFn = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			grammaticalCase: z.enum(["nominative", "accusative", "genitive"]),
			drillId: z.string(),
			stripArticleForReverse: z.boolean().optional(),
		}),
	)
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return await getNounDrillItemsImpl(userId, data.grammaticalCase, data.drillId, {
			stripArticleForReverse: data.stripArticleForReverse,
		});
	});
