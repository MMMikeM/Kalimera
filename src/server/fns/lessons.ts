import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getLessonSheet, listLessons } from "./lessons.server";

export const getLessonsFn = createServerFn({ method: "GET" }).handler(async () => listLessons());

export const getLessonFn = createServerFn({ method: "GET" })
	.validator(z.object({ date: z.string().optional() }))
	.handler(async ({ data }) => getLessonSheet(data.date));
