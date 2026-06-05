import { createServerFn } from "@tanstack/react-start";

import { getOppositePairs } from "@/server/db/queries/opposites";

export const getOppositePairsFn = createServerFn({ method: "GET" }).handler(async () =>
	getOppositePairs(),
);
