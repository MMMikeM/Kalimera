import { createFuzzySearch } from "@mmmike/mikrofuzz";
import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import type { SearchVocabItem } from "@/db.server/queries/vocabulary";

interface UseVocabularySearchOptions {
	enabled?: boolean;
}

export const useVocabularySearch = (
	options: UseVocabularySearchOptions = {},
) => {
	const { enabled = true } = options;
	const fetcher = useFetcher<{ vocabulary: SearchVocabItem[] }>();
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (enabled && fetcher.state === "idle" && !fetcher.data) {
			fetcher.load("/search");
		}
	}, [enabled, fetcher]);

	const vocabulary = fetcher.data?.vocabulary ?? [];
	const isLoading = fetcher.state === "loading" || (!fetcher.data && enabled);

	const fuzzySearch = useMemo(
		() =>
			createFuzzySearch<SearchVocabItem>(vocabulary, {
				getText: (item) => {
					const vocab = item as SearchVocabItem;
					return [vocab.greek, vocab.english, ...vocab.tags];
				},
			}),
		[vocabulary],
	);

	const results = useMemo(() => {
		if (searchTerm.length === 0) return [];
		return fuzzySearch(searchTerm)
			.sort((a, b) => a.score - b.score)
			.map((result) => result.item);
	}, [fuzzySearch, searchTerm]);

	return {
		searchTerm,
		setSearchTerm,
		results,
		isLoading,
		vocabulary,
	};
};
