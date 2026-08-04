import type { FieldSpec } from "ekrina";

export type SearchableVocabulary = {
	greekText: string;
	englishTranslation: string;
	vocabularyTags: { tag: { name: string } | null }[];
};

export const vocabularySearchFields: FieldSpec<SearchableVocabulary>[] = [
	{ text: (v) => v.greekText },
	{ text: (v) => v.englishTranslation },
	{
		text: (v) => {
			const names = v.vocabularyTags.flatMap((vt) => (vt.tag?.name ? [vt.tag.name] : []));
			return names.length > 0 ? names.join(" ") : null;
		},
	},
];
