import { createFileRoute, notFound } from "@tanstack/react-router";

import { pageTitle } from "@/lib/page-title";
import { getGuideLessonSourcesFn } from "@/server/fns/guides";

import { GuidePage } from "./components/guide-page";
import { findGuide } from "./guides.data";

export const Route = createFileRoute("/guides/$guide")({
	loader: async ({ params }) => {
		const guide = findGuide(params.guide);
		if (!guide) throw notFound();
		const sources = await getGuideLessonSourcesFn({ data: { slug: guide.slug } });
		return { slug: guide.slug, sources };
	},
	head: ({ params }) => ({
		meta: [{ title: pageTitle(findGuide(params.guide)?.title ?? "Guides") }],
	}),
	component: GuideRoute,
});

function GuideRoute() {
	const { slug, sources } = Route.useLoaderData();
	const guide = findGuide(slug);
	if (!guide) return null;
	return <GuidePage guide={guide} sources={sources} />;
}
