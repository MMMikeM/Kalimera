import { db } from "../index";

export interface OppositePair {
	aId: number;
	aGreek: string;
	aEnglish: string;
	bId: number;
	bGreek: string;
	bEnglish: string;
}

/** Every opposite pair with both members' lemma and gloss, for the opposites drill. */
export const getOppositePairs = async (): Promise<OppositePair[]> => {
	const rows = await db.query.vocabularyOpposites.findMany({
		with: {
			wordA: { columns: { id: true, greekText: true, englishTranslation: true } },
			wordB: { columns: { id: true, greekText: true, englishTranslation: true } },
		},
	});

	const pairs: OppositePair[] = [];
	for (const row of rows) {
		if (row.wordA == null || row.wordB == null) continue;
		pairs.push({
			aId: row.wordA.id,
			aGreek: row.wordA.greekText,
			aEnglish: row.wordA.englishTranslation,
			bId: row.wordB.id,
			bGreek: row.wordB.greekText,
			bEnglish: row.wordB.englishTranslation,
		});
	}
	return pairs;
};
