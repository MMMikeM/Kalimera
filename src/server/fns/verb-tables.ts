import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getReferenceVerbs } from "./reference-verbs.server";

export type { ReferenceVerb } from "./reference-verbs.server";

export const getReferenceVerbsFn = createServerFn({ method: "GET" })
	.validator(z.object({ lemmas: z.array(z.string().max(40)).max(40) }))
	.handler(async ({ data: { lemmas } }) => getReferenceVerbs(lemmas));
