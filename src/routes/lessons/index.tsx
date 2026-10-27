import { createFileRoute } from "@tanstack/react-router";

import { getLessonFn } from "@/server/fns/lessons";

import { LessonSheet } from "./components/lesson-sheet";

export const Route = createFileRoute("/lessons/")({
	loader: () => getLessonFn({ data: {} }),
	component: LatestLesson,
});

function LatestLesson() {
	const sheet = Route.useLoaderData();
	return sheet ? <LessonSheet sheet={sheet} /> : null;
}
