import { createFuzzySearch } from "ekrina";
import { useEffect, useState } from "react";

import { vocabularySearchFields } from "@/lib/vocabulary-search-fields";
import type { VocabularySearchGraphRow } from "@/server/db/queries/vocabulary";

const EMPTY_VOCABULARY: VocabularySearchGraphRow[] = [];

interface UseVocabularySearchOptions {
	enabled?: boolean;
}

export const useVocabularySearch = (options: UseVocabularySearchOptions = {}) => {
	const { enabled = true } = options;
	const [vocabulary, setVocabulary] = useState<VocabularySearchGraphRow[]>(EMPTY_VOCABULARY);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (!enabled || vocabulary.length > 0) return;
		setIsLoading(true);
		fetch("/search")
			.then((r) => r.json() as Promise<{ vocabulary: VocabularySearchGraphRow[] }>)
			.then(({ vocabulary: v }) => setVocabulary(v ?? EMPTY_VOCABULARY))
			.catch(() => { })
			.finally(() => setIsLoading(false));
	}, [enabled, vocabulary.length]);

	const fuzzySearch = createFuzzySearch(vocabulary, vocabularySearchFields);

	const results =
		searchTerm.length === 0
			? []
			: fuzzySearch(searchTerm)
				.sort((a, b) => a.score - b.score)
				.map((result) => result.item);

	return { searchTerm, setSearchTerm, results, isLoading, vocabulary };
};
