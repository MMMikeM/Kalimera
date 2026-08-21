import type { BrowsableNoun } from "./noun-filters";

export type NounRow =
	| { kind: "pair"; left: BrowsableNoun; right: BrowsableNoun }
	| { kind: "single"; noun: BrowsableNoun };

/**
 * Turns an ordered list of nouns into rows, joining counterparts (πατέρας with
 * μητέρα, αγόρι with κορίτσι) into a single row.
 *
 * Pairing happens over the whole list before any cut-off, and a pair takes the
 * position of whichever member came first. Collecting all pairs into a block
 * ahead of the singles discarded the CEFR-then-frequency order, and slicing
 * before pairing split couples across the cut — μαμά showed alone because
 * μπαμπάς fell outside the first five.
 */
export const toNounRows = (
	nouns: readonly BrowsableNoun[],
	pairDefs: ReadonlyArray<readonly [string, string]>,
): NounRow[] => {
	const partner = new Map<string, { other: string; isLeft: boolean }>();
	for (const [left, right] of pairDefs) {
		partner.set(left.toLowerCase(), { other: right.toLowerCase(), isLeft: true });
		partner.set(right.toLowerCase(), { other: left.toLowerCase(), isLeft: false });
	}

	const byLemma = new Map(nouns.map((n) => [n.lemma.toLowerCase(), n]));
	const consumed = new Set<string>();
	const rows: NounRow[] = [];

	for (const noun of nouns) {
		const key = noun.lemma.toLowerCase();
		if (consumed.has(key)) continue;

		const link = partner.get(key);
		const other = link ? byLemma.get(link.other) : undefined;
		if (link && other) {
			consumed.add(key);
			consumed.add(link.other);
			rows.push(
				link.isLeft
					? { kind: "pair", left: noun, right: other }
					: { kind: "pair", left: other, right: noun },
			);
			continue;
		}

		consumed.add(key);
		rows.push({ kind: "single", noun });
	}

	return rows;
};
