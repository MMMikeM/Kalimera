import { createServerFn } from "@tanstack/react-start";

import { getSearchWire } from "./search.server";

export const getSearchVocabularyFn = createServerFn({ method: "GET" }).handler(() =>
	getSearchWire(),
);
