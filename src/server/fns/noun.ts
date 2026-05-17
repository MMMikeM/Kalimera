import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { adjacentCefrPool } from "@/lib/cefr";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import { typedEntries } from "@/lib/object";
import type { DrillBucket, SimpleListItem } from "@/routes/practice/components/engines/deck";
import { requireAuth } from "@/server/auth/session";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import { getVocabularyWithNominalForms } from "@/server/db/queries/nominal-forms";
import { ensureUserProgress } from "@/server/db/queries/user-progress";

/** Build SimpleListItem[] for a single case drill (nominative / accusative / genitive).
 *  Pool is SRS-aware: nouns the user has been exposed to in their CEFR band. */
async function getNounDrillItemsImpl(
	userId: number,
	grammaticalCase: "nominative" | "accusative" | "genitive",
	drillId: string,
	{ stripArticleForReverse = false } = {},
): Promise<SimpleListItem[]> {
	const { currentCefrLevel } = await ensureUserProgress(userId);

	const pool = await getDrillVocabPool({
		userId,
		drillId,
		wordTypes: ["noun"],
		cefrPool: adjacentCefrPool(currentCefrLevel),
		limit: 50,
	});

	// Build flat id list and reverse-lookup for bucket tagging
	const entries = typedEntries(pool);
	const allIds = entries.flatMap(([, ids]) => ids);

	const bucketMap = new Map<number, DrillBucket>();
	for (const [bucket, ids] of entries) {
		for (const id of ids) bucketMap.set(id, bucket);
	}

	const rows = await getVocabularyWithNominalForms("noun", allIds);
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
			vocabId: vocab.id,
			bucket: bucketMap.get(vocab.id),
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
		return getNounDrillItemsImpl(userId, data.grammaticalCase, data.drillId, {
			stripArticleForReverse: data.stripArticleForReverse,
		});
	});
