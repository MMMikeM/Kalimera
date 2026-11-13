import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getVerbTables } from "./verb-tables.server";

export type { VerbTableVerb } from "./verb-tables.server";

export const getVerbTablesFn = createServerFn({ method: "GET" })
	.validator(z.object({ lemmas: z.array(z.string().max(40)).max(40) }))
	.handler(async ({ data: { lemmas } }) => getVerbTables(lemmas));
