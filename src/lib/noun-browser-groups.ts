import type { BrowsableNoun, NounGender } from "./noun-filters";

export type { BrowsableNoun, NounGender } from "./noun-filters";

export interface NounSubjectGroup {
	slug: string;
	title: string;
	nouns: BrowsableNoun[];
}

const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];
const UNRANKED = Number.MAX_SAFE_INTEGER;

/** Anything that is not a CEFR code sorts last — 190 rows store `cefr_level` as "0". */
const cefrOrder = (level: string | null): number => {
	const index = level === null ? -1 : CEFR_ORDER.indexOf(level);
	return index === -1 ? UNRANKED : index;
};

type GroupableRow = {
	id: number;
	greekText: string;
	englishTranslation: string;
	cefrLevel: string | null;
	frequencyRank: number | null;
	nounDetails: { gender: string } | null;
	nominalForms: Array<{
		grammaticalCase: string;
		number: string;
		form: string;
		article: string | null;
	}>;
	vocabularyTags: Array<{
		tag: { slug: string; name: string; section: string | null; sectionDisplayOrder: number | null } | null;
	}>;
};

/**
 * Groups nouns under their subject tag, subjects in curriculum order and nouns
 * within a subject by CEFR then frequency — commonest first, which is the order
 * the drill pool teaches them in.
 *
 * A noun carries exactly one `nouns`-section tag by construction (see
 * `seed-data/vocabulary/noun-subjects.ts`), but nothing in the schema enforces
 * that, so a noun tagged twice would appear in both groups rather than vanish.
 */
export const groupNounsBySubject = (rows: readonly GroupableRow[]): NounSubjectGroup[] => {
	const byPriority = [...rows].sort((a, b) => {
		const cefr = cefrOrder(a.cefrLevel) - cefrOrder(b.cefrLevel);
		return cefr !== 0 ? cefr : (a.frequencyRank ?? UNRANKED) - (b.frequencyRank ?? UNRANKED);
	});

	const groups = new Map<string, { order: number; group: NounSubjectGroup }>();

	for (const row of byPriority) {
		const subjects = row.vocabularyTags
			.map((vt) => vt.tag)
			.filter((tag): tag is NonNullable<typeof tag> => tag?.section === "nouns");

		for (const tag of subjects) {
			const existing = groups.get(tag.slug);
			const group =
				existing?.group ??
				(() => {
					const created: NounSubjectGroup = { slug: tag.slug, title: tag.name, nouns: [] };
					groups.set(tag.slug, { order: tag.sectionDisplayOrder ?? UNRANKED, group: created });
					return created;
				})();

			group.nouns.push({
				id: row.id,
				lemma: row.greekText,
				english: row.englishTranslation,
				gender: (row.nounDetails?.gender as NounGender | undefined) ?? null,
				// Carried through so the subject page can filter on them.
				cefrLevel: row.cefrLevel,
				frequencyRank: row.frequencyRank,
				forms: Object.fromEntries(
					row.nominalForms.map((f) => [
						`${f.grammaticalCase}_${f.number}`,
						{ form: f.form, article: f.article },
					]),
				),
			});
		}
	}

	return [...groups.values()]
		.sort((a, b) => a.order - b.order)
		.map(({ group }) => group)
		.filter((group) => group.nouns.length > 0);
};
