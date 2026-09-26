import { cefrRank } from "./cefr";

interface NounExample {
	lemma: string;
	english: string;
	/** Keyed `${case}_${number}`, matching the nominal_forms rows. */
	forms: Record<string, { form: string; article: string | null }>;
}

export interface NounPatternGroup {
	count: number;
	examples: NounExample[];
}

/**
 * Candidates, not final examples. The reference page filters these (a pluralia
 * tantum does not demonstrate its own singular ending) and then shows three, so
 * this needs headroom above the display count.
 */
const CANDIDATES_PER_PATTERN = 6;

const UNRANKED = Number.MAX_SAFE_INTEGER;

/** Shape of a paradigm-reference row; structural so this stays free of the db import. */
export type GroupableNoun = {
	greekText: string;
	englishTranslation: string;
	cefrLevel: string | null;
	frequencyRank: number | null;
	nounDetails: { declensionPattern: string } | null;
	nominalForms: Array<{
		grammaticalCase: string;
		number: string;
		form: string;
		article: string | null;
	}>;
};

export const groupNounsByPattern = (
	rows: readonly GroupableNoun[],
): Record<string, NounPatternGroup> => {
	// Days, months and numbers carry their article inside `greek_text`
	// ("ο Ιανουάριος") and have no noun_details row, so they would corrupt both
	// the grouping and the counts.
	const declinable = rows.filter((row) => row.nounDetails !== null);

	// Same priority order the drill pool uses: teach the earliest, commonest words
	// first, and sink the unclassified rather than letting them sort high.
	const byPriority = declinable.toSorted((a, b) => {
		const cefr = cefrRank(a.cefrLevel) - cefrRank(b.cefrLevel);
		return cefr !== 0 ? cefr : (a.frequencyRank ?? UNRANKED) - (b.frequencyRank ?? UNRANKED);
	});

	const byPattern: Record<string, NounPatternGroup> = {};
	for (const row of byPriority) {
		const pattern = row.nounDetails?.declensionPattern;
		if (!pattern) continue;

		const group = (byPattern[pattern] ??= { count: 0, examples: [] });
		group.count += 1;
		if (group.examples.length >= CANDIDATES_PER_PATTERN) continue;

		group.examples.push({
			lemma: row.greekText,
			english: row.englishTranslation,
			forms: Object.fromEntries(
				row.nominalForms.map((f) => [
					`${f.grammaticalCase}_${f.number}`,
					{ form: f.form, article: f.article },
				]),
			),
		});
	}

	return byPattern;
};
