import { useEffect, useMemo, useState } from "react";

import { NO_RESULT, type SearchIndex, buildSearchIndex } from "@/lib/search-index";
import type { SearchResult } from "@/lib/search-types";
import { getSearchVocabularyFn } from "@/server/fns/search";

let loaded: SearchIndex | undefined;
let loading: Promise<SearchIndex> | undefined;

const loadIndex = () => {
	loading ??= getSearchVocabularyFn()
		.then((wire) => (loaded = buildSearchIndex(wire)))
		.catch((error: unknown) => {
			loading = undefined;
			throw error;
		});
	return loading;
};

interface UseVocabularySearchOptions {
	enabled?: boolean;
}

/** Fetches the vocabulary once per page session, builds the index once, and searches it. */
export const useVocabularySearch = (
	query: string,
	{ enabled = true }: UseVocabularySearchOptions = {},
): SearchResult => {
	const [index, setIndex] = useState(loaded);

	useEffect(() => {
		if (!enabled || index) return;
		loadIndex().then(setIndex, () => undefined);
	}, [enabled, index]);

	return useMemo(() => index?.search(query) ?? NO_RESULT, [index, query]);
};
