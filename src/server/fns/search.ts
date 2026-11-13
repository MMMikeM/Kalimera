import { createServerFn } from "@tanstack/react-start";

import { canSeeLessons } from "@/lib/lessons-access";
import { getAuthSession } from "@/server/auth/session";

import { getSearchWire } from "./search.server";

export const getSearchVocabularyFn = createServerFn({ method: "GET" }).handler(async () =>
	getSearchWire(canSeeLessons(await getAuthSession())),
);
