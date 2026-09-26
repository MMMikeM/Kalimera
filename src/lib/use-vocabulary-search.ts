import { createFuzzySearch } from "ekrina";
import { useEffect, useState } from "react";

import { vocabularySearchFields } from "@/lib/vocabulary-search-fields";
import type { VocabularySearchGraphRow } from "@/server/db/queries/vocabulary";
import { getSearchVocabularyFn } from "@/server/fns/search";

const EMPTY_VOCABULARY: VocabularySearchGraphRow[] = [];

interface UseVocabularySearchOptions {
	enabled?: boolean;
}

export const useVocabularySearch = (options: UseVocabularySearchOptions = {}) => {
	const { enabled = true } = options;
	// null until the first fetch settles; loading is derived from that, not tracked separately.
	const [loaded, setLoaded] = useState<VocabularySearchGraphRow[] | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (!enabled || loaded !== null) return;
		getSearchVocabularyFn()
			.then((v) => setLoaded(v ?? EMPTY_VOCABULARY))
			.catch(() => setLoaded(EMPTY_VOCABULARY));
	}, [enabled, loaded]);

	const vocabulary = loaded ?? EMPTY_VOCABULARY;
	const isLoading = enabled && loaded === null;

	const fuzzySearch = createFuzzySearch(vocabulary, vocabularySearchFields);

	const results =
		searchTerm.length === 0
			? []
			: fuzzySearch(searchTerm)
					.sort((a, b) => a.score - b.score)
					.map((result) => result.item);

	return { searchTerm, setSearchTerm, results, isLoading, vocabulary };
};
