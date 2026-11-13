import { useRouteContext } from "@tanstack/react-router";
import { useEffect, useMemo, useReducer } from "react";

import { canSeeLessons } from "@/lib/lessons-access";
import { NO_RESULT, type SearchIndex, buildSearchIndex } from "@/lib/search-index";
import type { SearchResult } from "@/lib/search-types";
import { getSearchVocabularyFn } from "@/server/fns/search";

/** The server sends lesson phrases only to the lessons owner, so that account's index differs. */
const loaded = new Map<boolean, SearchIndex>();
const loading = new Map<boolean, Promise<SearchIndex>>();

const loadIndex = (withLessons: boolean) => {
	const pending =
		loading.get(withLessons) ??
		getSearchVocabularyFn()
			.then((wire) => {
				const index = buildSearchIndex(wire);
				loaded.set(withLessons, index);
				return index;
			})
			.finally(() => loading.delete(withLessons));
	loading.set(withLessons, pending);
	return pending;
};

interface UseVocabularySearchOptions {
	enabled?: boolean;
}

interface VocabularySearch {
	result: SearchResult;
	/** True until the index is ready; an empty result then means "not yet", not "nothing found". */
	loading: boolean;
}

/** Fetches the vocabulary once per page session, builds the index once, and searches it. */
export const useVocabularySearch = (
	query: string,
	{ enabled = true }: UseVocabularySearchOptions = {},
): VocabularySearch => {
	const withLessons = useRouteContext({ from: "__root__", select: (ctx) => canSeeLessons(ctx.auth) });
	const [, rerender] = useReducer((n: number) => n + 1, 0);
	const index = loaded.get(withLessons);

	// Signing out must not leave the owner's lesson phrases in memory.
	useEffect(() => {
		loaded.delete(!withLessons);
	}, [withLessons]);

	// Re-runs on each keystroke while unloaded, so a failed fetch is retried by the next query.
	useEffect(() => {
		if (!enabled || index) return;
		loadIndex(withLessons).then(rerender, () => undefined);
	}, [enabled, index, withLessons, query]);

	const result = useMemo(() => index?.search(query) ?? NO_RESULT, [index, query]);
	return { result, loading: enabled && query.trim().length > 0 && !index };
};
