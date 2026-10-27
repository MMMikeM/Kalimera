import { createServerFn } from "@tanstack/react-start";

import { canSeeLessons } from "@/lib/lessons-access";
import { getAuthSession } from "@/server/auth/session";

import { getRecentLessonDrills } from "./guides.server";

export const getRecentLessonDrillsFn = createServerFn({ method: "GET" }).handler(async () =>
	canSeeLessons(await getAuthSession()) ? getRecentLessonDrills(2) : [],
);
