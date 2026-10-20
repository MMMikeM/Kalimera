import { createServerFn } from "@tanstack/react-start";

import { getRecentLessonDrills } from "./guides.server";

export const getRecentLessonDrillsFn = createServerFn({ method: "GET" }).handler(async () =>
	getRecentLessonDrills(2),
);
