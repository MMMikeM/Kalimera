import { createServerFn } from "@tanstack/react-start";

import { fetchVocabularyRowsForSearch } from "@/db.server/queries/vocabulary";

export const getSearchVocabularyFn = createServerFn({ method: "GET" }).handler(() =>
	fetchVocabularyRowsForSearch(),
);
