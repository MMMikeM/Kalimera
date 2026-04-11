import { createFuzzySearch } from "@mmmike/mikrofuzz";
import { useEffect, useMemo, useState } from "react";
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

	const fuzzySearch = useMemo(
		() =>
			createFuzzySearch<VocabularySearchGraphRow>(vocabulary, {
				getText: (item) => {
					const row = item as VocabularySearchGraphRow;
					return [
						row.greekText,
						row.englishTranslation,
						...row.vocabularyTags.flatMap((vt) => (vt.tag?.name ? [vt.tag.name] : [])),
					];
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
