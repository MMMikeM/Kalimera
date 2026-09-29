import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getLessonSourcesForGuide } from "./guides.server";

export const getGuideLessonSourcesFn = createServerFn({ method: "GET" })
	.validator(z.object({ slug: z.string() }))
	.handler(({ data: { slug } }) => getLessonSourcesForGuide(slug));
