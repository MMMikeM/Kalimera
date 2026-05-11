import { createServerFn } from "@tanstack/react-start";

import { fetchVocabularyRowsForSearch } from "@/server/db/queries/vocabulary";

export const getSearchVocabularyFn = createServerFn({ method: "GET" }).handler(() =>
	fetchVocabularyRowsForSearch(),
);
