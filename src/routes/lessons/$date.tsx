import { createFileRoute, notFound } from "@tanstack/react-router";

import { pageTitle } from "@/lib/page-title";
import { getLessonFn } from "@/server/fns/lessons";

import { LessonSheet } from "./components/lesson-sheet";

export const Route = createFileRoute("/lessons/$date")({
	loader: async ({ params }) => {
		const sheet = await getLessonFn({ data: { date: params.date } });
		if (!sheet) throw notFound();
		return sheet;
	},
	head: ({ loaderData }) => ({ meta: [{ title: pageTitle(loaderData?.topic ?? "Lessons") }] }),
	component: LessonByDate,
});

function LessonByDate() {
	const sheet = Route.useLoaderData();
	return <LessonSheet sheet={sheet} />;
}
