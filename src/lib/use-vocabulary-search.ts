import { createFuzzySearch } from "@mmmike/mikrofuzz";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

import type { VocabularySearchGraphRow } from "@/db.server/queries/vocabulary";

const EMPTY_VOCABULARY: VocabularySearchGraphRow[] = [];

interface UseVocabularySearchOptions {
	enabled?: boolean;
}

export const useVocabularySearch = (options: UseVocabularySearchOptions = {}) => {
	const { enabled = true } = options;
	const fetcher = useFetcher<{ vocabulary: VocabularySearchGraphRow[] }>();
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (enabled && fetcher.state === "idle" && !fetcher.data) {
			fetcher.load("/search");
		}
	}, [enabled, fetcher]);

	const vocabulary = fetcher.data?.vocabulary ?? EMPTY_VOCABULARY;
	const isLoading = fetcher.state === "loading" || (!fetcher.data && enabled);

	const fuzzySearch = createFuzzySearch<VocabularySearchGraphRow>(vocabulary, {
		getText: (item) => {
			const row = item as VocabularySearchGraphRow;
			return [
				row.greekText,
				row.englishTranslation,
				...row.vocabularyTags.flatMap((vt) => (vt.tag?.name ? [vt.tag.name] : [])),
			];
		},
	});

	const results =
		searchTerm.length === 0
			? []
			: fuzzySearch(searchTerm)
					.sort((a, b) => a.score - b.score)
					.map((result) => result.item);

	return {
		searchTerm,
		setSearchTerm,
		results,
		isLoading,
		vocabulary,
	};
};
