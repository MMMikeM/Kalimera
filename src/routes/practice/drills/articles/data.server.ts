import type { CefrLevel } from "@/db.server/enums";
import { getDrillVocabPoolWithFallback } from "@/db.server/queries/drill-pool";
import { getVocabularyWithNominalForms } from "@/db.server/queries/nominal-forms";
import { ensureUserProgress } from "@/db.server/queries/user-progress";
import { adjacentCefrPool } from "@/lib/cefr";
import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SimpleListItem } from "../../engines/simple-list-drill";

/** Build SimpleListItem[] for a single case drill (nominative / accusative / genitive).
 *  Pool is SRS-aware: nouns the user has been exposed to in their CEFR band. */
export const getNounDrillItems = async (
	userId: number,
	grammaticalCase: "nominative" | "accusative" | "genitive",
	drillId: string,
	{ stripArticleForReverse = false } = {},
): Promise<SimpleListItem[]> => {
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
			label: gender,
			category: gender,
			dimension: gender,
			reverseGreek: stripArticleForReverse ? form.form : greekFull,
		});
	}

	return items;
};
