export type NounGender = "masculine" | "feminine" | "neuter";

export interface BrowsableNoun {
	id: number;
	lemma: string;
	english: string;
	/** Null for numerals, which carry no lexical gender. */
	gender: NounGender | null;
	/** "0" and null both mean unlevelled; see `isUnlevelled`. */
	cefrLevel: string | null;
	frequencyRank: number | null;
	/** Keyed `${case}_${number}`; empty when nothing is stored. */
	forms: Record<string, { form: string; article: string | null }>;
}

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

/** Selectable values. No "all" pseudo-level: selecting nothing already means all. */
export const LEVELS = [...CEFR_LEVELS, "unlevelled"] as const;
export type LevelFilter = (typeof LEVELS)[number];

/**
 * Words shown before the learner asks for more. The list is already ordered
 * commonest-first, so this doubles as the frequency mechanism: a 49-word subject
 * opens as a 10-word one instead of a wall.
 */
export const INITIAL_VISIBLE = 10;

/**
 * The same cut-off inside a named sub-group. Smaller, because a subject with
 * sub-groups shows several at once; the working-memory ceiling counts the
 * groups, not the rows, once the headings are honest.
 */
export const PER_GROUP_VISIBLE = 5;

/**
 * Any value outside the CEFR enum means the word was never levelled. The column
 * has no CHECK constraint, so a junk value must leave the word reachable rather
 * than filtered into nothing.
 */
export const isUnlevelled = (level: string | null): boolean =>
	level === null || !(CEFR_LEVELS as readonly string[]).includes(level);

/** An empty selection means no filtering, not an empty result. */
export const filterNouns = (
	nouns: readonly BrowsableNoun[],
	levels: readonly LevelFilter[],
): BrowsableNoun[] => {
	if (levels.length === 0) return [...nouns];
	const wanted = new Set<string>(levels);
	return nouns.filter((noun) =>
		isUnlevelled(noun.cefrLevel)
			? wanted.has("unlevelled")
			: wanted.has(noun.cefrLevel as string),
	);
};
